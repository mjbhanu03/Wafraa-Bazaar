-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 12, 2026 at 06:02 PM
-- Server version: 8.4.7
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wafra_bazaar`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_address`
--

DROP TABLE IF EXISTS `tbl_address`;
CREATE TABLE IF NOT EXISTS `tbl_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address1` text COLLATE utf8mb4_general_ci,
  `address2` text COLLATE utf8mb4_general_ci,
  `city_id` int DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `is_default` tinyint DEFAULT '0',
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_address`
--

INSERT INTO `tbl_address` (`address_id`, `user_id`, `name`, `company`, `address1`, `address2`, `city_id`, `postal_code`, `latitude`, `longitude`, `is_default`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'MJ PVT LTD.', 'Hirji Mistri Rd', 'Saint Kabir road', 1, '382481', 23.1140772, 72.5491078, 1, 1, 0, '2026-04-12 14:34:01', '2026-04-12 14:34:01'),
(2, 1, 'Home', 'MJ PVT LTD.', 'Hirji Mistri Rd', 'Saint Kabir road', 1, '382481', 23.1140772, 72.5491078, 1, 1, 0, '2026-04-12 14:36:08', '2026-04-12 14:36:08'),
(3, 1, 'Home', 'MJ PVT LTD.', 'Hirji Mistri Rd', 'Saint Kabir road', 1, '382481', 23.1140772, 72.5491078, 1, 1, 0, '2026-04-12 15:05:12', '2026-04-12 15:05:12');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_blogs`
--

