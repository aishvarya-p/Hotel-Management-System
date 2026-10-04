-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS hotel_management_system;
USE hotel_management_system;

-- 1. Admin Table
CREATE TABLE IF NOT EXISTS Admin (
    Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL
);

-- 2. Customer Table
CREATE TABLE IF NOT EXISTS Customer (
    Customer_ID INT AUTO_INCREMENT PRIMARY KEY,
    Customer_Name VARCHAR(100) NOT NULL,
    Customer_Email VARCHAR(100) UNIQUE,
    Customer_Phone VARCHAR(20),
    Customer_DOB DATE
);

-- 3. Room_Type Table
CREATE TABLE IF NOT EXISTS Room_Type (
    Room_Type VARCHAR(50) PRIMARY KEY,
    Capacity INT NOT NULL,
    Price_Per_Night DECIMAL(10, 2) NOT NULL
);

-- 4. Room Table
CREATE TABLE IF NOT EXISTS Room (
    Room_Number VARCHAR(20) PRIMARY KEY,
    Room_Type VARCHAR(50) NOT NULL,
    Room_Status VARCHAR(20) NOT NULL DEFAULT 'Available',
    FOREIGN KEY (Room_Type) REFERENCES Room_Type(Room_Type)
);

-- 5. Booking Table
CREATE TABLE IF NOT EXISTS Booking (
    Booking_ID INT AUTO_INCREMENT PRIMARY KEY,
    Customer_ID INT NOT NULL,
    Booking_Date DATE NOT NULL,
    Check_In_Date DATE NOT NULL,
    Room_Number VARCHAR(20) NOT NULL,
    Check_Out_Date DATE NOT NULL,
    Booking_Status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (Customer_ID) REFERENCES Customer(Customer_ID),
    FOREIGN KEY (Room_Number) REFERENCES Room(Room_Number)
);

-- 6. Payment Table
CREATE TABLE IF NOT EXISTS Payment (
    Transaction_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_ID INT NOT NULL,
    Payment_Method VARCHAR(50),
    Payment_Date DATE NOT NULL,
    Payment_Status VARCHAR(20) NOT NULL,
    Payment_Amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (Booking_ID) REFERENCES Booking(Booking_ID)
);

-- ==========================================
-- Insert Sample Data safely
-- ==========================================

INSERT IGNORE INTO Admin (Admin_ID, Username, Password) VALUES
(1, 'admin', 'admin123');

INSERT IGNORE INTO Room_Type (Room_Type, Capacity, Price_Per_Night) VALUES
('Single', 1, 2500.00),
('Double', 2, 3500.00),
('Suite', 4, 6000.00);

INSERT IGNORE INTO Customer (Customer_ID, Customer_Name, Customer_Email, Customer_Phone, Customer_DOB) VALUES 
(1, 'Vihaan Singh', 'vihaan.singh1@example.com', '9819313985', '1978-05-22'),
(2, 'Aditya Reddy', 'aditya.reddy2@example.com', '9835808556', '1978-06-27'),
(3, 'Sai Bose', 'sai.bose3@example.com', '9893119344', '1985-06-06'),
(4, 'Arjun Mehta', 'arjun.mehta4@example.com', '9827339788', '1970-09-23'),
(5, 'Siddharth Joshi', 'siddharth.joshi5@example.com', '9866156797', '1988-12-13'),
(6, 'Rahul Yadav', 'rahul.yadav6@example.com', '9864133062', '1993-09-21'),
(7, 'Karan Verma', 'karan.verma7@example.com', '9863797629', '1979-11-23'),
(8, 'Rohit Kumar', 'rohit.kumar8@example.com', '9864374154', '1991-05-03'),
(9, 'Vikram Rao', 'vikram.rao9@example.com', '9846080884', '1997-04-04'),
(10, 'Neha Nair', 'neha.nair10@example.com', '9828381922', '1996-05-25'),
(11, 'Priya Shah', 'priya.shah11@example.com', '9883021362', '1974-05-01'),
(12, 'Anjali Bhatt', 'anjali.bhatt12@example.com', '9842022217', '1978-09-27'),
(13, 'Pooja Rajput', 'pooja.rajput13@example.com', '9837401136', '1980-03-08'),
(14, 'Sneha Gupta', 'sneha.gupta14@example.com', '9855711728', '1991-01-05'),
(15, 'Kavya Patel', 'kavya.patel15@example.com', '9855967383', '1975-12-07'),
(16, 'Diya Das', 'diya.das16@example.com', '9850440413', '1995-08-04'),
(17, 'Isha Pillai', 'isha.pillai17@example.com', '9833190218', '1982-04-09'),
(18, 'Riya Desai', 'riya.desai18@example.com', '9859754103', '1971-01-06'),
(19, 'Nisha Chauhan', 'nisha.chauhan19@example.com', '9864767357', '1977-08-09'),
(20, 'Ramesh Sharma', 'ramesh.sharma20@example.com', '9840794008', '1990-03-08'),
(21, 'Suresh Singh', 'suresh.singh21@example.com', '9836304393', '1977-06-25'),
(22, 'Amit Reddy', 'amit.reddy22@example.com', '9819760941', '1989-12-06'),
(23, 'Sumit Bose', 'sumit.bose23@example.com', '9817250029', '1985-12-01'),
(24, 'Deepak Mehta', 'deepak.mehta24@example.com', '9897488594', '1995-06-24'),
(25, 'Aarav Joshi', 'aarav.joshi25@example.com', '9821290228', '1979-03-07');

