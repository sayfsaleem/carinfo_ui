import { APP_NAME, DEFAULT_META } from './constants';

/**
 * Generate page metadata for SEO
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = '/'
}) {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const url = `${DEFAULT_META.siteUrl}${path}`;

  return {
    title: fullTitle,
    description: description || DEFAULT_META.defaultDescription,
    keywords: [
      'MOT check',
      'vehicle check',
      'car history',
      'UK vehicle',
      'DVLA',
      'DVSA',
      ...keywords
    ],
    authors: [{ name: APP_NAME }],
    creator: APP_NAME,
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: url,
      siteName: APP_NAME,
      title: fullTitle,
      description: description || DEFAULT_META.defaultDescription,
      images: [DEFAULT_META.defaultImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || DEFAULT_META.defaultDescription,
      creator: DEFAULT_META.twitterHandle,
      images: [DEFAULT_META.defaultImage]
    },
    alternates: {
      canonical: url
    }
  };
}
