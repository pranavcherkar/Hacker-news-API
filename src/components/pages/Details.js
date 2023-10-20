import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../pages/Comments";
import axios from "axios";
const Details = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const getArticles = async () => {
      try {
        const res = await axios.get(
          `https://hn.algolia.com/api/v1/items/${id}`
        );
        const data = res.data;
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getArticles();
    setLoading(false);
  }, [id]);
  return (
    <>
      <h1>{items.title}</h1>
      <h2>Comments:</h2>
      <ul>
        {items.children &&
          items.children.map((comment) => (
            <Comments key={comment.id} comment={comment} />
          ))}
      </ul>
    </>
  );
};

export default Details;
