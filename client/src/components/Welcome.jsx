import React, { useContext } from "react";

const Welcome = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-7xl  text-white py-1">
            Rent Properties <br /> across the world
          </h1>
          <p className="text-left mt-10 text-white font-light md:w-9/12 w-11/12 text-base">
            Discover your ideal home effortlessly with our innovative home
            renting blockchain application, ensuring secure, transparent, and
            efficient transactions for a seamless renting experience.
          </p>
        </div>

        <img
          src="https://us.123rf.com/450wm/summertime72/summertime722303/summertime72230301006/201005419-ai-generative-illustration-of-a-house-in-cartoon-style.jpg?ver=6"
          alt="House in Cartoon Style"
          className="mx-auto block max-w-full h-auto border-none rounded-3xl shadow-2xl md:w-1/2 w-11/12"
        />
      </div>
    </div>
  );
};

export default Welcome;
