import { Input, Layout, LineChart } from "@/components"
import { api } from "@/utils/api";
import Head from "next/head"
import { useEffect, useState } from "react"

const useSearch = (search: string) => api.trends
  .search.useQuery({ query: search }, { refetchOnWindowFocus: false });

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('debounce', value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Search = () => {
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 500)
  const { data } = useSearch(debouncedSearch)

  return <Layout>
    <Head>
      <title>Search</title>
    </Head>
    <div className="flex flex-col items-center">
      <div className="w-1/2 mb-10">
        <Input value={search} onChange={({ currentTarget: { value } }) => setSearch(value)} />
      </div>
      {data && <LineChart data={data.data} xKey="start" yKey="tweet_count" />}
    </div>
  </Layout>
}

export default Search;
