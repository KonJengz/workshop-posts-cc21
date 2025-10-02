import { useState } from "react";
import InputForm from "../components/InputForm";
import { Rocket } from "lucide-react";
import { Loader } from "lucide-react";

const initialInput = {
  title: "",
  content: "",
  imgUrl: "",
};

function HomePage() {
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

    try {
      // api
      // alert
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
    </div>
  );
}
export default HomePage;
