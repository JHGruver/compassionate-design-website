import { Hero } from "@/components/organisms/Hero";
import { ServicesShowcase } from "@/components/organisms/ServicesShowcase";
import { About } from "@/components/organisms/About";
import { Contact } from "@/components/organisms/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesShowcase />
      <About />
      <Contact />
    </>
  );
}
