package com.sagemcom.Controllers;

import com.sagemcom.Entities.User;
import com.sagemcom.Services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String loginEmail, @RequestParam String password) {
        User user;
        Map<String, String> response = new HashMap<>();

        try {
            if (loginEmail.contains("@") && loginEmail.contains(".")) {
                user = userService.findByEmail(loginEmail);
            } else {
                user = userService.findByLogin(loginEmail);
            }
        } catch (EntityNotFoundException e) {
            response.put("message", "Invalid login or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (password.equals(user.getMdp())) {
            response.put("message", "Login successful");
            response.put("role", user.getRole().toString());

            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid login or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
