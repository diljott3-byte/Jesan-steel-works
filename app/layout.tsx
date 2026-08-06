import type { Metadata } from "next";
import "./globals.css";
import ContactDock from "./components/ContactDock";

export const metadata: Metadata = {
  title: "SANKALP Steel Furniture — Style Meets Strength",
  description: "Modern steel almirahs, cabinets and lockers by SANKALP, a product of Jesan Steel Works in Hoshiarpur.",
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ContactDock />
      </body>
    </html>
  );
}
