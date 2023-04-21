import React from "react";
import { Feed, LeftSideBar, RightSideBar } from "./index";

const Homepage = () => {
  return (
    <div className="flex-grow mt-16 w-full flex flex-col relative bg-gray-100">
      <div className="w-full max-w-[80rem] mx-auto flex-grow px-6 py-10 flex justify-between sm:space-x-10">
        <LeftSideBar />
        <Feed />
        <RightSideBar />
      </div>
    </div>
  );
};

export default Homepage;
