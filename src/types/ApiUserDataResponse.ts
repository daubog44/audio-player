export interface ImageData {
  imageSrc: string;
  endSecond: number;
  startSecond: number;
  href: string;
}

export default interface Data {
  audioSrc: string;
  images: ImageData[];
}
