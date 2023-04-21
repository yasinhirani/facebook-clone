import { Header, LeftSideBar } from "../../components/index";
import { useRouter } from "next/router";
import React from "react";
import { Profile } from "../../components/index";

const UserProfile = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex-grow mt-16 w-full flex flex-col relative bg-gray-100">
        <div className="w-full max-w-[80rem] mx-auto flex-grow px-6 py-10 flex sm:space-x-10">
          <LeftSideBar />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
