import React from "react";

const Upload = () => {
  return (
    <div className="bg-[#222222] w-fit  p-3 flex flex-col gap-5">
      <p className="text-sm">Choose File or Drag and Drop to Upload </p>

      <div className=" px-5 py-2">
        <form className="flex flex-col gap-4 items-start  rounded-lg  ">
          <div className="flex flex-col lg:flex-row gap-5 items-center ">
            <input
              type="file"
              name=""
              placeholder=""
              id=""
              className="bg-black border w-64 h-56 border-slate-400 border-dashed "
            />

            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <h6 className="text-slate-400">Title</h6>

                <input
                  type="text"
                  className=" bg-transparent border border-gray-500 rounded-sm"
                />
              </div>

              <div className="flex flex-col">
                <h6 className="text-slate-400">Summary</h6>

                <input
                  type="text"
                  className=" bg-transparent border border-gray-500 rounded-sm"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="p-1 bg-primary rounded-lg ">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
