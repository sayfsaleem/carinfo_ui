'use client';

/**
 * SEO Structured Data Component
 * Adds JSON-LD structured data for better SEO
 */
export default function SEOStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CarInfo UK",
    "url": "https://carinfo.co.uk",
    "logo": "https://carinfo.co.uk/logo.png",
    "description": "Get instant DVLA-powered MOT, tax, and mileage data for free. Upgrade for a full HPI-level report — finance, write-offs, theft & more.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://twitter.com/carinfo_uk",
      "https://facebook.com/carinfo_uk"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CarInfo UK",
    "url": "https://carinfo.co.uk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://carinfo.co.uk/check/{vrm}"
      },
      "query-input": "required name=vrm"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Vehicle History Check",
    "provider": {
      "@type": "Organization",
      "name": "CarInfo UK"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Vehicle Check Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Basic Check",
            "description": "Free MOT status, tax status, and basic vehicle specifications"
          },
          "price": "0",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Silver Check",
            "description": "Full MOT history, mileage charts, and detailed vehicle data"
          },
          "price": "2.99",
          "priceCurrency": "GBP"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gold Check",
            "description": "Complete vehicle history including keeper history, valuation, and premium features"
          },
          "price": "5.99",
          "priceCurrency": "GBP"
        }
      ]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://carinfo.co.uk"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
