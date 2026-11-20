'use client';

import { VERIFIED_VEHICLE_IMAGES } from '../data/vehicle-images';


import { useState, useEffect } from 'react';
import Link from 'next/link';

// All 28 Regular Top Demanding Cars with Daily, Weekly & Monthly Pricing
export const TOP_DEMANDING_CARS = [
  // ================= 5 SEATER HATCHBACK CARS =================
  {
    id: 1,
    name: 'Maruti Swift Manual Transmission',
    category: 'hatchback',
    badge: 'Popular City Hatchback',
    badgeColor: '#191c20',
    dailyPrice: '1,499',
    weeklyPrice: '8,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '24,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual Transmission',
    fuel: 'Petrol',
    image: '/assets/img/cars/Swift.webp',
    features: ['Refundable Security Deposit', 'Doorstep Delivery Available', 'High Fuel Mileage (22+ km/l)'],
  },
  {
    id: 2,
    name: 'Maruti Swift Automatic',
    category: 'hatchback',
    badge: 'Automatic City Drive',
    badgeColor: '#191c20',
    dailyPrice: '1,699',
    weeklyPrice: '9,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '26,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Automatic (AMT)',
    fuel: 'Petrol',
    image: '/assets/img/cars/Swift.webp',
    features: ['Clutch-Free Driving', 'Touchscreen SmartPlay', 'Smooth Traffic Commute'],
  },
  {
    id: 3,
    name: 'Maruti Baleno Manual & Automatic',
    category: 'hatchback',
    badge: 'Premium Nexa Hatchback',
    badgeColor: '#191c20',
    dailyPrice: '1,799',
    weeklyPrice: '10,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '28,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol',
    image: '/assets/img/cars/Baleno.webp',
    features: ['Spacious Rear Legroom', '9-inch HD Display', '360 View Camera'],
  },
  {
    id: 4,
    name: 'Hyundai i20 Manual & Automatic',
    category: 'hatchback',
    badge: 'Feature-Packed Hatchback',
    badgeColor: '#191c20',
    dailyPrice: '1,899',
    weeklyPrice: '10,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '29,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol',
    image: '/assets/img/cars/i20.webp',
    features: ['Electric Sunroof', 'Bose Premium Audio', 'Air Purifier Equipped'],
  },

  // ================= 5 SEATER MINI SUV CARS =================
  {
    id: 5,
    name: 'Maruti Suzuki Fronx Manual & Automatic',
    category: 'minisuv',
    badge: 'Turbo Crossover Mini SUV',
    badgeColor: '#191c20',
    dailyPrice: '2,199',
    weeklyPrice: '12,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '34,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / Boosterjet Turbo',
    image: '/assets/img/cars/Fronx.webp',
    features: ['High 190mm Ground Clearance', 'Wireless Apple CarPlay', 'Heads-Up Display'],
  },
  {
    id: 6,
    name: 'Hyundai Venue Manual & Automatic',
    category: 'minisuv',
    badge: 'Compact Urban SUV',
    badgeColor: '#191c20',
    dailyPrice: '2,299',
    weeklyPrice: '13,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '36,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / Diesel',
    image: '/assets/img/cars/5-Venue.webp',
    features: ['Bluelink Connected Car', 'Power Driver Seat', 'Cornering Lamps'],
  },
  {
    id: 7,
    name: 'Tata Punch Manual & Automatic',
    category: 'minisuv',
    badge: '5-Star Global NCAP Safety',
    badgeColor: '#191c20',
    dailyPrice: '1,999',
    weeklyPrice: '11,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '31,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol',
    image: '/assets/img/cars/Tata-Punch.webp',
    features: ['High Seating & Road View', 'Tough SUV Dynamics', 'Traction Pro Mode'],
  },

  // ================= 5 SEATER SUV CARS =================
  {
    id: 8,
    name: 'Maruti Suzuki Brezza Manual & Automatic',
    category: 'suv5',
    badge: 'High Reliability Urban SUV',
    badgeColor: '#191c20',
    dailyPrice: '2,499',
    weeklyPrice: '14,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '39,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Smart Hybrid Petrol',
    image: '/assets/img/cars/5-Brezza.webp',
    features: ['Electric Sunroof', '360 Degree Camera', 'High Fuel Efficiency'],
  },
  {
    id: 9,
    name: 'Tata Nexon Manual & Automatic',
    category: 'suv5',
    badge: '5-Star Safety SUV',
    badgeColor: '#191c20',
    dailyPrice: '2,499',
    weeklyPrice: '14,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '39,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / Diesel',
    image: '/assets/img/cars/5-NEXON.webp',
    features: ['Ventilated Front Seats', 'Multi-Drive Modes', 'Full Digital Cluster'],
  },
  {
    id: 10,
    name: 'Tata Harrier Manual & Automatic',
    category: 'suv5',
    badge: 'Full-Size Diesel SUV',
    badgeColor: '#191c20',
    dailyPrice: '3,499',
    weeklyPrice: '19,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '54,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: '2.0L Kryotec Diesel',
    image: '/assets/img/cars/5-Harrier.webp',
    features: ['Panoramic Sunroof', 'JBL 9-Speaker Audio', 'Land Rover D8 Platform'],
  },
  {
    id: 11,
    name: 'Kia Seltos Manual & Automatic',
    category: 'suv5',
    badge: 'Executive Highway SUV',
    badgeColor: '#191c20',
    dailyPrice: '2,899',
    weeklyPrice: '16,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '46,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / Diesel',
    image: '/assets/img/cars/5-Seltos.webp',
    features: ['Dual-Zone Climate Control', 'Panoramic Dual Screens', 'Bose Premium Audio'],
  },
  {
    id: 12,
    name: 'Hyundai Creta Manual & Automatic',
    category: 'suv5',
    badge: 'Most Booked SUV',
    badgeColor: '#191c20',
    dailyPrice: '2,899',
    weeklyPrice: '16,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '46,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / Diesel',
    image: '/assets/img/2023-6.webp',
    features: ['Panoramic Voice Sunroof', 'Ventilated Front Seats', 'Level 2 ADAS Safety'],
  },
  {
    id: 13,
    name: 'Mahindra Thar 4x4 Manual & Automatic',
    category: 'suv5',
    badge: '4x4 Off-Road SUV',
    badgeColor: '#191c20',
    dailyPrice: '3,499',
    weeklyPrice: '19,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '52,999',
    monthlySavings: 'Save 50%',
    seats: 4,
    transmission: 'Manual 4x4 & Automatic',
    fuel: '2.2L mHawk Diesel',
    image: '/assets/img/cars/5-Thar.webp',
    features: ['Shift-on-the-Fly 4WD', 'Convertible Hard Top', 'All-Terrain Ground Clearance'],
  },
  {
    id: 14,
    name: 'Mahindra Thar Roxx 5-Door Manual & Automatic',
    category: 'suv5',
    badge: '5-Door Thar Roxx',
    badgeColor: '#191c20',
    dailyPrice: '3,999',
    weeklyPrice: '22,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '59,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Diesel mHawk',
    image: VERIFIED_VEHICLE_IMAGES.roxx,
    features: ['Spacious 5-Door Cabin', 'Panoramic Skyroof', 'Harman Kardon Audio'],
  },

  // ================= 7 SEATER SUV & MUV CARS =================
  {
    id: 15,
    name: 'Mahindra XUV 700 Manual & Automatic',
    category: 'suv7',
    badge: 'Flagship 7-Seater SUV',
    badgeColor: '#191c20',
    dailyPrice: '3,799',
    weeklyPrice: '21,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '58,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Manual & Automatic',
    fuel: 'Diesel / Petrol',
    image: '/assets/img/cars/7-XUV700.webp',
    features: ['Panoramic Skyroof', 'Sony 3D Surround Sound', 'Connected Digital Cockpit'],
  },
  {
    id: 16,
    name: 'Kia Carens Manual & Automatic',
    category: 'suv7',
    badge: '7-Seater Family Cruiser',
    badgeColor: '#191c20',
    dailyPrice: '2,799',
    weeklyPrice: '16,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '44,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / Diesel',
    image: '/assets/img/cars/7-Kia Carens.webp',
    features: ['One-Touch Electric Tumble', 'Roof AC Vents for 3 Rows', 'Bose 8-Speaker Audio'],
  },
  {
    id: 17,
    name: 'Maruti Suzuki Ertiga Manual & Automatic',
    category: 'suv7',
    badge: 'Fuel-Efficient 7-Seater',
    badgeColor: '#191c20',
    dailyPrice: '2,499',
    weeklyPrice: '14,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '38,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Manual & Automatic',
    fuel: 'Smart Hybrid Petrol / CNG',
    image: '/assets/img/cars/7-Ertiga.webp',
    features: ['Dual AC with 2nd Row Controls', 'Flexible 7-Seat Layout', 'Low Fuel Consumption'],
  },
  {
    id: 18,
    name: 'Toyota Innova Crysta Manual & Automatic',
    category: 'suv7',
    badge: 'Highway & Family MPV',
    badgeColor: '#191c20',
    dailyPrice: '3,899',
    weeklyPrice: '22,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '59,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Manual & Automatic',
    fuel: '2.4L Diesel',
    image: '/assets/img/cars/7-Innova Crysta.webp',
    features: ['Captain Seats 2nd Row', 'Rear Climate Control AC', 'Proven Highway Reliability'],
  },
  {
    id: 19,
    name: 'Toyota Innova Hycross Automatic',
    category: 'suv7',
    badge: 'Hybrid 7-Seater MPV',
    badgeColor: '#191c20',
    dailyPrice: '4,499',
    weeklyPrice: '26,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '69,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Automatic (Self-Charging Hybrid)',
    fuel: 'Strong Hybrid Petrol',
    image: VERIFIED_VEHICLE_IMAGES.hycross,
    features: ['Ottoman Reclining Captain Seats', 'Panoramic Sunroof', 'Silent EV Mode Driving'],
  },
  {
    id: 20,
    name: 'Toyota Fortuner 4x4 Manual & Automatic',
    category: 'suv7',
    badge: 'Full-Size 4x4 SUV',
    badgeColor: '#191c20',
    dailyPrice: '5,999',
    weeklyPrice: '34,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '89,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Manual 4x4 & Automatic',
    fuel: '2.8L Diesel',
    image: '/assets/img/cars/7-Fortuner.webp',
    features: ['4x4 High/Low Range', 'Elevated Touring Stance', 'JBL 11-Speaker Audio'],
  },
  {
    id: 21,
    name: 'Kia Carnival Automatic Limousine',
    category: 'suv7',
    badge: 'Executive 7-Seater MPV',
    badgeColor: '#191c20',
    dailyPrice: '5,499',
    weeklyPrice: '31,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '84,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Automatic',
    fuel: '2.2L Diesel',
    image: '/assets/img/cars/7-KiaCarnival.webp',
    features: ['Dual Sunroofs', 'Electric Sliding Lounge Doors', 'VIP Reclining Captain Chairs'],
  },

  // ================= 5 SEATER SEDAN CARS =================
  {
    id: 22,
    name: 'Hyundai Verna Manual & Automatic',
    category: 'sedan',
    badge: 'Turbo Petrol Sedan',
    badgeColor: '#191c20',
    dailyPrice: '2,499',
    weeklyPrice: '14,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '39,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic (DCT)',
    fuel: '1.5L Turbo Petrol',
    image: '/assets/img/cars/seden-Verna.webp',
    features: ['Bose 8-Speaker Audio', 'Heated & Ventilated Seats', 'Level 2 ADAS Safety'],
  },
  {
    id: 23,
    name: 'Maruti Swift Dzire Manual & Automatic',
    category: 'sedan',
    badge: 'Executive Compact Sedan',
    badgeColor: '#191c20',
    dailyPrice: '1,999',
    weeklyPrice: '11,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '29,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Petrol / CNG',
    image: '/assets/img/cars/seden-dzire.webp',
    features: ['Rear AC Vents', '378L Boot Space', 'High Mileage Highway Ride'],
  },
  {
    id: 24,
    name: 'Maruti Suzuki Ciaz Manual & Automatic',
    category: 'sedan',
    badge: 'Executive Rear Legroom',
    badgeColor: '#191c20',
    dailyPrice: '2,299',
    weeklyPrice: '13,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '34,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic',
    fuel: 'Smart Hybrid Petrol',
    image: '/assets/img/cars/seden-Ciaz.webp',
    features: ['Plush Leather Seats', 'Rear Sunshade', 'Smooth Highway Cruise'],
  },
  {
    id: 25,
    name: 'Volkswagen Virtus Manual & Automatic',
    category: 'sedan',
    badge: 'German Touring Sedan',
    categorySecondary: 'sedan',
    badgeColor: '#191c20',
    dailyPrice: '2,799',
    weeklyPrice: '16,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '42,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Manual & Automatic (DSG)',
    fuel: 'TSI Turbo Petrol',
    image: VERIFIED_VEHICLE_IMAGES.virtus,
    features: ['5-Star Global NCAP Safety', '521L Massive Boot', 'Dynamic Paddle Shifters'],
  },
  {
    id: 26,
    name: 'Skoda Slavia Automatic Only',
    category: 'sedan',
    badge: 'European Compact Sedan',
    categorySecondary: 'sedan',
    badgeColor: '#191c20',
    dailyPrice: '2,799',
    weeklyPrice: '16,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '42,999',
    monthlySavings: 'Save 50%',
    seats: 5,
    transmission: 'Automatic Only (Torque Converter / DSG)',
    fuel: 'TSI Turbo Petrol',
    image: VERIFIED_VEHICLE_IMAGES.slavia,
    features: ['Ventilated Front Seats', 'Electric Sunroof', 'Precision Steering Dynamics'],
  },
  {
    id: 27,
    name: 'Mahindra Scorpio-N Automatic Only',
    category: 'suv7',
    categorySecondary: 'sedan',
    badge: '7-Seater Body-on-Frame SUV',
    badgeColor: '#191c20',
    dailyPrice: '3,499',
    weeklyPrice: '20,499',
    weeklySavings: 'Save 25%',
    monthlyPrice: '52,999',
    monthlySavings: 'Save 50%',
    seats: 7,
    transmission: 'Automatic Only (4x4 Ready)',
    fuel: '2.2L mHawk Diesel',
    image: VERIFIED_VEHICLE_IMAGES.scorpio,
    features: ['Frequency Selective Damping', 'Sony 12-Speaker 3D Audio', 'Tall Touring Stance'],
  },
  {
    id: 28,
    name: 'Maruti Suzuki XL6 Manual & Automatic',
    category: 'suv7',
    categorySecondary: 'sedan',
    badge: '6-Seater Captain Chairs',
    badgeColor: '#191c20',
    dailyPrice: '2,699',
    weeklyPrice: '15,999',
    weeklySavings: 'Save 25%',
    monthlyPrice: '41,999',
    monthlySavings: 'Save 50%',
    seats: 6,
    transmission: 'Manual & Automatic',
    fuel: 'Smart Hybrid Petrol',
    image: VERIFIED_VEHICLE_IMAGES.xl6,
    features: ['All-Black Leather Interiors', 'Ventilated Front Seats', 'Cruise Control & Captain Chairs'],
  },
];

