import React, { useEffect, useState } from "react";

function Postdata() {
  // State part

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
  const [images, setImages] = useState([]);
  const [imageErrors, setImageErrors] = useState(null);
  const [data, setData] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  //   Functional part starts

  //validation
  const checkValidation = () => {
    let message = { ...validation };

    if (inputValue.userId === "") {
      message.userId = "userId is required";
    } else {
      message.userId = "";
    }

    if (inputValue.title === "") {
      message.title = "title is required";
    } else {
      message.title = "";
    }
    if (inputValue.body === "") {
      message.body = "body is required";
    } else {
      message.body = "";
      setIsSubmit(true);
    }

    return message;
  };
  //End of validation

  //for fetching image

  const onImageChange = (e) => {
    console.log("images", e.target.files);
    setImages(URL.createObjectURL(e.target.files[0]));
  };

  const validateImage = () => {
    if (images.length < 1) {
      setImageErrors("File is required");
      setIsSubmit(false);
    } else {
      setImageErrors("");
      setIsSubmit(true);
    }

    return;
  };
  console.log("we are trying to find out the length", images.length);
  
  //end of fetching image

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputvalue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(checkValidation());
    validateImage();
    if (isSubmit) {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue, images),
      }).then((data) => {
        console.log("data is sent successfully", data);
      });
    }
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }, []);

  //End of Functional part

  return (
    <>
      <div className="container">
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
                  value={inputValue.userId}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {validation?.userId !== "" && <p>{validation?.userId}</p>}
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
              {validation.title && <p>{validation.title}</p>}
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
              {validation.body && <p>{validation.body}</p>}

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
              </div>
              {imageErrors}

              <button onClick={handleSubmit}>Post Data</button>
            </form>
          </div>
        </div>
        {data &&
          data.map((item) => {
            return (
              <>
                UserId-- {item.userId} <hr /> Title-- {item.title} <hr /> Body--
                {item.body} <hr />
              </>
            );
          })}
      </div>
    </>
  );
}
export default Postdata;
