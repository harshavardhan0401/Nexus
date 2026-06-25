import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';
import CustomCursorLoader from '@/components/ui/CustomCursorLoader';
import { FirebaseClientProvider } from '@/firebase';
import { Inter, Orbitron, Audiowide } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-audiowide',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Shoe Room // Future Footwear',
  description: 'Advanced propulsion systems for the urban explorer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${audiowide.variable}`}>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <CartProvider>
            <CustomCursorLoader />
            {children}
            <Toaster />
          </CartProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
