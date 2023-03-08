import { Input, Layout } from "@/components"
import Head from "next/head"
import { useState } from "react"

const Search = () => {
  const [search, setSearch] = useState('')

  return <Layout>
    <Head>
      <title>Search</title>
    </Head>
    <div className="flex justify-center">
      <div className="w-1/2">
        <Input value={search} onChange={({ currentTarget: { value } }) => setSearch(value)} />
      </div>
    </div>
  </Layout>
}

export default Search;
