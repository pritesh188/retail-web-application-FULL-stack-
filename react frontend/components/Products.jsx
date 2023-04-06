import styled from "styled-components";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
 
  
`;

const Products = () => {
  const [ProductList, setProductList] = useState([]);

  useEffect(() => {
    fetchapi();
  }, []);

  const fetchapi = () => {
    fetch("http://localhost:8084/product/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProductList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {ProductList.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Container>
              <Product item={item} />
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
