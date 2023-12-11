import React from "react";
import Image from "next/image";
import MovieCard from "./MovieCard";
import { authOptions } from "../utils/auth";
import { getServerSession } from "next-auth";
import prisma from "../utils/db";

async function getMovie(userId: string) {
  const data = await prisma.movie.findMany({
    take: 4,
    select: {
      id: true,
      overview: true,
      title: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
      age: true,
      duration: true,
      release: true,

      imageString: true,
      youtubeString: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function RecentlyAdded() {
  const session = await getServerSession(authOptions);
  const data = await getMovie(session?.user?.email as string);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-5 ">
      {data?.map((movie) => (
        <div key={movie.id} className="relative h-48">
          <Image
            src={movie.imageString}
            alt={movie.title}
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />
          <div className="h-60 relative z-10  w-full transform transition duration-200 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
              <Image
                src={movie.imageString}
                alt={movie.title}
                width={800}
                height={800}
                className="-z-10 absolute w-full h-full object-cover rounded-lg"
              />
              <MovieCard
                movieId={movie.id}
                overview={movie.overview}
                title={movie.title}
                watchList={movie.WatchLists.length > 0 ? true : false}
                watchListId={movie.WatchLists[0]?.id}
                youtubeUrl={movie.youtubeString}
                age={movie.age}
                duration={movie.duration}
                release={movie.release}
                key={movie.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
