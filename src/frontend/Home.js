import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  let navigate = useNavigate();
  let [datalist, setDataList] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setDataList(data));
  }, []);

  const [userLogged, setuserLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("name")) {
      setuserLogged(true);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {userLogged ? (
        <div className="container">
          <Navbar />
          <div className="row">
            <div className="col-md-12">
              {datalist &&
                datalist.map((obj) => {
                  return (
                    <>
                      {" "}
                      <h2> {obj.title}</h2>
                      <p className="lead">by Author</p>
                      <p>
                        <span className="glyphicon glyphicon-time"></span>{" "}
                        Posted on August 28, 2013 at 10:00 PM
                      </p>{" "}
                      {obj.body}
                      <br />
                      <a
                        className="btn btn-default"
                        to="/post"
                        onClick={() => {
                          navigate(`/post?id=${obj.id}`);
                        }}
                      >
                        Read More
                      </a>
                      <hr />
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default Home;
