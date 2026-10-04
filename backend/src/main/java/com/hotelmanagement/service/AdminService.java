package com.hotelmanagement.service;

import com.hotelmanagement.dao.AdminDAO;
import com.hotelmanagement.model.Admin;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private final AdminDAO adminDAO;

    public AdminService(AdminDAO adminDAO) {
        this.adminDAO = adminDAO;
    }

    public boolean login(String username, String password) {
        if (username == null || password == null) {
            return false;
        }
        
        Admin admin = adminDAO.getAdminByUsername(username);
        if (admin != null) {
            // Note: In a production environment, you would use password hashing (e.g., BCrypt)
            return password.equals(admin.getPassword());
        }
        return false;
    }
}
