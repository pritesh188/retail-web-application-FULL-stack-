import styled from "styled-components";
import axios from 'axios';
import React, { useState } from 'react';
import {mobile} from "../responsive";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


// import 'react-toastr/lib/toast.css';

// import { useHistory } from 'react-router-dom';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Login = () => {
  // const history = useHistory();

  // const handleLogin = () => {
  //   // do login logic
  //   history.push('/Home');
  // };
  // let Navigate=useNavigate();

  const history = useHistory();
  const [user,setUser]=useState({
    email:"",
    password:""
});
const {email,password}=user;
const onInputChange=(e)=>{
    setUser({...user, [e.target.name]:e.target.value});

};

const onSubmit=async (e)=>{
  e.preventDefault();
  await axios.post("http://localhost:8092/user/login", user)
  .then((res)=>{
      console.log(res)
      if(res!=null){
      localStorage.setItem("token",res.data);
      console.log(res);
      history.push("/Home");
  }
  }); 
  // ReactRouterDom.useNavigate()("/Home");
};



  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={(e)=>onSubmit(e)}>
        <Input 
                   type={"email"}
                   className='form-control'
                   placeholder='email'
                   name='email' 
                   value={email} 
                   onChange={(e)=>onInputChange(e)} required></Input>
          <Input 
                   type={"Required"}
                   className='form-control'
                   placeholder='Password'
                   name='password' 
                   value={password}
                   onChange={(e)=>onInputChange(e)} required></Input>
          
          
            <Button type="Submit"> Login</Button>
          
            <Link to="/Register">
            CREATE A NEW ACCOUNT
          </Link>
         
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
