import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Attendance Helper",
  description: "Attendance tracking and analytics app",
};

export default function RootLayout({ children }) {
  return (
    // <MantineProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    // </MantineProvider>
  );
}
