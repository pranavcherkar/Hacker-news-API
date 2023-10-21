import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  //getting item details
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
      <div className="container-details">
        <div className="container-main">
          {/* Main details */}
          <h1>{items.title}</h1>
          <h2>Points: {items.points}</h2>
          <p>{items.text}</p>
          <Link to={items.url}>
            <h4>Source</h4>
          </Link>
        </div>
        <div className="mt-3 com-main p-2">
          {/* Comments */}
          <h6>COMMENTS:</h6>
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
      </div>
    </>
  );
};

export default Details;
