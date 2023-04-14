import { storage } from "@/components/Firebase";
import AuthContext from "@/core/context";
import { Transition, Dialog } from "@headlessui/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Compressor from "compressorjs";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React, { Fragment, useContext, useState } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  data: IEditDetails;
  getProfileData: () => void;
}

interface IEditDetails {
  userName: string;
  email: string;
  relationshipStatus: string;
  avatarURL: string;
  avatarName: string;
}

const Edit = ({ isOpen, closeModal, data, getProfileData }: IProps) => {
  const { authData, setAuthData } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string>("");
  const [updateButtonDisable, setUpdateButtonDisable] =
    useState<boolean>(false);

  const initialValues: IEditDetails = {
    userName: data.userName ? data.userName : "",
    email: data.email ? data.email : "",
    relationshipStatus: data.relationshipStatus ? data.relationshipStatus : "",
    avatarURL: data.avatarURL ? data.avatarURL : "",
    avatarName: data.avatarName ? data.avatarName : "",
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setSelectedFilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (values: IEditDetails) => {
    setUpdateButtonDisable(true);
    if (selectedFile) {
      if (selectedFile.name + authData?.userId !== data.avatarName) {
        await deleteObject(ref(storage, `userAvatars/${data.avatarName}`));
      }
      new Compressor(selectedFile, {
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.8,
        success: async (compressedResult) => {
          const storageRef = ref(
            storage,
            `userAvatars/${selectedFile?.name}${authData?.userId}`
          );
          await uploadBytes(storageRef, compressedResult).then(() => {
            console.log("uploaded");
          });
          const url = await getDownloadURL(storageRef);
          values.avatarURL = url;
          values.avatarName = selectedFile.name + authData?.userId;
          console.log(values);
          axios
            .post("/api/updateProfileData", {
              ...values,
            })
            .then((res) => {
              console.log(res.data.message);
              setUpdateButtonDisable(false);
              closeModal();
              getProfileData();
              if (url) {
                const copyAuthData = authData;
                if (copyAuthData) {
                  copyAuthData.avatarURL = url;
                  copyAuthData.userName = values.userName;
                  copyAuthData.email = values.email;
                  setAuthData(copyAuthData);
                  localStorage.setItem(
                    "authData",
                    JSON.stringify(copyAuthData)
                  );
                }
              }
            });
        },
      });
    } else {
      axios
        .post("/api/updateProfileData", {
          ...values,
        })
        .then((res) => {
          console.log(res.data.message);
          setUpdateButtonDisable(false);
          closeModal();
          const copyAuthData = authData;
          if (copyAuthData) {
            copyAuthData.userName = values.userName;
            copyAuthData.email = values.email;
            setAuthData(copyAuthData);
            localStorage.setItem("authData", JSON.stringify(copyAuthData));
          }
          getProfileData();
        });
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center space-x-4"
                >
                  <span>Edit Details</span>
                  <button type="button" onClick={closeModal}>
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </Dialog.Title>
                <div className="my-8 flex justify-center">
                  <figure className="relative">
                    {!selectedFilePreview && (
                      <Image
                        src={
                          data.avatarURL
                            ? data.avatarURL
                            : "/images/no-avatar.png"
                        }
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-full w-32 h-32 object-cover"
                      />
                    )}
                    {selectedFilePreview && (
                      <Image
                        src={selectedFilePreview}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-full w-32 h-32 object-cover"
                      />
                    )}
                    <figcaption className="absolute -right-2 bottom-0 bg-gray-100 rounded-full p-2">
                      <label htmlFor="avatarSelect" className="cursor-pointer">
                        <CameraIcon className="w-6 h-6 text-primary" />
                        <input
                          type="file"
                          name="avatarSelect"
                          id="avatarSelect"
                          className="hidden"
                          onChange={(e) => handleAvatarUpload(e)}
                        />
                      </label>
                    </figcaption>
                  </figure>
                </div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {({ values }) => {
                    return (
                      <Form className="flex flex-col space-y-5">
                        <Field
                          name="userName"
                          label="User Name"
                          type="text"
                          placeholder="User Name"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                          autoComplete="off"
                          value={values.userName}
                        />
                        <Field
                          name="email"
                          label="Email"
                          type="text"
                          placeholder="Email"
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                          autoComplete="off"
                          value={values.email}
                        />
                        <Field
                          name="relationshipStatus"
                          label="Relationship Status"
                          type="text"
                          placeholder="Single, Taken, Complicated, etc..."
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-transparent outline-none"
                          autoComplete="off"
                          value={values.relationshipStatus}
                        />
                        <button
                          type="submit"
                          className="bg-primary px-4 py-3 rounded-lg text-white font-semibold text-lg disabled:bg-opacity-50 disabled:cursor-not-allowed"
                          disabled={updateButtonDisable}
                        >
                          {updateButtonDisable ? "Please wait..." : "Update"}
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Edit;
