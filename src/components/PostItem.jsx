import { X } from "lucide-react";
import { useState } from "react";
import usePostStore from "../stores/postStore";
import { toast } from "react-toastify";
import schemaPost from "../utils/schemaPost";
import { z } from "zod";
import ContentText from "./ContentText";

const initialInputError = {
  title: "",
  content: "",
  imgUrl: "",
};

function PostItem({ post }) {
  const initialInput = {
    title: post.title || "",
    content: post.content || "",
    imgUrl: post.imgUrl || "",
  };
  const actionUpdatePost = usePostStore((state) => state.actionUpdatePost);
  const actionDeletePost = usePostStore((state) => state.actionDeletePost);

  const [isEdit, setIsEdit] = useState({
    title: false,
    content: false,
    imgUrl: false,
  });
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // validate
    const result = schemaPost.safeParse(input);

    if (!result.success) {
      setInputError(z.flattenError(result.error).fieldErrors);
      return setIsLoading(false);
    }
    try {
      const data = {
        id: post.id,
        title: input.title,
        content: input.content,
        imgUrl: input.imgUrl,
      };
      await actionUpdatePost(25, data);
      toast.success("update post success !!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
      setIsLoading(false);
    }
  };

  const handleEdit = (name) => {
    setIsEdit((prev) => ({ ...prev, [name]: true }));
  };

  const handleCancel = (name) => {
    setInput((prev) => ({ ...prev, [name]: post[name] || "" }));
    setIsEdit((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          className="w-full h-full object-cover hover:scale-110 duration-300"
          src={post.imgUrl}
          alt={post.title}
        />
      </div>
      <div className="p-2 space-y-2">
        <ContentText
          isEdit={isEdit.title}
          post={post.title}
          input={input.title}
          error={inputError.title}
          onChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          isLoading={isLoading}
          handleEdit={handleEdit}
          value={input.title}
          name="title"
        />

        <ContentText
          isEdit={isEdit.content}
          post={post.content}
          input={input.content}
          error={inputError.content}
          onChange={handleChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          isLoading={isLoading}
          handleEdit={handleEdit}
          value={input.content}
          name="content"
        />
      </div>
      <div className="absolute top-2 right-2">
        <X
          onClick={() => actionDeletePost(25, post.id)}
          className="cursor-pointer bg-white/50 w-5 h-5 p-0.5 rounded-full"
        />
      </div>
    </div>
  );
}
export default PostItem;
