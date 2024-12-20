-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 05:46 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dormitory_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `dormitories`
--

CREATE TABLE `dormitories` (
  `dorm_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dormitories`
--

INSERT INTO `dormitories` (`dorm_id`, `name`, `location`) VALUES
(1, 'Ký túc xá Ngoại ngữ', '144 Xuân Thủy');

-- --------------------------------------------------------

--
-- Table structure for table `monthly_fees`
--

CREATE TABLE `monthly_fees` (
  `fee_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `ktx_fee` decimal(10,2) NOT NULL,
  `electricity_fee` decimal(10,2) NOT NULL,
  `water_fee` decimal(10,2) NOT NULL,
  `total_fee` decimal(10,2) GENERATED ALWAYS AS (`ktx_fee` + `electricity_fee` + `water_fee`) STORED,
  `status` enum('Chưa đóng','Đã đóng','Quá hạn') DEFAULT 'Chưa đóng',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `monthly_fees`
--

INSERT INTO `monthly_fees` (`fee_id`, `room_id`, `ktx_fee`, `electricity_fee`, `water_fee`, `status`, `created_at`) VALUES
(3, 2, '200000.00', '150000.00', '350000.00', 'Chưa đóng', '2024-11-19 03:19:01'),
(7, 2, '200000.00', '101000.00', '150000.00', 'Đã đóng', '2024-10-19 05:13:01'),
(8, 2, '200000.00', '100000.00', '150000.00', 'Chưa đóng', '2024-12-19 09:35:43'),
(9, 5, '200000.00', '260000.00', '50000.00', 'Chưa đóng', '2024-12-20 04:23:51'),
(10, 6, '200000.00', '506000.00', '95000.00', 'Chưa đóng', '2024-12-20 04:24:17');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(11) NOT NULL,
  `dorm_id` int(11) NOT NULL,
  `room_number` varchar(20) NOT NULL,
  `capacity` int(11) NOT NULL,
  `current_occupancy` int(11) DEFAULT 0,
  `staff_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `dorm_id`, `room_number`, `capacity`, `current_occupancy`, `staff_id`) VALUES
(1, 1, '101A', 6, 2, NULL),
(2, 1, '102A', 6, 2, NULL),
(3, 1, '103B', 6, 0, NULL),
(4, 1, '104B', 6, 0, NULL),
(5, 1, '105B', 6, 1, NULL),
(6, 1, '101B', 3, 2, NULL),
(7, 1, '100B', 3, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `user_id`, `full_name`, `phone`) VALUES
(1, 22, 'Nguyễn Văn Mạnh', '0945835116'),
(2, 23, 'Lê Văn C', '0903345678'),
(3, 14, 'Phạm Thị D', '0904456789'),
(4, 15, 'Hoàng Văn E', '0905567890');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `ethnicity` varchar(50) DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `major` varchar(100) DEFAULT NULL,
  `class` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0,
  `room_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `user_id`, `full_name`, `dob`, `gender`, `ethnicity`, `religion`, `major`, `class`, `phone`, `approved`, `room_id`) VALUES
(20, 16, 'Nguyen Van A', '2000-05-15', 'male', 'Kinh', 'None', 'Computer Science', 'K66CB', '0123456789', 1, 2),
(21, 17, 'Duong Duc Huy', '2003-05-15', 'male', 'Kinh', 'None', 'Computer Science', 'K66CB', '0123456789', 1, 2),
(25, 18, 'Dương Đức Minh', '2024-12-19', 'male', 'Kinh', 'Không ', 'CNTT', 'K66CB', '12312312312', 1, 1),
(26, 20, 'Nguyễn Thu Trang', '2024-12-12', 'female', 'Kinh', 'Không ', 'CNTT', 'K66CB', '029938348', 1, 5),
(27, 29, 'Nguyen Van B', '2002-09-06', 'male', 'Kinh', 'Không', 'CNTT', 'K66CB', '0123456789', 1, 1),
(28, 30, 'Nguyen Van C', '2001-09-06', 'male', 'Nùng', 'Không', 'CNTT', 'K67CC', '987654321', 1, 1),
(29, 31, 'Nguyen Thi D', '2005-08-09', 'female', 'Kinh', 'Không', 'Quan Tri Kinh Doanh', 'K69CB', '9876543210', 1, 6),
(30, 61, 'Nguyen Thi E', '2007-09-08', 'female', 'Kinh', 'Không', 'Quan Tri Kinh Doanh', 'K69CB', '98765432101', 1, 6),
(31, 62, 'Nguyen Thi F', '2001-07-05', 'female', 'Kinh', 'Không', 'Quan Tri Kinh Doanh', 'K69CB', '987654328', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `student_requests`
--

CREATE TABLE `student_requests` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `staff_id` int(11) DEFAULT NULL,
  `request_type` enum('Đổi phòng','Ra khỏi ký túc xá','Duyệt vào ký túc xá','Khác') NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Chờ xử lý','Đã xử lý','Từ chối') DEFAULT 'Chờ xử lý',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_requests`
--

INSERT INTO `student_requests` (`request_id`, `user_id`, `staff_id`, `request_type`, `description`, `status`, `created_at`) VALUES
(1, 16, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-09 05:23:52'),
(2, 17, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-09 05:23:52'),
(3, 16, 1, 'Đổi phòng', 'Muốn ở cùng bạn', 'Từ chối', '2024-12-09 05:23:52'),
(4, 18, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-09 05:29:27'),
(5, 20, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-09 10:22:22'),
(6, 20, 1, 'Ra khỏi ký túc xá', 'Vì đã tốt nghiệp.', 'Đã xử lý', '2024-12-09 16:14:54'),
(7, 18, 1, 'Ra khỏi ký túc xá', 'vì muốn bảo lưu kết quả.', 'Từ chối', '2024-12-09 17:07:44'),
(8, 16, 1, 'Đổi phòng', 'Muốn đổi sang phòng 101A để ở với bạn, cùng học bài.', 'Đã xử lý', '2024-12-09 17:41:19'),
(9, 16, 1, 'Khác', 'Xin phép về muộn hôm t5 tuần sau vì bận đi sự kiện của trường.', 'Đã xử lý', '2024-12-09 17:51:18'),
(10, 18, 1, 'Đổi phòng', 'Muốn sang phòng 101A.', 'Đã xử lý', '2024-12-10 04:40:55'),
(11, 18, 1, 'Ra khỏi ký túc xá', 'vì sắp tốt nghiệp.', 'Đã xử lý', '2024-12-10 05:13:10'),
(12, 16, 1, 'Đổi phòng', 'đổi sang 102A', 'Đã xử lý', '2024-12-10 05:19:46'),
(13, 16, 1, 'Khác', 'xin đi qua đêm ở nhà bạn học bài tập nhóm', 'Đã xử lý', '2024-12-19 09:32:58'),
(14, 29, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-20 04:11:52'),
(15, 30, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-20 04:15:41'),
(16, 31, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-20 04:22:23'),
(17, 61, NULL, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Chờ xử lý', '2024-12-20 04:38:16'),
(18, 61, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-20 04:38:19'),
(19, 62, 1, 'Duyệt vào ký túc xá', 'Duyệt vào ký túc xá', 'Đã xử lý', '2024-12-20 04:41:06'),
(20, 62, 1, 'Đổi phòng', 'chuyen qua 105B', 'Đã xử lý', '2024-12-20 04:43:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','student','staff') NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `password`, `role`, `email`) VALUES
(7, '$2b$10$uCtU7b06Rln86HYXAhUY3.jjXqMtfZl535t8RUXngTx/8IgVXOy16', 'student', 'huy2@gmail.com'),
(8, '$2b$10$63sJvD1E/22O2f8b0HnpuuiY2296G8DGM.MjHL2sXS6L55t9ZhtUm', 'student', 'huy3@gmail.com'),
(10, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'admin', 'admin@gmail.com'),
(14, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'staff', 'user11@example.com'),
(15, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'staff', 'user12@example.com'),
(16, '$2b$10$SWhkICu3SUgRmLEeXz/F9eeuJ2nzLvzvqbWKjqXrZ7WogeMMwiFU2', 'student', 'nguyenvana@gmail.com'),
(17, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'student', 'user4@example.com'),
(18, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'student', 'user5@example.com'),
(19, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'student', 'user6@example.com'),
(20, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'student', 'user7@example.com'),
(21, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'student', 'user8@example.com'),
(22, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'staff', 'staff@gmail.com'),
(23, '$2b$10$jwWngqdf87bwX3ECYV2AbORnZSoWrXZ5IURR.WTVQEk2MedSACcl.', 'staff', 'user10@example.com'),
(27, '$2b$10$mjLd6P4sMpTqduV/kBJ9qutdnK6QY202V0HAq5OQAoAaK3eyqLAfe', 'student', 'new2@gmail.com'),
(28, '$2b$10$mJwM1DNt.ZKNAe4ELWYdvOlnr/VID3D.rF4HWJKcht9z6HW8rlnTK', 'staff', 'staff10@gmail.com'),
(29, '$2b$10$JP5TFmlkk4z6ucnXlhq0YuVRwbbU.ijP88fofBot9hykFsLODvuTq', 'student', 'nguyenvanb@gmail.com'),
(30, '$2b$10$YwhFURdWQKoKfSVlPxrcuOrSB7qdGU9vvzf5J6ZeBp6CYymezqMjK', 'student', 'nguyenvanc@gmail.com'),
(31, '$2b$10$.u9uBOb4ThffEhu0Xna0Vu/U4MRGAoBeZ2Nz.8EDW.t6QqMFtGqG.', 'student', 'nguyenthid@gmail.com'),
(32, '$2b$10$sSGx/rX3IH2p7WmLYrUxZue5DSmmqA7EGCrm2om7nvaom1ZQSzI/O', 'student', 'nguyenthie@gmail.com'),
(33, '$2b$10$f2/VdoQ5ahogkGYd9aOOWe9eFuT/uARU4GCIX8gE/QbsNs5spJq.e', 'student', 'nguyenthie@gmail.com'),
(34, '$2b$10$bvozGZhzczoGDn/rz1KtjuC4PzMcKqT5kZNmDkVLLZjU3E133.TI2', 'student', 'nguyenthie@gmail.com'),
(35, '$2b$10$rdMXS4t5.BJSCWojBuLu5.urKB0.YEUABGswtE7HcXwoSIjAEqQNK', 'student', 'nguyenthie@gmail.com'),
(36, '$2b$10$XSzSqV36RZG5.kcr/jW.M.SkcXSdagaOA0Ly0gBV8pzqsh/CXbWxm', 'student', 'nguyenthie@gmail.com'),
(37, '$2b$10$QenOm3amOkBG6/UX1UgJ/OTAnM41i4HyE6MO91La2vSo/C22Ra2Zy', 'student', 'nguyenthie@gmail.com'),
(38, '$2b$10$Hb4FQrlF6Qn5EX6AZQ2.Peu2eHSFl6uRqpH3f8dSCwPsb8qIj.8iq', 'student', 'nguyenthie@gmail.com'),
(39, '$2b$10$zUhaizvsMazN9vkHP6hHm.1p6R9KfUze8016HjVZQXo5qtitNfuC6', 'student', 'nguyenthie@gmail.com'),
(40, '$2b$10$QOEvwsQuWgWiCqr8Rvo25.M33y3C1Q.1x8lDucNI7XQAekgxGcm7G', 'student', 'nguyenthie@gmail.com'),
(41, '$2b$10$3rChme5LTp93mQxG9dDW6ORbcemAIdH6zcekfvFk3g1v7SULxcueO', 'student', 'nguyenthie@gmail.com'),
(42, '$2b$10$5J766bXhbR0kbnhG0DfODO.SpFP.oE3gmsDgLQA0qoxaBk0btduJO', 'student', 'nguyenthie@gmail.com'),
(43, '$2b$10$nX8HFpMG7ZvvtRVRzbCNbunGLEzYCKvlx4jQB4XF/iOYASAc3q3xO', 'student', 'nguyenthie@gmail.com'),
(44, '$2b$10$T.EvH8VBH/EPsWVGVwuWpuddk.vLtJrWPzrMFkHcPm.LcF3FTQxJC', 'student', 'nguyenthie@gmail.com'),
(45, '$2b$10$w7T6aO/ZoN6WMbubhZ00fuYp/fLuvATcTUHGtQf1mtiapx9ISHuYC', 'student', 'nguyenthie@gmail.com'),
(46, '$2b$10$RKWhAO4No40MXb6qa.y8VeTky2qQ.zkSm2x3f.pXw6VYTG65YsWpK', 'student', 'nguyenthie@gmail.com'),
(47, '$2b$10$Ghlj.Y4u1lwsTPP2JcmkYORvxJ8PA9irpwfFDGuLAHtTf//ngtSF2', 'student', 'nguyenthie@gmail.com'),
(48, '$2b$10$bCuHBcm6XM3eeIqZW.2puOBNgTQaDC4x/5X49lPBI2URhVrHBPC/y', 'student', 'nguyenthie@gmail.com'),
(49, '$2b$10$iQSKIlv5ScDW8us6rany8.Yq/8Je7WODQv2zMWm05tF7p/BPp3Ud6', 'student', 'nguyenthie@gmail.com'),
(50, '$2b$10$L9f8mg9YWn1gQMP9.lmFZ.Zun9KDYnFSrjdk1km3WEvlcBP/jCu6K', 'student', 'nguyenthie@gmail.com'),
(51, '$2b$10$MrI4eyV/541DDcti1RHS/Oo6yjMpoupnqPa7Wamx/n2YsjgBIORHC', 'student', 'nguyenthie@gmail.com'),
(52, '$2b$10$xpzzpy1ZEzXAQat3dLFgJefku6p4ZOyZDN5Mpcir9nBXVbLKUqVZO', 'student', 'nguyenthie@gmail.com'),
(53, '$2b$10$CAEQhMWl2hqFz394RML.g.i.6b9yyRDC1/ejYNPT5UKbFKDoMsfiS', 'student', 'nguyenthie@gmail.com'),
(54, '$2b$10$0xUa7kF21yd5I.1vm0N.Y.l0mIbOkZGGXOj9xJ2dL7HPL/u4vE.EK', 'student', 'nguyenthie@gmail.com'),
(55, '$2b$10$RKydFrQh5zOn4dOMJW1f9eKYFrAjNoJ9CBzpXWSpOWVg1ZjzT8OZe', 'student', 'nguyenthie@gmail.com'),
(56, '$2b$10$jB9WAtjllnyap8noefJ3a.pakljE9ruETsCkcUfLKcs/iDdUHBaOi', 'student', 'nguyenthie@gmail.com'),
(57, '$2b$10$HluZ/vuFqTf6KjuWniZklucc5V.8QbD46HsHrR9eeXAgIJltmxORm', 'student', 'nguyenthie@gmail.com'),
(58, '$2b$10$/MPfEqeB5cfGY0yi1GRhUeh7ECMQDTkixcJPJsulu5nPFIU5aKO0G', 'student', 'nguyenthie@gmail.com'),
(59, '$2b$10$yKWjUuD6Rhw2ASymZOtBpe6xcvfz.Izz2.TyhLW9mIRNjRdH/aiEy', 'student', 'nguyenthie@gmail.com'),
(60, '$2b$10$E9cWZZARZnNPLrOaFS4bx.6HKPyGDMg6E7SL3MoIaRYxuR4Srs68y', 'student', 'nguyenthie@gmail.com'),
(61, '$2b$10$TVAynwRJF1TQm.HrMMXmpuYQsyiZzCH26esXHWBUo5guJ0ZJrWV1W', 'student', 'nguyenthie1@gmail.com'),
(62, '$2b$10$emHBQUJNO7/6WriGhN6vXeRq44YL0xpcRGLCX74o4WuERoI6dM7Ei', 'student', 'nguyenthif@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dormitories`
--
ALTER TABLE `dormitories`
  ADD PRIMARY KEY (`dorm_id`);

--
-- Indexes for table `monthly_fees`
--
ALTER TABLE `monthly_fees`
  ADD PRIMARY KEY (`fee_id`),
  ADD KEY `fk_monthly_fee_room` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `dorm_id` (`dorm_id`),
  ADD KEY `fk_staff` (`staff_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `student_requests`
--
ALTER TABLE `student_requests`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dormitories`
--
ALTER TABLE `dormitories`
  MODIFY `dorm_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `monthly_fees`
--
ALTER TABLE `monthly_fees`
  MODIFY `fee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `student_requests`
--
ALTER TABLE `student_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `monthly_fees`
--
ALTER TABLE `monthly_fees`
  ADD CONSTRAINT `fk_monthly_fee_room` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `fk_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`dorm_id`) REFERENCES `dormitories` (`dorm_id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
