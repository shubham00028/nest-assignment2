import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { GetServerSideProps } from "next";

interface Product {
    id: number
    title: string 
    price: number
    description: string
    category: string
    image: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string }
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
    })

    if (!res.ok) {
        return { notFound: true}
    }

    const product: Product = await res.json()

    return {
        props: {
            product,
        }
    }
}

export default function ProductDetails({ product }: {product: Product}) {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <Head>
                <title>{product.title} | SSR</title>
            </Head>

            <Link href='/products' className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mb-8 transition-colors">
            &larr; Back to Products</Link>

            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 p-8 flex items-center justify-center bg-white border-b md:border-b-0 md:border-r border-slate-100">
                    <Image 
                        src={product.image}
                        width={200}
                        height={200}
                        alt={product.title}
                        className="max-h-96 object-contain"
                    />
                </div>

                <div className="md:w-1/2 p-8 flex flex-col">
                    <span className="uppercase tracking-wider text-xs font-semibold text-slate-400 mb-2">
                        {product.category}
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                            {product.title}
                    </h1>
                    <p className="text-3xl font-bold text-blue-600 mb-6">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="mt-auto">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
                        <p className="text-slate-600 leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}