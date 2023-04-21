import {
  UsersIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  UserGroupIcon,
  ShoppingBagIcon,
  TvIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useContext } from "react";
import AuthContext from "@/core/context";
import { useRouter } from "next/router";

const LeftSideBar = () => {
  const { authData, setAuthData } = useContext(AuthContext);

  const router = useRouter();
  return (
    <div className="hidden sm:flex flex-col space-y-8 w-6 sm:w-36 md:44 lg:w-52 sticky top-[104px] self-start flex-shrink-0">
      <div className="flex items-center space-x-3">
        <figure>
          <Image
            src={authData?.avatarURL ? authData.avatarURL : "/images/no-avatar.png"}
            width={30}
            height={30}
            className="rounded-full"
            alt="User"
          />
        </figure>
        <h5 className="font-semibold hidden sm:block">{authData?.userName}</h5>
      </div>
      <div className="flex items-center space-x-3">
        <UsersIcon className="w-6 h-6 text-primary" />
        <span className="font-semibold hidden sm:inline">Friends</span>
      </div>
      <div className="flex items-center space-x-3">
        <UserGroupIcon className="w-6 h-6 text-primary" />
        <span className="font-semibold hidden sm:inline">Groups</span>
      </div>
      <div className="flex items-center space-x-3">
        <ShoppingBagIcon className="w-6 h-6 text-primary" />
        <span className="font-semibold hidden sm:inline">MarketPlace</span>
      </div>
      <div className="flex items-center space-x-3">
        <TvIcon className="w-6 h-6 text-primary" />
        <span className="font-semibold hidden sm:inline">watch</span>
      </div>
      <div className="flex items-center space-x-3">
        <CalendarDaysIcon className="w-6 h-6 text-primary" />
        <span className="font-semibold hidden sm:inline">Events</span>
      </div>
      <div className="flex items-center space-x-3">
        <ClockIcon className="w-6 h-6 text-primary" />
        <span className="font-semibold hidden sm:inline">Memories</span>
      </div>
      <div>
        <button
          onClick={() => {
            setAuthData(null);
            localStorage.removeItem("authData");
            router.push("/getStarted");
          }}
          type="button"
          className="flex items-center space-x-3"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 text-primary" />
          <span className="font-semibold hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
