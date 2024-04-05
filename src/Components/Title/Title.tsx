import React from "react";

type Props = { title: string; logo: string | undefined };

function Title({ title, logo }: Props) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-6/12 xl:w-5/12 px-2">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
          <div className="flex items-center justify-center mx-auto p-4">
            {" "}
            {logo && (
              <img src={logo} alt={title} className="w-20 h-20 mr-10" />
            )}{" "}
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
