"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const getMessage = async () => {
      const res = await fetch("http://localhost:8000/hello_word").then((res) =>
        res.json(),
      );

      setMessage(await res.data);
    };
    getMessage();
  }, []);

  return (
    <div>
      AAAA
      {message}
    </div>
  );
};

export default Home;
