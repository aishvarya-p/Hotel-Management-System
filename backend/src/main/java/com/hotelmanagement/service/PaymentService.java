package com.hotelmanagement.service;

import com.hotelmanagement.dao.PaymentDAO;
import com.hotelmanagement.model.Payment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {
    private final PaymentDAO paymentDAO;

    public PaymentService(PaymentDAO paymentDAO) {
        this.paymentDAO = paymentDAO;
    }

    public List<Payment> getAllPayments() {
        return paymentDAO.getAllPayments();
    }

    public void createPayment(Payment payment) {
        if (payment == null) {
            throw new IllegalArgumentException("Payment cannot be null");
        }
        if (payment.getPaymentAmount() == null || payment.getPaymentAmount().doubleValue() < 0) {
            throw new IllegalArgumentException("Invalid payment amount");
        }
        paymentDAO.addPayment(payment);
    }

    public Payment getPaymentByBookingId(int bookingId) {
        return paymentDAO.getPaymentByBookingId(bookingId);
    }
}
