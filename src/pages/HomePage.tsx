import { HeroSection } from '../components/HeroSection'
import { OriginStory } from '../components/OriginStory'
import { OurBrandsSection } from '../components/OurBrandsSection'
import { FarmSection } from '../components/FarmSection'
import { LocationsSection } from '../components/LocationsSection'
import { GallerySection } from '../components/GallerySection'
import { TestimonialsPressSection } from '../components/TestimonialsPressSection'
import { SiteFooter } from '../components/SiteFooter'

export function HomePage() {
  return (
    <main className="min-h-screen bg-paper text-charcoal">
      <HeroSection />
      <OriginStory />
      <OurBrandsSection />
      <FarmSection />
      <LocationsSection />
      <GallerySection />
      <TestimonialsPressSection />
      <SiteFooter />
    </main>
  )
}