export default function CarOffersSection({ initialCars = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [planType, setPlanType] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [searchQuery, setSearchQuery] = useState('');

  // Listen for category selection events dispatched from the hero booking engine
  useEffect(() => {
    const handleFilterCategory = (e) => {
      if (e?.detail?.category) {
        setActiveTab(e.detail.category);
      }
    };
    window.addEventListener('driveit-filter-category', handleFilterCategory);
    return () => {
      window.removeEventListener('driveit-filter-category', handleFilterCategory);
    };
  }, []);

  // Use the comprehensive 28 top demanding cars catalog as the primary fleet,
  // gracefully appending any custom CMS cars passed from Sanity
  const cmsCarsMapped = (initialCars && initialCars.length > 0)
    ? initialCars
      .filter((c) => !TOP_DEMANDING_CARS.some((tc) => tc.name.toLowerCase() === c.name?.toLowerCase()))
      .map((car, idx) => {
        let cat = 'sedan';
        if (['suv5', 'suv'].includes(car.category)) cat = 'suv5';
        else if (['suv7'].includes(car.category)) cat = 'suv7';
        else if (['hatchback'].includes(car.category)) cat = 'hatchback';
        else if (['minisuv'].includes(car.category)) cat = 'minisuv';

        const dailyPriceNum = typeof car.pricePerDay === 'number' ? car.pricePerDay : 2499;
        const weeklyPriceNum = Math.round(dailyPriceNum * 7 * 0.75);
        const monthlyPriceNum = Math.round(dailyPriceNum * 30 * 0.50);

        return {
          id: `cms-${car._id || idx}`,
          name: car.name,
          category: cat,
          badge: car.badge || 'Popular Deal',
          badgeColor: '#ffb907',
          dailyPrice: dailyPriceNum.toLocaleString('en-IN'),
          weeklyPrice: weeklyPriceNum.toLocaleString('en-IN'),
          weeklySavings: 'Save 25%',
          monthlyPrice: monthlyPriceNum.toLocaleString('en-IN'),
          monthlySavings: 'Save 50%',
          seats: car.seats || 5,
          transmission: car.transmission || 'Manual & Automatic',
          fuel: car.fuelType || car.fuel || 'Petrol',
          image: car.imageUrl || car.image || '/assets/img/cars/Swift.webp',
          features: car.features && car.features.length > 0 ? car.features : ['Security Deposit', 'Sanitized'],
        };
      })
    : [];

  const activeFleet = [...TOP_DEMANDING_CARS, ...cmsCarsMapped];

  const filteredCars = activeFleet.filter((car) => {
    // Search query matching
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = car.name.toLowerCase().includes(q);
      const matchTrans = car.transmission.toLowerCase().includes(q);
      const matchFuel = car.fuel.toLowerCase().includes(q);
      const matchBadge = car.badge.toLowerCase().includes(q);
      if (!matchName && !matchTrans && !matchFuel && !matchBadge) return false;
    }

    // Category tab matching
    if (activeTab === 'all') return true;
    if (activeTab === 'hatchback') return car.category === 'hatchback';
    if (activeTab === 'minisuv') return car.category === 'minisuv';
    if (activeTab === 'suv5') return car.category === 'suv5';
    if (activeTab === 'suv7') return car.category === 'suv7' || car.categorySecondary === 'suv7';
    if (activeTab === 'sedan') return car.category === 'sedan' || car.categorySecondary === 'sedan';
    return true;
  });

  const getPriceData = (car) => {
    // Pricing temporarily masked/commented as per client instruction until official rates are finalized.
    // Displaying "Tariff on Request" / "Enquire for Best Rate" badges with direct Contact & Enquire actions.
    if (planType === 'weekly') {
      return {
        price: 'Tariff on Request',
        unit: 'Weekly Package',
        effectiveText: '7-Day Package • Refundable Security Deposit',
        savingsTag: 'Weekly Deal',
        savingsColor: '#ffb907',
      };
    }
    if (planType === 'monthly') {
      return {
        price: 'Tariff on Request',
        unit: 'Monthly Subscription',
        effectiveText: 'Monthly Plan • Doorstep Delivery Available',
        savingsTag: 'Monthly Deal',
        savingsColor: '#ffb907',
      };
    }
    return {
      price: 'Tariff on Request',
      unit: 'Daily Rental',
      effectiveText: 'Refundable Security Deposit • 24/7 Support',
      savingsTag: null,
      savingsColor: null,
    };
  };

  return (
    <section id="fleet-offers" className="car-offers-section section_70" style={{ background: '#f5f6f7', padding: '72px 0' }}>
      <div className="container">
        {/* Section Heading with Target Keywords */}
        <div className="site-heading text-center" style={{ width: '100%', maxWidth: '840px', margin: '0 auto 30px' }}>
          <span className="editorial-eyebrow">
            Hyderabad Self-Drive Fleet
          </span>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 600,
              color: '#191c20',
              margin: '0 0 10px',
              display: 'block',
              width: '100%',
              lineHeight: 1.25,
            }}
          >
            Daily, Weekly &amp; Monthly Car Rentals in Hyderabad
          </h2>
          <p style={{ color: '#60656d', fontSize: '15.5px', margin: 0, lineHeight: 1.7 }}>
            Browse Hyderabad&apos;s self-drive fleet with <strong>Manual &amp; Automatic</strong> transmissions.
            Choose <strong>Daily</strong>, <strong>Weekly</strong>, or <strong>Monthly</strong> plans with a refundable security deposit and doorstep delivery.
          </p>
        </div>

        {/* 3-Way Pricing Plan Toggle: Daily | Weekly | Monthly */}
        <div className="pricing-plan-toggle-wrapper">
          <div className="pricing-plan-toggle">
            {/* Daily Button */}
            <button
              type="button"
              onClick={() => setPlanType('daily')}
              className={`plan-toggle-btn ${planType === 'daily' ? 'active' : ''}`}
            >
              <i className="fa fa-calendar-check-o" />
              <span className="plan-label-desktop">Daily Deals</span>
              <span className="plan-label-mobile">Daily</span>
            </button>

            {/* Weekly Button */}
            <button
              type="button"
              onClick={() => setPlanType('weekly')}
              className={`plan-toggle-btn ${planType === 'weekly' ? 'active' : ''}`}
            >
              <i className="fa fa-calendar" />
              <span className="plan-label-desktop">Weekly (7 Days)</span>
              <span className="plan-label-mobile">Weekly</span>
              <span className="plan-badge-weekly">
                <span className="badge-text-desktop">7-Day Deal</span>
                <span className="badge-text-mobile">7-Day</span>
              </span>
            </button>

            {/* Monthly Button */}
            <button
              type="button"
              onClick={() => setPlanType('monthly')}
              className={`plan-toggle-btn ${planType === 'monthly' ? 'active' : ''}`}
            >
              <i className="fa fa-refresh" />
              <span className="plan-label-desktop">Monthly (30 Days)</span>
              <span className="plan-label-mobile">Monthly</span>
              <span className="plan-badge-monthly">
                <span className="badge-text-desktop">Monthly Deal</span>
                <span className="badge-text-mobile">Deal</span>
              </span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '20px',
          }}
        >
          {[
            { id: 'all', label: `All Fleet (${activeFleet.length})` },
            { id: 'hatchback', label: '5-Seater Hatchbacks (4)' },
            { id: 'minisuv', label: 'Mini SUVs (3)' },
            { id: 'suv5', label: '5-Seater SUVs (7)' },
            { id: 'suv7', label: '7-Seater SUVs & MUVs (9)' },
            { id: 'sedan', label: '5-Seater Sedans (7)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#191c20' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#191c20',
                fontWeight: 600,
                fontSize: '13px',
                padding: '9px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease, background-color 0.15s ease',
                border: activeTab === tab.id ? '1px solid #191c20' : '1px solid #e3e5e8',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 35px', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search car model, Automatic, Thar, Creta, 7 Seater..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 38px',
              borderRadius: '10px',
              border: '1px solid #e3e5e8',
              background: '#ffffff',
              color: '#191c20',
              fontSize: '14px',
              outline: 'none',
            }}
          />
          <i
            className="fa fa-search"
            style={{ position: 'absolute', left: '15px', top: '14px', color: '#60656d', fontSize: '13px' }}
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '9px',
                border: '1px solid #e3e5e8',
                background: '#f5f6f7',
                color: '#191c20',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Cars Showcase Grid */}
        <div className="row g-4">
          {filteredCars.map((car) => {
            const { price, unit, effectiveText, savingsTag } = getPriceData(car);
            const planLabel = planType.toUpperCase();
            const whatsappMsg = `Hi DriveItCars, I am interested in booking the ${car.name} on ${planLabel} rental. Please share vehicle availability, best rate quotation, and doorstep delivery options.`;

            return (
              <div className="col-lg-4 col-md-6 mb-4" key={car.id}>
                <div
                  className="car-explore-card"
                  style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #e3e5e8',
                    transition: 'border-color 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  {/* Card Header & Vehicle Image */}
                  <div
                    style={{
                      position: 'relative',
                      background: '#f5f6f7',
                      height: '215px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                    }}
                  >
                    <img
                      src={car.image}
                      alt={`${car.name} daily weekly monthly car rental Hyderabad`}
                      loading="lazy"
                      style={{
                        maxHeight: '165px',
                        maxWidth: '90%',
                        width: 'auto',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />

                    {/* Top Left Badge */}
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#191c20',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.3px',
                      }}
                    >
                      {car.badge}
                    </span>

                    {/* Top Right Savings Badge */}
                    {savingsTag && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: '#ffb907',
                          color: '#191c20',
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '4px 10px',
                          borderRadius: '6px',
                        }}
                      >
                        {savingsTag}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#191c20', margin: '0 0 6px', lineHeight: 1.3 }}>
                        {car.name}
                      </h3>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            background: '#f5f6f7',
                            color: '#191c20',
                            border: '1px solid #e3e5e8',
                            fontWeight: 500,
                            padding: '2px 8px',
                            borderRadius: '6px',
                          }}
                        >
                          {car.transmission}
                        </span>
                      </div>
                    </div>

                    {/* Tariff Note */}
                    <div style={{ marginTop: '12px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#191c20',
                          }}
                        >
                          {price}
                        </span>
                        <span style={{ fontSize: '12px', color: '#60656d', fontWeight: 500 }}>({unit})</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#60656d', fontWeight: 500, marginTop: '4px' }}>
                        {effectiveText}
                      </div>
                    </div>

                    {/* Specs Pill List */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      <span style={{ background: '#f5f6f7', border: '1px solid #e3e5e8', color: '#191c20', fontSize: '12px', fontWeight: 500, padding: '4px 8px', borderRadius: '6px' }}>
                        <i className="fa fa-users" style={{ marginRight: 4, color: '#60656d' }} /> {car.seats} Seats
                      </span>
                      <span style={{ background: '#f5f6f7', border: '1px solid #e3e5e8', color: '#191c20', fontSize: '12px', fontWeight: 500, padding: '4px 8px', borderRadius: '6px' }}>
                        <i className="fa fa-tint" style={{ marginRight: 4, color: '#60656d' }} /> {car.fuel}
                      </span>
                      <span style={{ background: '#f5f6f7', border: '1px solid #e3e5e8', color: '#191c20', fontSize: '12px', fontWeight: 500, padding: '4px 8px', borderRadius: '6px' }}>
                        <i className="fa fa-road" style={{ marginRight: 4, color: '#60656d' }} /> 200 KMs/Day
                      </span>
                    </div>

                    {/* Included Features */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', flexGrow: 1 }}>
                      {car.features.map((feat, i) => (
                        <li key={i} style={{ fontSize: '12.5px', color: '#60656d', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fa fa-check" style={{ color: '#191c20', fontSize: '11px' }} />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons: Call & WhatsApp with Pre-filled Text */}
                    <div className="car-card-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                      <a
                        href="tel:+916300041186"
                        className="car-card-btn car-card-call"
                        style={{
                          background: '#191c20',
                          color: '#ffffff',
                          fontWeight: 600,
                          fontSize: '12.5px',
                          padding: '10px 6px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <i className="fa fa-phone" style={{ color: '#ffb907' }} /> Enquire Now
                      </a>
                      <a
                        href={`https://api.whatsapp.com/send?phone=+916300041186&text=${encodeURIComponent(whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="car-card-btn car-card-whatsapp"
                        style={{
                          background: '#ffffff',
                          border: '1px solid #a8c7b3',
                          color: '#17643b',
                          fontWeight: 600,
                          fontSize: '12.5px',
                          padding: '10px 6px',
                          borderRadius: '8px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <i className="fa fa-whatsapp" /> WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SEO Keyword Pills Strip for All 28 Cars */}
        <div className="seo-keyword-strip-card">
          <div style={{ marginBottom: '12px' }}>
            <span className="editorial-link-title" style={{ marginBottom: 0 }}>
              Popular Self-Drive Models in Hyderabad (Daily • Weekly • Monthly)
            </span>
          </div>
          <div className="seo-keyword-list">
            <Link href="/self-drive-car" style={{ color: '#191c20', fontWeight: 500 }}>Swift Manual Rental</Link>
            <span>•</span>
            <Link href="/self-drive-car" style={{ color: '#191c20', fontWeight: 500 }}>Swift Automatic Rental</Link>
            <span>•</span>
            <Link href="/self-drive-car" style={{ color: '#191c20', fontWeight: 500 }}>Baleno Self Drive</Link>
            <span>•</span>
            <Link href="/self-drive-car" style={{ color: '#191c20', fontWeight: 500 }}>Hyundai i20 Rental</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Suzuki Fronx Mini SUV</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Hyundai Venue Rental</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Tata Punch Rental</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Brezza Automatic &amp; Manual</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Tata Nexon Rental</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Tata Harrier Self Drive</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Kia Seltos Rental</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Hyundai Creta Self Drive</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Mahindra Thar 4x4 Rental</Link>
            <span>•</span>
            <Link href="/self-drive-suv-hyderabad" style={{ color: '#191c20', fontWeight: 500 }}>Thar Roxx 5-Door Rental</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Mahindra XUV 700 Rental</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Kia Carens 7-Seater</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Ertiga Self Drive Hyderabad</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Innova Crysta Rental</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Innova Hycross Automatic</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Toyota Fortuner 4x4</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Kia Carnival Limousine</Link>
            <span>•</span>
            <Link href="/sedan" style={{ color: '#191c20', fontWeight: 500 }}>Hyundai Verna Rental</Link>
            <span>•</span>
            <Link href="/sedan" style={{ color: '#191c20', fontWeight: 500 }}>Swift Dzire Rental</Link>
            <span>•</span>
            <Link href="/sedan" style={{ color: '#191c20', fontWeight: 500 }}>Maruti Ciaz Self Drive</Link>
            <span>•</span>
            <Link href="/sedan" style={{ color: '#191c20', fontWeight: 500 }}>Volkswagen Virtus Rental</Link>
            <span>•</span>
            <Link href="/sedan" style={{ color: '#191c20', fontWeight: 500 }}>Skoda Slavia Automatic</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Mahindra Scorpio Automatic</Link>
            <span>•</span>
            <Link href="/suv7" style={{ color: '#191c20', fontWeight: 500 }}>Suzuki XL6 6-Seater</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
