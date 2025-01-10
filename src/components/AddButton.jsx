// AddButton.js
import React from "react";
import { Plus } from "lucide-react";
import AddImage from "./AddImage";

const AddButton = ({ onFileSelect }) => {
  console.log(onFileSelect);

  return (
    <>
      {/* <label
        className="px-4 py-2 text-black bg-[#334d6e] rounded cursor-pointer hover:bg-[#334d6e]/90"
        aria-label="Upload Image"
      >
        <Plus />
        Add
        <input
          type="file"
          accept="image/*"
          onChange={onFileSelect}
          className="hidden"
        />
      </label> */}

      <AddImage />
    </>
  );
};

export default AddButton;
