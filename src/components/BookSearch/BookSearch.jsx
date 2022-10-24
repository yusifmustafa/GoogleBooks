import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

function BookSearch() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  console.log("data", data);
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
    const searchData = data.Books.filter((item) =>
      item.title?.includes(search)
    );
    //const pushData = data.Books.push(searchData);
    data.Books = searchData;
    setData(data);
    console.log("dadadadada", data);
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
            <Input
              name="search"
              placeholder="Book Search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
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
        {(data.Books ? data.Books : []).map((item, key) => (
          <div key={item.id}>
            <Card
              style={{
                width: "300px",
                margin: "1rem",
                height:"600px"
              }}
            >
              <CardImg
                src={item.imgUrl}
                alt={item.title}
                style={{ width: "auto", height: "260px" }}
              />
              <CardHeader>
                <h3>{item.author}</h3>
              </CardHeader>
              <CardBody>
                <CardTitle>review ({item.review})</CardTitle>

                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {item.title}
                </CardSubtitle>
                <CardDeck style={{ letterSpacing: "1.5px" }}>
                  <small>price({item.price})</small>
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
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookSearch;
