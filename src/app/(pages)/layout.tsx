import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import Banner from "@/app/components/banner/Banner";
import "../styles.scss";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Labs Develop",
  description: "Labs Develop",
};

function LayoutBody({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <LayoutBody>{children}</LayoutBody>
      </body>
    </html> 
  );
}

export { LayoutBody }; 