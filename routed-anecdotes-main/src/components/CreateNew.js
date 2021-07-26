import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew, showNotification }) => {
  const [content, resetContent] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [info, resetInfo] = useField("text");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    };

    addNew(newPost);
    showNotification(`a new anecdote ${content.value} created!`);
    history.push("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
      </form>
      <button onClick={handleSubmit}>create</button>
      <button onClick={handleReset}>reset</button>
    </div>
  );
};

export default CreateNew;
