-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 14, 2026 at 05:31 PM
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
  `latitude` decimal(12,10) DEFAULT NULL,
  `longitude` decimal(12,10) DEFAULT NULL,
  `is_default` tinyint DEFAULT '0',
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_address`
--

INSERT INTO `tbl_address` (`address_id`, `user_id`, `name`, `company`, `address1`, `address2`, `city_id`, `postal_code`, `latitude`, `longitude`, `is_default`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 1, 'Home', 'MJ PVT LTD.', 'Hirji Mistri Rd', 'Saint Kabir road', 1, '382481', 23.1140772000, 72.5491078000, 1, 1, 0, '2026-04-12 14:34:01', '2026-04-12 14:34:01'),
(12, 1, 'Kalpana Bhanushali', 'Kalpana Jewels', 'LA', NULL, 2, '361006', 22.3230562000, 70.8697287000, 0, 1, 0, '2026-04-14 04:59:31', '2026-04-14 04:59:31'),
(11, 1, 'Kalpana Bhanushali', 'Kalpana Jewels', 'LA', NULL, 2, '361006', 22.3230562000, 70.8697287000, 0, 1, 0, '2026-04-14 04:48:17', '2026-04-14 04:48:17'),
(4, 2, 'Home', 'Verma Traders', 'Brigade Road', 'Near MG Road Metro', 3, '560001', 12.9715987000, 77.5945660000, 1, 1, 0, '2026-04-13 08:50:26', '2026-04-13 08:50:26'),
(5, 2, 'Office', 'Verma Traders', 'Electronic City Phase 1', 'Infosys Road', 3, '560100', 12.8456140000, 77.6603390000, 0, 1, 0, '2026-04-13 08:50:26', '2026-04-13 08:50:26'),
(6, 3, 'Home', 'Kapoor Residence', 'Linking Road', 'Near Khar West', 3, '400050', 19.0658720000, 72.8330000000, 1, 1, 0, '2026-04-13 08:50:26', '2026-04-13 08:50:26'),
(7, 4, 'Home', 'Singh Villa', 'FC Road', 'Near Fergusson College', 4, '411004', 18.5204303000, 73.8567437000, 1, 1, 0, '2026-04-13 08:50:26', '2026-04-13 08:50:26'),
(8, 5, 'Home', 'Sharma Niwas', 'Karol Bagh', 'Ajmal Khan Road', 4, '110005', 28.6519520000, 77.1900000000, 1, 1, 0, '2026-04-13 08:50:26', '2026-04-13 08:50:26'),
(9, 6, 'Home', 'Das Apartment', 'Park Street', 'Near Metro Station', 1, '700016', 22.5726460000, 88.3638950000, 1, 1, 0, '2026-04-13 08:50:26', '2026-04-13 08:50:26'),
(10, 1, 'Kalpana Bhanushali', 'Kalpana Jewels', 'LA', NULL, 2, '361006', 22.3230562000, 70.8697287000, 0, 1, 0, '2026-04-14 04:46:08', '2026-04-14 04:46:08'),
(15, 1, 'Neha Dance', 'Neha\'s Dance Studio', 'Banglore', NULL, 3, '458956', 12.9765411000, 77.5182494000, 0, 0, 1, '2026-04-14 05:18:21', '2026-04-14 05:43:56');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_banner`
--

DROP TABLE IF EXISTS `tbl_banner`;
CREATE TABLE IF NOT EXISTS `tbl_banner` (
  `banner_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `redirect_type` enum('product','category','external') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `redirect_id` int DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`banner_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_banner`
--

INSERT INTO `tbl_banner` (`banner_id`, `title`, `image_url`, `redirect_type`, `redirect_id`, `is_active`, `sort_order`, `created_at`) VALUES
(1, '50% OFF Sale', 'uploads/banner1.jpg', '', 1, 1, 1, '2026-04-13 00:30:33'),
(2, 'New Arrivals', 'uploads/banner2.jpg', 'category', 5, 1, 3, '2026-04-13 00:30:33'),
(3, 'Top Products', 'uploads/banner3.jpg', 'product', 10, 1, 4, '2026-04-13 00:30:33'),
(4, '50% OFF Sale', 'uploads/banner1.jpg', '', 1, 1, 1, '2026-04-13 00:30:50'),
(5, 'New Arrivals', 'uploads/banner2.jpg', 'category', 5, 1, 2, '2026-04-13 00:30:50'),
(6, 'Top Products', 'uploads/banner3.jpg', 'product', 10, 1, 3, '2026-04-13 00:30:50'),
(7, 'Visit Website', 'uploads/banner4.jpg', 'external', NULL, 0, 4, '2026-04-13 00:30:50');

-- --------------------------------------------------------

 
DROP TABLE IF EXISTS `tbl_voucher`;
CREATE TABLE IF NOT EXISTS `tbl_voucher` (
  `voucher_id` bigint NOT NULL AUTO_INCREMENT,
  `voucher_name` varchar(64) NOT NULL,
  `voucher_code` varchar(8) NOT NULL,
  `discount_type` enum('flat','percentage') NOT NULL,
  `amount` decimal(16,2) NOT NULL,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL,
  `max_value` decimal(16,2) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`voucher_id`)
)
-----------------------------------------------------------------------------------

DROP TABLE IF EXISTS `tbl_voucher_redeem`;
CREATE TABLE IF NOT EXISTS `tbl_voucher_redeem` (
  `redeem_id` bigint NOT NULL AUTO_INCREMENT,
  `voucher_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `is_active` int NOT NULL DEFAULT '1',
  `is_deleted` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`redeem_id`)
)

