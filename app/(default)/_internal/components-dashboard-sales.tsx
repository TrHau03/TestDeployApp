'use client';
import Link from 'next/link';
import CoinHeadMap from './component-coin-head-map';
import MiniChart from './component-mini-chart';
import RealtimeChart from './component-realtime-chart';
import TopStory from './component-top-story';

const ComponentsDashboardSales = () => {
  return (
    <>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link href="." className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="grid gap-6 pt-5 xl:grid-cols-3">
          <div className="grid xl:col-span-2">
            <div className="mb-6 grid gap-6 xl:grid-cols-3">
              <div className="panel min-h-[460px] xl:col-span-3">
                <RealtimeChart />
              </div>
            </div>
            <div className="6 grid gap-6 xl:grid-cols-4">
              <div className="panel flex flex-col xl:col-span-2">
                <MiniChart />
              </div>
              <div className="panel flex h-auto flex-col xl:col-span-2" style={{ aspectRatio: 1 }}>
                <div className="flex h-full flex-1 rounded-lg bg-white dark:bg-black">
                  <CoinHeadMap />
                </div>
              </div>
            </div>
          </div>
          <div className="panel flex h-auto xl:col-span-1">
            <TopStory />
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentsDashboardSales;
