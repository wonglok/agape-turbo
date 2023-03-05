import { useEffect } from "react";
import { Hero } from "./Hero";
import { FeatureSet } from "./FeatureSet";
import { Stats } from "./Stats";
import { Quote } from "./Quote";
import { Pricing } from "./Pricing";
import { CTA } from "./CTA";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function Landing() {
  useEffect(() => {
    //
    import("flowbite").then((r) => {
      r.initAccordions();
      r.initCarousels();
      r.initCollapses();
      r.initDials();
      r.initDismisses();
      r.initDrawers();
      r.initDropdowns();
      r.initModals();
      r.initPopovers();
      r.initTabs();
      r.initTooltips();
    });
  }, []);
  //
  return (
    <>
      <div className="montserratfont">
        <Nav></Nav>
        <Hero></Hero>
        <FeatureSet></FeatureSet>
        <Stats></Stats>
        <Quote></Quote>
        <Pricing></Pricing>
        <CTA></CTA>
        <Footer></Footer>
      </div>
    </>
  );
}
