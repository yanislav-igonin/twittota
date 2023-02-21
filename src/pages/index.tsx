import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, LineChart, Spinner } from '@/components';
import { api } from '@/utils/api';
import { type FCWC } from '@/typings/react';

const removeDoubleQuotes = (str: string) => str.replace(/"/g, '');

const useTrends = () => api.trends.getByKeywords
  .useQuery({}, { refetchOnWindowFocus: false });

const ChartContainer: FCWC = ({ children }) =>
  <div className="w-full mb-4">
    {children}
  </div>

const Home: NextPage = () => {
  const { data } = useTrends();

  if (!data) return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Spinner width={40} height={40} />
    </div>
  )

  return <Layout>
    <Head>
      <title>Trends</title>
    </Head>

    {data.map((trend) => {
      const { keyword, meta, data: trendData } = trend;
      if (!trendData) {
        return null;
      }
      return <ChartContainer key={keyword}>
        <h1 className='dark:text-slate-50 font-medium text-2xl'>
          {removeDoubleQuotes(keyword || '')}
        </h1>
        <LineChart data={trendData} xKey="start" yKey="tweet_count" />
        <h1 className='dark:text-slate-50 font-medium text-2xl'>
          Total tweets count for period: {meta?.total_tweet_count}
        </h1>
      </ChartContainer>
    })}
  </Layout>;
};

export default Home;
