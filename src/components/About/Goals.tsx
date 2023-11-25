import React from "react";

export default function Goals() {
  return (
    <div className="container mx-auto py-12 sm:py-16 lg:py-20">
      <p className="mx-auto mt-6 max-w-2xl text-lg text-center leading-8 text-gray-600 mb-8">
        Just a regular guy who likes writing software.
      </p>
      <div className="flex justify-evenly text-center flex-wrap md:flex-nowrap text-lg bg-white  ">
        <div className="w-full">
          <p className="p-10 font-mono">
            "Changing is our normal state. Even if we're not changing on the outside we're changing on the inside constantly."<br /><i>- Jake the Dog</i>
          </p>
        </div>
        <div className="w-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-black">
          <p className="p-10 font-mono">
            "Perfection is the enemy of progress." <br /><i>- Winston Churchill</i>
          </p>
        </div>
      </div>
    </div>
  );
}
