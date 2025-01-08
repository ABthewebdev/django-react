import { useEffect, useState } from "react";
import api from "../api";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  function getNote() {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data));
  }
  return <div>Home</div>;
}
