package com.hotelmanagement.dao;

import com.hotelmanagement.model.Customer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDAO {
    private final JdbcTemplate jdbcTemplate;

    public CustomerDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Customer> customerRowMapper = (rs, rowNum) -> {
        return new Customer(
                rs.getInt("Customer_ID"),
                rs.getString("Customer_Name"),
                rs.getString("Customer_Email"),
                rs.getString("Customer_Phone"),
                rs.getDate("Customer_DOB") != null ? rs.getDate("Customer_DOB").toLocalDate() : null
        );
    };

    public List<Customer> getAllCustomers() {
        return jdbcTemplate.query("SELECT * FROM Customer", customerRowMapper);
    }

    public Customer getCustomerById(int id) {
        String sql = "SELECT * FROM Customer WHERE Customer_ID = ?";
        return jdbcTemplate.query(sql, customerRowMapper, id).stream().findFirst().orElse(null);
    }

    public void addCustomer(Customer customer) {
        String sql = "INSERT INTO Customer (Customer_Name, Customer_Email, Customer_Phone, Customer_DOB) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, customer.getCustomerName(), customer.getCustomerEmail(), customer.getCustomerPhone(), customer.getCustomerDob());
    }

    public void updateCustomer(Customer customer) {
        String sql = "UPDATE Customer SET Customer_Name = ?, Customer_Email = ?, Customer_Phone = ?, Customer_DOB = ? WHERE Customer_ID = ?";
        jdbcTemplate.update(sql, customer.getCustomerName(), customer.getCustomerEmail(), customer.getCustomerPhone(), customer.getCustomerDob(), customer.getCustomerId());
    }

    public void deleteCustomer(int id) {
        String sql = "DELETE FROM Customer WHERE Customer_ID = ?";
        jdbcTemplate.update(sql, id);
    }
}
