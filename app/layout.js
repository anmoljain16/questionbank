import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/app/Provider";
import Footer from "@/components/Footer/Footer";
import BottomNavigation from "@/components/header/BottomNavigation";
import {ReduxProvider} from "@/app/redux/provider";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>
        <ReduxProvider>
            {children}
        </ReduxProvider>
      </NextAuthProvider>

      </body>

    </html>
  );
}
