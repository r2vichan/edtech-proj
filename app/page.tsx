import Navbar from '@/components/Navbar';
import CarouselBanner from '@/components/CarouselBanner';
import CoursesGrid from '@/components/CoursesGrid';
import Footer from '@/components/Footer';

/**
 * Home Page Component
 * This is the main page of your application
 * It assembles all the components in order:
 * 1. Navbar (top navigation)
 * 2. Carousel Banner (hero section)
 * 3. Courses Grid (main content)
 * 4. Footer (bottom section)
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <CarouselBanner />
      <CoursesGrid />
      <Footer />
    </main>
  );
}
