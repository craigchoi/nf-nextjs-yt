"use client";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import PlayVideoModal from "./PlayVideoModal";
import { addTowathchlist, removeTowathchlist } from "../action";
import { usePathname } from "next/navigation";

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  age: number;
  duration: number;
  release: number;
}

export default function MovieCard({
  title,
  overview,
  movieId,
  watchList,
  watchListId,
  youtubeUrl,
  age,
  duration,
  release,
}: iAppProps) {
  const [state, changeState] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <button onClick={() => changeState(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>

      <div className="right-5 absolute top-5 z-10">
        {watchList ? (
          <form action={removeTowathchlist}>
            <input type="hidden" name="watchlistId" value={watchListId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500"></Heart>
            </Button>
          </form>
        ) : (
          <form action={addTowathchlist}>
            <input type="hidden" name="movieId" value={movieId} />
            <input type="hidden" name="pathname" value={pathname} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4"></Heart>
            </Button>
          </form>
        )}
      </div>
      <div className="p-5 bottom-0 left-0 absolute">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="gap-x-2 items-center flex">
          <p className="font-normal text-sm">{release}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {age}+
          </p>
          <p className="font-normal text-sm">{duration}h</p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>

      <PlayVideoModal
        title={title}
        overview={overview}
        // movieId={movieId}
        youtubeUrl={youtubeUrl}
        state={state}
        changeState={changeState}
        release={release}
        age={age}
        duration={duration}
        key={movieId}
      ></PlayVideoModal>
    </>
  );
}
