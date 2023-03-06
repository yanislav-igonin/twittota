import { type FCWC } from "@/typings/react";
import { Header } from "./Header";

export const Layout: FCWC = ({ children }) =>
  <div className='flex flex-col'>
    <Header />
    <main className="p-4 w-screen h-screen bg-white dark:bg-slate-600 overflow-y-scroll">
      {children}
    </main>
  </div>;
