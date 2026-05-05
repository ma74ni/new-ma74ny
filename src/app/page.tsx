import { HeroSection }     from '@/components/sections/HeroSection';
import { AboutSection }    from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { QuoterSection }   from '@/components/sections/QuoterSection';
import { ContactSection }  from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <QuoterSection />
      <ContactSection />
    </>
  );
}
