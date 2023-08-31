import decompress from "decompress";

export default async function (buff: Buffer, folder: string) {
    const files = await decompress(buff, folder);
    return files;
}