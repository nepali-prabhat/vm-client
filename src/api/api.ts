import { apiBaseUrl } from "@/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: apiBaseUrl,
});

export function getPublicImagesUrl(imageName: string) {
  return `${apiBaseUrl}/public/${imageName}`;
}
