/*
  Public landing page rendering all sections as placeholders with anchors.
  Sections: Hero, News, Hours, Params, School, Pricing, Directions, Contacts, Gallery, Footer
*/

import TopNav from '@/components/navigation/TopNav';

export const revalidate = 300;
import Hero from '@/components/sections/Hero';
import News from '@/components/sections/News';
import Hours from '@/components/sections/Hours';
import Params from '@/components/sections/Params';
import School from '@/components/sections/School';
import Pricing from '@/components/sections/Pricing';
import Directions from '@/components/sections/Directions';
import Contacts from '@/components/sections/Contacts';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/sections/Footer';
import FloatingWebcam from '@/components/FloatingWebcam';

export default function PublicPage() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <News />
        <FloatingWebcam />
        <Hours />
        <Params />
        <School />
        <Pricing />
        <Directions />
        <Contacts />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}


