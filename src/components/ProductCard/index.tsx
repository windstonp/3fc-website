import Image from "next/image";

interface IProductCardProps {
  readonly imageSrc: string;
  readonly title: string;
  readonly description: string;
}

export function ProductCard({
  description,
  imageSrc,
  title,
}: IProductCardProps) {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-4 text-center ">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={200}
          className="w-full object-cover"
        />
      </div>
      <h2 className="text-lg font-bold mt-4">{title}</h2>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
}
