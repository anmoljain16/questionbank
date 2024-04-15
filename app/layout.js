import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/Provider";

import {ReduxProvider} from "@/app/redux/provider";
import { GoogleAnalytics } from '@next/third-parties/google'


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <GoogleAnalytics gaId="G-GMHXFV1HYH" />

      <NextAuthProvider>
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </NextAuthProvider>

      </body>

    </html>
  );
}