INSERT IGNORE INTO Room (Room_Number, Room_Type, Room_Status) VALUES 
('101', 'Suite', 'Available'),
('102', 'Single', 'Available'),
('103', 'Suite', 'Available'),
('104', 'Suite', 'Available'),
('105', 'Single', 'Available'),
('106', 'Single', 'Available'),
('107', 'Single', 'Available'),
('108', 'Suite', 'Available'),
('109', 'Suite', 'Available'),
('110', 'Double', 'Available'),
('201', 'Suite', 'Available'),
('202', 'Double', 'Available'),
('203', 'Double', 'Available'),
('204', 'Single', 'Available'),
('205', 'Suite', 'Available'),
('206', 'Double', 'Available'),
('207', 'Suite', 'Available'),
('208', 'Suite', 'Available'),
('209', 'Double', 'Available'),
('210', 'Double', 'Available'),
('301', 'Double', 'Available'),
('302', 'Suite', 'Available'),
('303', 'Suite', 'Available'),
('304', 'Double', 'Available'),
('305', 'Double', 'Available'),
('306', 'Double', 'Available'),
('307', 'Single', 'Available'),
('308', 'Single', 'Available'),
('309', 'Double', 'Available'),
('310', 'Single', 'Available'),
('401', 'Double', 'Available'),
('402', 'Suite', 'Available'),
('403', 'Single', 'Available'),
('404', 'Single', 'Available'),
('405', 'Double', 'Available'),
('406', 'Double', 'Available'),
('407', 'Suite', 'Available'),
('408', 'Single', 'Available'),
('409', 'Suite', 'Available'),
('410', 'Single', 'Available');

