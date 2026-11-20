'use client';

import { useState } from 'react';

const FLEET_TABS = [
  {
    id: 'hatchback',
    label: 'Hatchback',
    cars: [
      {
        name: 'Suzuki Baleno',
        img: '/assets/img/cars/Baleno.webp',
        alt: 'Hyderabad car rental without driver',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Baleno.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai i20',
        img: '/assets/img/cars/i20.webp',
        alt: 'Self drive car service Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20i20.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Suzuki Fronx',
        img: '/assets/img/cars/Fronx.webp',
        alt: 'Self drive cars Hyderabad airport',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Fronx.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Tata Altroz',
        img: '/assets/img/cars/Altroz.webp',
        alt: 'Self drive rental cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹10/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Tata%20Altroz.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Volkswagen Polo',
        img: '/assets/img/cars/polo.webp',
        alt: 'Self drive SUV rental Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Volkswagen%20Polo.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai i10 Asta',
        img: '/assets/img/cars/asta.webp',
        alt: 'Self drive cars Hyderabad airport',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20i10%20Asta.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Tata Punch',
        img: '/assets/img/cars/Tata-Punch.webp',
        alt: 'Hyderabad self drive vehicle hire',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Tata%20Punch.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Suzuki Swift',
        img: '/assets/img/suzuki.webp',
        alt: 'Self drive cars Near me',
        km: '300 km/day',
        extraKm: 'Extra ₹9/km',
        extraHr: 'Extra ₹300/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Swift.%20Please%20share%20availability%20and%20rates.',
      },
    ],
  },
  {
    id: 'sedan',
    label: 'Sedan',
    cars: [
      {
        name: 'Suzuki Dzire',
        img: '/assets/img/cars/seden-dzire.webp',
        alt: 'Self drive SUV rental Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹10/km',
        extraHr: 'Extra ₹400/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Dzire.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai Aura',
        img: '/assets/img/cars/seden-AURA.webp',
        alt: 'Cheap self drive cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹10/km',
        extraHr: 'Extra ₹400/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20Aura.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Honda City',
        img: '/assets/img/cars/seden-City.webp',
        alt: 'Self drive cars Hyderabad airport',
        km: '300 km/day',
        extraKm: 'Extra ₹10/km',
        extraHr: 'Extra ₹400/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Honda%20City.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai Verna',
        img: '/assets/img/cars/seden-Verna.webp',
        alt: 'Self drive rental cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹10/km',
        extraHr: 'Extra ₹400/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20Verna.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Suzuki Ciaz',
        img: '/assets/img/cars/seden-Ciaz.webp',
        alt: 'Affordable self drive cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹10/km',
        extraHr: 'Extra ₹400/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Ciaz.%20Please%20share%20availability%20and%20rates.',
      },
    ],
  },
  {
    id: 'suv5',
    label: 'SUV 5-Seaters',
    cars: [
      {
        name: 'Suzuki Brezza',
        img: '/assets/img/cars/5-Brezza.webp',
        alt: '24/7 self drive car rental Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Brezza.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Mahindra Thar',
        img: '/assets/img/cars/5-Thar.webp',
        alt: 'Premium self drive cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Mahindra%20Thar.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai Creta',
        img: '/assets/img/2023-6.webp',
        alt: 'Hourly self drive car rental Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20Creta.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Kia Seltos',
        img: '/assets/img/cars/5-Seltos.webp',
        alt: 'Weekend self drive cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Kia%20Seltos.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai Venue',
        img: '/assets/img/cars/5-Venue.webp',
        alt: 'Daily self drive car rental Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20Venue.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Tata Harrier',
        img: '/assets/img/cars/5-Harrier.webp',
        alt: 'Long-term self drive car rentals Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Tata%20Harrier.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Kia Sonet',
        img: '/assets/img/2023-4.webp',
        alt: 'Cheap self drive SUVs in Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Kia%20Sonet.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Hyundai Exter',
        img: '/assets/img/cars/5-Exter.webp',
        alt: 'Corporate self drive car rentals Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Hyundai%20Exter.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Tata Nexon',
        img: '/assets/img/cars/5-NEXON.webp',
        alt: 'Affordable self drive cars Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹11/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Tata%20Nexon.%20Please%20share%20availability%20and%20rates.',
      },
    ],
  },
  {
    id: 'suv7',
    label: 'SUV 7-Seaters',
    cars: [
      {
        name: 'Mahindra XUV700',
        img: '/assets/img/cars/7-XUV700.webp',
        alt: 'Self drive car booking Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹13/km',
        extraHr: 'Extra ₹650/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Mahindra%20XUV700.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Innova Crysta',
        img: '/assets/img/cars/7-Innova%20Crysta.webp',
        alt: 'Hourly self drive car rental Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹13/km',
        extraHr: 'Extra ₹650/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Innova%20Crysta.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Jeep Compass',
        img: '/assets/img/cars/7-Compass.webp',
        alt: 'Hyderabad self drive cars with unlimited kilometers',
        km: '300 km/day',
        extraKm: 'Extra ₹13/km',
        extraHr: 'Extra ₹650/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Jeep%20Compass.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Ford Endeavour',
        img: '/assets/img/cars/7-FordEndeavour.webp',
        alt: 'Self drive hatchbacks Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹14/km',
        extraHr: 'Extra ₹800/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Ford%20Endeavour.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Kia Carnival',
        img: '/assets/img/cars/7-KiaCarnival.webp',
        alt: 'Luxury self drive SUVs Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹15/km',
        extraHr: 'Extra ₹900/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Kia%20Carnival.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Toyota Fortuner',
        img: '/assets/img/cars/7-Fortuner.webp',
        alt: 'Corporate self drive car rentals Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹15/km',
        extraHr: 'Extra ₹900/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Toyota%20Fortuner.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Grand Vitara',
        img: '/assets/img/cars/7-Grand%20Vitara.webp',
        alt: 'Long-term self drive car rentals Hyderabad',
        km: '300 km/day',
        extraKm: 'Extra ₹13/km',
        extraHr: 'Extra ₹650/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Grand%20Vitara.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Kia Carens',
        img: '/assets/img/cars/7-Kia%20Carens.webp',
        alt: 'Self drive 7 Seaters Cars',
        km: '300 km/day',
        extraKm: 'Extra ₹13/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Kia%20Carens.%20Please%20share%20availability%20and%20rates.',
      },
      {
        name: 'Suzuki Ertiga',
        img: '/assets/img/cars/7-Ertiga.webp',
        alt: 'Hyderabad self drive car rates',
        km: '300 km/day',
        extraKm: 'Extra ₹12/km',
        extraHr: 'Extra ₹500/hr',
        whatsappText:
          'Hi%20DriveItCars%2C%20I%20am%20contacting%20you%20to%20enquire%20about%20booking%20the%20Suzuki%20Ertiga.%20Please%20share%20availability%20and%20rates.',
      },
    ],
  },
];

