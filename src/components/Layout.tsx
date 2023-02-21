import { type FCWC } from "@/typings/react";

export const Layout: FCWC = ({ children }) =>
  <div className='flex flex-row'>
    <main className="p-4 w-screen h-screen bg-white dark:bg-slate-600 overflow-y-scroll">
      {children}
    </main>
  </div>;
