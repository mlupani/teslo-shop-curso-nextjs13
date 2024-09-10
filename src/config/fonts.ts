import localFont from "next/font/local";
import { Montserrat_Alternates } from 'next/font/google';

// fonts desde goole
export const titleFont = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["400", "700"],
});

// local fonts
export const geistSans = localFont({
    src: "../app/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});