CREATE TABLE tbl_return_order_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_item_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active TINYINT(1) DEFAULT 1,
    is_deleted TINYINT(1) DEFAULT 0,

    FOREIGN KEY (order_item_id) REFERENCES tbl_order_items(order_id)
);

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_blogs`
--

INSERT INTO `tbl_blogs` (`blog_id`, `title`, `description`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Top 10 Fashion Trends in India 2026', 'Fashion in India is evolving rapidly with a mix of traditional and modern styles. From oversized shirts to ethnic fusion wear, 2026 is all about comfort and expression. Designers are focusing on sustainable fabrics and minimalistic designs that appeal to the younger generation.', 1, 0, '2026-04-13 08:08:59', '2026-04-13 08:08:59'),
(2, 'How to Choose the Right Shoes for Every Occasion', 'Choosing the right footwear is essential for both comfort and style. Casual outings require breathable sneakers, while formal events demand polished leather shoes. Understanding your needs and matching them with the right type of shoe can elevate your overall look significantly.', 1, 0, '2026-04-13 08:08:59', '2026-04-13 08:08:59'),
(3, 'Smartphones Buying Guide: What Really Matters', 'When buying a smartphone, most people focus only on camera and brand. However, factors like processor performance, battery life, software optimization, and after-sales service are equally important. This guide helps you make a smart and practical choice.', 1, 0, '2026-04-13 08:08:59', '2026-04-13 08:08:59'),
(4, 'Why Cotton Clothing is Still the Best Choice in India', 'Despite the rise of synthetic fabrics, cotton remains the most preferred choice in India due to its breathability and comfort in hot weather. It is skin-friendly, affordable, and perfect for daily wear, making it a timeless fabric.', 1, 0, '2026-04-13 08:08:59', '2026-04-13 08:08:59'),
(5, 'Online Shopping vs Offline Shopping: Which is Better?', 'Online shopping offers convenience and variety, while offline shopping gives a hands-on experience. Both have their advantages and limitations. The best choice depends on what you value more — convenience or experience.', 1, 0, '2026-04-13 08:08:59', '2026-04-13 08:08:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_card_details`
--

