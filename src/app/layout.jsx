import './globals.css'
import './site-theme.css'
import SiteLayoutWrapper from '@/components/SiteLayoutWrapper'

export const metadata = {
  metadataBase: new URL('https://www.driveitcars.in'),
  title: 'Self Drive Car Rentals in Hyderabad | DriveItCars',
  description: 'Rent self drive cars in Hyderabad from ₹1,499/day with refundable deposit & unlimited KMs. Hatchback, sedan, SUV & luxury car rentals. Call +91 63000 41186.',
  verification: {
    google: 'cZGlAnJhowYYzapWgJZ_osSl1--cKmvsgDtKjePxuh0',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.webp" />
        <link rel="stylesheet" href="/assets/css/bootstrap.css" />
        <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body>
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
      </body>
    </html>
  )
}
