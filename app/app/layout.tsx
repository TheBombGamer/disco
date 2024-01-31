// import "./globals.css";
import Navbar from "@app/components/Navbar";
import LeftSidebar from "@app/components/Sidenave";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      {/* <Navbar  /> */}
      <LeftSidebar />
      <section className="px-10 py-10">{children}</section>
    </main>
  );
}
