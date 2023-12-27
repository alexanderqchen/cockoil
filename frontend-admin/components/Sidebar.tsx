import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";

type SidebarItem = {
  title: string;
  route: string;
  active?: boolean;
};

const Sidebar = ({ items }: { items: SidebarItem[] }) => {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#19191E] text-white">
      <Image src={logo} alt="logo" className="mt-4 mb-8 mx-auto" priority />
      <ul>
        {items.map(({ title, route, active }) => (
          <Link href={route}>
            <li
              className={`py-4 px-8 text-lg ${
                active && "bg-[#EB5757] bg-opacity-20	font-medium"
              }`}
              key={route}
            >
              {title}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
