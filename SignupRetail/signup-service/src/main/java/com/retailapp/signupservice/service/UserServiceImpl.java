package com.retailapp.signupservice.service;

import java.util.Map;
import java.util.Objects;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.retailapp.signupservice.POJO.User;
import com.retailapp.signupservice.dao.UserDao;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserDao userDao;
	@Override
	public ResponseEntity<String> signUp(Map<String, String> requestMap) {
	  try
	  {
		System.out.println("Inside UserServiceImpl" + requestMap);
	
		User user = userDao.findByEmailId(requestMap.get("email"));
		
		if(Objects.isNull(user))
		{
		userDao.save(getUserFromMap(requestMap));
		return new ResponseEntity<String>("{\"message\":\"SucessFully Registered\"}",HttpStatus.OK);
		}
		else
		{
			 return new ResponseEntity<String>("{\"message\":\"Email Already Exists\"}",HttpStatus.BAD_REQUEST);
		}
//		
//		else
//		{
//			 return new ResponseEntity<String>("{\"message\":\"Invalid Data\"}",HttpStatus.BAD_REQUEST);
//		}
	  }
	  catch(Exception ex)
	  {
		  ex.printStackTrace();
	  }
	  return new ResponseEntity<String>("{\"message\":\"something went Wrong\"}",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	private boolean validateSignupMap(Map<String,String>requestMap)
	{
		if(requestMap.containsKey("name") && requestMap.containsKey("contactNumber") && requestMap.containsKey("email")
				&& requestMap.containsKey("password"))
		{
			return true;
		}
		else {
		return false;
		}
	}
	
	private User getUserFromMap(Map<String, String>requestMap)
	{
		User user = new User();
		user.setName(requestMap.get("name"));
		user.setContactNumber(requestMap.get("contactNumber"));
		user.setEmail(requestMap.get("email"));
		user.setPassword(requestMap.get("password"));
		return user;
	}

	@Override
	public ResponseEntity<Integer> getCartId(String email) {
		try {
			User user = userDao.findByEmailId(email);
			System.out.println("userid = "+user.getId());
			return new ResponseEntity<>( user.getId(),HttpStatus.OK);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		return new ResponseEntity<Integer>(-1,HttpStatus.BAD_REQUEST);
	}

}
