package com.hotelmanagement.model;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Payment {
    private Integer transactionId;
    private Integer bookingId;
    private String paymentMethod;
    private LocalDate paymentDate;
    private String paymentStatus;
    private BigDecimal paymentAmount;

    public Payment() {
    }

    public Payment(Integer transactionId, Integer bookingId, String paymentMethod, LocalDate paymentDate, String paymentStatus, BigDecimal paymentAmount) {
        this.transactionId = transactionId;
        this.bookingId = bookingId;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.paymentStatus = paymentStatus;
        this.paymentAmount = paymentAmount;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Integer transactionId) {
        this.transactionId = transactionId;
    }

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }
}
