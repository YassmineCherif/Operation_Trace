package com.sagemcom.Services;

import com.sagemcom.Entities.User;
import com.sagemcom.Repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByLogin(String login) {
        User user = userRepository.findByLogin(login);
        if (user == null) {
            throw new EntityNotFoundException("User not found with login: " + login);
        }
        return user;
    }

    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EntityNotFoundException("User not found with email: " + email);
        }
        return user;
    }

    public User saveUser(User user) {
        // No need to encode the password anymore
        return userRepository.save(user);
    }


    public List<String> getAllUserLogins() {
        return userRepository.findAllUserLogins(); // Fetch user logins from the repository
    }



}




