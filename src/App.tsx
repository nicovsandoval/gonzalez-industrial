import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Products } from "./components/sections/Products";
import { Process } from "./components/sections/Process";
import { Gallery } from "./components/sections/Gallery";
import { About } from "./components/sections/About";
import { CtaBanner } from "./components/sections/CtaBanner";
import { Contact } from "./components/sections/Contact";
import { WhatsAppFloat } from "./components/ui/WhatsAppFloat";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#15401A] focus:text-white focus:rounded-lg"
      >
        Ir al contenido principal
      </a>

      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onMobileMenuChange={setMobileMenuOpen}
      />

      <main>
        <Hero />
        <Services />
        <Products />
        <Process />
        <Gallery />
        <About />
        <CtaBanner />
        <Contact />
      </main>

      <Footer />
      {!mobileMenuOpen && <WhatsAppFloat />}
    </>
  );
}
