import { type FCWC } from "@/typings/react";
import { Navbar } from "./Navbar";

export const Layout: FCWC = ({ children }) =>
  <div className='flex flex-col'>
    <Navbar />
    <main className="p-4 w-screen h-screen bg-white dark:bg-slate-600">
      {children}
    </main>
  </div>;
