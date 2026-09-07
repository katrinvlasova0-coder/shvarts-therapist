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
import { useSectionAnalytics } from '@/hooks/useSectionAnalytics';

const SECTION_IDS = ['hero', 'shadow', 'cases', 'amalgam', 'about', 'projects', 'publications', 'reviews', 'case-form', 'contacts'];

export default function Home() {
  useSectionAnalytics(SECTION_IDS);

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