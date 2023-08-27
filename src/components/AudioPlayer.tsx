"use client";
import Data from "@/types/ApiUserDataResponse";
import { useCallback, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import { useRouter } from "next/navigation";
import useStore from "@/store/index";

export default function AduioPlayer({ data }: { data: Data }) {
  const ref = useRef<null | AudioPlayer>(null);
  const router = useRouter();
  const setOnImageClick = useStore((state) => state.setOnImageClick);

  const onListen = useCallback(() => {
    if (!ref?.current?.audio.current) return;
    const currentTime = Math.round(ref.current.audio.current.currentTime);
    if (!ref.current.isPlaying()) return;
    data.images.forEach((el) => {
      if (el.endSecond === Infinity) return;
      if (currentTime >= el.startSecond && currentTime < el.endSecond) {
        router.push(el.href);
      }
    });
  }, [ref]);

  useEffect(() => {
    if (!ref.current?.progressBar.current || !ref?.current?.audio.current)
      return;

    setOnImageClick((image) => {
      if (!ref?.current?.audio.current) return;
      ref.current.audio.current.currentTime = image.startSecond;
    });
  }, [ref]);

  return (
    <>
      <AudioPlayer
        autoPlay={false}
        src={data.audioSrc}
        ref={ref}
        onListen={onListen}
      />
    </>
  );
}
