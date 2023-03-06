
import Link from "next/link";
import { useRouter } from "next/router";

const routes = [{
  path: "/search",
  name: "Search"
}, {
  path: "/",
  name: "Stonks"
}];


type NavbarLinkProps = {
  path: string;
  name: string;
  isActive: boolean;
};

const NavbarLink = ({ path, name, isActive }: NavbarLinkProps) =>
  <li>
    <Link href={path} className={isActive ? "text-blue-500" : ""}>
      {name}
    </Link>
  </li>;

export const Header = () => {
  const router = useRouter();

  return (
    <header>
      <nav>
        <ul className="flex items-center py-4">
          {routes.map(({ name, path }) => ({
            name, path, isActive: router.pathname === path
          })).map(NavbarLink)}
        </ul>
      </nav>
    </header>
  );
};