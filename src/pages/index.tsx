import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, LineChart } from '@/components';
import { api } from '@/utils/api';
import { type FCWC } from '@/typings/react';
import { FullscreenSpinner } from '@/components/FullscreenSpinner';

const removeDoubleQuotes = (str: string) => str.replace(/"/g, '');

const useTrends = () => api.trends.getByKeywords
  .useQuery({}, { refetchOnWindowFocus: false });

const ChartContainer: FCWC = ({ children }) =>
  <div className="w-full mb-4">
    {children}
  </div>

const Home: NextPage = () => {
  const { data } = useTrends();

  if (!data) return <FullscreenSpinner/>;

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