DROP TABLE IF EXISTS `tbl_card_details`;
CREATE TABLE IF NOT EXISTS `tbl_card_details` (
  `card_detail_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `card_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_holder_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `bank` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_type` enum('credit','debit') COLLATE utf8mb4_general_ci NOT NULL,
  `card_number` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `exp_at` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`card_detail_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_card_details`
--

INSERT INTO `tbl_card_details` (`card_detail_id`, `user_id`, `card_name`, `card_holder_name`, `bank`, `card_type`, `card_number`, `exp_at`, `is_default`, `created_at`, `updated_at`) VALUES
(7, 1, 'Visa', 'Mange Jay', 'SBI', 'credit', 'A6db5yhPpn3SinBAHORFWw==', '12/26', 0, '2026-04-14 08:13:16', '2026-04-14 08:13:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

DROP TABLE IF EXISTS `tbl_cart`;
CREATE TABLE IF NOT EXISTS `tbl_cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `voucher_id` bigint DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `tax_amount` decimal(10,2) DEFAULT '0.00',
  `delivery_charge` decimal(10,2) DEFAULT '0.00',
  `offer_amount` decimal(10,2) DEFAULT '0.00',
  `subtotal` decimal(10,2) DEFAULT '0.00',
  `total_price` decimal(10,2) DEFAULT '0.00',
  `is_checkedout` tinyint DEFAULT '0',
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cart`
--

INSERT INTO `tbl_cart` (`cart_id`, `user_id`, `tax_id`, `voucher_id`, `address_id`, `tax_amount`, `delivery_charge`, `offer_amount`, `subtotal`, `total_price`, `is_checkedout`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 1, 0, '2026-04-13 08:14:06', '2026-04-13 08:14:06'),
(2, 2, 1, NULL, 2, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 1, 0, '2026-04-13 08:14:06', '2026-04-13 08:14:06'),
(3, 1, 3, NULL, 1, 0.00, 0.00, 0.00, 0.00, 0.00, 1, 1, 0, '2026-04-13 08:49:37', '2026-04-13 08:49:37'),
(4, 2, 2, 1, 2, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 1, 0, '2026-04-13 08:49:37', '2026-04-13 08:49:37'),
(5, 3, 1, NULL, NULL, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 1, 0, '2026-04-13 08:49:37', '2026-04-13 08:49:37'),
(6, 4, 3, NULL, 3, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 0, 0, '2026-04-13 08:49:37', '2026-04-13 08:49:37'),
(7, 5, 2, 2, 4, 0.00, 0.00, 0.00, 0.00, 0.00, 0, 1, 0, '2026-04-13 08:49:37', '2026-04-13 08:49:37');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart_items`
--

DROP TABLE IF EXISTS `tbl_cart_items`;
CREATE TABLE IF NOT EXISTS `tbl_cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `variant_id` bigint DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cart_items`
--

INSERT INTO `tbl_cart_items` (`cart_item_id`, `user_id`, `product_id`, `variant_id`, `quantity`, `price`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 2, 499.00, 1, 0, '2026-04-13 08:48:41', '2026-04-14 17:13:30'),
(9, 1, 2, 7, 2, 1299.00, 1, 0, '2026-04-13 12:04:12', '2026-04-14 17:13:27');

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
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`category_id`, `cate_name`, `parent_id`, `image_url`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Men', NULL, 'uploads/categories/men.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(2, 'Women', NULL, 'uploads/categories/women.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(3, 'Footwear', NULL, 'uploads/categories/footwear.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(4, 'Electronics', NULL, 'uploads/categories/electronics.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(5, 'T-Shirts', 1, 'uploads/categories/men_tshirts.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(6, 'Shirts', 1, 'uploads/categories/men_shirts.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(7, 'Jeans', 1, 'uploads/categories/men_jeans.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(8, 'Dresses', 2, 'uploads/categories/women_dresses.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(9, 'Tops', 2, 'uploads/categories/women_tops.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(10, 'Handbags', 2, 'uploads/categories/women_handbags.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(11, 'Sneakers', 3, 'uploads/categories/sneakers.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(12, 'Formal Shoes', 3, 'uploads/categories/formal_shoes.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(13, 'Heels', 3, 'uploads/categories/heels.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(14, 'Mobiles', 4, 'uploads/categories/mobiles.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(15, 'Laptops', 4, 'uploads/categories/laptops.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12'),
(16, 'Accessories', 4, 'uploads/categories/electronics_accessories.jpg', 1, 0, '2026-04-13 08:48:12', '2026-04-13 08:48:12');

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
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_chat`
--

INSERT INTO `tbl_chat` (`chat_id`, `sender_id`, `receiver_id`, `message`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'Hi, is this product still available?', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(2, 2, 1, 'Yes, it is available.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(3, 1, 2, 'What sizes do you have?', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(4, 2, 1, 'We have M, L, and XL sizes.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(5, 1, 2, 'Okay, I will place an order soon.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(6, 3, 2, 'Hello, how long will delivery take?', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(7, 2, 3, 'Delivery usually takes 3 to 5 days.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(8, 3, 2, 'Do you have express delivery?', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(9, 2, 3, 'Yes, express delivery is available at extra cost.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(10, 4, 1, 'I received a damaged product.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(11, 1, 4, 'Sorry for the inconvenience. Please raise a return request.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(12, 4, 1, 'Okay, I will do that.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(13, 5, 6, 'Is this shoe comfortable for daily use?', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(14, 6, 5, 'Yes, it is designed for daily wear.', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58'),
(15, 5, 6, 'Great, thanks for the info!', 1, 0, '2026-04-13 08:46:58', '2026-04-13 08:46:58');

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_cms`
--

INSERT INTO `tbl_cms` (`cms_id`, `title`, `description`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'About Us', 'We are an online marketplace dedicated to providing high-quality products at affordable prices. Our mission is to make online shopping simple, reliable, and accessible to everyone. We partner with trusted sellers to ensure the best customer experience.', 1, 0, '2026-04-13 08:46:05', '2026-04-13 08:46:05'),
(2, 'Privacy Policy', 'We value your privacy and are committed to protecting your personal information. All data collected is used only to improve your shopping experience. We do not share your data with third parties without your consent, except as required by law.', 1, 0, '2026-04-13 08:46:05', '2026-04-13 08:46:05'),
(3, 'Terms & Conditions', 'By using our platform, you agree to comply with our terms and conditions. Users must provide accurate information and use the platform responsibly. We reserve the right to suspend accounts that violate our policies.', 1, 0, '2026-04-13 08:46:05', '2026-04-13 08:46:05'),
(4, 'Refund & Return Policy', 'Products can be returned within 7 days of delivery if they are damaged, defective, or not as described. Refunds are processed after verification and may take 5-7 business days to reflect in your account.', 1, 0, '2026-04-13 08:46:05', '2026-04-13 08:46:05'),
(5, 'Shipping Policy', 'We aim to deliver your orders within 3 to 7 business days. Delivery times may vary depending on your location and product availability. You will receive tracking updates once your order is shipped.', 1, 0, '2026-04-13 08:46:05', '2026-04-13 08:46:05'),
(6, 'Contact Us', 'If you have any questions or concerns, you can reach out to our support team via email or phone. We are here to help you with your queries and ensure a smooth shopping experience.', 1, 0, '2026-04-13 08:46:05', '2026-04-13 08:46:05');

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_color`
--

INSERT INTO `tbl_color` (`color_id`, `name`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Black', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(2, 'White', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(3, 'Red', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(4, 'Blue', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(5, 'Green', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(6, 'Yellow', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(7, 'Navy Blue', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(8, 'Sky Blue', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(9, 'Dark Green', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(10, 'Olive', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(11, 'Maroon', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(12, 'Pink', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(13, 'Grey', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(14, 'Beige', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(15, 'Brown', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(16, 'Cream', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(17, 'Mustard', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(18, 'Teal', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(19, 'Lavender', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30'),
(20, 'Peach', 1, 0, '2026-04-13 08:45:30', '2026-04-13 08:45:30');

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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_contact_us`
--

INSERT INTO `tbl_contact_us` (`contact_id`, `contact_type`, `title`, `email`, `description`, `country_code`, `phone`, `status`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'general', 'Need help with placing order', 'rohit.mehta@gmail.com', 'I am unable to place an order. The payment page is not loading properly.', '+91', '9812345670', 'pending', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(2, 'complaint', 'Received damaged product', 'priya.patel@gmail.com', 'The product I received is damaged. The screen is cracked. Please assist with return.', '+91', '9823456781', 'in_progress', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(3, 'payment', 'Payment deducted but order not placed', 'aman.verma@gmail.com', 'My money was deducted but the order was not confirmed. Please check and update.', '+91', '9834567892', 'pending', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(4, 'delivery', 'Order delayed', 'sneha.kapoor@gmail.com', 'My order is delayed and I have not received any update. Please provide status.', '+91', '9845678903', 'resolved', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(5, 'return', 'Return request not processed', 'vikas.yadav@gmail.com', 'I requested a return 5 days ago but there is no update yet.', '+91', '9856789014', 'in_progress', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(6, 'account', 'Unable to login', 'anita.shah@gmail.com', 'I am not able to login to my account even after entering correct OTP.', '+91', '9867890125', 'pending', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(7, 'feedback', 'Great service', 'karan.malhotra@gmail.com', 'Really happy with the delivery and product quality. Keep it up!', '+91', '9878901236', 'resolved', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02'),
(8, 'technical', 'App crashing on checkout', 'pooja.singh@gmail.com', 'The app crashes whenever I try to checkout. Please fix this issue.', '+91', '9889012347', 'pending', 1, 0, '2026-04-13 08:45:02', '2026-04-13 08:45:02');

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_discount`
--

INSERT INTO `tbl_discount` (`discount_id`, `product_id`, `amount_type`, `amount`, `max_value`, `start_time`, `end_time`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'percentage', 10.00, 200.00, '2026-04-01 00:00:00', '2026-04-30 23:59:59', 1, 0, '2026-04-13 05:24:42', '2026-04-13 05:24:42'),
(2, 3, 'fixed', 150.00, NULL, '2026-04-10 00:00:00', '2026-04-20 23:59:59', 1, 0, '2026-04-13 05:24:42', '2026-04-13 05:24:42'),
(3, 5, 'percentage', 20.00, 500.00, '2026-04-05 00:00:00', '2026-04-25 23:59:59', 1, 0, '2026-04-13 05:24:42', '2026-04-13 05:24:42');

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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_faqs`
--

INSERT INTO `tbl_faqs` (`faq_id`, `question`, `answer`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'How can I place an order?', 'You can place an order by selecting your desired product, choosing size and quantity, and clicking on the Buy Now or Add to Cart button. Then proceed to checkout and confirm your order.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(2, 'What payment methods are available?', 'We support Cash on Delivery (COD) and online payments including UPI, debit cards, credit cards, and net banking.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(3, 'How long does delivery take?', 'Delivery usually takes 3 to 7 business days depending on your location. You will receive tracking updates once your order is shipped.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(4, 'Can I cancel my order?', 'Yes, you can cancel your order before it is shipped. Once shipped, cancellation may not be possible, but you can request a return after delivery.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(5, 'How do I return a product?', 'Go to your orders, select the item you want to return, choose a return reason, and submit your request. Our team will process it accordingly.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(6, 'When will I receive my refund?', 'Refunds are processed within 5 to 7 working days after the returned product is received and verified.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(7, 'What should I do if I receive a damaged product?', 'If you receive a damaged product, you can raise a return or report request from your order details page and upload images as proof.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(8, 'How can I track my order?', 'You can track your order from the My Orders section. You will also receive updates via notifications.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(9, 'Do you offer exchange for products?', 'Yes, exchange is available for selected products. You can request an exchange from your order details if eligible.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04'),
(10, 'Is my personal information सुरक्षित and protected?', 'Yes, we use secure encryption and follow standard data protection practices to keep your personal information safe.', 1, 0, '2026-04-13 08:44:04', '2026-04-13 08:44:04');

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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

DROP TABLE IF EXISTS `tbl_order`;
CREATE TABLE IF NOT EXISTS `tbl_order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `payment_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tax_value` decimal(10,2) DEFAULT NULL,
  `discount_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `voucher_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `company` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address1` text COLLATE utf8mb4_general_ci NOT NULL,
  `address2` text COLLATE utf8mb4_general_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(12,10) NOT NULL,
  `longitude` decimal(12,10) NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `card_number` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `card_type` enum('credit','debit') COLLATE utf8mb4_general_ci NOT NULL,
  `card_holder_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `size` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `color` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sub_category_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_tracking`
--

DROP TABLE IF EXISTS `tbl_order_tracking`;
CREATE TABLE IF NOT EXISTS `tbl_order_tracking` (
  `track_id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `order_status` enum('pending','confirmed','packed','on_the_way','delivered','cancelled','returned') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`track_id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product`
--

INSERT INTO `tbl_product` (`product_id`, `store_id`, `title`, `description`, `category_id`, `additional_info`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'Men T-Shirt', 'Comfortable cotton t-shirt', 5, '{\"color\": \"Blue\", \"sizes\": [\"M\", \"L\", \"XL\"], \"material\": \"Cotton\"}', 1, 0, '2026-04-13 05:24:14', '2026-04-14 09:14:53'),
(2, 1, 'Jeans', 'Slim fit blue jeans', 6, '{\"fit\": \"Slim\", \"color\": \"Blue\", \"sizes\": [30, 32, 34]}', 1, 0, '2026-04-13 05:24:14', '2026-04-14 09:14:57'),
(3, 1, 'Sneakers', 'Casual white sneakers', 7, '{\"type\": \"Casual\", \"color\": \"White\", \"sizes\": [8, 9, 10]}', 1, 0, '2026-04-13 05:24:14', '2026-04-14 09:14:59'),
(4, 2, 'Women Jeans', 'Floral summer dress', 6, '{\"sizes\": [\"S\", \"M\", \"L\"], \"sleeve\": \"Half\", \"pattern\": \"Floral\"}', 1, 0, '2026-04-13 05:24:14', '2026-04-14 09:15:06'),
(5, 2, 'Handbag', 'Leather handbag', 5, '{\"type\": \"Shoulder Bag\", \"color\": [\"Black\", \"Brown\"], \"material\": \"Leather\"}', 1, 0, '2026-04-13 05:24:14', '2026-04-14 09:15:13'),
(6, 2, 'Heels', 'Stylish high heels', 8, '{\"color\": \"Red\", \"sizes\": [5, 6, 7], \"heel_height\": \"3 inch\"}', 1, 0, '2026-04-13 05:24:14', '2026-04-14 09:15:16');

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
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_data`
--

INSERT INTO `tbl_product_data` (`product_data_id`, `product_id`, `image_url`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'uploads/products/product1_main.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(2, 1, 'uploads/products/product1_front.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(3, 1, 'uploads/products/product1_back.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(4, 1, 'uploads/products/product1_zoom.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(5, 2, 'uploads/products/product2_main.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(6, 2, 'uploads/products/product2_front.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(7, 2, 'uploads/products/product2_back.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(8, 3, 'uploads/products/product3_main.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(9, 3, 'uploads/products/product3_side.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(10, 3, 'uploads/products/product3_top.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(11, 3, 'uploads/products/product3_zoom.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(12, 4, 'uploads/products/product4_main.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(13, 4, 'uploads/products/product4_front.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(14, 4, 'uploads/products/product4_back.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(15, 5, 'uploads/products/product5_main.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(16, 5, 'uploads/products/product5_side.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(17, 6, 'uploads/products/product6_main.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(18, 6, 'uploads/products/product6_side.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11'),
(19, 6, 'uploads/products/product6_close.jpg', 1, 0, '2026-04-13 08:40:11', '2026-04-13 08:40:11');

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
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_rating`
--

INSERT INTO `tbl_product_rating` (`product_rating_id`, `user_id`, `product_id`, `rating`, `description`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 5, 'Very comfortable fabric and perfect fitting. Worth the price.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(2, 2, 1, 4, 'Good quality but color is slightly different from images.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(3, 3, 1, 3, 'Average product. Fabric is okay but stitching could be better.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(4, 4, 2, 5, 'Loved it! Fits perfectly and looks great.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 12:19:32'),
(5, 2, 2, 4, 'Nice fit and comfortable for daily use.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(6, 3, 2, 2, 'Size was not accurate. Had to return.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(7, 5, 2, 5, 'Excellent quality denim. Totally satisfied.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(8, 6, 2, 4, 'Good product but delivery was a bit late.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(9, 1, 3, 5, 'Very comfortable and stylish. Perfect for daily wear.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(10, 4, 3, 3, 'Looks good but not very durable.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(11, 7, 3, 4, 'Decent quality for the price.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(12, 5, 4, 5, 'Beautiful dress. Exactly as shown in pictures.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(13, 6, 4, 4, 'Nice fabric but fitting was slightly loose.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(14, 2, 5, 4, 'Good quality handbag. Value for money.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(15, 3, 5, 2, 'Material feels cheap. Not satisfied.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(16, 4, 6, 5, 'Very stylish and comfortable heels.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38'),
(17, 7, 6, 3, 'Looks good but not comfortable for long use.', 1, 0, '2026-04-13 08:39:38', '2026-04-13 08:39:38');

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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_return`
--

INSERT INTO `tbl_product_return` (`product_return_id`, `order_item_id`, `return_reason_id`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(2, 2, 2, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(3, 3, 3, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(4, 4, 4, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(5, 5, 5, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(6, 6, 6, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(7, 7, 7, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(8, 8, 8, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(9, 9, 9, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53'),
(10, 10, 10, 1, 0, '2026-04-13 08:38:53', '2026-04-13 08:38:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_type`
--

DROP TABLE IF EXISTS `tbl_product_type`;
CREATE TABLE IF NOT EXISTS `tbl_product_type` (
  `product_type_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_deleted` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_product_type`
--

INSERT INTO `tbl_product_type` (`product_type_id`, `name`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'Regular', 1, 0, '2026-04-10 00:30:00', '2026-04-10 00:30:00'),
(2, 'Premium', 1, 0, '2026-04-10 00:30:00', '2026-04-10 00:30:00'),
(3, 'Daily Wear', 1, 0, '2026-04-10 00:30:00', '2026-04-10 00:30:00');

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_report`
--

INSERT INTO `tbl_report` (`report_id`, `description`, `user_id`, `status`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Received a damaged product. The screen is cracked and not working properly.', 1, 'pending', 1, 0, '2026-04-13 08:38:15', '2026-04-13 08:38:15'),
(2, 'Wrong item delivered. I ordered a blue shirt but received a black one.', 2, 'pending', 1, 0, '2026-04-13 08:38:15', '2026-04-13 08:38:15'),
(3, 'Package was delivered with missing items. Only 1 item received instead of 2.', 3, 'in_progress', 1, 0, '2026-04-13 08:38:15', '2026-04-13 08:38:15'),
(4, 'Product is defective. The device is not turning on after charging.', 4, 'resolved', 1, 0, '2026-04-13 08:38:15', '2026-04-13 08:38:15'),
(5, 'Quality is very poor compared to what was shown in images.', 5, 'pending', 1, 0, '2026-04-13 08:38:15', '2026-04-13 08:38:15');

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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_report_data`
--

INSERT INTO `tbl_report_data` (`report_data_id`, `report_id`, `image_url`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'uploads/reports/report1_damage_front.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(2, 1, 'uploads/reports/report1_damage_close.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(3, 2, 'uploads/reports/report2_wrong_item.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(4, 3, 'uploads/reports/report3_box_open.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(5, 3, 'uploads/reports/report3_empty_box.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(6, 4, 'uploads/reports/report4_defect_screen.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(7, 5, 'uploads/reports/report5_product_issue1.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(8, 5, 'uploads/reports/report5_product_issue2.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04'),
(9, 5, 'uploads/reports/report5_invoice.jpg', 1, 0, '2026-04-13 08:35:04', '2026-04-13 08:35:04');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_return_order`
--

DROP TABLE IF EXISTS `tbl_return_order`;
CREATE TABLE IF NOT EXISTS `tbl_return_order` (
  `order_return_id` bigint NOT NULL AUTO_INCREMENT,
  `order_item_id` bigint NOT NULL,
  `return_reason_id` bigint NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_return_id`),
  KEY `order_item_id` (`order_item_id`),
  KEY `return_reason_id` (`return_reason_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_return_reasons`
--

DROP TABLE IF EXISTS `tbl_return_reasons`;
CREATE TABLE IF NOT EXISTS `tbl_return_reasons` (
  `return_reason_id` int NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`return_reason_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_return_reasons`
--

INSERT INTO `tbl_return_reasons` (`return_reason_id`, `description`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'Product is damaged or defective', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(2, 'Wrong product received', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(3, 'Size does not fit', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(4, 'Quality not as expected', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(5, 'Product not as shown in images', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(6, 'Received incomplete item', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(7, 'Late delivery', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(8, 'Ordered by mistake', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(9, 'Better price available elsewhere', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15'),
(10, 'No longer needed', 1, 0, '2026-04-13 08:34:15', '2026-04-13 08:34:15');

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
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_search_history`
--

INSERT INTO `tbl_search_history` (`search_id`, `user_id`, `query_for`, `query`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'product', 'men t shirt', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(2, 1, 'product', 'blue jeans slim fit', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(3, 1, 'product', 'nike running shoes', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(4, 2, 'product', 'wireless earbuds under 2000', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(5, 2, 'store', 'electronics store near me', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(6, 2, 'product', 'iphone cover transparent', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(7, 3, 'product', 'women summer dress floral', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(8, 3, 'store', 'fashion boutique', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(9, 4, 'product', 'black sneakers size 9', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(10, 4, 'product', 'hoodie oversized', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(11, 5, 'store', 'shoe store', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(12, 5, 'product', 'formal shoes leather', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(13, 6, 'product', 'smart watch waterproof', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(14, 6, 'product', 'bluetooth speaker bass', 1, 0, '2026-04-13 08:33:46', '2026-04-13 08:33:46'),
(15, 1, 'store', 'Jay', 1, 0, '2026-04-13 12:34:56', '2026-04-13 12:34:56'),
(16, 1, 'product', 'Jeans', 1, 0, '2026-04-13 12:35:11', '2026-04-13 12:35:11'),
(17, 1, 'product', 'Jeans', 1, 0, '2026-04-13 16:12:35', '2026-04-13 16:12:35'),
(18, 1, 'product', 'H', 1, 0, '2026-04-13 16:12:56', '2026-04-13 16:12:56'),
(19, 1, 'product', 'H', 1, 0, '2026-04-13 16:13:24', '2026-04-13 16:13:24'),
(20, 1, 'product', 'H', 1, 0, '2026-04-13 16:13:45', '2026-04-13 16:13:45'),
(21, 1, 'product', 'Jeans', 1, 0, '2026-04-13 16:15:12', '2026-04-13 16:15:12'),
(22, 1, 'product', 'H', 1, 0, '2026-04-13 16:15:45', '2026-04-13 16:15:45'),
(23, 1, 'product', 'Handbag', 1, 0, '2026-04-13 16:15:59', '2026-04-13 16:15:59'),
(24, 1, 'product', 'He', 1, 0, '2026-04-13 16:16:11', '2026-04-13 16:16:11'),
(25, 1, 'product', 'H', 1, 0, '2026-04-13 16:16:20', '2026-04-13 16:16:20'),
(26, 1, 'product', 'H', 1, 0, '2026-04-13 16:16:43', '2026-04-13 16:16:43'),
(27, 1, 'product', 'H', 1, 0, '2026-04-13 16:17:32', '2026-04-13 16:17:32'),
(28, 1, 'product', 'H', 1, 0, '2026-04-13 17:17:46', '2026-04-13 17:17:46'),
(29, 1, 'product', 'H', 1, 0, '2026-04-13 17:18:29', '2026-04-13 17:18:29'),
(30, 1, 'product', 'H', 1, 0, '2026-04-13 17:23:44', '2026-04-13 17:23:44'),
(31, 1, 'product', 'H', 1, 0, '2026-04-13 17:24:53', '2026-04-13 17:24:53'),
(32, 1, 'product', 'H', 1, 0, '2026-04-13 17:26:01', '2026-04-13 17:26:01'),
(33, 1, 'product', 'H', 1, 0, '2026-04-13 17:27:00', '2026-04-13 17:27:00'),
(34, 1, 'product', 'H', 1, 0, '2026-04-13 17:37:03', '2026-04-13 17:37:03'),
(35, 1, 'product', 'H', 1, 0, '2026-04-13 17:37:14', '2026-04-13 17:37:14'),
(36, 1, 'product', 'H', 1, 0, '2026-04-13 17:39:20', '2026-04-13 17:39:20'),
(37, 1, 'product', 'H', 1, 0, '2026-04-13 17:43:03', '2026-04-13 17:43:03'),
(38, 1, 'product', 'H', 1, 0, '2026-04-13 17:43:37', '2026-04-13 17:43:37'),
(39, 1, 'product', 'H', 1, 0, '2026-04-13 17:44:01', '2026-04-13 17:44:01'),
(40, 1, 'product', 'H', 1, 0, '2026-04-13 17:45:53', '2026-04-13 17:45:53'),
(41, 1, 'product', 'H', 1, 0, '2026-04-13 17:46:06', '2026-04-13 17:46:06'),
(42, 1, 'store', 'H', 1, 0, '2026-04-13 17:47:15', '2026-04-13 17:47:15'),
(43, 1, 'store', 'H', 1, 0, '2026-04-13 17:47:52', '2026-04-13 17:47:52'),
(44, 1, 'product', '', 1, 0, '2026-04-14 09:12:19', '2026-04-14 09:12:19'),
(45, 1, 'product', '', 1, 0, '2026-04-14 09:12:28', '2026-04-14 09:12:28'),
(46, 1, 'product', '', 1, 0, '2026-04-14 09:12:45', '2026-04-14 09:12:45'),
(47, 1, 'product', '', 1, 0, '2026-04-14 09:14:00', '2026-04-14 09:14:00'),
(48, 1, 'product', '', 1, 0, '2026-04-14 09:14:07', '2026-04-14 09:14:07'),
(49, 1, 'product', '', 1, 0, '2026-04-14 09:14:12', '2026-04-14 09:14:12'),
(50, 1, 'product', '', 1, 0, '2026-04-14 09:15:29', '2026-04-14 09:15:29'),
(51, 1, 'product', '', 1, 0, '2026-04-14 09:15:34', '2026-04-14 09:15:34'),
(52, 1, 'product', '', 1, 0, '2026-04-14 09:16:51', '2026-04-14 09:16:51'),
(53, 1, 'product', '', 1, 0, '2026-04-14 09:16:57', '2026-04-14 09:16:57'),
(54, 1, 'product', '', 1, 0, '2026-04-14 09:17:00', '2026-04-14 09:17:00'),
(55, 1, 'product', '', 1, 0, '2026-04-14 09:17:02', '2026-04-14 09:17:02');

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
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_size`
--

INSERT INTO `tbl_size` (`size_id`, `value`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'XS', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(2, 'S', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(3, 'M', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(4, 'L', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(5, 'XL', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(6, 'XXL', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(7, 'XXXL', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(8, '28', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(9, '30', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(10, '32', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(11, '34', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(12, '36', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(13, '38', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(14, '40', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(15, '42', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(16, '44', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(17, '5', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(18, '6', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(19, '7', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(20, '8', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(21, '9', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(22, '10', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(23, '11', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00'),
(24, '12', 1, 0, '2026-04-13 08:28:00', '2026-04-13 08:28:00');

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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_size_chart`
--

INSERT INTO `tbl_size_chart` (`size_chart_id`, `store_id`, `category_id`, `name`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Men T-Shirt Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(2, 1, 2, 'Men Jeans Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(3, 2, 1, 'Women Dress Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(4, 2, 2, 'Women Top Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(5, 3, 1, 'Unisex T-Shirt Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(6, 3, 3, 'Footwear Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(7, 4, 1, 'Casual Wear Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28'),
(8, 4, 3, 'Sneakers Size Chart', 1, 0, '2026-04-13 08:28:28', '2026-04-13 08:28:28');

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
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_size_chart_values`
--

INSERT INTO `tbl_size_chart_values` (`size_chart_value_id`, `size_chart_id`, `size_id`, `measurement_name`, `value`, `unit`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Chest', 36.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(2, 1, 1, 'Length', 26.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(3, 1, 2, 'Chest', 38.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(4, 1, 2, 'Length', 27.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(5, 1, 3, 'Chest', 40.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(6, 1, 3, 'Length', 28.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(7, 1, 4, 'Chest', 42.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(8, 1, 4, 'Length', 29.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(9, 1, 5, 'Chest', 44.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(10, 1, 5, 'Length', 30.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(11, 3, 17, 'Foot Length', 24.00, 'cm', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(12, 3, 18, 'Foot Length', 25.00, 'cm', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(13, 3, 19, 'Foot Length', 26.00, 'cm', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(14, 3, 20, 'Foot Length', 27.00, 'cm', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(15, 2, 8, 'Waist', 30.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(16, 2, 8, 'Hip', 38.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(17, 2, 9, 'Waist', 32.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(18, 2, 9, 'Hip', 40.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(19, 2, 10, 'Waist', 34.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10'),
(20, 2, 10, 'Hip', 42.00, 'inch', 1, 0, '2026-04-13 08:30:10', '2026-04-13 08:30:10');

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
  `postal_code` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_store`
--

INSERT INTO `tbl_store` (`store_id`, `user_id`, `name`, `description`, `latitude`, `longitude`, `office_name`, `street_name`, `city_id`, `postal_code`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'Jay Electronics', 'Best electronics store', 23.0892670, 72.5625046, 'Head Office', 'CG Road', 1, '380001', 1, 0, '2026-04-13 01:01:07', '2026-04-13 01:01:07'),
(2, 2, 'iVenus Store', 'Buy anything, at very low cost.', 23.0411555, 72.4963002, 'Shanti store', 'Sindhubhavan', 1, '380009', 1, 0, '2026-04-13 04:59:00', '2026-04-13 04:59:00'),
(3, 3, 'Tech World Hub', 'Latest gadgets and accessories', 12.9715987, 77.5945660, 'Main Outlet', 'MG Road', 1, '560001', 1, 0, '2026-04-13 08:27:01', '2026-04-13 08:27:01'),
(4, 4, 'Fashion Street', 'Trendy and affordable fashion wear', 19.0760900, 72.8774260, 'Retail Store', 'Linking Road', 1, '400050', 1, 0, '2026-04-13 08:27:01', '2026-04-13 08:27:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_store_data`
--

DROP TABLE IF EXISTS `tbl_store_data`;
CREATE TABLE IF NOT EXISTS `tbl_store_data` (
  `store_data_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_deleted` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_data_id`),
  KEY `store_id` (`store_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_store_data`
--

INSERT INTO `tbl_store_data` (`store_data_id`, `store_id`, `image_url`, `is_active`, `is_deleted`, `created_at`) VALUES
(1, 1, 'uploads/store1_img1.jpg', 1, 0, '2026-04-13 01:06:58'),
(2, 1, 'uploads/store1_img2.jpg', 0, 0, '2026-04-13 01:06:58'),
(3, 2, 'uploads/store1_img3.jpg', 1, 0, '2026-04-13 01:06:58'),
(4, 2, 'uploads/store2_inside.jpg', 1, 0, '2026-04-13 08:25:46'),
(5, 2, 'uploads/store2_banner.jpg', 0, 0, '2026-04-13 08:25:46'),
(6, 3, 'uploads/store3_front.jpg', 1, 0, '2026-04-13 08:25:46'),
(7, 3, 'uploads/store3_inside.jpg', 1, 0, '2026-04-13 08:25:46'),
(8, 4, 'uploads/store4_front.jpg', 1, 0, '2026-04-13 08:25:46'),
(9, 4, 'uploads/store4_products.jpg', 1, 0, '2026-04-13 08:25:46');

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
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_store_rating`
--

INSERT INTO `tbl_store_rating` (`store_rating_id`, `store_id`, `user_id`, `rating`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 3, 1, 0, '2026-04-13 01:02:22', '2026-04-13 03:26:50'),
(2, 1, 1, 5, 1, 0, '2026-04-13 01:02:22', '2026-04-13 03:26:52'),
(3, 1, 1, 5, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(4, 1, 2, 4, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(5, 1, 3, 3, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(6, 1, 4, 5, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(7, 2, 1, 4, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(8, 2, 2, 5, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(9, 2, 5, 4, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(10, 2, 6, 3, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(11, 3, 3, 5, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(12, 3, 4, 4, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(13, 3, 7, 2, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25'),
(14, 3, 8, 3, 1, 0, '2026-04-13 08:24:25', '2026-04-13 08:24:25');

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
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_tax`
--

INSERT INTO `tbl_tax` (`tax_id`, `tax_name`, `value_type`, `value`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'GST 5%', 'percentage', 5.00, 1, 0, '2026-04-13 08:22:09', '2026-04-13 08:22:09'),
(2, 'GST 12%', 'percentage', 12.00, 1, 0, '2026-04-13 08:22:09', '2026-04-13 08:22:09'),
(3, 'GST 18%', 'percentage', 18.00, 1, 0, '2026-04-13 08:22:09', '2026-04-13 08:22:09'),
(4, 'GST 28%', 'percentage', 28.00, 1, 0, '2026-04-13 08:22:09', '2026-04-13 08:22:09'),
(5, 'Flat Delivery Charge', 'fixed', 50.00, 1, 0, '2026-04-13 08:22:09', '2026-04-13 08:22:09');

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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `login_type`, `social_id`, `email`, `password`, `name`, `country_code`, `phone`, `steps`, `profile_pic`, `lang_id`, `is_active`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 's', NULL, 'jay@gmail.com', '698d51a19d8a121ce581499d7b701668', 'Mange Jay', '+91', '7016515226', 3, 'http://jay.com', NULL, 1, 0, '2026-04-12 12:03:14', '2026-04-12 17:43:04'),
(2, 'g', 'sadaad', 'jay263@gmail.com', NULL, NULL, NULL, NULL, 2, NULL, NULL, 1, 0, '2026-04-12 12:06:23', '2026-04-12 12:19:36'),
(3, 's', NULL, 'rohit.mehta@gmail.com', 'hashed_pass_1', 'Rohit Mehta', '+91', '9812345670', 3, 'https://example.com/profile1.jpg', 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(4, 's', NULL, 'priya.patel@gmail.com', 'hashed_pass_2', 'Priya Patel', '+91', '9823456781', 2, 'https://example.com/profile2.jpg', 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(5, 'g', 'google_1029384756', 'aman.verma@gmail.com', NULL, 'Aman Verma', '+91', '9834567892', 1, 'https://example.com/profile3.jpg', 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(6, 'f', 'fb_5647382910', 'sneha.kapoor@gmail.com', NULL, 'Sneha Kapoor', '+91', '9845678903', 1, 'https://example.com/profile4.jpg', 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(7, 's', NULL, 'vikas.yadav@gmail.com', 'hashed_pass_3', 'Vikas Yadav', '+91', '9856789014', 3, NULL, 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(8, 'g', 'google_9988776655', 'anita.shah@gmail.com', NULL, 'Anita Shah', '+91', '9867890125', 2, 'https://example.com/profile5.jpg', 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(9, 's', NULL, 'karan.malhotra@gmail.com', 'hashed_pass_4', 'Karan Malhotra', '+91', '9878901236', 3, NULL, 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46'),
(10, 'f', 'fb_1122334455', 'pooja.singh@gmail.com', NULL, 'Pooja Singh', '+91', '9889012347', 1, 'https://example.com/profile6.jpg', 1, 1, 0, '2026-04-13 08:23:46', '2026-04-13 08:23:46');

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
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `tbl_user_device`
--

INSERT INTO `tbl_user_device` (`id`, `user_id`, `token`, `device_token`, `device_type`, `device_name`, `device_model`, `os_version`, `uuid`, `ip`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJpYXQiOjE3NzYwMTQxNzIsImV4cCI6MTc3NjEwMDU3Mn0.0JhKbEVWJrflKdpLGE8k4cVCYTi_urO8ZOKVu6AD4Vc', 'ABCD', 'a', 'iPhone 17', 'iP17AJ', '7.7', '89ka56', '192.48.62.23', 1, 0, '2026-04-12 17:16:12', '2026-04-12 17:37:04'),
(11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJpYXQiOjE3NzYxMDA2MTgsImV4cCI6MTc3NjE4NzAxOH0.NwUKY9jmUk21zoTCK_nNNWfri-YkkHTqOJmfawtuBFY', 'ABCD', 'a', 'iPhone 17', 'iP17AJ', '7.7', '89ka56', '192.48.62.23', 1, 0, '2026-04-13 17:16:58', '2026-04-13 17:16:58');

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
  `product_type_id` bigint DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  `is_delete` tinyint DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`variant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_variants`
--

INSERT INTO `tbl_variants` (`variant_id`, `product_id`, `size_id`, `color_id`, `qty`, `price`, `product_type_id`, `sku`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 2, 40, 499.00, 1, 'TSHIRT-M-BLUE-001', 1, 0, '2026-04-13 08:32:02', '2026-04-14 13:13:03'),
(2, 1, 3, 2, 40, 499.00, 1, 'TSHIRT-L-BLUE-002', 1, 0, '2026-04-13 08:32:02', '2026-04-13 10:45:25'),
(3, 1, 4, 2, 30, 499.00, 3, 'TSHIRT-XL-BLUE-003', 1, 0, '2026-04-13 08:32:02', '2026-04-13 10:45:55'),
(4, 1, 2, 3, 55, 529.00, 3, 'TSHIRT-M-BLACK-004', 1, 0, '2026-04-13 08:32:02', '2026-04-14 13:13:03'),
(5, 1, 3, 3, 45, 529.00, 1, 'TSHIRT-L-BLACK-005', 1, 0, '2026-04-13 08:32:02', '2026-04-13 10:45:38'),
(6, 1, 5, 3, 25, 529.00, 1, 'TSHIRT-XL-BLACK-006', 1, 0, '2026-04-13 08:32:02', '2026-04-13 10:45:40'),
(7, 2, 8, 2, 25, 1299.00, 2, 'JEANS-30-BLUE-007', 1, 0, '2026-04-13 08:32:02', '2026-04-14 13:13:03'),
(8, 2, 9, 2, 30, 1299.00, 2, 'JEANS-32-BLUE-008', 1, 0, '2026-04-13 08:32:02', '2026-04-13 10:45:46'),
(9, 2, 10, 2, 20, 1299.00, 3, 'JEANS-34-BLUE-009', 1, 0, '2026-04-13 08:32:02', '2026-04-13 10:45:49'),
(10, 6, 8, 3, 25, 799.00, 2, 'JEANS-30-BLACK-010', 1, 0, '2026-04-13 08:32:02', '2026-04-13 17:43:57'),
(11, 2, 9, 3, 20, 799.00, 3, 'JEANS-32-BLACK-011', 1, 0, '2026-04-13 08:32:02', '2026-04-13 17:39:11'),
(12, 5, 10, 3, 15, 1399.00, 2, 'JEANS-34-BLACK-012', 1, 0, '2026-04-13 08:32:02', '2026-04-13 17:25:39');

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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_wishlist`
--

INSERT INTO `tbl_wishlist` (`wishlist_id`, `user_id`, `product_id`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 1, 0, '2026-04-13 08:16:53', '2026-04-13 08:16:53'),
(2, 1, 1, 1, 0, '2026-04-13 08:16:53', '2026-04-13 08:16:53'),
(3, 2, 1, 1, 0, '2026-04-13 08:17:08', '2026-04-13 08:17:08'),
(4, 2, 2, 1, 0, '2026-04-13 08:17:08', '2026-04-13 08:17:08');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
