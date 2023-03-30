import {
  UsersIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import {
  UserGroupIcon,
  ShoppingBagIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const LeftSideBar = () => {
  return (
    <div className="flex flex-col space-y-8 w-6 sm:w-36 md:44 lg:w-52 sticky top-[104px] self-start flex-shrink-0">
      <div className="flex items-center space-x-3">
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            width={30}
            height={30}
            className="rounded-full"
            alt="User"
          />
        </figure>
        <h5 className="font-semibold hidden sm:block">Yasin Hirani</h5>
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
    </div>
  );
};

export default LeftSideBar;
