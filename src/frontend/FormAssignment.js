import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function FormAssignment() {
  // State part start here//

  let nagivate = useNavigate();
  const [inputValue, setInputvalue] = useState({
    userId: "",
    title: "",
    body: "",
  });
  const [validation, setValidation] = useState({
    userId: "",
    title: "",
    body: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState(null);

  //end of state part

  //   Functional part start here

  //validation for input field
  const checkValidation = () => {
    let message = {};

    if (!inputValue.userId.trim()) {
      message.userId = "userId is required";
    } else {
      message.userId = "";
      setIsSubmit(false);
    }

    if (!inputValue.title.trim()) {
      message.title = "title is required";
    } else {
      message.title = "";
      setIsSubmit(false);
    }

    if (!inputValue.body.trim()) {
      message.body = "body is required";
    } else {
      message.body = "";
      setIsSubmit(false);
    }

    console.log(("message", message));
    setValidation(message);
    return;
  };

  // Validation part end here

  //validation for image start here
  const validateImage = () => {
    console.log("we are trying to find out the length", images.length);
    if (images.length < 1) {
      setImageErrors("File is required");
      setIsSubmit(false);
    } else {
      setImageErrors("");
      setIsSubmit(true);
    }
    return;
  };

  //validation for image end here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputValue, [name]: value });
  };
  ///\.(jpeg|jpg|png|gif)$/
  const onImageChange = (e) => {
    let file = e.target.files[0];
    console.log("images", file);
    setImages(URL.createObjectURL(file));
    if (!file.name.match(/\.(jpg|png)$/)) {
      alert("file is not supported");
      return false;
    }
    if (file.size > 100000) {
      alert("file size is max");
    }
    return false;
  };
  console.log("photo", imageErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkValidation();
    validateImage();

    if (isSubmit) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      }).then((data) => {
        console.log("data is sent successfully", data);
      });
    }
    console.log("validation==>", validation);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data) => setData(data.slice(90, 100)));
  }, []);

  function deleteData(id) {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => console.log("data"));
  }

  //end of functional part

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="row">
          <div className="col-lg-8 signup">
            <form className="sign-form">
              <div className="form-group">
                <label htmlFor="name">userId</label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  className="form-control"
                  value={inputValue.userId}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {validation.userId && (
                <p className="alert alert-danger">{validation.userId}</p>
              )}

              <div className="form-group">
                <label htmlFor="country">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={inputValue.title}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {validation.title && (
                <p className="alert alert-danger">{validation.title}</p>
              )}

              <div className="form-group">
                <label htmlFor="logo">Body</label>
                <input
                  type="text"
                  id="body"
                  name="body"
                  className="form-control"
                  value={inputValue.body}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {validation.body && (
                <p className="alert alert-danger">{validation.body}</p>
              )}
              <div className="form-group">
                <label htmlFor="file">File</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="form-control"
                  onChange={(e) => onImageChange(e)}
                />
                <img src={images} />
                <img src={images} />
                <img src={images} />
              </div>
              {imageErrors}

              <button onClick={handleSubmit}>Post Data</button>
            </form>
          </div>
        </div>
      </div>
      <table className="table">
        <tr>
          <th>UserId</th>
          <th>Title</th>
          <th>Body</th>
          <th>Action</th>
          <th>Delete</th>
        </tr>

        {data &&
          data.map((item) => {
            return (
              <>
                <tr>
                  <td>{item.userId} </td>
                  <td>{item.title}</td>
                  <td> {item.body}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => nagivate(`/updatepage?id=${item.id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteData(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </>
  );
}
export default FormAssignment;
