export const metadata = {
  title: 'Blog - Car Buying Tips, MOT Advice & Vehicle News',
  description: 'Read expert advice on buying used cars, understanding MOT tests, vehicle maintenance tips, and the latest UK automotive news. Free guides from CarInfo UK.',
  keywords: ['car buying tips', 'MOT advice', 'vehicle maintenance', 'used car guide', 'UK automotive news', 'car history tips'],
  openGraph: {
    title: 'Blog - Car Buying Tips, MOT Advice & Vehicle News | CarInfo UK',
    description: 'Read expert advice on buying used cars, understanding MOT tests, vehicle maintenance tips, and the latest UK automotive news.',
    url: 'https://carinfo.co.uk/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Car Buying Tips, MOT Advice & Vehicle News | CarInfo UK',
    description: 'Read expert advice on buying used cars, understanding MOT tests, vehicle maintenance tips, and the latest UK automotive news.',
  },
  alternates: {
    canonical: 'https://carinfo.co.uk/blog',
  },
};

export default function BlogLayout({ children }) {
  return children;
}
