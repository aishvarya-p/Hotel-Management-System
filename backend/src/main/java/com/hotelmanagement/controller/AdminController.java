package com.hotelmanagement.controller;

import com.hotelmanagement.model.Admin;
import com.hotelmanagement.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        boolean isValid = adminService.login(admin.getUsername(), admin.getPassword());
        if (isValid) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
