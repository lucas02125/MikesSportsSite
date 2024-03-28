import React from "react";

type Props = { title: string };

function Title({ title }: Props) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
          <div className="flex-auto p-4">
            <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;
