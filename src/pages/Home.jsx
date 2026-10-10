import { useState } from 'react'
import Hero from '../components/home/Hero.jsx'
import Splash from '../components/home/Splash.jsx'
import FeaturedExperiments from '../components/home/FeaturedExperiments.jsx'
import CapabilitySection from '../components/home/CapabilitySection.jsx'
import ApproachSection from '../components/home/ApproachSection.jsx'
import ClosingSection from '../components/home/ClosingSection.jsx'
import AboutSection from '../components/home/AboutSection.jsx'
import CTASection from '../components/home/CTASection.jsx'
import useScrollReveal from '../hooks/useScrollReveal.js'
import Seo from '../components/shared/Seo.jsx'

/*
  Home — homepage final (M6): seluruh section, urutan 100% sama
  dengan index.html asli:
  Hero → Featured → Capability → Approach → Closing → About → CTA
  useScrollReveal ngaktifin animasi data-reveal di section ini.
*/
export default function Home() {
  // Reveal nunggu Splash curtain buka (revisi: splash → hero masuk)
  const [ready, setReady] = useState(false)
  useScrollReveal(ready)

  return (
    <main>
      <Seo
        title="Robby Aliasa Akbar — Applied AI Systems Builder"
        description="Applied AI systems builder. Local LLMs, automation workflows, and practical tools that actually work in real business operations."
        image="/images/Profile.webp"
        path="/"
        type="website"
      />
      <Splash onDone={() => setReady(true)} />
      <Hero />
      <FeaturedExperiments />
      <CapabilitySection />
      <ApproachSection />
      <ClosingSection />
      <AboutSection />
      <CTASection />
    </main>
  )
}
