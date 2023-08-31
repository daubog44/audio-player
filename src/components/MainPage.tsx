import Data from "@/types/ApiUserDataResponse";
import AudioPlayer from "./AudioPlayer";
import Carousel from "./Carousel";

export default async function MainPage({ data }: { data: Data }) {
  return (
    <div className="h-1/3 w-4/5">
      <Carousel images={data.images} />
      <div className="divider border-primary"></div>
      <AudioPlayer data={data} />
    </div>
  );
}
