package com.hotelmanagement.dao;

import com.hotelmanagement.model.Booking;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookingDAO {
    private final JdbcTemplate jdbcTemplate;

    public BookingDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Booking> bookingRowMapper = (rs, rowNum) -> {
        return new Booking(
                rs.getInt("Booking_ID"),
                rs.getInt("Customer_ID"),
                rs.getDate("Booking_Date").toLocalDate(),
                rs.getDate("Check_In_Date").toLocalDate(),
                rs.getDate("Check_Out_Date").toLocalDate(),
                rs.getString("Room_Number"),
                rs.getString("Booking_Status")
        );
    };

    public List<Booking> getAllBookings() {
        return jdbcTemplate.query("SELECT * FROM Booking", bookingRowMapper);
    }

    public void addBooking(Booking booking) {
        String sql = "INSERT INTO Booking (Customer_ID, Booking_Date, Check_In_Date, Check_Out_Date, Room_Number, Booking_Status) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, booking.getCustomerId(), booking.getBookingDate(), booking.getCheckInDate(), booking.getCheckOutDate(), booking.getRoomNumber(), booking.getBookingStatus());
    }

    public void updateBookingStatus(int bookingId, String status) {
        String sql = "UPDATE Booking SET Booking_Status = ? WHERE Booking_ID = ?";
        jdbcTemplate.update(sql, status, bookingId);
    }
}
