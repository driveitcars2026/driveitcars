'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CarPageLoader.module.css';

/**
 * Ultra-fast, GPU-accelerated Car Journey Preloader
 * - Renders on initial SSR paint (0ms delay, no flash of underlying page)
 * - Displays car starting from Point A (Pickup) and traveling smoothly to Point B (Destination)
 * - 100% lightweight inline SVG + compositor-only CSS transforms (translate3d / scaleX)
 * - Zero heavy dependencies (no Lottie, no GIF, no video)
 * - Smooth fade-out & unmount on page completion (~1.0s drive + 0.3s fade)
 */
export default function CarPageLoader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [stepText, setStepText] = useState('Ignition started...');
  const dismissedRef = useRef(false);

  useEffect(() => {
    let unmountTimer;

    const dismissLoader = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setFading(true);
      unmountTimer = setTimeout(() => {
        setLoading(false);
      }, 320);
    };

    const t1 = setTimeout(() => {
      setStepText('Driving to destination...');
    }, 350);

    const t2 = setTimeout(() => {
      setStepText('Arrived! Ready to drive.');
    }, 850);

    let minTimePassed = false;
    const minTimer = setTimeout(() => {
      minTimePassed = true;
      if (document.readyState === 'complete') {
        dismissLoader();
      }
    }, 1050);

    const handleLoad = () => {
      if (minTimePassed) {
        dismissLoader();
      }
    };

    if (document.readyState !== 'complete') {
      window.addEventListener('load', handleLoad);
    }

    // Hard fallback timeout (1.6s max guarantee)
    const fallbackTimer = setTimeout(() => {
      dismissLoader();
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      clearTimeout(unmountTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!loading) return null;

  return (
    <aside
      id="driveit-car-loader"
      className={`${styles.loaderBackdrop} ${fading ? styles.fadeOut : ''}`}
      aria-live="polite"
      aria-label="Loading DriveItCars"
    >
      <div className={styles.cardContainer}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <span className={styles.brandLogo}>
            DRIVE<span className={styles.goldAccent}>IT</span> CARS
          </span>
          <span className={styles.brandSubline}>Hyderabad Self Drive</span>
        </div>

        {/* Journey Area: Point A to Point B */}
        <div className={styles.journeyArea}>
          {/* Point A (Start) */}
          <div className={styles.pointWrapper}>
            <div className={`${styles.pointBadge} ${styles.pointStart}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
                <circle cx="12" cy="12" r="3.5" fill="#10b981" />
              </svg>
            </div>
            <span className={styles.pointLabel}>Point A</span>
            <span className={styles.pointSubtext}>Pickup</span>
          </div>

          {/* Highway Road */}
          <div className={styles.roadTrack}>
            <div className={styles.roadDashes}></div>

            {/* Full-width GPU runner carrying the car from Point A to Point B */}
            <div className={styles.carRunner}>
              <div className={styles.carContainer}>
                <div className={styles.headlightCone}></div>

                <div className={styles.exhaustPuff}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                {/* Aerodynamic SUV/Sedan Fleet Silhouette */}
                <svg
                  className={styles.carBodySvg}
                  width="84"
                  height="34"
                  viewBox="0 0 120 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Cabin Roof */}
                  <path
                    d="M26 22 L38 8 C40 6 44 5 50 5 L82 5 C88 5 92 8 96 15 L108 22 Z"
                    fill="#181e2b"
                    stroke="#ffb907"
                    strokeWidth="1.5"
                  />
                  {/* Tinted Windows */}
                  <path
                    d="M41 10 L50 8 L65 8 L65 20 L34 20 Z"
                    fill="#ffb907"
                    fillOpacity="0.25"
                  />
                  <path
                    d="M69 8 L82 8 C85 8 88 10 91 15 L97 20 L69 20 Z"
                    fill="#ffb907"
                    fillOpacity="0.25"
                  />
                  {/* Main Body Chassis */}
                  <path
                    d="M6 22 C6 20 8 18 11 18 L108 18 C113 18 117 21 118 25 L116 33 C115 35 113 36 110 36 L102 36 C102 30 96 26 90 26 C84 26 78 30 78 36 L40 36 C40 30 34 26 28 26 C22 26 16 30 16 36 L8 36 C6 36 5 34 5 32 Z"
                    fill="#ffb907"
                  />
                  {/* Chrome Side Accent Crease */}
                  <path
                    d="M14 24 L106 24"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                  />
                  {/* Rear Tail Light */}
                  <rect x="5" y="21" width="4" height="6" rx="1.5" fill="#ef4444" />
                  {/* Front LED Head Light */}
                  <rect x="113" y="23" width="5" height="5" rx="1" fill="#ffffff" />

                  {/* Left Wheel (Rear) */}
                  <g className={styles.wheelGraphic}>
                    <circle cx="28" cy="36" r="9" fill="#111827" stroke="#374151" strokeWidth="2" />
                    <circle cx="28" cy="36" r="5" fill="#1f2937" stroke="#ffb907" strokeWidth="1.5" />
                    <line x1="28" y1="31" x2="28" y2="41" stroke="#ffb907" strokeWidth="1.5" />
                    <line x1="23" y1="36" x2="33" y2="36" stroke="#ffb907" strokeWidth="1.5" />
                  </g>

                  {/* Right Wheel (Front) */}
                  <g className={styles.wheelGraphic}>
                    <circle cx="90" cy="36" r="9" fill="#111827" stroke="#374151" strokeWidth="2" />
                    <circle cx="90" cy="36" r="5" fill="#1f2937" stroke="#ffb907" strokeWidth="1.5" />
                    <line x1="90" y1="31" x2="90" y2="41" stroke="#ffb907" strokeWidth="1.5" />
                    <line x1="85" y1="36" x2="95" y2="36" stroke="#ffb907" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Point B (Destination) */}
          <div className={styles.pointWrapper}>
            <div className={`${styles.pointBadge} ${styles.pointDest}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path
                  d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                  fill="#ffb907"
                  fillOpacity="0.3"
                  stroke="#ffb907"
                />
                <line x1="4" y1="22" x2="4" y2="15" stroke="#ffb907" />
              </svg>
            </div>
            <span className={styles.pointLabel}>Point B</span>
            <span className={styles.pointSubtext}>Destination</span>
          </div>
        </div>

        {/* Status Line & Progress Fill */}
        <div className={styles.statusBar}>
          <p className={styles.statusMessage}>{stepText}</p>
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill}></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
