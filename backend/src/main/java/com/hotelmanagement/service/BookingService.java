package com.hotelmanagement.service;

import com.hotelmanagement.dao.BookingDAO;
import com.hotelmanagement.dao.RoomDAO;
import com.hotelmanagement.model.Booking;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {
    private final BookingDAO bookingDAO;
    private final RoomDAO roomDAO;

    public BookingService(BookingDAO bookingDAO, RoomDAO roomDAO) {
        this.bookingDAO = bookingDAO;
        this.roomDAO = roomDAO;
    }

    public List<Booking> getAllBookings() {
        return bookingDAO.getAllBookings();
    }

    @Transactional
    public void createBooking(Booking booking) {
        if (booking == null) {
            throw new IllegalArgumentException("Booking cannot be null");
        }
        
        // Basic date validation
        if (booking.getCheckInDate() == null || booking.getCheckOutDate() == null) {
            throw new IllegalArgumentException("Check-in and check-out dates must be provided");
        }
        if (booking.getCheckInDate().isAfter(booking.getCheckOutDate()) || booking.getCheckInDate().isEqual(booking.getCheckOutDate())) {
            throw new IllegalArgumentException("Check-in date must be before check-out date");
        }
        
        // Create the booking
        bookingDAO.addBooking(booking);
        
        // Update room status to occupied after booking
        if (booking.getRoomNumber() != null) {
            roomDAO.updateRoomStatus(booking.getRoomNumber(), "Occupied");
        }
    }

    @Transactional
    public void updateBookingStatus(int bookingId, String status) {
        if (status == null) {
            throw new IllegalArgumentException("Status cannot be null");
        }
        bookingDAO.updateBookingStatus(bookingId, status);
    }
}
