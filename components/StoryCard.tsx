import Image from "next/image";
import React from "react";
import Styles from "../styles/Home.module.css";
import { IStoriesData } from "./StoriesData";

interface IProps {
  data: IStoriesData;
}

const StoryCard = ({ data: { name, src, profile } }: IProps) => {
  return (
    <div
      key={Math.random()}
      className={`min-w-[80px] w-20 h-20 md:w-28 md:h-48 xl:w-36 xl:h-60 relative hover:scale-105 cursor-pointer ${Styles["story-card"]}`}
    >
      <figure className="w-full h-full filter brightness-75">
        <Image
          src={src}
          className="object-cover w-full h-full rounded-full md:rounded-3xl"
          width={300}
          height={300}
          alt={name}
        />
      </figure>
      <figure className="absolute top-2 left-2 hidden md:block">
        <Image
          src={profile}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover object-top w-8 h-8"
        />
      </figure>
      <p className="absolute bottom-3 left-3 text-white font-semibold hidden md:block">
        {name}
      </p>
    </div>
  );
};

export default StoryCard;
