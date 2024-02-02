import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import LeftSidebar from "@app/components/Sidenave";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineering Learning Hub",
  description: "Engineering learning hub, your gateway to a world of innovation and discovery in the realm of Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`text-white  background h-screen   border-blue-700 ${inter.className}`}>
        <main className="flex ">
          <LeftSidebar />
          <section className="px-10 py-10">{children}</section>
        </main>
      </body>
    </html>
  );
}
