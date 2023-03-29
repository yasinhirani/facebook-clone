import Image from "next/image";
import React from "react";
import chatsData from "./ChatsData";

const RightSideBar = () => {
  return (
    <div className="sticky top-[104px] self-start w-52 flex-shrink-0 hidden lg:block">
      <p className="font-semibold text-xl text-gray-600">Contacts</p>
      <div className="flex flex-col space-y-6 mt-8">
        {chatsData.map((data) => {
          return (
            <button type="button" key={Math.random()} className="flex items-center space-x-3">
              <Image
                src={data.profile}
                alt={data.name}
                width={40}
                height={40}
                className="rounded-full object-cover object-top w-8 h-8"
              />
              <span className="font-semibold">{data.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RightSideBar;
