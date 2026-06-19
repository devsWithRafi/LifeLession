import {
  Righteous,
  Poppins,
  Roboto,
  Boldonse,
  Playfair_Display,
} from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from 'sonner';

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

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
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
      className={`${poppins.variable} ${roboto.variable} ${righteous.variable} ${boldonse.variable} ${playfair.variable}`}
    >
      <body className="min-h-full flex flex-col font-poppins">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position='top-center'/>
        </ThemeProvider>
      </body>
    </html>
  );
}
