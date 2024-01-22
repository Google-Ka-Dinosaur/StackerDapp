import React from "react";

const Button = ({ onClick, label, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-600 hover:bg-blue-700 font-bold border-2 border-transparent rounded-md text-white font-mono text-md p-1 mx-2 my-[2%] md:m-2 w-[94%] md:w-40"
    >
      {label}
    </button>
  );
};

export default Button;
