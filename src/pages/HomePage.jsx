import { useState } from "react";
import InputForm from "../components/InputForm";
import { Rocket } from "lucide-react";
import { Loader } from "lucide-react";
import schemaPost from "../utils/schemaPost";
import { z } from "zod";
import usePostStore from "../stores/postStore";
import { useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import PostItem from "../components/PostItem";

const initialInput = {
  title: "",
  content: "",
  imgUrl: "",
};

function HomePage() {
  const posts = usePostStore((state) => state.posts);
  const actionFetchPost = usePostStore((state) => state.actionFetchPost);
  const actionCreatePost = usePostStore((state) => state.actionCreatePost);

  console.log("posts", posts);

  useEffect(() => {
    actionFetchPost(25);
  }, []);

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // validate
    const result = schemaPost.safeParse(input);

    if (!result.success) {
      setInputError(z.flattenError(result.error).fieldErrors);
      return setIsLoading(false);
    }

    try {
      // api
      await actionCreatePost(25, input);
      // await actionFetchPost(25);

      setInput(initialInput);
      // alert
      toast.success("create post success !!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Post Story</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputForm
          name="title"
          value={input.title}
          placeholder="คิดอะไรก็ใส่ไป.."
          onChange={handleChange}
          error={inputError.title}
        />
        <InputForm
          name="content"
          value={input.content}
          placeholder="Enter your content"
          onChange={handleChange}
          error={inputError.content}
        />
        <InputForm
          name="imgUrl"
          value={input.imgUrl}
          placeholder="Enter your image Url"
          onChange={handleChange}
          error={inputError.imgUrl}
        />
        <button
          disabled={isLoading}
          className={`flex items-center gap-1 ${
            isLoading ? "bg-gray-400" : "bg-green-500"
          }  rounded-full cursor-pointer px-4 py-2`}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" />
              <span>Loading..</span>
            </>
          ) : (
            <>
              <Rocket />
              <span>Create</span>
            </>
          )}
        </button>
      </form>

      <div className="grid grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
