import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const GetStarted = () => {
  const [loginVisible, setLoginVisible] = useState<boolean>(true);
  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-[60rem] mx-auto px-6 md:px-12 py-10 flex items-center space-x-10">
        <div className="space-y-4 w-1/2">
          <h2 className="text-primary font-bold text-5xl">facebook clone</h2>
          <p className="font-semibold text-2xl">Lets get Connected</p>
        </div>
        {loginVisible && <Login setLoginVisible={setLoginVisible} />}
        {!loginVisible && <Register setLoginVisible={setLoginVisible} />}
      </div>
    </div>
  );
};

export default GetStarted;
