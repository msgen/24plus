-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 27, 2026 at 08:17 AM
-- Server version: 11.4.13-MariaDB-cll-lve
-- PHP Version: 8.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plusro_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `itime` timestamp NULL DEFAULT current_timestamp(),
  `utime` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `name`, `url`, `image`, `itime`, `utime`) VALUES
(18, 'Roman\'s', 'https://romans.ro', 'gallery/Rpnam s.jpg', '2020-04-21 11:34:35', NULL),
(22, 'Grand Imperial Deluxe', 'https://www.grandimperialdeluxe.ro', 'gallery/imperial.jpg', '2020-04-21 11:49:02', NULL),
(25, 'Zoomserie', 'https://www.zoomserie.ro', 'gallery/zoomserie.jpg', '2020-04-21 12:17:50', NULL),
(26, 'Emigab', 'https://www.emigab.ro', 'gallery/emigab.jpg', '2020-04-21 12:23:39', NULL),
(27, 'Luxury', 'https://www.facebook.com/LUXURY-by-the-forest-1660308524044505/', 'gallery/luxuri.jpg', '2020-04-21 12:28:46', NULL),
(29, 'Vilextur', 'https://vilextur.ro', 'gallery/vilex.jpg', '2020-04-21 12:32:29', NULL),
(30, 'Badcom', 'http://www.badcom-distributie.ro', 'gallery/badcom.jpg', '2020-04-21 12:35:39', NULL),
(31, 'Filos', 'https://www.facebook.com/filosgreek.ro/', 'gallery/filos.jpg', '2020-04-21 12:43:24', NULL),
(32, 'Amal Tour', 'https://amaltour.ro', 'gallery/amaltour.jpg', '2020-04-21 12:59:04', NULL),
(33, 'Pensiunea NOEL', 'http://www.noelolanesti.ro', 'gallery/noel.jpg', '2020-04-21 15:11:43', NULL),
(35, 'Profesional New Consult', 'www.profesionalnewconsult.ro', 'gallery/profesional.jpg', '2020-04-21 15:17:45', NULL),
(36, 'O\'livio', 'http://olivio-fastfood.ro', 'gallery/olivio.jpg', '2020-04-21 15:20:16', NULL),
(37, 'Diversi', '0', 'gallery/logo.jpg', '2020-04-21 15:22:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
