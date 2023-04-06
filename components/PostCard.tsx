import AuthContext from "@/core/context";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as HandThumbUpIconSolid } from "@heroicons/react/24/solid";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import React, { useContext, useState } from "react";

interface IProps {
  postData: {
    name: string;
    content: string;
    userId: string;
    postId: string;
    imageURL: string;
    likedBy: [];
    createdAt: Date;
    avatar: string;
  };
}

const PostCard = ({
  postData: {
    name,
    content,
    userId,
    postId,
    imageURL,
    likedBy,
    createdAt,
    avatar,
  },
}: IProps) => {
  const { authData } = useContext(AuthContext);

  const [liked, setIsLiked] = useState<boolean>(
    likedBy.includes(authData?.userId as never)
  );
  const [likeCount, setLikeCount] = useState<number>(likedBy.length);

  const handleLikeDislike = (userId: string | undefined, postId: string) => {
    if (authData) {
      if (liked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!liked);
      axios
        .put("http://localhost:8080/api/likePost", {
          userId,
          postId,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center space-x-3">
        <figure>
          <Image
            src={avatar ? avatar : "/images/no-avatar.png"}
            width={40}
            height={40}
            className="rounded-full"
            alt="User"
          />
        </figure>
        <div className="flex flex-col">
          <p className="font-semibold">{name}</p>
          <span className="text-xs text-gray-500 font-medium">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
      <p className="my-3 font-semibold">{content}</p>
      {imageURL && (
        <figure className="mb-3">
          <Image
            src={imageURL}
            width={500}
            height={500}
            className="w-full h-auto sm:h-96 object-contain"
            alt=""
          />
        </figure>
      )}
      <hr />
      <div className="flex items-center space-x-3 mt-3">
        <button
          type="button"
          onClick={() => handleLikeDislike(authData?.userId, postId)}
          className={`${
            liked ? "text-primary" : "text-gray-500"
          } flex items-center space-x-2`}
        >
          {liked ? (
            <HandThumbUpIconSolid className="w-5 h-5" />
          ) : (
            <HandThumbUpIcon className="w-5 h-5" />
          )}
          <span className="text-sm font-medium">Like</span>
        </button>
        <span className="font-semibold text-sm">{likeCount}</span>
      </div>
    </div>
  );
};

export default PostCard;
