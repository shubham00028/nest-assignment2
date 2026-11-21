import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const [apiMessage, setApiMessage] = useState<string>("Loading Message...");

  useEffect(() => {
    fetch(`/api/hello`)
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage("Failed to Load API message."));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <Head>
        <title>Assignment 2 | Home</title>
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-8 text-slate-900">
          Assignment 2: Data Fetching
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Message from /api/hello:
          </h2>
          <p className="text-blue-700 font-mono text-lg">{apiMessage}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 text-center font-medium transition-colors shadow-sm"
          >
            View Products (SSG)
          </Link>
          <Link
            href="products/dashboard"
            className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 text-center font-medium transition-colors shadow-sm"
          >
            View Dashboard (CSR)
          </Link>
        </div>
      </main>
    </div>
  );
}
