import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevLearn — Learn to code by seeing what it does",
    template: "%s | DevLearn",
  },
  description:
    "An element-by-element, visual approach to learning HTML, CSS, JavaScript and beyond — see exactly what each piece of code does before moving to the next.",
  openGraph: {
    title: "DevLearn — Learn to code by seeing what it does",
    description:
      "An element-by-element, visual approach to learning HTML, CSS, JavaScript and beyond.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main id="main-content" className="min-w-0 flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
