package com.hotelmanagement.service;

import com.hotelmanagement.dao.RoomDAO;
import com.hotelmanagement.model.Room;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomDAO roomDAO;

    public RoomService(RoomDAO roomDAO) {
        this.roomDAO = roomDAO;
    }

    public List<Room> getAllRooms() {
        return roomDAO.getAllRooms();
    }

    public List<Room> getAvailableRooms() {
        return roomDAO.getAvailableRooms();
    }

    // Using String for roomNumber to match the model and database schema (VARCHAR(20))
    public void updateRoomStatus(String roomNumber, String status) {
        if (roomNumber == null || status == null) {
            throw new IllegalArgumentException("Room number and status must not be null");
        }
        roomDAO.updateRoomStatus(roomNumber, status);
    }
}
