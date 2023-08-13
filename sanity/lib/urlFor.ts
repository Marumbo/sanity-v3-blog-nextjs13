import ImageUrlBuilder from "@sanity/image-url";
import { getClient } from "./client";

const builder = ImageUrlBuilder(getClient());

function urlFor(source: any) {
  return builder.image(source);
}

export default urlFor;
