import React from "react";

const Upload = () => {
  return (
    <div className="bg-[#222222] lg:w-1/2 p-3 flex flex-col gap-5">
      <p className="text-sm">Choose File or Drag and Drop to Upload </p>

      <div className=" px-5 py-2">
        <form className="flex flex-col gap-4 items-start  rounded-lg  ">
          <input
            type="file"
            name=""
            placeholder=""
            id=""
            className="bg-black border w-64 h-56 border-slate-400 border-dashed "
          />
          <button type="submit" className="p-1 bg-primary rounded-lg ">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
