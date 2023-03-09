import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout, LineChart } from '@/components';
import { api } from '@/utils/api';
import { type FCWC } from '@/typings/react';
import { FullscreenSpinner } from '@/components/FullscreenSpinner';

const removeDoubleQuotes = (str: string) => str.replace(/"/g, '');

const useTrends = () => api.trends.getByKeywords
  .useQuery({}, { refetchOnWindowFocus: false });

const ChartsContainer: FCWC = ({ children }) =>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {children}
  </div>

const ChartContainer: FCWC = ({ children }) =>
  <div className="w-full mb-4">
    {children}
  </div>

const ChartHeader: FCWC = ({ children }) =>
  <h1 className='dark:text-slate-50 font-medium text-2xl'>
    {children}
  </h1>

const ChartFooter: FCWC = ({ children }) =>
  <h1 className='dark:text-slate-50 font-medium text-2xl'>
    {children}
  </h1>

const Home: NextPage = () => {
  const { data } = useTrends();

  if (!data) return <Layout>
    <FullscreenSpinner />;
  </Layout>

  return <Layout>
    <Head>
      <title>Trends</title>
    </Head>

    <ChartsContainer>
      {data.map((trend) => {
        const { keyword, meta, data: trendData } = trend;
        if (!trendData) {
          return null;
        }
        return <ChartContainer key={keyword}>
          <ChartHeader>
            {removeDoubleQuotes(keyword || '')}
          </ChartHeader>
          <LineChart data={trendData} xKey="start" yKey="tweet_count" />
          <ChartFooter>
            Total tweets count for period: {meta?.total_tweet_count}
          </ChartFooter>
        </ChartContainer>
      })}
    </ChartsContainer>
  </Layout>;
};

export default Home;
