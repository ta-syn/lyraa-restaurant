import "./globals.css";
import { RESTAURANT } from "../lib/data";

export const metadata = {
  title: {
    template: "%s | Lyraa Fine Dining",
    default: "Lyraa | Fine Dining Restaurant — Reserve Your Table Today"
  },
  description: "Lyraa offers world-class fine dining with premium seasonal ingredients, an award-winning wine cellar, and unforgettable ambiance. Reserve your table today.",
  keywords: [
    "fine dining restaurant", "luxury restaurant",
    "Lyraa restaurant", "restaurant reservation",
    "chef tasting menu", "best restaurant Dhaka",
    "fine dining experience", "award winning restaurant",
    "private dining", "restaurant near me",
    "romantic dinner", "special occasion restaurant",
    "Michelin recommended", "wine pairing dinner",
    "gourmet restaurant"
  ],
};

export const viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-cream font-body antialiased">
        {children}
      </body>
    </html>
  );
}
