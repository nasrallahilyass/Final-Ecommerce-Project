// eslint-disable-next-line no-unused-vars
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/Animation - 1699524616661.json";

const LayoutSingUp = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default LayoutSingUp ;