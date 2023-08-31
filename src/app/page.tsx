import Data from "@/types/ApiUserDataResponse";
import getSignedUrl from "@/app/utils/getSignedUrl";
import MainPage from "@/components/MainPage";
import getUnzipFilesFromBuff from "./utils/getUnzipFilesFromBuff";
import { getRecurseDir, folderExsist } from "./utils/getDirectories";
import type { ImageData } from "../types/ApiUserDataResponse";

const getData = async (zipFolder: string) => {
  const remoteFolderWithOutExt = zipFolder.split(".")[0];
  const outFolder = `public/${remoteFolderWithOutExt}`;
  let files: string[];

  if (!(await folderExsist(outFolder))) {
    const signedUrl = getSignedUrl(zipFolder);
    const res = await fetch(signedUrl, { cache: "no-store" });
    const blob = await res.blob();
    const arrBuff = await blob.arrayBuffer();
    const buff = Buffer.from(arrBuff);
    files = (await getUnzipFilesFromBuff(buff, outFolder)).map(
      (file) => "/" + remoteFolderWithOutExt + "/" + file.path
    );
  } else {
    files = (await getRecurseDir(outFolder)).map(
      (file) =>
        "/" +
        file
          .split("/")
          .filter((f, i) => i > 0 && f)
          .join("/")
    );
  }
  const audioSrc = files.find((path) => path.includes("audios")) as string;
  const jsonFile = files.find((f) => f.includes("json")) as string;
  const jsonData = (await (
    await fetch("http://127.0.0.1:3000" + jsonFile)
  ).json()) as Data;
  const images = files
    .filter((path) => path.includes("images"))
    .map(
      (path, i): ImageData => ({
        imageSrc: path,
        href: "#" + path.split("/").at(-1),
        startSecond: jsonData.images.at(i)?.startSecond as number,
        endSecond: jsonData.images.at(i)?.endSecond as number,
      })
    );

  const data: Data = {
    audioSrc,
    images,
  };
  return data;
};

export default async function Home() {
  const data = await getData("zipFolder.zip");

  return (
    <main className="flex min-h-screen items-start justify-center py-12 relative">
      <MainPage data={data} />
    </main>
  );
}
