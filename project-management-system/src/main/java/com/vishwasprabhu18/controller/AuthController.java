package com.vishwasprabhu18.controller;

import com.vishwasprabhu18.config.JwtProvider;
import com.vishwasprabhu18.impl.UserServiceImpl;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.repository.UserRepository;
import com.vishwasprabhu18.request.LoginRequest;
import com.vishwasprabhu18.response.AuthResponse;
import com.vishwasprabhu18.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserServiceImpl.CustomUserDetailsImpl customUserDetails;

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> sign_up(@RequestBody User user) throws Exception {
        User isUserExist = userRepository.findByEmail(user.getEmail());
        if (isUserExist != null) {
            throw new Exception("Email already exist with another account!");
        }

        User createdUser = new User();
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());

        User savedUser = userRepository.save(createdUser);

        subscriptionService.createSubscription(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setMessage("Signup Success");
        response.setJwt(jwt);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> sign_in(@RequestBody LoginRequest loginRequest) throws Exception {
        String userName = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(userName, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = JwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setMessage("Signin Success");
        response.setJwt(jwt);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);

    }

    private Authentication authenticate(String userName, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(userName);
        if (userDetails == null ||
            !passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("invalid username or password!");
        }

        return new UsernamePasswordAuthenticationToken(userName, null, userDetails.getAuthorities());
    }
}
