const express = require("express");

const controller = require("../Controller/user.controller");
const common = require("../../../Common/common");
const validator = require("../Validator/user.validator");
const { decryption } = require("../../../Common/Middleware/middleware");

const router = express.Router();

// Fetch Home
router.get("/home", controller.Home);

// Fetch banners
router.get("/fetchBanners", controller.fetchBanners);

// Fetch stores
router.get("/store", controller.fetchStores);

// Fetch rating and review for product
router.get("/ratingAndReview", controller.fetchRatingAndReview);

// Fetch specific store details
router.get("/storeDetails", controller.fetchStoreDetails);

// Fetch all products of specific store
router.get("/storeProducts", controller.fetchStoreProducts);

// Fetch product details
router.get("/productDetails", controller.fetchProductDetails);

// Fetch top discounted deals
router.get("/topDeals", controller.fetchTopDeals);

// Fetch trending now products
router.get("/trendingNow", controller.fetchTrendingNow);

// Fetch categories
router.get("/category", controller.fetchCategory);

// Fetch new arrival products
router.get("/newArrivals", controller.fetchNewArrivals);

// Fetch best selling products
router.get("/bestSelling", controller.fetchBestSelling);

// Fetch recently bought products
router.get("/recentlyBought", controller.fetchRecentlyBought);

// Fetch size chart
router.get("/sizeChart", controller.fetchSizeChart);

// Fetch available sizes
router.get("/availableSizes", controller.fetchAvailableSizes);

// Fetch available product types
router.get("/availableProductTypes", controller.fetchAvailableProductTypes);

// Search products or stores
router.post(
  "/search",
  common.validate(validator.searchSchema),
  controller.search,
);

// Fetch search history
router.get("/searchHistory", controller.fetchSearchHistory);

// Create or update cart
router.post(
  "/cart",
  common.validate(validator.createCartSchema),
  controller.createCart,
);

// Add Address
router.post(
  "/address",
  common.validate(validator.createAddressSchema),
  controller.createAddress,
);

// Add Card
router.post(
  "/card",
  common.validate(validator.createCardSchema),
  controller.createCard,
);

// Fetch user addresses
router.get("/address", controller.fetchAddresses);

// Update profile
router.put(
  "/profile",
  common.validate(validator.updateProfileSchema),
  controller.updateProfile,
);

// Fetch cards
router.get("/card", controller.fetchCards);

// Update Address
router.put(
  "/address",
  common.validate(validator.updateAddressSchema),
  controller.updateAddress,
);

// Delete Address
router.delete(
  "/address",
  common.validate(validator.deleteAddressSchema),
  controller.deleteAddress,
);

// Delete Card
router.delete(
  "/card",
  common.validate(validator.deleteCardSchema),
  controller.deleteCard,
);

// Fetch cart items
router.get("/cart", controller.fetchCart);

// Fetch wishlist
router.get("/wishlist", controller.fetchWishlist);

// Fetch notifications
router.get("/notification", controller.fetchNotifications);

// Delete notification
router.delete(
  "/notification",
  common.validate(validator.deleteNotificationSchema),
  controller.deleteNotification,
);

// Fetch blogs
router.get("/blogs", controller.fetchBlogs);

// Fetch specific blog
router.get("/blogs/:blog_id", controller.fetchBlogById);

// CMS pages
router.get("/aboutUs", controller.fetchAboutUs);
router.get("/privacyPolicy", controller.fetchPrivacyPolicy);
router.get("/termsAndConditions", controller.fetchTermsAndConditions);
router.get("/returnRefundPolicy", controller.fetchReturnRefundPolicy);

// FAQ
router.get("/faq", controller.fetchFaq);

// Chat
router.get("/chat", controller.fetchChat);

// Return reasons
router.get("/returnReasons", controller.fetchReturnReasons);

// Fetch Vouchers


// Place order from cart
router.post(
  "/order",
  common.validate(validator.placeOrderSchema),
  controller.placeOrderFromCart,
);

// Add rating and review
router.post(
  "/ratingAndReview",
  common.validate(validator.addRatingAndReviewSchema),
  controller.addRatingAndReview,
);

// 

// Place return order
router.post(
  "/returnOrder",
  common.validate(validator.placeReturnOrderSchema),
  controller.placeReturnOrder,
);

// Contact us
router.post(
  "/contactUs",
  common.validate(validator.contactUsSchema),
  controller.createContactUs,
);

// Fetch order history (tab: current|delivered)
router.get("/order/history", controller.fetchOrderHistory);

// Fetch single order details
router.get("/order/:order_id", controller.fetchOrderDetails);

// Fetch order timeline
router.get("/order/:order_id/tracking", controller.fetchOrderTimeline);

module.exports = router;
