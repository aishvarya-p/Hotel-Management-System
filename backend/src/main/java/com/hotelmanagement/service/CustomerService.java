package com.hotelmanagement.service;

import com.hotelmanagement.dao.CustomerDAO;
import com.hotelmanagement.model.Customer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerDAO customerDAO;

    public CustomerService(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    public List<Customer> getAllCustomers() {
        return customerDAO.getAllCustomers();
    }

    public Customer getCustomerById(int id) {
        return customerDAO.getCustomerById(id);
    }

    public void addCustomer(Customer customer) {
        if (customer == null) {
            throw new IllegalArgumentException("Customer cannot be null");
        }
        customerDAO.addCustomer(customer);
    }

    public void updateCustomer(Customer customer) {
        if (customer == null || customer.getCustomerId() == null) {
            throw new IllegalArgumentException("Customer and Customer ID cannot be null");
        }
        customerDAO.updateCustomer(customer);
    }

    public void deleteCustomer(int id) {
        customerDAO.deleteCustomer(id);
    }
}
