import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Home() {
  const mockProducts = Array.from({ length: 16 }, (_, i) => ({
    imageSrc: `https://picsum.photos/300/200?random=${i + 1}`,
    title: `Produto ${i + 1}`,
    description: `Descrição do Produto ${i + 1}`,
  }));
  const mockImages = Array.from(
    { length: 12 },
    (_, i) => `https://picsum.photos/100/100?random=${i + 1}`
  );

  return (
    <main>
      <img
        className="relative w-full"
        src="/img/banner.png"
        alt="Homepage banner"
      />
      <section>
        <Container>
          <h1 className="mx-auto text-center text-3xl sm:text-4xl font-bold my-9">
            Nossos produtos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 items-center">
            {mockProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <h1 className="mx-auto text-center text-3xl sm:text-4xl font-bold my-9">
            Nossos Clientes
          </h1>
          <div className="w-full mx-auto p-4">
            <div className="bg-[#E5E5E5] rounded-2xl p-8">
              <Carousel
                opts={{
                  align: "start",
                  dragFree: true,
                }}
              >
                <div className="px-10">
                  <CarouselPrevious className="absolute left-0 translate-x-0 " />

                  <CarouselContent className="w-full -ml-4">
                    {mockImages.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 "
                      >
                        <div className="aspect-square flex items-center justify-center">
                          <Image
                            src={image}
                            alt={`Cliente ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselNext className="absolute right-4 translate-x-0 " />
                </div>
              </Carousel>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
