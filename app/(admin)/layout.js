// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminSideNav from "@app/components/AdminSideNav";
import AdminMobileNav from "@app/components/AdminMobileNav";
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
      <body className={`text-white  background min-h-screen w-full   border-blue-700 ${inter.className}`}>
        <Provider >

        <main className="flex ">
         <AdminSideNav />
          <AdminMobileNav />
          <section className="px-10 py-10 w-full">{children}</section>
        </main>
        </Provider>
      </body>
    </html>
  );
}
