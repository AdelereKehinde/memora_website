// app/page.tsx
import { Navigation } from '@/components/Navigation'
import { ThreeScene } from '@/components/ThreeScene'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { ShowcaseSection } from '@/components/ShowCaseSection'
import { CollaborationSection } from '@/components/CollaborationSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CTASection } from '@/components/CTASection'
import { DownloadSection } from '@/components/DownloadSection'
import { WaitlistSection } from '@/components/WaitlistSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ThreeScene />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <CollaborationSection />
      <ShowcaseSection />
      <TestimonialsSection />
      <CTASection />
      <WaitlistSection />
      <ContactSection />
      <Footer />
    </main>
  )
}