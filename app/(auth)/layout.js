// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@app/components/Navbar";
import Provider from "@app/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Disco",
  description: "E-Learning App",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className={`text-white lg:px-20 px-10 background min-h-screen   ${inter.className}`}
      >
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}