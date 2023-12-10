import React from "react";
import prisma from "../utils/db";
import { Button } from "@/components/ui/button";
import MovieButtons from "./MovieButtons";

async function getMovie() {
  const data = await prisma.movie.findFirst({
    select: {
      title: true,
      overview: true,
      videoSource: true,
      imageString: true,
      release: true,
      duration: true,
      id: true,
      age: true,
    },
  });
  return data;
}

export default async function HomePage() {
  const data = await getMovie();
  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        poster={data?.imageString}
        autoPlay
        muted
        loop
        src={data?.videoSource}
        className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]"
      ></video>

      <div>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
        <div className="flex gap-x-3 mt-4/">
          <MovieButtons
            title={data?.title as string}
            overview={data?.overview as string}
            movieId={data?.id as number}
            youtubeUrl={data?.videoSource as string}
            release={data?.release as number}
            age={data?.age as number}
            duration={data?.duration as number}
          ></MovieButtons>
        </div>
      </div>
    </div>
  );
}
