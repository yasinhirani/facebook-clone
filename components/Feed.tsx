import Image from "next/image";
import React from "react";
import storiesData from "./StoriesData";
import StoryCard from "./StoryCard";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import PostCard from "./PostCard";

const Feed = () => {
  return (
    <div className="w-full max-w-[40rem] mx-auto flex-grow flex flex-col space-y-8 overflow-x-hidden md:overflow-x-visible">
      <div className={`flex items-center space-x-4 overflow-x-auto md:overflow-x-visible`}>
        {storiesData.map((data) => {
          return <StoryCard key={Math.random()} data={data} />;
        })}
      </div>
      {/* Start what's on your mind */}
      <div className="bg-white shadow-md rounded-xl p-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-6">
          <figure>
            <Image
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              width={40}
              height={40}
              className="rounded-full"
              alt="User"
            />
          </figure>
          <input
            className="bg-gray-100 rounded-3xl w-full outline-none px-3 py-2 font-medium"
            type="text"
            name=""
            id=""
            placeholder="What's on your mind, Yasin Hirani?"
          />
        </div>
        <hr />
        <div className="flex justify-around items-center space-x-6">
          <button type="button" className="flex items-center space-x-2">
            <VideoCameraIcon className="w-5 h-5 text-red-600" />
            <span className="font-semibold hidden xs:inline">Live Video</span>
          </button>
          <button type="button" className="flex items-center space-x-2">
            <CameraIcon className="w-5 h-5 text-green-500" />
            <span className="font-semibold hidden xs:inline">Photo/Video</span>
          </button>
          <button type="button" className="flex items-center space-x-2">
            <FaceSmileIcon className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold hidden xs:inline">
              Feeling/Activity
            </span>
          </button>
        </div>
      </div>
      {/* End what's on your mind */}
      {/* Start Posts */}
      <div className="flex flex-col space-y-10">
        <PostCard image="" />
        <PostCard image="https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
      </div>
      {/* End Posts */}
    </div>
  );
};

export default Feed;
