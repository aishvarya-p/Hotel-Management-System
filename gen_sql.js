const fs = require('fs');

let sql = `-- Create the database if it doesn't exist
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

`;

const fnames = ["Aarav", "Vihaan", "Aditya", "Sai", "Arjun", "Siddharth", "Rahul", "Karan", "Rohit", "Vikram", "Neha", "Priya", "Anjali", "Pooja", "Sneha", "Kavya", "Diya", "Isha", "Riya", "Nisha", "Ramesh", "Suresh", "Amit", "Sumit", "Deepak"];
const lnames = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Patel", "Reddy", "Rao", "Das", "Bose", "Nair", "Pillai", "Mehta", "Shah", "Desai", "Joshi", "Bhatt", "Chauhan", "Yadav", "Rajput"];

// 25 Customers
let customers = [];
for(let i=1; i<=25; i++) {
    let fn = fnames[i%fnames.length];
    let ln = lnames[(i*3)%lnames.length];
    let email = fn.toLowerCase() + '.' + ln.toLowerCase() + i + '@example.com';
    let phone = '98' + Math.floor(10000000 + Math.random() * 90000000);
    let y = 1970 + Math.floor(Math.random() * 30);
    let m = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    let d = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    let dob = y + '-' + m + '-' + d;
    customers.push("(" + i + ", '" + fn + " " + ln + "', '" + email + "', '" + phone + "', '" + dob + "')");
}
sql += "INSERT IGNORE INTO Customer (Customer_ID, Customer_Name, Customer_Email, Customer_Phone, Customer_DOB) VALUES \n" + customers.join(',\n') + ";\n\n";

// 40 Rooms
let rooms = [];
const rTypes = ['Single', 'Double', 'Suite'];
for(let i=1; i<=40; i++) {
    let floor = 1 + Math.floor((i-1)/10);
    let num = (i-1)%10 + 1;
    let roomNum = floor + String(num).padStart(2, '0'); // 101, 102...
    let type = rTypes[Math.floor(Math.random() * rTypes.length)];
    let status = 'Available';
    rooms.push("('" + roomNum + "', '" + type + "', '" + status + "')");
}
sql += "INSERT IGNORE INTO Room (Room_Number, Room_Type, Room_Status) VALUES \n" + rooms.join(',\n') + ";\n\n";

// 25 Bookings
let bookings = [];
let payments = [];
let bStatus = ['Confirmed', 'Completed', 'Cancelled', 'Pending'];
let pMethods = ['Credit Card', 'Debit Card', 'UPI', 'Cash'];
let pStatus = ['Completed', 'Pending'];

for(let i=1; i<=25; i++) {
    let custId = 1 + Math.floor(Math.random() * 25);
    let roomIdx = Math.floor(Math.random() * 40);
    let roomNum = (1 + Math.floor(roomIdx/10)) + String(roomIdx%10 + 1).padStart(2, '0');
    let type = rooms[roomIdx].split("'")[3];
    let price = type === 'Single' ? 2500 : (type === 'Double' ? 3500 : 6000);
    
    // Dates in 2026
    let startDay = 1 + Math.floor(Math.random() * 20); // oct 1-20
    let nights = 1 + Math.floor(Math.random() * 5);
    let endDay = startDay + nights;
    
    let bDate = '2026-09-' + String(Math.floor(1 + Math.random()*28)).padStart(2, '0');
    let cIn = '2026-10-' + String(startDay).padStart(2, '0');
    let cOut = '2026-10-' + String(endDay).padStart(2, '0');
    let stat = bStatus[Math.floor(Math.random() * bStatus.length)];
    
    bookings.push("(" + i + ", " + custId + ", '" + bDate + "', '" + cIn + "', '" + roomNum + "', '" + cOut + "', '" + stat + "')");
    
    let amt = price * nights;
    let pStat = stat === 'Completed' ? 'Completed' : pStatus[Math.floor(Math.random() * pStatus.length)];
    let pMeth = pMethods[Math.floor(Math.random() * pMethods.length)];
    payments.push("(" + i + ", " + i + ", '" + pMeth + "', '" + bDate + "', '" + pStat + "', " + amt + ".00)");
}

sql += "INSERT IGNORE INTO Booking (Booking_ID, Customer_ID, Booking_Date, Check_In_Date, Room_Number, Check_Out_Date, Booking_Status) VALUES \n" + bookings.join(',\n') + ";\n\n";
sql += "INSERT IGNORE INTO Payment (Transaction_ID, Booking_ID, Payment_Method, Payment_Date, Payment_Status, Payment_Amount) VALUES \n" + payments.join(',\n') + ";\n\n";

fs.writeFileSync('D:/Hotel-Management-System/database/init.sql', sql);
console.log('init.sql written successfully.');
