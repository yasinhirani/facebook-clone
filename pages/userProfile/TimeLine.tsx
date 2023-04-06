import PostCard from "@/components/PostCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface IPosts {
  name: string;
  content: string;
  userId: string;
  postId: string;
  imageURL: string;
  likeCount: number;
  likedBy: [];
  createdAt: Date;
}

const TimeLine = () => {
  const [profileTimeline, setProfileTimeline] = useState<IPosts[] | null>(null);

  const getProfileTimeline = () => {
    axios.get("http://localhost:8080/api/profileTimeline").then((res) => {
      if (res.data.success) {
        setProfileTimeline(res.data.data);
      } else {
        console.log(res.data.message);
      }
    });
  };

  useEffect(() => {
    getProfileTimeline();
  }, []);
  return (
    <div className="space-y-5">
      <p className="font-semibold text-3xl">Timeline</p>
      <div className="flex flex-col space-y-6">
        {profileTimeline &&
          profileTimeline.map((timeline) => {
            return <PostCard key={Math.random()} postData={timeline} />;
          })}
      </div>
    </div>
  );
};

export default TimeLine;
