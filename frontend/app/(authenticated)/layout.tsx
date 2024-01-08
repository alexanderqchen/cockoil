"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const firstPath = pathname.split("/")[1];

  return (
    <div>
      <div className="h-14 mx-4 flex justify-between items-center">
        <button onClick={() => setOpen(true)}>
          <Bars3Icon className="size-8" />
        </button>
        <p className="text-2xl font-medium">CockOil Rewards</p>
      </div>
      <div className="m-8">{children}</div>
      <div
        className={`bg-[#19191E] absolute top-0 right-0 w-screen h-screen ${
          !open && "-translate-x-full"
        } transition ease-in-out duration-300`}
      >
        <XMarkIcon className="size-8 m-4 mb-8" onClick={() => setOpen(false)} />
        <ul className="text-2xl">
          <Link href="/profile" onClick={() => setOpen(false)}>
            <li
              className={`font-bold h-16 pl-12 flex items-center ${
                firstPath === "profile" && "bg-[#432529]"
              }`}
            >
              Profile
            </li>
          </Link>
          <Link href="/rewards" onClick={() => setOpen(false)}>
            <li
              className={`font-bold h-16 pl-12 flex items-center ${
                firstPath === "rewards" && "bg-[#432529]"
              }`}
            >
              Rewards
            </li>
          </Link>
          <Link href="/settings" onClick={() => setOpen(false)}>
            <li
              className={`font-bold h-16 pl-12 flex items-center ${
                firstPath === "settings" && "bg-[#432529]"
              }`}
            >
              Settings
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
