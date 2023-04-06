import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React , { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Searches from '../pages/Searches';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;



const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 7px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "90px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
   font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();

    axios.get(`http://localhost:9093/product/search/${searchInput}`)
      .then(response => {
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
  return (
    <Container>
      <Wrapper>
        <Left>
        {/* <MenuItem>
          <Link to="/Searches">
          SEARCH
          </Link>
          </MenuItem> */}
          {/* <form onSubmit={handleSearch}>
            <input type="text" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
            <button type="submit">Search</button>
          </form> */}
          <Searches />
        </Left>
        <Center>
          <Logo>STL<i>fashion.</i></Logo>
        </Center>
        <Right>
          <MenuItem>
          <Link to="/Login">
          LOGOUT
          </Link>
          </MenuItem>
          <MenuItem>
          <Link to="/Register">
          SIGN IN
          </Link>
          </MenuItem>
          <MenuItem><Link to="/Cart">
            <Badge badgeContent={0} color="primary">
              <ShoppingCartOutlined />
            </Badge></Link>
          </MenuItem>
        </Right>
      </Wrapper>
      <ul>
        {searchResults.map(result => (
          <li key={result.id}>
            <img src={result.prod_image} alt={result.name} />
            <p>{result.prod_name}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Navbar;
