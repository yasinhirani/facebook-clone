import Image from "next/image";
import React, { useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  HomeIcon,
  FlagIcon,
  PlayCircleIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import AuthContext from "@/core/context";
import Link from "next/link";

const Header = () => {
  const { authData } = useContext(AuthContext);
  return (
    <div className="w-full fixed top-0 h-16 bg-white shadow-md z-10">
      <div className="w-full max-w-[80rem] mx-auto px-6 py-3 flex justify-between items-center">
        {/* Start Brand Logo and search bar */}
        <div className="flex items-center space-x-5">
          <Link href="/">
            <figure>
              <Image
                src="https://links.papareact.com/5me"
                width={40}
                height={40}
                alt="Facebook"
              />
            </figure>
          </Link>
          <div className="bg-gray-100 rounded-full w-44 xs:w-56 flex items-center space-x-3 px-3 py-2">
            <MagnifyingGlassIcon className="w-5 h-5" />
            <input
              className="w-full bg-transparent outline-none placeholder:text-gray-500"
              type="text"
              name=""
              id=""
              placeholder="Search Facebook"
            />
          </div>
        </div>
        {/* End Brand Logo and search bar */}
        {/* Start NavLinks */}
        <div className="items-center space-x-10 hidden md:flex">
          <HomeIcon className="w-6 h-6 text-primary" />
          <FlagIcon className="w-6 h-6 text-gray-500" />
          <PlayCircleIcon className="w-6 h-6 text-gray-500" />
          <ShoppingCartIcon className="w-6 h-6 text-gray-500" />
          <UserGroupIcon className="w-6 h-6 text-gray-500" />
        </div>
        {/* End NavLinks */}
        {/* Start Profile */}
        <Link
          href={{
            pathname: "/userProfile",
            query: { userId: authData?.userId },
          }}
          className="flex items-center space-x-3"
        >
          <figure>
            <Image
              src={authData?.avatarURL ? authData.avatarURL : "/images/no-avatar.png"}
              width={40}
              height={40}
              className="rounded-full w-9 h-9"
              alt="User"
            />
          </figure>
          <h5 className="font-semibold hidden lg:block">
            {authData?.userName}
          </h5>
        </Link>
        {/* End Profile */}
      </div>
    </div>
  );
};

export default Header;
