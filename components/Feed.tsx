import Image from "next/image";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import storiesData from "./StoriesData";
import StoryCard from "./StoryCard";
import {
  CameraIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import PostCard from "./PostCard";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./Firebase";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "@/core/context";
import Compressor from "compressorjs";
import { toast } from "react-toastify";
import toastConfig from "@/core/components/toast.config";

interface IPosts {
  name: string;
  content: string;
  userId: string;
  postId: string;
  imageURL: string;
  likeCount: number;
  likedBy: [];
  createdAt: Date;
  avatar: string;
  postName: string;
}

const Feed = () => {
  const { authData } = useContext(AuthContext);

  const [posts, setPosts] = useState<IPosts[]>([]);
  const [postButtonDisabled, setPostButtonDisabled] = useState<boolean>(true);
  const [whatsOnYourMind, setWhatsOnYourMind] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string>("");
  const [disableState, setDisableState] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const postButtonDisabledState = useMemo(
    () => ({
      postButtonDisabled,
      setPostButtonDisabled,
    }),
    [postButtonDisabled]
  );

  const getAllPosts = () => {
    if (authData) {
      axios.get("/api/getPosts").then((res) => {
        setPosts(res.data);
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsOnYourMind(e.target.value);
    if (e.target.value !== "" || selectedFilePreview) {
      postButtonDisabledState.setPostButtonDisabled(false);
    } else {
      postButtonDisabledState.setPostButtonDisabled(true);
    }
  };

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedFilePreview(fileUrl);
      setSelectedFile(e.target.files[0]);
      postButtonDisabledState.setPostButtonDisabled(false);
    }
  };

  const handleClick = async () => {
    setDisableState(true);
    postButtonDisabledState.setPostButtonDisabled(true);
    let postUrl = "";
    const storageRef = ref(
      storage,
      `posts/${selectedFile?.name}${authData?.userId}`
    );
    if (selectedFile) {
      new Compressor(selectedFile, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
        success: async (compressedResult) => {
          await uploadBytes(storageRef, compressedResult).catch((err) => {
            console.error(err);
          });
          postUrl = await getDownloadURL(storageRef);
          await axios
            .post("/api/createPost", {
              name: authData?.userName,
              content: whatsOnYourMind,
              postId: uuidv4(),
              imageURL: postUrl && postUrl,
              likeCount: 0,
              likedBy: [],
              avatar: authData?.avatarURL,
              postName: `${selectedFile.name}${authData?.userId}`,
            })
            .then((res) => {
              toast.success("Posted Successfully", toastConfig);
              setWhatsOnYourMind("");
              setSelectedFile(null);
              setSelectedFilePreview("");
              postButtonDisabledState.setPostButtonDisabled(true);
              setDisableState(false);
              getAllPosts();
            });
        },
      });
    } else {
      await axios
        .post("/api/createPost", {
          name: authData?.userName,
          content: whatsOnYourMind,
          postId: uuidv4(),
          imageURL: "",
          likeCount: 0,
          likedBy: [],
          avatar: authData?.avatarURL,
        })
        .then((res) => {
          toast.success("Posted Successfully", toastConfig);
          setWhatsOnYourMind("");
          setSelectedFile(null);
          setSelectedFilePreview("");
          postButtonDisabledState.setPostButtonDisabled(true);
          setDisableState(false);
          getAllPosts();
        });
    }
  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData]);

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
              src={
                authData?.avatarURL
                  ? authData.avatarURL
                  : "/images/no-avatar.png"
              }
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
            placeholder={`What's on your mind, ${authData?.userName}?`}
          />
        </div>
        {selectedFile && (
          <figure className="w-full h-full relative">
            <Image
              className="w-full h-auto sm:h-96 object-contain"
              src={selectedFilePreview}
              alt=""
              width={200}
              height={200}
            />
            <figcaption>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setSelectedFilePreview("");
                  if (!whatsOnYourMind) {
                    postButtonDisabledState.setPostButtonDisabled(true);
                  }
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <XMarkIcon className="w-5 h-5 absolute top-2 right-2" />
              </button>
            </figcaption>
          </figure>
        )}
        <hr />
        <div className="flex justify-around items-center space-x-6">
          <button
            type="button"
            onClick={() => console.log("coming soon")}
            className="flex items-center space-x-2"
          >
            <VideoCameraIcon className="w-5 h-5 text-red-600" />
            <span className="font-semibold hidden xs:inline">Live Video</span>
          </button>
          <label
            htmlFor="postFile"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <CameraIcon className="w-5 h-5 text-green-500" />
            <span className="font-semibold hidden xs:inline">Photo/Video</span>
            <input
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => handleFileSelectChange(e)}
              type="file"
              name="postFile"
              id="postFile"
            />
          </label>
          <button
            type="button"
            onClick={() => console.log("coming soon")}
            className="flex items-center space-x-2"
          >
            <FaceSmileIcon className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold hidden xs:inline">
              Feeling/Activity
            </span>
          </button>
        </div>
        <button
          type="button"
          disabled={postButtonDisabledState.postButtonDisabled}
          onClick={() => handleClick()}
          className="bg-primary rounded-lg w-full mt-5 text-white p-2 font-semibold text-lg disabled:bg-opacity-60 disabled:cursor-not-allowed"
        >
          {disableState ? "Posting..." : "Post"}
        </button>
      </div>
      {/* End what's on your mind */}
      {/* Start Posts */}
      <div className="flex flex-col space-y-6">
        {posts.map((post, index) => {
          return (
            <PostCard
              key={Math.random()}
              postData={post}
              getPosts={getAllPosts}
            />
          );
        })}
      </div>
      {/* End Posts */}
    </div>
  );
};

export default Feed;
