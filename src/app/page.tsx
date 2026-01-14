import { Hero } from "@/components/organisms/Hero";
import { IPGallery } from "@/components/organisms/IPGallery";
import { ServicesShowcase } from "@/components/organisms/ServicesShowcase";
import { About } from "@/components/organisms/About";
import { Contact } from "@/components/organisms/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <IPGallery />
      <ServicesShowcase />
      <About />
      <Contact />
    </>
  );
}
