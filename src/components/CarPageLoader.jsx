'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './CarPageLoader.module.css';

/**
 * Steering-wheel roll preloader on pure white backdrop:
 * - Renders immediately on SSR with zero flash of underlying page
 * - Plays the DriveItCars steering roll -> logo reveal GIF (~1.25s roll + ~0.40s hold)
 * - Smoothly fades out & unmounts once animation + document load complete
 */
export default function CarPageLoader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const dismissedRef = useRef(false);
  const imageReadyRef = useRef(false);
  const minElapsedRef = useRef(false);
  const imgRef = useRef(null);
  const timersRef = useRef({ minTimer: null, unmountTimer: null });

  const dismissLoader = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setFading(true);
    timersRef.current.unmountTimer = setTimeout(() => {
      setLoading(false);
    }, 320);
  }, []);

  const handleImageReady = useCallback(() => {
    if (imageReadyRef.current) return;
    imageReadyRef.current = true;

    timersRef.current.minTimer = setTimeout(() => {
      minElapsedRef.current = true;
      if (document.readyState === 'complete') {
        dismissLoader();
      }
    }, 1650);
  }, [dismissLoader]);

  useEffect(() => {
    const handleLoad = () => {
      if (minElapsedRef.current) {
        dismissLoader();
      }
    };

    if (imgRef.current?.complete) {
      handleImageReady();
    }

    if (document.readyState !== 'complete') {
      window.addEventListener('load', handleLoad);
    }

    // Hard fallback timeout (2.5s max guarantee)
    const fallbackTimer = setTimeout(() => {
      dismissLoader();
    }, 2500);

    return () => {
      clearTimeout(timersRef.current.minTimer);
      clearTimeout(timersRef.current.unmountTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, [dismissLoader, handleImageReady]);

  if (!loading) return null;

  return (
    <aside
      id="driveit-car-loader"
      className={`${styles.loaderBackdrop} ${fading ? styles.fadeOut : ''}`}
      aria-live="polite"
      aria-label="Loading DriveItCars"
    >
      <div className={styles.loaderInner}>
        <img
          ref={imgRef}
          src="/driveit-loader.gif"
          alt="DriveItCars"
          width={640}
          height={220}
          className={styles.loaderGif}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          onLoad={handleImageReady}
          onError={handleImageReady}
        />
      </div>
    </aside>
  );
}
