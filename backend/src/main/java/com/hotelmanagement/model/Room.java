package com.hotelmanagement.model;

public class Room {
    private String roomNumber;
    private String roomType;
    private String roomStatus;

    public Room() {
    }

    public Room(String roomNumber, String roomType, String roomStatus) {
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.roomStatus = roomStatus;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getRoomStatus() {
        return roomStatus;
    }

    public void setRoomStatus(String roomStatus) {
        this.roomStatus = roomStatus;
    }
}
