import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

interface Products {
  id: number;
  title: string;
  price: number;
  image: string;
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Products[] = await res.json();

  return {
    props: {
      products,
    },
  };
}

export default function Products({ products }: { products: Products[] }) {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <Head>
        <title>Products | SSG</title>
      </Head>

      <h1 className="text-4xl font-bold mb-8 text-slate-900 text-center">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 w-full mb-4 flex items-center justify-center bg-white">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="mt-auto flex flex-col grow">
                <h2 className="text-sm font-medium text-slate-800 line-clamp-2 mb-2">
                  {product.title}
                </h2>
                <p className="text-lg font-bold text-blue-600 mt-auto">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
