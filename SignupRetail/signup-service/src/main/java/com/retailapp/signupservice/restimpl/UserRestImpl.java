package com.retailapp.signupservice.restimpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.retailapp.signupservice.rest.UserRest;
import com.retailapp.signupservice.service.UserService;

@RestController
public class UserRestImpl implements UserRest{

	@Autowired
	UserService userService;
	@Override
	public ResponseEntity<String> signup(Map<String, String> requestMap) {
		try
		{
			return userService.signUp(requestMap);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		}
	 return new ResponseEntity<String>("{\"message\":\"something went Wrong\"}",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@Override
	public ResponseEntity<Integer> getCartId(String email) {
		
		return userService.getCartId(email);
	}

}
