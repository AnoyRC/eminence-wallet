import ReduxProvider from '@/redux/ReduxProvider';
import './globals.css';
import localFont from 'next/font/local';
import ToastHandler from '@/components/toast/toastHandler';
import CheckLogin from '@/components/layout/Login/CheckLogin';

const myFont = localFont({ src: '../public/fonts/Satoshi-Variable.woff2' });

export const metadata = {
  title: 'Eminence Wallet',
  description: 'Image Based Social Wallet for Solana',
  icons: {
    shortcut: [{ url: '/favicon.ico', sizes: '16x16', type: 'image/ico' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <ReduxProvider>
          {children}
          <CheckLogin />
          <ToastHandler />
        </ReduxProvider>
      </body>
    </html>
  );
}
