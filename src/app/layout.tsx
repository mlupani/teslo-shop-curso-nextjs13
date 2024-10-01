import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "@/config/fonts";
import { Provider } from "@/provider/Provider";

export const metadata: Metadata = {
  title: "Teslo-Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${geistSans.variable} antialiased`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
