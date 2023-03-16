import "./styles.css";
import { useState } from "react";
export default function App() {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("typing");
  const [error, setError] = useState(null);

  if (status === "success") {
    return <h1> that is right </h1>;
  }

  const handleChange = (e) => setAnswer(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await checkAnswer(answer);
      //setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
        <button disabled={answer.length === 0 || status === "submitting"}>
          Submit
        </button>
        {error !== null && <p>{error.message}</p>}
      </form>
    </div>
  );
}

const checkAnswer = (answer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let wrongAns = answer.toLowerCase() !== "lima";
      if (wrongAns) {
        reject(new Error("Good Guess, Wrong Answer"));
      } else {
        resolve();
      }
    }, 1500);
  });
};
