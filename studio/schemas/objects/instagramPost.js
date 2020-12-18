// schemas/objects/instagramPost.js
import InstagramPreview from "../previews/instagramPost";

export default {
    type: "object",
    name: "instagramPost",
    title: "Instagram Post",
    fields: [
      {
        name: "url",
        type: "url",
        description: "Visit an Instagram post in a browser and copy the URL."
      }
    ],
    preview: {
      select: { url: "url" },
      component: InstagramPreview
    }
  };