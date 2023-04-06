import React from 'react';
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

const Container = styled.div`;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductColor = styled.div`
width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ResultPage = (props) => {
  const { results } = props.location.state;

  return (
    <Container>
         <Navbar />
         <Wrapper>
        <Product>
        {results.map(result => (
            <ProductDetail key={result.id}>
          <Image src={result.prod_image} alt={result.name} />
          <Details>
                  <ProductName>
                 < b>Product:</b> {result.prod_name}
                  </ProductName>
                  <ProductId>
                  <b>ID:</b> {result.prod_id}
                  </ProductId>
                  <ProductAmount> <b>Price:</b>{result.prod_price}</ProductAmount>
            
                  </Details>
          </ProductDetail>
        ))}
            
              
             
            </Product>
            </Wrapper>
            <Footer />
    </Container>
  );
};

export default ResultPage;
