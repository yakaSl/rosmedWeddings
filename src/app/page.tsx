import { Header } from '@/components/lensbloom/Header';
import { HeroSection } from '@/components/lensbloom/HeroSection';
import { StorySection } from '@/components/lensbloom/StorySection';
import { PortfolioSection } from '@/components/lensbloom/PortfolioSection';
import { PackagesSection } from '@/components/lensbloom/PackagesSection';
import { AiStyleFinder } from '@/components/lensbloom/AiStyleFinder';
import { ContactSection } from '@/components/lensbloom/ContactSection';
import { Footer } from '@/components/lensbloom/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StorySection />
        <PortfolioSection />
        <PackagesSection />
        <AiStyleFinder />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
