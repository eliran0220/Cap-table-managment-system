import React, { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL || "http://localhost:5001")
      .then((response) => response.text())
      .then((data) => setText(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>
        {`Message received from server: ${text}` ||
          "Loading message from server (it this doesn't change server is not responding)"}
      </h1>
    </div>
  );
};

export default App;
