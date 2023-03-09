
import Link from "next/link";
import { useRouter } from "next/router";

const routes = [{
  path: "/search",
  name: "search"
}, {
  path: "/",
  name: "stonks"
}];


type NavbarLinkProps = {
  path: string;
  name: string;
  isActive: boolean;
};

const NavbarLink = ({ path, name, isActive }: NavbarLinkProps) => {
  return <li>
    <Link href={path} className={`font-bold font-mono text-2xl ${isActive ? "text-blue-500" : "text-gray-500"} hover:text-blue-500`}>
      {name}
    </Link>
  </li>;
}

export const Navbar = () => {
  const router = useRouter();

  return (
    <header className="z-100">
      <nav>
        <ul className="flex justify-evenly items-center py-4">
          {routes.map(({ name, path }) => ({
            name, path, isActive: router.pathname === path
          })).map(NavbarLink)}
        </ul>
      </nav>
    </header>
  );
};