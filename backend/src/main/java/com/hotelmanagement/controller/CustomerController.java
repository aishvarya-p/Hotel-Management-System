package com.hotelmanagement.controller;

import com.hotelmanagement.model.Customer;
import com.hotelmanagement.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<String> addCustomer(@RequestBody Customer customer) {
        try {
            customerService.addCustomer(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body("Customer added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        try {
            customer.setCustomerId(id);
            customerService.updateCustomer(customer);
            return ResponseEntity.ok("Customer updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable int id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted successfully");
    }
}
