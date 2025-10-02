import { useState } from "react";
import InputForm from "../components/InputForm";
import { Rocket } from "lucide-react";
import { Loader } from "lucide-react";
import schemaPost from "../utils/schemaPost";
import { z } from "zod";
import usePostStore from "../stores/postStore";
import { useEffect } from "react";
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
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // validate
    const result = schemaPost.safeParse(input);
    console.log(
      "z.flattenError(result.error).fieldErrors--",
      z.flattenError(result.error).fieldErrors
    );
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
    <div className="p-4 space-y-8">
      <div className="w-1/3 mx-auto">
        <h1 className="text-2xl text-center font-bold mb-4">Post Story</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputForm
            name="title"
            value={input.title}
            placeholder="คิดอะไรก็ใส่ไป.."
            onChange={handleChange}
            error={inputError.title[inputError.title.length - 1]}
          />
          <InputForm
            name="content"
            value={input.content}
            placeholder="Enter your content"
            onChange={handleChange}
            error={inputError.content[inputError.content.length - 1]}
          />
          <InputForm
            name="imgUrl"
            value={input.imgUrl}
            placeholder="Enter your image Url"
            onChange={handleChange}
            error={inputError.imgUrl[inputError.imgUrl.length - 1]}
          />
          <button
            disabled={isLoading}
            className={`w-full flex justify-center items-center gap-1 ${
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
      </div>

      <div className="grid grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
export default HomePage;
