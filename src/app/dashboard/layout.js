export const metadata = {
  title: 'Dashboard - Manage Your Vehicle Checks',
  description: 'Access your saved vehicles, recent checks, and manage your CarInfo UK account. Track MOT dates, view history, and upgrade your subscription.',
  keywords: ['vehicle dashboard', 'saved cars', 'MOT reminders', 'check history', 'account management'],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Dashboard - Manage Your Vehicle Checks | CarInfo UK',
    description: 'Access your saved vehicles, recent checks, and manage your CarInfo UK account.',
    url: 'https://carinfo.co.uk/dashboard',
    type: 'website',
  },
  alternates: {
    canonical: 'https://carinfo.co.uk/dashboard',
  },
};

export default function DashboardLayout({ children }) {
  return children;
}
