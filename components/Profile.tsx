import { PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Edit from "./Edit";
import axios from "axios";
import TimeLine from "./TimeLine";
import { useRouter } from "next/router";
import AuthContext from "@/core/context";

interface IProfileData {
  userId: string;
  userName: string;
  email: string;
  avatarURL: string;
  avatarName: string;
  coverImage: string;
  followers: Array<string>;
  followings: Array<string>;
  relationshipStatus: string;
}

const Profile = () => {
  const router = useRouter();

  const { authData } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<IProfileData | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getProfileData = () => {
    axios
      .post("/api/profileDetails", {
        userId: router.query.userId,
      })
      .then((res) => {
        if (res.data.success) {
          setProfileData(res.data.data);
        }
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <>
      {profileData && (
        <div className="flex flex-col w-full space-y-10 max-w-[50rem] mx-auto">
          <div className="w-full">
            <figure>
              <Image
                src="https://images.unsplash.com/photo-1587502537685-c9a38045c71a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt=""
                width={600}
                height={600}
                className="w-full h-32 sm:h-56 object-cover"
              />
            </figure>
            <div className="flex justify-center transform -translate-y-16">
              <figure>
                <Image
                  src={
                    profileData.avatarURL
                      ? profileData.avatarURL
                      : "/images/no-avatar.png"
                  }
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full w-32 h-32 object-cover"
                />
              </figure>
            </div>
            <div className="bg-white rounded-lg p-5 space-y-8">
              <div className="flex justify-between items-center space-x-5">
                <h6 className="font-medium text-2xl relative before:absolute before:w-12 before:h-0.5 before:rounded-lg before:bg-black before:-bottom-0.5">
                  About
                </h6>
                {router.query.userId === authData?.userId && (
                  <button
                    type="button"
                    className="flex items-center space-x-2 font-semibold text-primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <PencilIcon className="w-5 h-5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
              <hr />
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="font-medium">
                  <p className="text-gray-500 text-base">Name:</p>
                  <p className="text-lg">{profileData.userName}</p>
                </div>
                <div className="font-medium">
                  <p className="text-gray-500 text-base">Email:</p>
                  <p className="text-lg">{profileData.email}</p>
                </div>
                <div className="font-medium">
                  <p className="text-gray-500 text-base">
                    Relationship status:
                  </p>
                  <p className="text-lg">
                    {profileData.relationshipStatus
                      ? profileData.relationshipStatus
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <TimeLine userId={router.query.userId as string} />
        </div>
      )}
      <Edit
        isOpen={isModalOpen}
        closeModal={closeModal}
        data={{
          userName: profileData?.userName ? profileData.userName : "",
          email: profileData?.email ? profileData.email : "",
          avatarURL: profileData?.avatarURL ? profileData.avatarURL : "",
          avatarName: profileData?.avatarName ? profileData.avatarName : "",
          relationshipStatus: profileData?.relationshipStatus
            ? profileData.relationshipStatus
            : "",
        }}
        getProfileData={getProfileData}
      />
    </>
  );
};

export default Profile;
