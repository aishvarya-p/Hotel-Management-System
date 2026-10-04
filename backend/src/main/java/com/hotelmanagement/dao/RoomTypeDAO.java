package com.hotelmanagement.dao;

import com.hotelmanagement.model.RoomType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoomTypeDAO {
    private final JdbcTemplate jdbcTemplate;

    public RoomTypeDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<RoomType> roomTypeRowMapper = (rs, rowNum) -> {
        return new RoomType(
                rs.getString("Room_Type"),
                rs.getInt("Capacity"),
                rs.getBigDecimal("Price_Per_Night")
        );
    };

    public List<RoomType> getAllRoomTypes() {
        return jdbcTemplate.query("SELECT * FROM Room_Type", roomTypeRowMapper);
    }
}
