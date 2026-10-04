package com.hotelmanagement.controller;

import com.hotelmanagement.model.Payment;
import com.hotelmanagement.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    @PostMapping
    public ResponseEntity<String> createPayment(@RequestBody Payment payment) {
        try {
            paymentService.createPayment(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body("Payment processed successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/booking/{id}")
    public ResponseEntity<Payment> getPaymentByBookingId(@PathVariable int id) {
        Payment payment = paymentService.getPaymentByBookingId(id);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        }
        return ResponseEntity.notFound().build();
    }
}
