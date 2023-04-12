import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import chatsData from "./ChatsData";
import axios from "axios";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import AuthContext from "@/core/context";

interface IPeople {
  userId: string;
  userName: string;
  email: string;
  avatarURL: string;
  followers: Array<string>;
}

interface IProps {
  data: IPeople;
}

const RightSideBar = () => {
  const [people, setPeople] = useState<IPeople[] | null>(null);
  const getPeople = () => {
    axios.get("http://localhost:8080/api/getPeople").then((res) => {
      setPeople(res.data);
    });
  };

  useEffect(() => {
    getPeople();
  }, []);
  return (
    <div className="sticky top-[104px] self-start w-52 flex-shrink-0 hidden lg:block">
      <p className="font-semibold text-xl text-gray-600">People</p>
      <div className="flex flex-col space-y-6 mt-8">
        {people &&
          people.map((data) => {
            return <FriendList key={Math.random()} data={data} />;
          })}
      </div>
    </div>
  );
};

const FriendList = ({
  data: { avatarURL, userName, userId, followers },
}: IProps) => {
  const { authData } = useContext(AuthContext);
  const [isRequestSent, setIsRequestSent] = useState<boolean>(
    followers.includes(authData?.userId as never)
  );

  const followFriend = () => {
    setIsRequestSent((prev) => !prev);
    axios.put("http://localhost:8080/api/follow", { userId });
  };
  return (
    <div className="flex items-center space-x-5">
      <div className="flex items-center space-x-3">
        <Image
          src={avatarURL ? avatarURL : "/images/no-avatar.png"}
          alt={userName}
          width={40}
          height={40}
          className="rounded-full object-cover object-top w-9 h-9"
        />
        <span className="font-semibold">{userName}</span>
      </div>
      <button type="button" onClick={followFriend}>
        {isRequestSent ? (
          <XMarkIcon className="text-black w-5 h-5 font-bold" />
        ) : (
          <PlusIcon className="text-primary w-5 h-5 font-bold" />
        )}
      </button>
    </div>
  );
};

export default RightSideBar;
