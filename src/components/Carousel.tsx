// "use client";
import { type ImageData } from "@/types/ApiUserDataResponse";
import Image from "next/image";
import CarouselLink from "./CarouselLink";

export default async function Carousel({ images }: { images: ImageData[] }) {
  return (
    <>
      <div className="carousel w-full">
        {images.map((el, i) => {
          return (
            <>
              <div
                id={`${el.href.substring(1)}`}
                className="carousel-item relative w-full h-96"
              >
                <Image
                  src={el.imageSrc}
                  alt={""}
                  quality={100}
                  width={4096}
                  height={2160}
                  placeholder="blur"
                  className="object-cover w-full"
                  blurDataURL={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                  }
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <CarouselLink i={i} images={images} />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
