import { X } from "lucide-react";
import { useState } from "react";
import usePostStore from "../stores/postStore";
import { Pencil } from "lucide-react";
import { Send } from "lucide-react";

// const initialInput = {
//   title: "",
//   content: "",
//   imgUrl: "",
// };

function PostItem({ post }) {
  const actionUpdatePost = usePostStore((state) => state.actionUpdatePost);
  const actionDeletePost = usePostStore((state) => state.actionDeletePost);

  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState({
    title: post.title || "",
    content: post.content || "",
    imgUrl: post.imgUrl || "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await actionUpdatePost(25, input);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          className="w-full h-full object-cover"
          src={post.imgUrl}
          alt={post.title}
        />
      </div>
      <h1>{post.title}</h1>
      <div className="absolute top-2 right-2">
        {isEdit ? (
          <Send onClick={handleSave} />
        ) : (
          <Pencil onClick={() => setIsEdit(true)} />
        )}
        <X
          onClick={() => actionDeletePost(25, post.id)}
          className="cursor-pointer"
        />
      </div>

      {isEdit ? (
        <input value={input.title} name="title" onChange={handleChange} />
      ) : (
        <h1>444444444</h1>
      )}
    </div>
  );
}
export default PostItem;
