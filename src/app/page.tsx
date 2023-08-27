import AudioPlayer from "@/components/AudioPlayer";
import Carousel from "@/components/Carousel";
import Data from "@/types/ApiUserDataResponse";

const getData = async () => {
  const audioSrc = "audios/videoplayback.mp3"; // 745
  const data: Data = {
    audioSrc,
    images: [
      {
        imageSrc: "/images/image1.jpg",
        href: "#image1",
        startSecond: 0,
        endSecond: 124,
      },
      {
        imageSrc: "/images/image2.jpg",
        href: "#image2",
        startSecond: 124,
        endSecond: 248,
      },
      {
        imageSrc: "/images/image3.jpg",
        href: "#image3",
        startSecond: 248,
        endSecond: 372,
      },
      {
        imageSrc: "/images/image4.jpg",
        href: "#image4",
        startSecond: 372,
        endSecond: 496,
      },
      {
        imageSrc: "/images/image5.jpg",
        href: "#image5",
        startSecond: 496,
        endSecond: 620,
      },
      {
        imageSrc: "/images/image6.jpg",
        href: "#image6",
        startSecond: 620,
        endSecond: Infinity,
      },
    ],
  };
  return data;
};

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex min-h-screen items-start justify-center py-12 relative">
      <div className="h-1/3 w-4/5">
        <Carousel images={data.images} />
        <div className="divider border-primary"></div>
        <AudioPlayer data={data} />
      </div>
    </main>
  );
}
