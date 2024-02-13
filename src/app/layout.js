import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Attendance Assistant",
  description: "Attendance tracking and analytics app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="@sweetalert2/theme-dark/dark.css"></link>

      <script src="sweetalert2/dist/sweetalert2.min.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
