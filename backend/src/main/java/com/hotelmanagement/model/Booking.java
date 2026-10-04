package com.hotelmanagement.model;

import java.time.LocalDate;

public class Booking {
    private Integer bookingId;
    private Integer customerId;
    private LocalDate bookingDate;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String roomNumber;
    private String bookingStatus;

    public Booking() {
    }

    public Booking(Integer bookingId, Integer customerId, LocalDate bookingDate, LocalDate checkInDate, LocalDate checkOutDate, String roomNumber, String bookingStatus) {
        this.bookingId = bookingId;
        this.customerId = customerId;
        this.bookingDate = bookingDate;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.roomNumber = roomNumber;
        this.bookingStatus = bookingStatus;
    }

    public Integer getBookingId() {
        return bookingId;
    }

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
}
