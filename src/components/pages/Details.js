import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../pages/Comments";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
const Details = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
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
      <p>{items.points}</p>
      <p>{items.text}</p>
      <h4>{items.url}</h4>
      <div className="mt-3 p-4">
        <h6>Comments:</h6>
        {loading ? (
          <div style={style}>
            <TailSpin height="80" color="green" />
          </div>
        ) : (
          <div className="comments-div">
            <ul>
              {items.children &&
                items.children.map((comment) => (
                  <Comments key={comment.id} comment={comment} />
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Details;
