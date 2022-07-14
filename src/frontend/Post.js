import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Post() {
  // STATES
  const [data, setData] = useState(null);

  let [comment, setComment] = useState([]);

  // QUERY PARAMS
  const location = useLocation();
  const searchs = new URLSearchParams(location.search);
  const id = searchs.get("id");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((resp) => resp.json())
      .then((data) => setComment(data));
  }, []);
  console.log(comment, "this is my comment");

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="row">
          <div className="col-lg-12">
            <h1 className="post-title">Blog Post Title</h1>

            <p className="lead">by Author</p>

            <hr />

            <p>
              <span className="glyphicon glyphicon-time"></span> Posted on
              August 24, 2013 at 9:00 PM
            </p>

            <hr />

            {data?.body}

            <hr />

            <div className="well">
              <h4>Leave a Comment:</h4>
              <form>
                <div className="form-group">
                  <textarea className="form-control" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>

            <hr />
            {comment &&
              comment.map((item) => {
                return (
                  <>
                    Name :{item.name} <br /> Email: {item.email} <br /> Body:
                    {item.body}
                    <br />
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Post;
