package com.hotelmanagement.dao;

import com.hotelmanagement.model.Room;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomDAO {
    private final JdbcTemplate jdbcTemplate;

    public RoomDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Room> roomRowMapper = (rs, rowNum) -> {
        return new Room(
                rs.getString("Room_Number"),
                rs.getString("Room_Type"),
                rs.getString("Room_Status")
        );
    };

    public List<Room> getAllRooms() {
        return jdbcTemplate.query("SELECT * FROM Room", roomRowMapper);
    }

    public List<Room> getAvailableRooms() {
        return jdbcTemplate.query("SELECT * FROM Room WHERE Room_Status = 'Available'", roomRowMapper);
    }

    public void addRoom(Room room) {
        String sql = "INSERT INTO Room (Room_Number, Room_Type, Room_Status) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, room.getRoomNumber(), room.getRoomType(), room.getRoomStatus());
    }

    // Using String for roomNumber to match the model and database schema (VARCHAR(20))
    public void updateRoomStatus(String roomNumber, String status) {
        String sql = "UPDATE Room SET Room_Status = ? WHERE Room_Number = ?";
        jdbcTemplate.update(sql, status, roomNumber);
    }
}
