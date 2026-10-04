package com.hotelmanagement.model;

import java.math.BigDecimal;

public class RoomType {
    private String roomType;
    private Integer capacity;
    private BigDecimal pricePerNight;

    public RoomType() {
    }

    public RoomType(String roomType, Integer capacity, BigDecimal pricePerNight) {
        this.roomType = roomType;
        this.capacity = capacity;
        this.pricePerNight = pricePerNight;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public BigDecimal getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(BigDecimal pricePerNight) {
        this.pricePerNight = pricePerNight;
    }
}
