import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { format } from "date-fns";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("science");

  const [loading, setLoading] = useState(true);
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  //getting data through query
  useEffect(() => {
    setLoading(true);
    const getArticles = async () => {
      try {
        const res = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=${query}`
        );
        const data = res.data;
        setItems(data.hits);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getArticles();
    setLoading(false);
  }, [query]);
  return (
    <div className="card-main">
      {/* Form  */}
      <div className="row justify-content-center mt-2">
        <div className="col-12 col-md-10 col-lg-8">
          <form className="card card-sm">
            <div className="card-body row no-gutters align-items-center">
              <div className="col-auto">
                <i className="fas fa-search h4 text-body" />
              </div>
              <div className="col">
                <input
                  className="form-control form-control-lg form-control-borderless"
                  type="search"
                  placeholder="Search topics"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="col-auto">
                <button className="btn btn-lg btn-dark" type="submit">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <div style={style}>
          <TailSpin height="80" color="green" />
        </div>
      ) : (
        items.map(({ author, created_at, title, url, objectID, value }) => (
          <div className="card-news" key={objectID}>
            {/* Card details */}
            <Link className="text-decoration-none" to={`/details/${objectID}`}>
              <h3>{title}</h3>
              <p>{value}</p>
              <div className="card-author">
                <p>By {author}</p>
              </div>
            </Link>
            <div className="card-end">
              <p className="card-date">
                created at
                {format(new Date(created_at), " dd MMM yyy")}
              </p>

              <Link to={url}>
                <div className="link-read">source</div>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HomePage;
