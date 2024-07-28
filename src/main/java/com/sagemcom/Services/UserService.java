package com.sagemcom.Services;

import com.sagemcom.Repositories.UserRepository; // Import the repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository; // Inject the repository

    public List<String> getAllUserLogins() {
        return userRepository.findAllUserLogins(); // Fetch user logins from the repository
    }
}
