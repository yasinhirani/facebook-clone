import { Feed, Header, LeftSideBar,RightSideBar } from "../components/index";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Facebook Clone</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full flex flex-col">
        <Header />
        <div className="flex-grow mt-16 w-full flex flex-col relative bg-gray-100">
          <div className="w-full max-w-[80rem] mx-auto flex-grow px-6 py-10 flex justify-between sm:space-x-10">
            <LeftSideBar />
            <Feed />
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
}
