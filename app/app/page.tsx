
import { HeroSection } from '@/components/hero-section'
import { FindTalentSection } from '@/components/find-talent-section'
import { ServicesSection } from '@/components/services-section'
import { WhyChooseUsSection } from '@/components/why-choose-us-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { ContactSection } from '@/components/contact-section'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FindTalentSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  )
}