export default function SelfDriveFleetTabs() {
  const [activeTab, setActiveTab] = useState('hatchback');

  return (
    <div className="offer-tabs">
      <ul className="nav nav-tabs" id="offerTab" role="tablist">
        {FLEET_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <li className="nav-item" key={tab.id}>
              <button
                type="button"
                className={`nav-link${isActive ? ' active' : ''}`}
                id={`${tab.id}-tab`}
                role="tab"
                aria-controls={tab.id}
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="tab-content" id="offerTabContent">
        {FLEET_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <div
              key={tab.id}
              className={`tab-pane fade${isActive ? ' show active' : ''}`}
              id={tab.id}
              role="tabpanel"
              aria-labelledby={`${tab.id}-tab`}
              hidden={!isActive}
            >
              <div className="row">
                {tab.cars.map((car) => (
                  <div className="col-lg-4" key={car.name}>
                    <div className="single-offers">
                      <div className="offer-image">
                        <img loading="lazy" src={car.img} alt={car.alt} />
                      </div>
                      <div className="offer-text">
                        <h3>{car.name}</h3>
                        <ul>
                          <li>
                            <i className="fa fa-road"></i>
                            {car.km}
                          </li>
                          <li>
                            <i className="fa fa-tachometer"></i>
                            {car.extraKm}
                          </li>
                          <li>
                            <i className="fa fa-clock-o"></i>
                            {car.extraHr}
                          </li>
                        </ul>
                        <div className="offer-action">
                          <a href="tel:+916300041186" className="offer-btn-1">
                            <i className="fa fa-phone"></i> Enquire Now
                          </a>
                          <a
                            href={`https://api.whatsapp.com/send?phone=+916300041186&text=${car.whatsappText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="offer-btn-2"
                          >
                            <i className="fa fa-whatsapp"></i> WhatsApp Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
