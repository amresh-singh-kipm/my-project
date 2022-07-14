import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Updatepage = () => {
  const location = useLocation();
  const searchs = new URLSearchParams(location.search);
  const id = searchs.get("id");
  const [data, setData] = useState({ userId: "", title: "", body: "" });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);
  console.log("data", data);

  return (
    <div className="container">
        <Navbar/>
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8 signup">
          <form className="sign-form">
            <div className="form-group">
              <label htmlFor="name">userId</label>
              <input
                type="text"
                name="userId"
                id="userId"
                className="form-control"
                value={data?.userId}
                // onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={data?.title}
                onChange={(e) => (setData.userId(e.target.title))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo">Body</label>
              <input
                type="text"
                id="body"
                name="body"
                className="form-control"
                value={data?.body}
                // onChange={(e) => handleChange(e)}
              />
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updatepage;
