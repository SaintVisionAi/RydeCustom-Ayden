import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BikeBuilder from "@/components/BikeBuilder";

export default function BikeBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full bg-background">
        <div className="container-section py-4">
          <BikeBuilder />
        </div>
      </main>

      <Footer />
    </div>
  );
}
