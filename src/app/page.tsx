import ScrollSections from "@/components/ScrollSections";
import Philosophy from "@/components/Philosophy";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import BackToTop from "@/components/BackToTop";
import Awards from "@/components/Awards";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <ScrollSections />
      <Philosophy />
      <Awards />
      <Booking />
      <Testimonials />
      <BackToTop />
    </div>
  );
}