DROP TABLE IF EXISTS `tbl_blogs`;
CREATE TABLE IF NOT EXISTS `tbl_blogs` (
  `blog_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`blog_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

DROP TABLE IF EXISTS `tbl_cart`;
CREATE TABLE IF NOT EXISTS `tbl_cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `coupon_id` int DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart_items`
--

DROP TABLE IF EXISTS `tbl_cart_items`;
CREATE TABLE IF NOT EXISTS `tbl_cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_item_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

DROP TABLE IF EXISTS `tbl_category`;
CREATE TABLE IF NOT EXISTS `tbl_category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_chat`
--

DROP TABLE IF EXISTS `tbl_chat`;
CREATE TABLE IF NOT EXISTS `tbl_chat` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int DEFAULT NULL,
  `receiver_id` int DEFAULT NULL,
  `message` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

DROP TABLE IF EXISTS `tbl_city`;
CREATE TABLE IF NOT EXISTS `tbl_city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`city_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_city`
--

INSERT INTO `tbl_city` (`city_id`, `city_name`, `state_id`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Ahmedabad', 1, 1, 0, '2026-04-12 13:47:57', '2026-04-12 13:47:57'),
(2, 'Surat', 1, 1, 0, '2026-04-12 13:47:57', '2026-04-12 13:47:57'),
(3, 'Mumbai', 2, 1, 0, '2026-04-12 13:48:36', '2026-04-12 13:48:36'),
(4, 'Pune', 2, 1, 0, '2026-04-12 13:48:36', '2026-04-12 13:48:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cms`
--

DROP TABLE IF EXISTS `tbl_cms`;
CREATE TABLE IF NOT EXISTS `tbl_cms` (
  `cms_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cms_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_color`
--

DROP TABLE IF EXISTS `tbl_color`;
CREATE TABLE IF NOT EXISTS `tbl_color` (
  `color_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`color_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_contact_us`
--

DROP TABLE IF EXISTS `tbl_contact_us`;
CREATE TABLE IF NOT EXISTS `tbl_contact_us` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `contact_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `country_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contact_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_country`
--

DROP TABLE IF EXISTS `tbl_country`;
CREATE TABLE IF NOT EXISTS `tbl_country` (
  `country_id` int NOT NULL AUTO_INCREMENT,
  `country_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`country_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_country`
--

INSERT INTO `tbl_country` (`country_id`, `country_name`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'India', 1, 0, '2026-04-12 13:47:14', '2026-04-12 13:47:14');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_discount`
--

DROP TABLE IF EXISTS `tbl_discount`;
CREATE TABLE IF NOT EXISTS `tbl_discount` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `amount_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `max_value` decimal(10,2) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`discount_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_faqs`
--

DROP TABLE IF EXISTS `tbl_faqs`;
CREATE TABLE IF NOT EXISTS `tbl_faqs` (
  `faq_id` int NOT NULL AUTO_INCREMENT,
  `question` text COLLATE utf8mb4_general_ci,
  `answer` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`faq_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_lang`
--

DROP TABLE IF EXISTS `tbl_lang`;
CREATE TABLE IF NOT EXISTS `tbl_lang` (
  `lang_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`lang_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notification`
--

DROP TABLE IF EXISTS `tbl_notification`;
CREATE TABLE IF NOT EXISTS `tbl_notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  `is_read` tinyint DEFAULT '0',
  `message` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

DROP TABLE IF EXISTS `tbl_order`;
CREATE TABLE IF NOT EXISTS `tbl_order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `payment_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_value` decimal(10,2) DEFAULT NULL,
  `discount_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pincode` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_items`
--

DROP TABLE IF EXISTS `tbl_order_items`;
CREATE TABLE IF NOT EXISTS `tbl_order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `size` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `color` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_otp`
--

DROP TABLE IF EXISTS `tbl_otp`;
CREATE TABLE IF NOT EXISTS `tbl_otp` (
  `otp_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `otp` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purpose` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_used` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`otp_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_otp`
--

INSERT INTO `tbl_otp` (`otp_id`, `user_id`, `otp`, `purpose`, `phone`, `country_code`, `is_used`, `created_at`, `updated_at`) VALUES
(10, NULL, '1547', 'f', '7016515225', '+91', 0, '2026-04-10 06:31:53', '2026-04-10 06:31:53'),
(9, NULL, '6028', 'f', '7016515225', '+91', 0, '2026-04-10 06:31:29', '2026-04-10 06:31:29'),
(8, NULL, '6341', 's', '7016515225', '+91', 0, '2026-04-10 06:21:26', '2026-04-10 06:21:26'),
(11, NULL, '1176', 'f', '7016515225', '+91', 0, '2026-04-10 08:07:02', '2026-04-10 08:07:02'),
(12, NULL, '1877', 'f', '7016515225', '+91', 1, '2026-04-10 08:08:05', '2026-04-10 08:22:55'),
(13, NULL, '9288', 'f', '7016515226', '+91', 1, '2026-04-12 17:27:51', '2026-04-12 17:30:03'),
(14, NULL, '4510', 'f', '7016515226', '+91', 1, '2026-04-12 17:29:11', '2026-04-12 17:29:51');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product`
--

DROP TABLE IF EXISTS `tbl_product`;
CREATE TABLE IF NOT EXISTS `tbl_product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `category_id` int DEFAULT NULL,
  `additional_info` json DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_data`
--

DROP TABLE IF EXISTS `tbl_product_data`;
CREATE TABLE IF NOT EXISTS `tbl_product_data` (
  `product_data_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_data_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_rating`
--

DROP TABLE IF EXISTS `tbl_product_rating`;
CREATE TABLE IF NOT EXISTS `tbl_product_rating` (
  `product_rating_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_rating_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_return`
--

DROP TABLE IF EXISTS `tbl_product_return`;
CREATE TABLE IF NOT EXISTS `tbl_product_return` (
  `product_return_id` int NOT NULL AUTO_INCREMENT,
  `order_item_id` int DEFAULT NULL,
  `return_reason_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_return_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_report`
--

DROP TABLE IF EXISTS `tbl_report`;
CREATE TABLE IF NOT EXISTS `tbl_report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_general_ci,
  `user_id` int DEFAULT NULL,
  `status` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_report_data`
--

DROP TABLE IF EXISTS `tbl_report_data`;
CREATE TABLE IF NOT EXISTS `tbl_report_data` (
  `report_data_id` int NOT NULL AUTO_INCREMENT,
  `report_id` int DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`report_data_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_return_order_reason`
--

DROP TABLE IF EXISTS `tbl_return_order_reason`;
CREATE TABLE IF NOT EXISTS `tbl_return_order_reason` (
  `return_reason_id` int NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`return_reason_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_search_history`
--

DROP TABLE IF EXISTS `tbl_search_history`;
CREATE TABLE IF NOT EXISTS `tbl_search_history` (
  `search_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `query_for` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `query` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`search_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_size`
--

DROP TABLE IF EXISTS `tbl_size`;
CREATE TABLE IF NOT EXISTS `tbl_size` (
  `size_id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`size_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_size_chart`
--

DROP TABLE IF EXISTS `tbl_size_chart`;
CREATE TABLE IF NOT EXISTS `tbl_size_chart` (
  `size_chart_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`size_chart_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_size_chart_values`
--

DROP TABLE IF EXISTS `tbl_size_chart_values`;
CREATE TABLE IF NOT EXISTS `tbl_size_chart_values` (
  `size_chart_value_id` int NOT NULL AUTO_INCREMENT,
  `size_chart_id` int DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  `measurement_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `unit` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`size_chart_value_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_state`
--

DROP TABLE IF EXISTS `tbl_state`;
CREATE TABLE IF NOT EXISTS `tbl_state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`state_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_state`
--

INSERT INTO `tbl_state` (`state_id`, `state_name`, `country_id`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Gujarat', 1, 1, 0, '2026-04-12 13:47:30', '2026-04-12 13:47:30'),
(2, 'Maharashtra', 1, 1, 0, '2026-04-12 13:47:30', '2026-04-12 13:47:30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_store`
--

DROP TABLE IF EXISTS `tbl_store`;
CREATE TABLE IF NOT EXISTS `tbl_store` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `office_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_store_rating`
--

DROP TABLE IF EXISTS `tbl_store_rating`;
CREATE TABLE IF NOT EXISTS `tbl_store_rating` (
  `store_rating_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_rating_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_tax`
--

DROP TABLE IF EXISTS `tbl_tax`;
CREATE TABLE IF NOT EXISTS `tbl_tax` (
  `tax_id` int NOT NULL AUTO_INCREMENT,
  `tax_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tax_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `social_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country_code` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `steps` tinyint(1) DEFAULT '1',
  `profile_pic` text COLLATE utf8mb4_general_ci,
  `lang_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `login_type`, `social_id`, `email`, `password`, `name`, `country_code`, `phone`, `steps`, `profile_pic`, `lang_id`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 's', NULL, 'jay@gmail.com', '698d51a19d8a121ce581499d7b701668', 'Mange Jay', '+91', '7016515226', 3, 'http://jay.com', NULL, 1, 0, '2026-04-12 12:03:14', '2026-04-12 17:43:04'),
(2, 'g', 'sadaad', 'jay263@gmail.com', NULL, NULL, NULL, NULL, 2, NULL, NULL, 1, 0, '2026-04-12 12:06:23', '2026-04-12 12:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_device`
--

DROP TABLE IF EXISTS `tbl_user_device`;
CREATE TABLE IF NOT EXISTS `tbl_user_device` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `token` text,
  `device_token` text,
  `device_type` varchar(50) DEFAULT NULL,
  `device_name` varchar(100) DEFAULT NULL,
  `device_model` varchar(100) DEFAULT NULL,
  `os_version` varchar(50) DEFAULT NULL,
  `uuid` varchar(255) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_delete` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tbl_user_device`
--

INSERT INTO `tbl_user_device` (`id`, `user_id`, `token`, `device_token`, `device_type`, `device_name`, `device_model`, `os_version`, `uuid`, `ip`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJpYXQiOjE3NzYwMTQxNzIsImV4cCI6MTc3NjEwMDU3Mn0.0JhKbEVWJrflKdpLGE8k4cVCYTi_urO8ZOKVu6AD4Vc', 'ABCD', 'a', 'iPhone 17', 'iP17AJ', '7.7', '89ka56', '192.48.62.23', 1, 0, '2026-04-12 17:16:12', '2026-04-12 17:37:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_variants`
--

DROP TABLE IF EXISTS `tbl_variants`;
CREATE TABLE IF NOT EXISTS `tbl_variants` (
  `variant_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `size_id` int DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `prod_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`variant_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wishlist`
--

DROP TABLE IF EXISTS `tbl_wishlist`;
CREATE TABLE IF NOT EXISTS `tbl_wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlist_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
