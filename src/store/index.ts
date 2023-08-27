import { create } from "zustand";
import type { ImageData } from "@/types/ApiUserDataResponse";

type State = {
  onImageClickFn?: (image: ImageData) => void;
};

type Action = {
  setOnImageClick: (cl: (image: ImageData) => void) => void;
};

export default create<State & Action>((set) => ({
  setOnImageClick: (cl) => set(() => ({ onImageClickFn: cl })),
}));
