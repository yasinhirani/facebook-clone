import AuthContext from "@/core/context";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { storage } from "./Firebase";

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
    postName: string;
  };
  getPosts: () => void;
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
    postName,
  },
  getPosts,
}: IProps) => {
  const { authData } = useContext(AuthContext);

  const [liked, setIsLiked] = useState<boolean>(
    likedBy.includes(authData?.userId as never)
  );
  const [likeCount, setLikeCount] = useState<number>(likedBy.length);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleLikeDislike = (userId: string | undefined, postId: string) => {
    if (authData) {
      if (liked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!liked);
      axios
        .put("/api/likePost", {
          userId,
          postId,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  const handlePostDelete = async () => {
    setIsDeleting(true);
    const storageRef = ref(storage, `posts/${postName}`);
    await deleteObject(storageRef).then(() => {
      axios
        .post("/api/deletePost", {
          postId,
          userId,
        })
        .then((res) => {
          if (res.data.success) {
            setIsDeleting(false);
            console.log(res.data);
            getPosts();
          }
        });
    });
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex justify-between items-center space-x-5">
          <div className="flex items-center space-x-3">
            <Link
              href={{
                pathname: "/userProfile",
                query: {
                  userId: userId,
                },
              }}
            >
              <figure>
                <Image
                  src={avatar ? avatar : "/images/no-avatar.png"}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="User"
                />
              </figure>
            </Link>
            <div className="flex flex-col">
              <p className="font-semibold">{name}</p>
              <span className="text-xs text-gray-500 font-medium">
                {moment(createdAt).fromNow()}
              </span>
            </div>
          </div>
          {userId === authData?.userId && (
            <button type="button" onClick={() => handlePostDelete()}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
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
      {isDeleting && (
        <div className="absolute bg-white bg-opacity-50 inset-0"></div>
      )}
    </div>
  );
};

export default PostCard;
