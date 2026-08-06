import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Make It — SANKALP Steel Furniture",
  description: "See the ten-step SANKALP steel furniture process, from raw sheet metal and fabrication to painting and the final product.",
};

export default function InfrastructureLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
