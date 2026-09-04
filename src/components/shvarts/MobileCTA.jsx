export default function MobileCTA() {
  const scrollTo = () => document.getElementById('case-form')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <button
      onClick={scrollTo}
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bone text-void py-4 text-xs uppercase tracking-[0.25em] font-bold"
    >
      Записаться
    </button>
  );
}