package com.hotelmanagement.model;

import java.time.LocalDate;

public class Customer {
    private Integer customerId;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private LocalDate customerDob;

    public Customer() {
    }

    public Customer(Integer customerId, String customerName, String customerEmail, String customerPhone, LocalDate customerDob) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.customerDob = customerDob;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public LocalDate getCustomerDob() {
        return customerDob;
    }

    public void setCustomerDob(LocalDate customerDob) {
        this.customerDob = customerDob;
    }
}
