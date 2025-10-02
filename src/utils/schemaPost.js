import { z } from "zod";

const schemaPost = z.object({
  title: z.string().min(1, "title is required !!").max(500),
  content: z.string().min(1, "content is required !!").max(500),
  imgUrl: z.url().min(1, "imgUrl is required !!").max(500),
});

export default schemaPost;
