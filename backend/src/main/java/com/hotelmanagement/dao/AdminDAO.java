package com.hotelmanagement.dao;

import com.hotelmanagement.model.Admin;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class AdminDAO {
    private final JdbcTemplate jdbcTemplate;

    public AdminDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Admin> adminRowMapper = (rs, rowNum) -> {
        return new Admin(
                rs.getInt("Admin_ID"),
                rs.getString("Username"),
                rs.getString("Password")
        );
    };

    public Admin getAdminByUsername(String username) {
        String sql = "SELECT * FROM Admin WHERE Username = ?";
        return jdbcTemplate.query(sql, adminRowMapper, username).stream().findFirst().orElse(null);
    }
}