INSERT IGNORE INTO Booking (Booking_ID, Customer_ID, Booking_Date, Check_In_Date, Room_Number, Check_Out_Date, Booking_Status) VALUES 
(1, 25, '2026-09-11', '2026-10-10', '208', '2026-10-15', 'Confirmed'),
(2, 24, '2026-09-20', '2026-10-01', '301', '2026-10-03', 'Cancelled'),
(3, 14, '2026-09-13', '2026-10-14', '404', '2026-10-16', 'Confirmed'),
(4, 7, '2026-09-15', '2026-10-10', '106', '2026-10-14', 'Pending'),
(5, 3, '2026-09-14', '2026-10-18', '109', '2026-10-20', 'Cancelled'),
(6, 5, '2026-09-24', '2026-10-05', '305', '2026-10-06', 'Pending'),
(7, 7, '2026-09-01', '2026-10-12', '307', '2026-10-16', 'Pending'),
(8, 14, '2026-09-20', '2026-10-11', '402', '2026-10-16', 'Pending'),
(9, 5, '2026-09-14', '2026-10-02', '307', '2026-10-04', 'Pending'),
(10, 7, '2026-09-23', '2026-10-05', '307', '2026-10-06', 'Completed'),
(11, 12, '2026-09-27', '2026-10-12', '104', '2026-10-14', 'Confirmed'),
(12, 22, '2026-09-10', '2026-10-06', '408', '2026-10-11', 'Cancelled'),
(13, 7, '2026-09-08', '2026-10-20', '208', '2026-10-24', 'Confirmed'),
(14, 1, '2026-09-15', '2026-10-16', '308', '2026-10-18', 'Completed'),
(15, 16, '2026-09-21', '2026-10-19', '306', '2026-10-22', 'Completed'),
(16, 21, '2026-09-12', '2026-10-08', '303', '2026-10-12', 'Cancelled'),
(17, 15, '2026-09-17', '2026-10-09', '406', '2026-10-14', 'Completed'),
(18, 2, '2026-09-06', '2026-10-17', '106', '2026-10-22', 'Completed'),
(19, 6, '2026-09-25', '2026-10-05', '307', '2026-10-08', 'Cancelled'),
(20, 13, '2026-09-28', '2026-10-05', '307', '2026-10-09', 'Confirmed'),
(21, 7, '2026-09-22', '2026-10-06', '307', '2026-10-08', 'Confirmed'),
(22, 23, '2026-09-07', '2026-10-09', '403', '2026-10-13', 'Confirmed'),
(23, 12, '2026-09-12', '2026-10-10', '306', '2026-10-11', 'Confirmed'),
(24, 20, '2026-09-09', '2026-10-07', '109', '2026-10-11', 'Cancelled'),
(25, 21, '2026-09-12', '2026-10-09', '103', '2026-10-13', 'Completed');

INSERT IGNORE INTO Payment (Transaction_ID, Booking_ID, Payment_Method, Payment_Date, Payment_Status, Payment_Amount) VALUES 
(1, 1, 'UPI', '2026-09-11', 'Pending', 30000.00),
(2, 2, 'Cash', '2026-09-20', 'Pending', 7000.00),
(3, 3, 'Debit Card', '2026-09-13', 'Pending', 5000.00),
(4, 4, 'Debit Card', '2026-09-15', 'Completed', 10000.00),
(5, 5, 'Credit Card', '2026-09-14', 'Completed', 12000.00),
(6, 6, 'Cash', '2026-09-24', 'Pending', 3500.00),
(7, 7, 'UPI', '2026-09-01', 'Pending', 10000.00),
(8, 8, 'UPI', '2026-09-20', 'Completed', 30000.00),
(9, 9, 'Credit Card', '2026-09-14', 'Pending', 5000.00),
(10, 10, 'Credit Card', '2026-09-23', 'Completed', 2500.00),
(11, 11, 'UPI', '2026-09-27', 'Completed', 12000.00),
(12, 12, 'Cash', '2026-09-10', 'Pending', 12500.00),
(13, 13, 'UPI', '2026-09-08', 'Completed', 24000.00),
(14, 14, 'Debit Card', '2026-09-15', 'Completed', 5000.00),
(15, 15, 'Cash', '2026-09-21', 'Completed', 10500.00),
(16, 16, 'Cash', '2026-09-12', 'Completed', 24000.00),
(17, 17, 'UPI', '2026-09-17', 'Completed', 17500.00),
(18, 18, 'Debit Card', '2026-09-06', 'Completed', 12500.00),
(19, 19, 'Debit Card', '2026-09-25', 'Completed', 7500.00),
(20, 20, 'UPI', '2026-09-28', 'Completed', 10000.00),
(21, 21, 'UPI', '2026-09-22', 'Completed', 5000.00),
(22, 22, 'Cash', '2026-09-07', 'Completed', 10000.00),
(23, 23, 'Debit Card', '2026-09-12', 'Pending', 3500.00),
(24, 24, 'Debit Card', '2026-09-09', 'Pending', 24000.00),
(25, 25, 'Credit Card', '2026-09-12', 'Completed', 24000.00);

