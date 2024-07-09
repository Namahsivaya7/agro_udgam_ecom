import { CartItem, Item } from "@prisma/client";
import { CN_THUMBNAIL_CONF, IMAGE_CDN_ROOT } from "./config";

export const getImage = (path: string) => `${IMAGE_CDN_ROOT}${path}`;
export const getThumbnail = (path: string) =>
  `${IMAGE_CDN_ROOT}${CN_THUMBNAIL_CONF}/${path}`;

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export const cartItemFromItem = ({
  id,
  name,
  images,
  description,
  mrp,
  price,
  brand,
  details: { weight },
}: Item): CartItem => ({
  id,
  name,
  image: images[0],
  description: description ?? "",
  mrp,
  price,
  quantity: 1,
  brand: brand ?? "Generic",
  weight,
});

export const diff = (
  newObj: Record<string, any>,
  baseObj: Record<string, any>
) => {
  const result: Record<string, any> = {};
  if (Object.is(newObj, baseObj)) {
    return undefined;
  }
  if (!baseObj || typeof baseObj !== "object") {
    return baseObj;
  }

  Object.keys(newObj || {}).forEach((key) => {
    if (baseObj[key] !== newObj[key] && !Object.is(newObj[key], baseObj[key])) {
      result[key] = newObj[key];
    }
    // if (typeof baseObj[key] === "object" && typeof newObj[key] === "object") {
    //   const value = diff(newObj[key], baseObj[key]);
    //   if (value !== undefined) {
    //     result[key] = value;
    //   }
    // }
  });
  return result;
};
