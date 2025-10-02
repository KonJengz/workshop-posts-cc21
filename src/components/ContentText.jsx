import { Send } from "lucide-react";
import InputForm from "./InputForm";
import { X } from "lucide-react";
import { Pencil } from "lucide-react";
import { Loader } from "lucide-react";

function ContentText({
  isEdit,
  post,
  value,
  error,
  onChange,
  handleSave,
  handleCancel,
  isLoading,
  input,
  name,
  handleEdit,
}) {
  console.log("isLoading", isLoading);
  return (
    <div className="flex items-center justify-between">
      {isEdit ? (
        <InputForm
          value={value}
          name={name}
          onChange={onChange}
          error={error}
        />
      ) : (
        <h1
          className={`${name === "title" ? "text-xl font-bold" : "text-base"}`}
        >
          {input}
        </h1>
      )}
      {isEdit ? (
        <div className="flex items-center gap-1">
          <button
            className={`${input === post ? "cursor-auto" : "cursor-pointer"}`}
            disabled={isLoading || input === post}
            onClick={handleSave}
          >
            {isLoading ? (
              <Loader className="w-4 h-4 text-gray-500 animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <X
            className="cursor-pointer w-4 h-4 text-gray-500"
            onClick={() => handleCancel(name)}
          />
        </div>
      ) : (
        <Pencil
          className="cursor-pointer w-4 h-4 text-gray-500"
          onClick={() => handleEdit(name)}
        />
      )}
    </div>
  );
}
export default ContentText;
