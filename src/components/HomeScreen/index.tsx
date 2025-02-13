"use client";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/firebase";
import { IClientDTO, ICompanyDTO, IProductDTO } from "@/validators";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
export function HomeScreen() {
  async function fetchProducts(): Promise<IProductDTO["products"]> {
    const productsCollectionRef = collection(db, "products");
    const collectionSnapProducts = await getDocs(productsCollectionRef);
    return collectionSnapProducts.docs.map((docSnap) => ({
      firebaseId: docSnap.id,
      name: docSnap.data().name || "Produto sem nome",
      image: docSnap.data().image || "/placeholder.jpg",
      description: docSnap.data().description || "Sem descrição",
    }));
  }

  async function fetchClients(): Promise<IClientDTO["clients"]> {
    const clientsCollectionRef = collection(db, "clients");
    const collectionSnapClients = await getDocs(clientsCollectionRef);
    return collectionSnapClients.docs.map((docSnap) => ({
      firebaseId: docSnap.id,
      clientName: docSnap.data().clientName || "Cliente sem nome",
      clientImage: docSnap.data().clientImage || "/placeholder.jpg",
    }));
  }

  async function fetchCompanyData(): Promise<ICompanyDTO> {
    const companyDocRef = doc(db, "company", "company-data");
    const docSnapCompany = await getDoc(companyDocRef);
    return docSnapCompany.exists()
      ? (docSnapCompany.data() as ICompanyDTO)
      : ({} as ICompanyDTO);
  }

  const {
    data: company,
    isLoading: isLoadingCompany,
    isPending,
  } = useQuery({
    queryKey: ["company"],
    queryFn: fetchCompanyData,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: products,
    isLoading: isLoadingProducts,
    isPending: isPendingProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: clients,
    isLoading: isLoadingClients,
    isPending: isPendingClients,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return (
    <main id="Home">
      {isLoadingCompany || isPending ? (
        <div className="w-full h-[800] bg-gray-200 animate-pulse rounded-md"></div>
      ) : (
        <Image
          className="relative w-full"
          src={company?.banner ?? "#"}
          width={2000}
          height={1000}
          alt="Homepage banner"
        />
      )}
      <section id="services">
        <Container>
          <h1 className="mx-auto text-center text-3xl sm:text-4xl font-bold my-9">
            Nossos produtos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {isLoadingProducts || isPendingProducts
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-full h-[370] bg-gray-200 animate-pulse rounded-md"
                  />
                ))
              : products?.map((product) => (
                  <ProductCard
                    key={product.firebaseId}
                    title={product.name}
                    description={product.description}
                    imageSrc={product.image}
                  />
                ))}
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <h1 className="mx-auto text-center text-3xl sm:text-4xl font-bold my-8">
            Nossos Clientes
          </h1>
          <div className="w-full">
            <div className="bg-[#E5E5E5] rounded-2xl p-8">
              {isLoadingClients || isPendingClients ? (
                <div className="flex h-[300] justify-center items-center">
                  <div className="w-32 h-32 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              ) : (
                <Carousel opts={{ align: "start", dragFree: true }}>
                  <div className="px-10">
                    <CarouselPrevious className="absolute left-0 translate-x-0" />
                    <CarouselContent className="w-full -ml-4">
                      {clients?.map((client, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                        >
                          <div className="aspect-square flex items-center justify-center">
                            <Image
                              src={client.clientImage}
                              alt={client.clientName}
                              width={300}
                              height={300}
                              className="w-full h-auto rounded-lg object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselNext className="absolute right-4 translate-x-0" />
                  </div>
                </Carousel>
              )}
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container styles="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
          <div className="w-full md:w-1/3">
            <Image
              src="/img/sobre.png"
              alt="Sobre Nós"
              width={400}
              height={400}
              className="rounded-lg w-full"
            />
          </div>
          <article className="w-full md:w-2/3 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre Nós</h2>
            <p className="mb-4 text-md leading-relaxed">
              Fundada em 29 de maio de 2019, na cidade de Içara, Santa Catarina,
              a Gráfica 3FC nasceu do espírito empreendedor de Fernando Furlan
              Felisberto e Camila Biava Rocha. Desde o início, a empresa foi
              guiada por um propósito claro: unir o profundo conhecimento
              técnico sobre produtos e processos à criatividade no design, para
              oferecer soluções de alta qualidade em rótulos e etiquetas
              personalizadas. Nosso compromisso vai além da simples produção de
              materiais gráficos; buscamos transformar ideias em realidade,
              ajudando marcas a se destacarem no mercado.
            </p>

            <p className="mb-4 text-md leading-relaxed">
              Com uma abordagem centrada na satisfação do cliente, a Gráfica 3FC
              tem se destacado por entender as necessidades de cada parceiro e
              entregar produtos que agregam valor às marcas e ao mercado. A
              atenção aos detalhes, o compromisso com a excelência e o constante
              investimento em tecnologia garantem que cada projeto seja
              realizado com precisão e inovação. Valorizamos a proximidade com
              nossos clientes, ouvindo suas demandas e desenvolvendo soluções
              sob medida para atender às expectativas mais exigentes.
            </p>

            <p className="mb-4 text-md leading-relaxed">
              Acreditamos que rótulos e etiquetas vão muito além de simples
              componentes gráficos; eles são ferramentas estratégicas que
              comunicam a identidade de um produto e influenciam a decisão de
              compra do consumidor. Por isso, cada item produzido pela 3FC é
              pensado para refletir o melhor de cada marca, combinando materiais
              de alta qualidade, acabamentos diferenciados e designs
              impactantes. Nossa equipe de especialistas está sempre atualizada
              com as principais tendências do setor, garantindo que cada projeto
              seja único e memorável.
            </p>

            <p className="text-md leading-relaxed">
              Nosso crescimento é impulsionado por um compromisso contínuo com a
              inovação e a sustentabilidade. Buscamos constantemente novas
              tecnologias e práticas ecológicas para minimizar o impacto
              ambiental de nossa produção, adotando processos mais eficientes e
              responsáveis. Com isso, não apenas entregamos produtos de
              excelência, mas também contribuímos para um futuro mais
              sustentável no setor gráfico.
            </p>
          </article>
        </Container>
      </section>
    </main>
  );
}
