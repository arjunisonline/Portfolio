import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import ViewResume from "./utils/resume/ViewResume";

import GameLibraryPage from "./pages/GameLibraryPage/GameLibraryPage";
import HomeServerPage from "./pages/HomeServerPage/HomeServerPage";

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <ReactLenis 
      root 
      options={{ 
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      <GsapLenisSync />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ViewResume />} />
          <Route path="/games" element={<GameLibraryPage />} />
          <Route path="/home-server" element={<HomeServerPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ReactLenis>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, hash, lenis]);

  return null;
}

function GsapLenisSync() {
  useLenis(ScrollTrigger.update);
  useEffect(() => {
    gsap.ticker.add(() => {
      ScrollTrigger.update();
    });
    return () => gsap.ticker.remove(ScrollTrigger.update);
  }, []);
  return null;
}

export default App;
