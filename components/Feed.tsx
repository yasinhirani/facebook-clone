import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import storiesData from "./StoriesData";
import StoryCard from "./StoryCard";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import PostCard from "./PostCard";

interface IPosts {
  image: string;
  isLiked: boolean;
}

const Feed = () => {
  const [posts, setPosts] = useState<IPosts[]>([
    {
      image: "",
      isLiked: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      isLiked: false,
    },
  ]);
  const [postButtonDisabled, setPostButtonDisabled] = useState<boolean>(true);
  const [whatsOnYourMind, setWhatsOnYourMind] = useState<string>("");

  const postButtonDisabledState = useMemo(
    () => ({
      postButtonDisabled,
      setPostButtonDisabled,
    }),
    [postButtonDisabled]
  );

  const likePost = (index: number) => {
    const copyPosts = [...posts];
    if (copyPosts[index].isLiked) {
      copyPosts[index].isLiked = false;
    } else {
      copyPosts[index].isLiked = true;
    }
    setPosts(copyPosts);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsOnYourMind(e.target.value);
    if (e.target.value !== "") {
      postButtonDisabledState.setPostButtonDisabled(false);
    } else {
      postButtonDisabledState.setPostButtonDisabled(true);
    }
  };

  return (
    <div className="w-full max-w-[40rem] mx-auto flex-grow flex flex-col space-y-10 overflow-x-hidden md:overflow-x-visible">
      <div
        className={`flex items-center space-x-4 overflow-x-auto md:overflow-x-visible`}
      >
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
            value={whatsOnYourMind}
            onChange={(e) => handleOnChange(e)}
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
        <button
          type="button"
          disabled={postButtonDisabledState.postButtonDisabled}
          className="bg-primary rounded-lg w-full mt-5 text-white p-2 font-semibold text-lg disabled:bg-opacity-60 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>
      {/* End what's on your mind */}
      {/* Start Posts */}
      <div className="flex flex-col space-y-6">
        {posts.map((post, index) => {
          return (
            <PostCard
              key={Math.random()}
              image={post.image}
              isLiked={post.isLiked}
              likePost={likePost}
              index={index}
            />
          );
        })}
      </div>
      {/* End Posts */}
    </div>
  );
};

export default Feed;
