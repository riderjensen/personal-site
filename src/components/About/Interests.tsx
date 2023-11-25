import React from "react";

export default function Interests() {
  return (
    <div className="container mx-auto">
      <div className="mx-auto items-center py-24 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Who I Am
          </h2>
          <p className="mt-4 text-gray-500">
            To distill a person to a list of interests is such a disservice to
            what humans are. That being said, here is a list of my interests.
          </p>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Technology</dt>
              <dd className="mt-2 text-sm text-gray-500">
                To have such vast information and resources available to so many
                people on the planet, all based on a 1 or a 0, its incredible no
                matter how often I think about it. I love learning about the
                incredible things that great people are creating with technology
                and how it is helping so many lives.
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Traveling</dt>
              <dd className="mt-2 text-sm text-gray-500">
                I feel very lucky to have been born in such a time where travel
                is so easy and accessible. Learning about other cultures,
                experiencing new cuisine and customs, and making new friends is
                what the human experience is all about.
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Exercise</dt>
              <dd className="mt-2 text-sm text-gray-500">
                While I love learning (what I would classify as mental
                exercise), rediscovering my love for working out has improved my
                life more than I thought it ever would. Who would have thought
                lifting heavy object over and over again would make your brain
                feel good?
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Movies</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Had I not developed such an intense love of technology, I no
                doubt would have tried my hand at acting. Even still I have pipe
                dreams of one day seeing my name as the credits to a movie
                slowly crawl across the screen.
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Quotes</dt>
              <dd className="mt-2 text-sm text-gray-500">
                When I was around 10 I picked up a lasting habit of reading
                quotes before bed. These snippets range from commentary on what
                it means to lead a good life to witty one liners you could use
                to make your friends laugh and it includes everything in
                between.
              </dd>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Cooking</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Cooking is a new interest of mine and it is such an incredible
                art form that takes true blend of precision mixed with
                creativity.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
