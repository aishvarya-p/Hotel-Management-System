package com.hotelmanagement.controller;

import com.hotelmanagement.model.Room;
import com.hotelmanagement.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @PutMapping("/{roomNumber}/status")
    public ResponseEntity<String> updateRoomStatus(@PathVariable String roomNumber, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().body("Status is missing in request body");
        }
        roomService.updateRoomStatus(roomNumber, status);
        return ResponseEntity.ok("Room status updated successfully");
    }
}
