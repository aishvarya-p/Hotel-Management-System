package com.hotelmanagement.dao;

import com.hotelmanagement.model.Payment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PaymentDAO {
    private final JdbcTemplate jdbcTemplate;

    public PaymentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Payment> paymentRowMapper = (rs, rowNum) -> {
        return new Payment(
                rs.getInt("Transaction_ID"),
                rs.getInt("Booking_ID"),
                rs.getString("Payment_Method"),
                rs.getDate("Payment_Date").toLocalDate(),
                rs.getString("Payment_Status"),
                rs.getBigDecimal("Payment_Amount")
        );
    };

    public List<Payment> getAllPayments() {
        return jdbcTemplate.query("SELECT * FROM Payment", paymentRowMapper);
    }

    public void addPayment(Payment payment) {
        String sql = "INSERT INTO Payment (Booking_ID, Payment_Method, Payment_Date, Payment_Status, Payment_Amount) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, payment.getBookingId(), payment.getPaymentMethod(), payment.getPaymentDate(), payment.getPaymentStatus(), payment.getPaymentAmount());
    }

    public Payment getPaymentByBookingId(int bookingId) {
        String sql = "SELECT * FROM Payment WHERE Booking_ID = ?";
        return jdbcTemplate.query(sql, paymentRowMapper, bookingId).stream().findFirst().orElse(null);
    }
}
