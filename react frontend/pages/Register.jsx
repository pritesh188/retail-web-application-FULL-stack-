import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';





const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;



const Register = () => {
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    contactNumber:"",
});
const [errors, setErrors] = useState({});

const history = useHistory();
const {name,email,password,contactNumber}=user;
const onInputChange=(e)=>{
  setUser({...user, [e.target.name]:e.target.value});

};

const onSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    await axios.post("http://localhost:8083/user/signup", user, {
      responseType: "text",
    });
    console.log(user);
    history.push("/Login");
    alert("User Registered Successfully");
  }
};



const validate = () => {
  let newErrors = {};

  // Check name field
  if (!name.trim()) {
    newErrors.name = "Name is required";
  }

  // Check email field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    newErrors.email = "Invalid email format";
  }

  // Check password field
  if (password.length < 5) {
    newErrors.password = "Password must be at least 5 characters long";
  }

  // Check phone number field
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(contactNumber)) {
    newErrors.contactNumber = "Invalid phone number format";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};







  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={(e)=>onSubmit(e)}>
        <Input
                       type={"text"}
                       className='form-control'
                       placeholder='Enter your name'
                       name='name' 
                       value={name} 
                       onChange={(e)=>onInputChange(e)} />
                       {errors.name && <span className='text-danger'>{errors.name}</span>}
          <Input 
                       type={"email"}
                       className='form-control'
                       placeholder='Enter your email'
                       name='email' 
                       value={email}
                       onChange={(e)=>onInputChange(e)}></Input>
                                              {errors.email && <span className='text-danger'>{errors.email}</span>}
          <Input 
                       type={"password"}
                       className='form-control'
                       placeholder='Enter password'
                       name='password' 
                       value={password}
                       onChange={(e)=>onInputChange(e)}></Input>
                                              {errors.password && <span className='text-danger'>{errors.password}</span>}
          <Input 
                       type={"text"}
                       className='form-control'
                       placeholder='Enter Phone Number'
                       name='contactNumber' 
                       value={contactNumber}
                       onChange={(e)=>onInputChange(e)}></Input>
                                              {errors.contactNumber && <span className='text-danger'>{errors.contactNumber}</span>}
          
      
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;



//http://localhost:8083/user/signup