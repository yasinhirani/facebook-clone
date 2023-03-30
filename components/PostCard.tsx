import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

interface IProps {
  image: string;
  isLiked: boolean;
  likePost: (index: number) => void;
  index: number;
}

const PostCard = ({ image, isLiked, likePost, index }: IProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center space-x-3">
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            width={40}
            height={40}
            className="rounded-full"
            alt="User"
          />
        </figure>
        <div className="flex flex-col">
          <p className="font-semibold">Yasin Hirani</p>
          <span className="text-xs text-gray-500">Date</span>
        </div>
      </div>
      <p className="my-3 font-semibold">Whats up guys</p>
      {image && (
        <figure className="mb-3">
          <Image
            src={image}
            width={500}
            height={500}
            className="w-full h-auto sm:h-96 object-cover"
            alt=""
          />
        </figure>
      )}
      <hr />
      <div className="flex items-center mt-3">
        <button
          type="button"
          onClick={() => likePost(index)}
          className={`${
            isLiked ? "text-primary" : "text-gray-500"
          } flex items-center space-x-2`}
        >
          {isLiked ? (
            <HandThumbUpIconSolid className="w-5 h-5" />
          ) : (
            <HandThumbUpIcon className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">Like</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
