import React from "react";
import { IoMdFootball } from "react-icons/io";
import { FaFontAwesomeFlag } from "react-icons/fa";
import footballer from "../assets/player.png";
import { IoMdClose } from "react-icons/io";

const PlayerListItem = ({ name, country, continent, onDelete }) => {
  let bgClasses;

switch (continent) {
  case "Europe":
    bgClasses = "bg-gradient-to-r from-blue-500 to-blue-700";
    break;
  case "Asia":
    bgClasses = "bg-gradient-to-r from-green-500 to-green-700";
    break;
  case "All":
    bgClasses = "bg-gradient-to-r from-black to-slate-600";
    break;
  case "America":
    bgClasses = "bg-gradient-to-r from-yellow-500 to-yellow-700";
    break;
  case "Africa":
    bgClasses = "bg-gradient-to-r from-gray-700 to-slate-600";
    break;
  default:  
    bgClasses = "bg-gray-400";
}

  return (
    <div
      className={`${bgClasses} p-4 grid grid-cols-2  items-center relative`}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-1">
          <IoMdFootball size={24} />
          <p className="font-bold text-xl">{name}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaFontAwesomeFlag size={24} />
          <p className="font-bold text-xl">{country}</p>
        </div>
      </div>
      <img
        className="w-24 h-24 ml-auto"
        src={footballer}
        alt="Footbal PLayer"
      />
      <span
        role="button"
        className="absolute -right-3 -top-3 bg-slate-500/40 rounded-full cursor-pointer hover:opacity-90 transition-all"
        onClick={onDelete}
      >
        <IoMdClose size={30} />
      </span>
    </div>
  );
};

export default PlayerListItem;
