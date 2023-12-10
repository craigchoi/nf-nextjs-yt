"use client";
import { Button } from "@/components/ui/button";
import { InfoIcon, PlayCircle } from "lucide-react";
import React, { useState } from "react";
import PlayVideoModal from "./PlayVideoModal";

interface iAppProps {
  title: string;
  overview: string;
  movieId: number;
  youtubeUrl: string;
  release: number;
  age: number;
  duration: number;
}

export default function MovieButtons({
  title,
  overview,
  movieId,
  youtubeUrl,
  release,
  age,
  duration,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="font-medium text-lg"
      >
        <PlayCircle className="mr-2 h-6 w-6"></PlayCircle>Play
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="font-medium text-lg bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="mr-2 h-6 w-6" />
        Learn more
      </Button>
      <PlayVideoModal
        state={open}
        changeState={setOpen}
        title={title}
        overview={overview}
        key={movieId}
        youtubeUrl={youtubeUrl}
        release={release}
        age={age}
        duration={duration}
      ></PlayVideoModal>
    </>
  );
}
