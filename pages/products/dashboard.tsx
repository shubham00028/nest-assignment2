import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error, isLoading } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
    { refreshInterval: 10000 },
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Head>
        <title>Dashboard | CSR with SWR</title>
      </Head>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
        {error && (
          <div className="text-red-500 font-medium text-center py-8">
            Failed to load dashboard data.
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="font-medium text-lg">Loading live data...</p>
          </div>
        )}
        {data && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-800">
                Recent Posts
              </h2>
              <span className="flex items-center text-xs font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live Updates (10s)
              </span>
            </div>

            <ul className="space-y-3">
              {data.slice(0, 10).map(
                (
                  post, // Slicing to 10 for a cleaner UI
                ) => (
                  <li
                    key={post.id}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 font-medium capitalize hover:bg-slate-100 transition-colors"
                  >
                    {post.title}
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
