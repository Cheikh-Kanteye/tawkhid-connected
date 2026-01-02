import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedContents } from '@/components/home/FeaturedContents';
import { AssociationsSection } from '@/components/home/AssociationsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedContents />
        <AssociationsSection />
        <EventsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
