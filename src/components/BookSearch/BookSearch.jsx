import React, { useEffect, useState, useRef } from "react";
import "./BookSearch.css";
import {
  InputGroup,
  Input,
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  CardImg,
  CardHeader,
  CardDeck,
  CardLink,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import { Navigate } from "react-router-dom";

function BookSearch() {
  const searchValue = useRef();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); 

  if (setSearch === "") {
    Navigate("/navigate");
  }

  useEffect(() => {
    axios
      .get("https://bookshelves.p.rapidapi.com/books", {
        headers: {
          "X-RapidAPI-Key":
            "a18cefbad5msh1c47dbc94c9776bp1762bfjsnfaec2a36d253",
          "X-RapidAPI-Host": "bookshelves.p.rapidapi.com",
        },
      })
      .then((rsp) => setData(rsp.data));
  }, []);

  const handleOnClick = () => { 
    setSearch(searchValue.current.value);
  };

  const mainHeader = () => {
    return (
      <div
        id="main-image"
        className="main-image d-flex justify-content-center align-items-center flex-column"
      >
        <div className="filter">
          <h1 className="display-2 text-center text-white mb-3">
            Google Books
          </h1>
        </div>
        <div style={{ width: "60%", zIndex: 2, display: "flex" }}>
          <InputGroup>
            <input
              name="search"
              className="form-control"
              placeholder="Book Search"
              type="text"
              ref={searchValue}
              // onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button
            color="secondary"
            onClick={handleOnClick}
            style={{ outline: "none", boxShadow: "none" }}
          >
            <BsSearch aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {mainHeader()}
      <div id="books">
        {(data.Books ? data.Books : [])
          .filter((item) =>
            item?.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item, key) => (
            <div key={item.id} id="cards">
              <Card
                style={{
                  width: "300px",
                  margin: "1rem",
                  height: "650px",
                  marginTop: "1.5rem",
                }}
              >
                <CardImg
                  src={item.imgUrl}
                  alt={item.title}
                  style={{ width: "auto", height: "260px" }}
                />
                <CardHeader
                  style={{
                    background: "#4193C0",
                    color: "#fff",
                    letterSpacing: "1.2px",
                  }}
                >
                  <h4>{item.author}</h4>
                </CardHeader>
                <CardBody>
                  <CardTitle className="badge badge-warning">
                    review ({item.review})
                  </CardTitle>

                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.title}
                  </CardSubtitle>
                  <CardDeck style={{ letterSpacing: "1.5px" }}>
                    <small className="badge badge-info">
                      price({item.price})
                    </small>
                  </CardDeck>
                  <CardText
                    style={{
                      letterSpacing: "1px",
                      height: "95px",
                      overflow: "hidden",
                    }}
                    title={item.description}
                  >
                    {item.description}
                  </CardText>
                  <CardLink>
                    <a
                      style={{ color: "seagreen", float: "left" }}
                      href={item.source}
                    >
                      {item.source}
                    </a>
                  </CardLink>
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BookSearch;
