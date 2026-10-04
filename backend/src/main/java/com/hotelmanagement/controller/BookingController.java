package com.hotelmanagement.controller;

import com.hotelmanagement.model.Booking;
import com.hotelmanagement.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PostMapping
    public ResponseEntity<String> createBooking(@RequestBody Booking booking) {
        try {
            bookingService.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED).body("Booking created successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateBookingStatus(@PathVariable int id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().body("Status is missing in request body");
        }
        bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok("Booking status updated successfully");
    }
}
