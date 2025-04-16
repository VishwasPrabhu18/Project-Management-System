package com.vishwasprabhu18.impl;

import com.vishwasprabhu18.config.JwtProvider;
import com.vishwasprabhu18.modal.User;
import com.vishwasprabhu18.repository.UserRepository;
import com.vishwasprabhu18.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email = JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new Exception("user not found");
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isEmpty()){
            throw new Exception("user not found");
        }
        return optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) throws Exception {
        user.setProjectSize(user.getProjectSize() + number);

        return userRepository.save(user);
    }

    @Service
    public static class CustomUserDetailsImpl implements UserDetailsService {
        @Autowired
        private UserRepository userRepository;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userRepository.findByEmail(username);

            if(user == null) {
                throw new UsernameNotFoundException("User not found with email: " + username);
            }

            List<GrantedAuthority> authorities = new ArrayList<>();

            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
        }
    }
}
