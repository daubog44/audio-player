"use client";

import { type ImageData } from "@/types/ApiUserDataResponse";
import useStore from "@/store/index";
import Link from "next/link";
import { useState } from "react";

export default function CarouselLink({
  i,
  images,
}: {
  i: number;
  images: ImageData[];
}) {
  const onImageClickFn = useStore((state) => state.onImageClickFn);
  const [prev, _] = useState(images.at(i - 1));
  const [next, __] = useState(
    i === images.length - 1 ? images[0] : images.at(i + 1)
  );

  return (
    <>
      <Link
        onClick={() => {
          if (onImageClickFn && prev) onImageClickFn(prev);
        }}
        href={`${prev?.href}`}
        className="btn btn-circle"
      >
        ❮
      </Link>
      <Link
        onClick={() => {
          if (onImageClickFn && next) onImageClickFn(next);
        }}
        href={`${next?.href}`}
        className="btn btn-circle"
      >
        ❯
      </Link>
    </>
  );
}
