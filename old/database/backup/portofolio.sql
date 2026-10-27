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
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `id` int(11) NOT NULL,
  `clientId` int(11) DEFAULT NULL,
  `smallUrl` varchar(255) DEFAULT NULL,
  `bigUrl` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `promoted` tinyint(1) NOT NULL DEFAULT 0,
  `itime` timestamp NULL DEFAULT current_timestamp(),
  `utime` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `portofolio`
--

INSERT INTO `portofolio` (`id`, `clientId`, `smallUrl`, `bigUrl`, `type`, `promoted`, `itime`, `utime`) VALUES
(132, 37, 'gallery/thumb_Mese Candy Bar Rm Valcea.jpg', 'gallery/Mese Candy Bar Rm Valcea.jpg', 8, 0, '2020-04-26 11:23:30', NULL),
(133, 37, 'gallery/thumb_Mese Candy Bar Valcea.jpg', 'gallery/Mese Candy Bar Valcea.jpg', 8, 1, '2020-04-26 11:23:41', '2020-05-31 07:06:50'),
(134, 37, 'gallery/thumb_Mese CandyBar Valcea.jpg', 'gallery/Mese CandyBar Valcea.jpg', 8, 0, '2020-04-26 11:23:54', NULL),
(135, 37, 'gallery/thumb_Mese CandyBar Rm Valcea.jpg', 'gallery/Mese CandyBar Rm Valcea.jpg', 8, 0, '2020-04-26 11:24:06', NULL),
(136, 18, 'gallery/thumb_Carti de Vizita Valcea.jpg', 'gallery/Carti de Vizita Valcea.jpg', 19, 1, '2020-04-26 11:35:43', '2020-05-31 07:08:40'),
(137, 35, 'gallery/thumb_Carti de Vizita Ramnicu Valcea.jpg', 'gallery/Carti de Vizita Ramnicu Valcea.jpg', 19, 0, '2020-04-26 11:36:02', NULL),
(138, 35, 'gallery/thumb_Carti de Vizita Rm Valcea.jpg', 'gallery/Carti de Vizita Rm Valcea.jpg', 19, 0, '2020-04-26 11:36:15', '2020-10-11 08:14:53'),
(139, 37, 'gallery/thumb_Carti de Vizita Rm. Valcea.jpg', 'gallery/Carti de Vizita Rm. Valcea.jpg', 19, 0, '2020-04-26 11:36:30', NULL),
(140, 37, 'gallery/thumb_Carti de Vizita - Rm Valcea.jpg', 'gallery/Carti de Vizita - Rm Valcea.jpg', 19, 0, '2020-04-26 11:36:41', NULL),
(141, 37, 'gallery/thumb_Carti de Vizita - Rm. Valcea.jpg', 'gallery/Carti de Vizita - Rm. Valcea.jpg', 19, 0, '2020-04-26 11:36:55', NULL),
(142, 37, 'gallery/thumb_Carti de Vizita-Ramnicu Valcea.jpg', 'gallery/Carti de Vizita-Ramnicu Valcea.jpg', 19, 0, '2020-04-26 11:37:10', NULL),
(143, 37, 'gallery/thumb_Carti de Vizita-Valcea.jpg', 'gallery/Carti de Vizita-Valcea.jpg', 19, 0, '2020-04-26 11:37:22', NULL),
(144, 37, 'gallery/thumb_Tablou Canvas Rm Valcea.jpg', 'gallery/Tablou Canvas Rm Valcea.jpg', 13, 1, '2020-04-26 11:54:37', '2020-05-31 07:07:24'),
(145, 37, 'gallery/thumb_Tablou Canvas Ramnicu- Valcea.jpg', 'gallery/Tablou Canvas Ramnicu- Valcea.jpg', 13, 0, '2020-04-26 11:54:50', NULL),
(146, 37, 'gallery/thumb_Tablou Canvas - Valcea.jpg', 'gallery/Tablou Canvas - Valcea.jpg', 13, 0, '2020-04-26 11:55:06', NULL),
(147, 37, 'gallery/thumb_Tablou Canvas - Rm Valcea.jpg', 'gallery/Tablou Canvas - Rm Valcea.jpg', 13, 0, '2020-04-26 11:55:22', NULL),
(148, 37, 'gallery/thumb_Tablou Canvas - Ramnicu Valcea.jpg', 'gallery/Tablou Canvas - Ramnicu Valcea.jpg', 13, 0, '2020-04-26 11:55:33', NULL),
(149, 37, 'gallery/thumb_Tablou Canvas- Rm Valcea.jpg', 'gallery/Tablou Canvas- Rm Valcea.jpg', 13, 0, '2020-04-26 11:55:49', NULL),
(151, 37, 'gallery/thumb_Tablou Canvas Rm. Valcea.jpg', 'gallery/Tablou Canvas Rm. Valcea.jpg', 13, 0, '2020-04-26 11:57:33', NULL),
(152, 37, 'gallery/thumb_Tablou Canvas -Rm. Valcea.jpg', 'gallery/Tablou Canvas -Rm. Valcea.jpg', 13, 0, '2020-04-26 11:57:46', '2020-10-11 08:13:45'),
(153, 37, 'gallery/thumb_Tablou Canvas Valcea.jpg', 'gallery/Tablou Canvas Valcea.jpg', 13, 0, '2020-04-26 11:58:02', NULL),
(154, 37, 'gallery/thumb_Tablou din Canvas - Valcea.jpg', 'gallery/Tablou din Canvas - Valcea.jpg', 13, 0, '2020-04-26 11:58:17', NULL),
(155, 37, 'gallery/thumb_Tablou din Canvas -Rm. Valcea.jpg', 'gallery/Tablou din Canvas -Rm. Valcea.jpg', 13, 0, '2020-04-26 11:58:34', NULL),
(156, 37, 'gallery/thumb_Tablou Canvas Ramnicu Valcea.jpg', 'gallery/Tablou Canvas Ramnicu Valcea.jpg', 13, 0, '2020-04-26 11:58:45', NULL),
(157, 37, 'gallery/thumb_Totem Valcea.jpg', 'gallery/Totem Valcea.jpg', 3, 1, '2020-04-26 12:08:09', '2020-05-31 07:05:32'),
(158, 37, 'gallery/thumb_Totem Rm. Valcea.jpg', 'gallery/Totem Rm. Valcea.jpg', 3, 0, '2020-04-26 12:08:19', NULL),
(159, 37, 'gallery/thumb_Totem Rm Valcea.jpg', 'gallery/Totem Rm Valcea.jpg', 3, 0, '2020-04-26 12:08:31', NULL),
(160, 37, 'gallery/thumb_Totem Ramnicu Valcea.jpg', 'gallery/Totem Ramnicu Valcea.jpg', 3, 0, '2020-04-26 12:08:41', NULL),
(161, 37, 'gallery/thumb_casete luminoase Rm. Valcea.jpg', 'gallery/casete luminoase Rm. Valcea.jpg', 2, 0, '2020-04-26 12:09:37', '2020-06-14 14:12:19'),
(162, 36, 'gallery/thumb_caseta luminoasa Rm Valcea.jpg', 'gallery/caseta luminoasa Rm Valcea.jpg', 2, 1, '2020-04-26 12:09:48', '2020-05-31 07:03:58'),
(163, 36, 'gallery/thumb_caseta luminoasa Rm. Valcea.jpg', 'gallery/caseta luminoasa Rm. Valcea.jpg', 2, 0, '2020-04-26 12:10:01', NULL),
(164, 31, 'gallery/thumb_caseta luminoasa Valcea.jpg', 'gallery/caseta luminoasa Valcea.jpg', 2, 0, '2020-04-26 12:10:12', '2020-07-26 10:21:01'),
(165, 37, 'gallery/thumb_casete luminoase Ramnicu Valcea.jpg', 'gallery/casete luminoase Ramnicu Valcea.jpg', 2, 0, '2020-04-26 12:10:26', '2020-06-14 14:09:30'),
(166, 37, 'gallery/thumb_casete luminoase Rm Valcea.jpg', 'gallery/casete luminoase Rm Valcea.jpg', 2, 0, '2020-04-26 12:10:39', NULL),
(167, 37, 'gallery/thumb_casete luminoase Valcea.jpg', 'gallery/casete luminoase Valcea.jpg', 2, 0, '2020-04-26 12:10:53', '2020-07-26 10:18:10'),
(168, 36, 'gallery/thumb_caseta luminoasa Ramnicu Valcea.jpg', 'gallery/caseta luminoasa Ramnicu Valcea.jpg', 2, 0, '2020-04-26 12:11:54', '2020-06-14 15:14:37'),
(169, 22, 'gallery/thumb_Litere Luminoase Rm.-Valcea.jpg', 'gallery/Litere Luminoase Rm.-Valcea.jpg', 1, 1, '2020-06-14 13:53:59', '2020-06-14 14:00:06'),
(170, 22, 'gallery/thumb_Litere Luminoase Rm-Valcea.jpg', 'gallery/Litere Luminoase Rm-Valcea.jpg', 1, 0, '2020-06-14 13:54:09', '2020-06-14 14:22:56'),
(171, 25, 'gallery/thumb_Litere Luminoase Rm Valcea.jpg', 'gallery/Litere Luminoase Rm Valcea.jpg', 1, 0, '2020-06-14 13:55:56', '2020-07-26 10:16:52'),
(172, 30, 'gallery/thumb_Litere-Luminoase-Rm.-Valcea.jpg', 'gallery/Litere-Luminoase-Rm.-Valcea.jpg', 1, 0, '2020-06-14 13:56:18', '2020-06-14 14:22:51'),
(173, 36, 'gallery/thumb_Litere-Luminoase-Rm-Valcea.jpg', 'gallery/Litere-Luminoase-Rm-Valcea.jpg', 1, 1, '2020-06-14 13:56:38', '2020-07-26 07:33:29'),
(174, 27, 'gallery/thumb_Litere-Luminoase Rm-Valcea.jpg', 'gallery/Litere-Luminoase Rm-Valcea.jpg', 1, 0, '2020-06-14 13:56:52', NULL),
(175, 29, 'gallery/thumb_Litere Volumetrice Rm-Valcea.jpg', 'gallery/Litere Volumetrice Rm-Valcea.jpg', 1, 0, '2020-06-14 13:57:04', '2020-07-26 10:16:59'),
(176, 33, 'gallery/thumb_Litere-Luminoase-Rm. Valcea.jpg', 'gallery/Litere-Luminoase-Rm. Valcea.jpg', 1, 0, '2020-06-14 13:57:16', '2020-07-26 10:17:03'),
(177, 37, 'gallery/thumb_Litere Luminoase -Valcea.jpg', 'gallery/Litere Luminoase -Valcea.jpg', 1, 0, '2020-06-14 13:58:03', NULL),
(178, 37, 'gallery/thumb_Litere Volumetrice Pixelate Rm Valcea.jpg', 'gallery/Litere Volumetrice Pixelate Rm Valcea.jpg', 1, 0, '2020-06-14 13:58:15', '2020-10-11 08:12:47'),
(179, 37, 'gallery/thumb_Litere Volumetrice Pixelate Valcea.jpg', 'gallery/Litere Volumetrice Pixelate Valcea.jpg', 1, 0, '2020-06-14 13:58:26', '2020-10-11 08:12:40'),
(180, 37, 'gallery/thumb_Litere Volumetrice Rm Valcea.jpg', 'gallery/Litere Volumetrice Rm Valcea.jpg', 1, 1, '2020-06-14 13:58:39', '2020-10-11 08:11:18'),
(181, 37, 'gallery/thumb_Litere-Luminoase-Valcea.jpg', 'gallery/Litere-Luminoase-Valcea.jpg', 1, 0, '2020-06-14 13:58:52', '2020-10-11 08:12:19'),
(182, 37, 'gallery/thumb_Litere Volumetrice Valcea.jpg', 'gallery/Litere Volumetrice Valcea.jpg', 1, 0, '2020-06-14 13:59:06', '2020-10-11 08:12:31'),
(183, 37, 'gallery/thumb_Litere Volumetrice Rm.Valcea.jpg', 'gallery/Litere Volumetrice Rm.Valcea.jpg', 1, 0, '2020-06-14 13:59:18', '2020-06-14 14:24:58'),
(184, 37, 'gallery/thumb_Litere Volumetrice Rm. Valcea.jpg', 'gallery/Litere Volumetrice Rm. Valcea.jpg', 1, 0, '2020-06-14 13:59:45', NULL),
(185, 36, 'gallery/thumb_colantari auto logan Valcea.jpg', 'gallery/colantari auto logan Valcea.jpg', 4, 1, '2020-06-14 14:03:20', '2020-06-14 14:06:57'),
(186, 36, 'gallery/thumb_colantari auto logan Rm Valcea.jpg', 'gallery/colantari auto logan Rm Valcea.jpg', 4, 0, '2020-06-14 14:03:34', NULL),
(187, 36, 'gallery/thumb_colantari auto logan Rm. Valcea.jpg', 'gallery/colantari auto logan Rm. Valcea.jpg', 4, 0, '2020-06-14 14:03:46', NULL),
(188, 26, 'gallery/thumb_colantari auto  Valcea.jpg', 'gallery/colantari auto  Valcea.jpg', 4, 0, '2020-06-14 14:04:14', NULL),
(189, 26, 'gallery/thumb_colantari auto Ramnicu Valcea.jpg', 'gallery/colantari auto Ramnicu Valcea.jpg', 4, 0, '2020-06-14 14:04:25', NULL),
(190, 26, 'gallery/thumb_colantari auto Rm. Valcea.jpg', 'gallery/colantari auto Rm. Valcea.jpg', 4, 0, '2020-06-14 14:04:34', NULL),
(191, 32, 'gallery/thumb_colantari auto Rm Valcea.jpg', 'gallery/colantari auto Rm Valcea.jpg', 4, 0, '2020-06-14 14:05:08', NULL),
(192, 37, 'gallery/thumb_colantari  Valcea.jpg', 'gallery/colantari  Valcea.jpg', 4, 0, '2020-06-14 14:05:25', NULL),
(193, 29, 'gallery/thumb_colantari autobuze ramnicu valcea.jpg', 'gallery/colantari autobuze ramnicu valcea.jpg', 4, 0, '2020-06-14 14:05:40', NULL),
(194, 29, 'gallery/thumb_colantari autobuze valcea.jpg', 'gallery/colantari autobuze valcea.jpg', 4, 1, '2020-06-14 14:05:53', '2020-06-14 14:07:02'),
(195, 29, 'gallery/thumb_colantari autobuze rm. valcea.jpg', 'gallery/colantari autobuze rm. valcea.jpg', 4, 0, '2020-06-14 14:06:20', NULL),
(196, 37, 'gallery/thumb_colantari rulote valcea.jpg', 'gallery/colantari rulote valcea.jpg', 4, 0, '2020-06-14 14:06:33', NULL),
(197, 36, 'gallery/thumb_LITERE VOLUMETRICE POLISTIREN RM. VALCEA.jpg', 'gallery/LITERE VOLUMETRICE POLISTIREN RM. VALCEA.jpg', 9, 0, '2020-06-14 14:08:04', NULL),
(198, 26, 'gallery/thumb_LITERE VOLUMETRICE POLISTIREN RM-VALCEA.jpg', 'gallery/LITERE VOLUMETRICE POLISTIREN RM-VALCEA.jpg', 9, 0, '2020-06-14 14:08:19', NULL),
(199, 37, 'gallery/thumb_LITERE VOLUMETRICE POLISTIREN RM VALCEA.jpg', 'gallery/LITERE VOLUMETRICE POLISTIREN RM VALCEA.jpg', 9, 0, '2020-06-14 14:08:33', NULL),
(200, 37, 'gallery/thumb_LITERE VOLUMETRICE POLISTIREN VALCEA.jpg', 'gallery/LITERE VOLUMETRICE POLISTIREN VALCEA.jpg', 9, 0, '2020-06-14 14:08:44', '2020-07-26 10:21:08'),
(201, 37, 'gallery/thumb_colantari Valcea.jpg', 'gallery/colantari Valcea.jpg', 5, 0, '2020-06-14 14:10:29', NULL),
(202, 37, 'gallery/thumb_Colantari fatade valcea.jpg', 'gallery/Colantari fatade valcea.jpg', 5, 0, '2020-06-14 14:10:40', '2020-07-26 10:21:17'),
(203, 37, 'gallery/thumb_Colantari fatade rm. valcea.jpg', 'gallery/Colantari fatade rm. valcea.jpg', 5, 0, '2020-06-14 14:10:57', NULL),
(204, 37, 'gallery/thumb_Colantari fatade rm valcea.jpg', 'gallery/Colantari fatade rm valcea.jpg', 5, 0, '2020-06-14 14:11:06', NULL),
(205, 37, 'gallery/thumb_ETICHETE RM VALCEA.jpg', 'gallery/ETICHETE RM VALCEA.jpg', 24, 0, '2020-06-14 14:45:59', NULL),
(206, 37, 'gallery/thumb_ETICHETE VALCEA.jpg', 'gallery/ETICHETE VALCEA.jpg', 24, 0, '2020-06-14 14:46:11', '2020-10-11 08:15:13'),
(208, 37, 'gallery/thumb_ETICHETE RM. VALCEA.jpg', 'gallery/ETICHETE RM. VALCEA.jpg', 10, 0, '2020-06-14 14:57:22', '2020-10-11 08:17:03'),
(209, 37, 'gallery/thumb_AUTOCOLANTE VALCEA.jpg', 'gallery/AUTOCOLANTE VALCEA.jpg', 10, 0, '2020-06-14 15:03:34', NULL),
(210, 37, 'gallery/thumb_ETICHETE RM- VALCEA.jpg', 'gallery/ETICHETE RM- VALCEA.jpg', 24, 0, '2020-06-14 15:04:19', NULL),
(217, 37, 'gallery/thumb_AFISE  RM- VALCEA.jpg', 'gallery/AFISE  RM- VALCEA.jpg', 12, 0, '2020-06-14 15:09:04', NULL),
(218, 37, 'gallery/thumb_AFISE  RM. VALCEA.jpg', 'gallery/AFISE  RM. VALCEA.jpg', 12, 0, '2020-06-14 15:09:15', NULL),
(219, 37, 'gallery/thumb_AFISE RM.- VALCEA.jpg', 'gallery/AFISE RM.- VALCEA.jpg', 12, 1, '2020-06-14 15:11:29', '2020-07-26 10:22:33'),
(220, 37, 'gallery/thumb_AFISE VALCEA.jpg', 'gallery/AFISE VALCEA.jpg', 18, 0, '2020-06-14 15:11:50', NULL),
(221, 37, 'gallery/thumb_PERSONALIZARE PIXURI VALCEA.jpg', 'gallery/PERSONALIZARE PIXURI VALCEA.jpg', 29, 0, '2020-06-14 15:13:20', NULL),
(222, 37, 'gallery/thumb_PIXURI PERSONALIZATE VALCEA.jpg', 'gallery/PIXURI PERSONALIZATE VALCEA.jpg', 29, 1, '2020-06-14 15:13:30', '2020-06-14 15:14:07'),
(223, 37, 'gallery/thumb_PIZURI PERSONALIZATE RM VALCEA.jpg', 'gallery/PIZURI PERSONALIZATE RM VALCEA.jpg', 29, 0, '2020-06-14 15:13:41', NULL),
(224, 37, 'gallery/thumb_PIXURI PERSONALIZATE RM. VALCEA.jpg', 'gallery/PIXURI PERSONALIZATE RM. VALCEA.jpg', 29, 0, '2020-06-14 15:13:51', '2020-06-14 15:17:55'),
(225, 37, 'gallery/thumb_fototaper rm valce.jpg', 'gallery/fototaper rm valce.jpg', 14, 0, '2020-06-14 15:27:25', NULL),
(226, 37, 'gallery/thumb_fototapet valcea.jpg', 'gallery/fototapet valcea.jpg', 14, 0, '2020-06-14 15:27:40', NULL),
(227, 37, 'gallery/thumb_fototpet rm . Valcea.jpg', 'gallery/fototpet rm . Valcea.jpg', 14, 0, '2020-06-14 15:27:52', NULL),
(228, 37, 'gallery/thumb_foto tapot valcea.jpg', 'gallery/foto tapot valcea.jpg', 14, 0, '2020-06-14 15:41:39', NULL),
(234, 37, 'gallery/thumb_banner rm Valcea.jpg', 'gallery/banner rm Valcea.jpg', 11, 1, '2020-07-26 08:00:31', '2020-07-26 10:22:23'),
(235, 37, 'gallery/thumb_banner valcea.jpg', 'gallery/banner valcea.jpg', 11, 0, '2020-07-26 08:01:58', NULL),
(236, 37, 'gallery/thumb_flyere rm valcea.jpg', 'gallery/flyere rm valcea.jpg', 15, 1, '2020-07-26 08:14:37', '2020-07-26 10:23:43'),
(237, 37, 'gallery/thumb_flyere valcea.jpg', 'gallery/flyere valcea.jpg', 15, 0, '2020-07-26 08:14:47', NULL),
(238, 37, 'gallery/thumb_flyere rm. valcea.jpg', 'gallery/flyere rm. valcea.jpg', 15, 0, '2020-07-26 08:14:57', NULL),
(239, 37, 'gallery/thumb_pliante valcea.jpg', 'gallery/pliante valcea.jpg', 15, 0, '2020-07-26 08:15:12', NULL),
(240, 37, 'gallery/thumb_afis ramnicu valcea.jpg', 'gallery/afis ramnicu valcea.jpg', 18, 0, '2020-07-26 08:29:09', NULL),
(241, 37, 'gallery/thumb_afise rm. valcea.jpg', 'gallery/afise rm. valcea.jpg', 18, 0, '2020-07-26 08:30:50', NULL),
(242, 37, 'gallery/thumb_afise valcea.jpg', 'gallery/afise valcea.jpg', 18, 0, '2020-07-26 08:31:29', NULL),
(243, 37, 'gallery/thumb_brosura rm valcea.jpg', 'gallery/brosura rm valcea.jpg', 20, 0, '2020-07-26 08:39:13', NULL),
(244, 37, 'gallery/thumb_brosura valcea.jpg', 'gallery/brosura valcea.jpg', 20, 1, '2020-07-26 08:39:43', '2020-07-26 10:23:54'),
(245, 37, 'gallery/thumb_cataloage valcea.jpg', 'gallery/cataloage valcea.jpg', 20, 0, '2020-07-26 08:43:32', NULL),
(246, 37, 'gallery/thumb_brichete personalizate valcea.jpg', 'gallery/brichete personalizate valcea.jpg', 31, 0, '2020-07-26 08:56:49', NULL),
(247, 37, 'gallery/thumb_brichete personalizate rm. valcea.jpg', 'gallery/brichete personalizate rm. valcea.jpg', 31, 0, '2020-07-26 09:05:30', NULL),
(248, 37, 'gallery/thumb_brichete personalizate rm valcea.jpg', 'gallery/brichete personalizate rm valcea.jpg', 31, 0, '2020-07-26 09:06:38', NULL),
(250, 37, 'gallery/thumb_breclocuri personalizate-  valcea.jpg', 'gallery/breclocuri personalizate-  valcea.jpg', 30, 0, '2020-07-26 09:28:15', NULL),
(251, 37, 'gallery/thumb_breclocuri personalizate rm. valcea.jpg', 'gallery/breclocuri personalizate rm. valcea.jpg', 30, 0, '2020-07-26 09:28:43', NULL),
(252, 37, 'gallery/thumb_breclocuri personalizate rm valcea.jpg', 'gallery/breclocuri personalizate rm valcea.jpg', 30, 0, '2020-07-26 09:28:52', NULL),
(253, 37, 'gallery/thumb_breclocuri personalizate valcea.jpg', 'gallery/breclocuri personalizate valcea.jpg', 30, 1, '2020-07-26 09:29:02', '2020-07-26 10:24:41'),
(254, 37, 'gallery/thumb_rollup rm - valcea.jpg', 'gallery/rollup rm - valcea.jpg', 33, 0, '2020-07-26 09:38:56', NULL),
(255, 37, 'gallery/thumb_rollup rm valcea.jpg', 'gallery/rollup rm valcea.jpg', 33, 0, '2020-07-26 09:39:09', NULL),
(256, 37, 'gallery/thumb_rollup valcea.jpg', 'gallery/rollup valcea.jpg', 33, 0, '2020-07-26 09:39:20', NULL),
(257, 37, 'gallery/thumb_rollup rm. valcea.jpg', 'gallery/rollup rm. valcea.jpg', 33, 0, '2020-07-26 09:39:33', NULL),
(258, 37, 'gallery/thumb_tricouri personalizate valcea.jpg', 'gallery/tricouri personalizate valcea.jpg', 28, 0, '2020-07-26 10:08:19', NULL),
(259, 37, 'gallery/thumb_tricouri personalizate rm. valcea.jpg', 'gallery/tricouri personalizate rm. valcea.jpg', 28, 0, '2020-07-26 10:08:29', NULL),
(260, 37, 'gallery/thumb_tricouri personalizate rm valcea.jpg', 'gallery/tricouri personalizate rm valcea.jpg', 28, 1, '2020-07-26 10:08:40', '2020-07-26 10:24:31'),
(261, 37, 'gallery/thumb_tricouri personalizate rm  valcea.jpg', 'gallery/tricouri personalizate rm  valcea.jpg', 28, 0, '2020-07-26 10:08:51', NULL),
(262, 37, 'gallery/thumb_tricouri personalizat valcea.jpg', 'gallery/tricouri personalizat valcea.jpg', 28, 0, '2020-07-26 10:09:02', NULL),
(263, 37, 'gallery/thumb_sepci personalizate valcea.jpg', 'gallery/sepci personalizate valcea.jpg', 28, 0, '2020-07-26 10:09:12', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=264;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
