import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PageTracker from "@/components/PageTracker";

export default function Home() {
  return (
    <>
      <PageTracker path="/" />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Capabilities />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
