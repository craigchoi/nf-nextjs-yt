import React from "react";
import prisma from "@/app/utils/db";
import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import MovieCard from "@/app/components/MovieCard";

async function getData(userId: string) {
  const data = await prisma.watchlist.findMany({
    where: {
      userId: userId,
    },
    select: {
      movie: {
        select: {
          id: true,
          overview: true,
          title: true,
          WatchLists: true,
          age: true,
          duration: true,
          release: true,
          imageString: true,
          youtubeString: true,
        },
      },
    },
  });
  return data;
}

export default async function page() {
  const session = await getServerSession(authOptions);
  const data = await getData(session?.user?.email as string);
  return (
    <>
      <h1 className="text-white text-4xl font-bold underline mt-10 px-5 sm:px-0">
        Your Watchlist
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 mt-10 gap-6">
        {data.map((watchList) => (
          <div key={watchList.movie?.id} className="relative h-60">
            <Image
              src={watchList.movie?.imageString as string}
              alt={watchList.movie?.title as string}
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover "
            />
            <div className="h-60 relative z-10 w-full transform transition duration-250 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={watchList.movie?.imageString as string}
                  alt="movie"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />
                <MovieCard
                  key={watchList.movie?.id}
                  age={watchList.movie?.age as number}
                  movieId={watchList.movie?.id as number}
                  overview={watchList.movie?.overview as string}
                  release={watchList.movie?.release as number}
                  title={watchList.movie?.title as string}
                  watchList={
                    (watchList.movie?.WatchLists.length as number) > 0
                      ? true
                      : false
                  }
                  watchListId={watchList.movie?.WatchLists[0]?.id as string}
                  youtubeUrl={watchList.movie?.youtubeString as string}
                  duration={watchList.movie?.duration as number}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
