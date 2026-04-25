import './globals.css';

export const metadata = {
  title: 'Restaurant Manager',
  description: 'QR-based restaurant management platform'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
