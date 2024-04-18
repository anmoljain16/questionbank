import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/Provider";

import {ReduxProvider} from "@/app/redux/provider";
import { GoogleAnalytics } from '@next/third-parties/google'
import {ViewTransitions} from "next-view-transitions";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
      <ViewTransitions>

      <html lang="en">
      <body className={inter.className}>

      <NextAuthProvider>
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </NextAuthProvider>


      </body>
      <GoogleAnalytics gaId="G-GMHXFV1HYH" />


    </html>
</ViewTransitions>
  );
}
