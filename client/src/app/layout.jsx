import {
  Righteous,
  Poppins,
  Roboto,
  Boldonse,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const righteous = Righteous({
  variable: '--font-righteous',
  subsets: ['latin'],
  weight: ['400'],
});

const boldonse = Boldonse({
  variable: '--font-boldonse',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'LifeLessons',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${roboto.variable} ${righteous.variable} ${boldonse.variable}`}
    >
      <body className="min-h-full flex flex-col font-poppins">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
