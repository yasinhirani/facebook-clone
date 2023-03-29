import Image from "next/image";
import React from "react";

const PostCard = ({ image }: any) => {
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
        <figure>
          <Image
            src={image}
            width={500}
            height={500}
            className="w-full h-96 object-cover"
            alt=""
          />
        </figure>
      )}
    </div>
  );
};

export default PostCard;
