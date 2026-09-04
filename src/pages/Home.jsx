import FilmGrain from '@/components/shvarts/FilmGrain';
import Nav from '@/components/shvarts/Nav';
import Hero from '@/components/shvarts/Hero';
import BrutalPsychologist from '@/components/shvarts/BrutalPsychologist';
import Amalgam from '@/components/shvarts/Amalgam';
import About from '@/components/shvarts/About';
import Projects from '@/components/shvarts/Projects';
import Reviews from '@/components/shvarts/Reviews';
import CaseForm from '@/components/shvarts/CaseForm';
import Footer from '@/components/shvarts/Footer';

export default function Home() {
  return (
    <div className="bg-void min-h-screen">
      <FilmGrain />
      <Nav />
      <main>
        <Hero />
        <BrutalPsychologist />
        <Amalgam />
        <About />
        <Projects />
        <Reviews />
        <CaseForm />
      </main>
      <Footer />
    </div>
  );
}