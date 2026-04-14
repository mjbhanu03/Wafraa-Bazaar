const repository = require("../Repository/user.repository");
const common = require("../../../Common/common");

// Fetch Home data
const fetchHome = async (user_id) => {
  try {
    const user = await repository.fetchUserById(user_id);
    const banners = await repository.fetchBanners();
    const stores = await repository.fetchStores();
    const topDeals = await repository.fetchTopDeals({ user_id });
    const trendingProducts = await repository.fetchTrendingNow({ user_id });
    const categories = await repository.fetchCategory();
    const newArrivals = await repository.fetchNewArrivals({ user_id });
    const bestSellingProducts = await repository.fetchBestSelling({ user_id });
    const recentlyBoughtProducts = await repository.fetchRecentlyBought({
      user_id,
    });
    return {
      success: true,
      key: "homeDataFound",
      data: {
        user,
        banners,
        stores,
        topDeals,
        trendingProducts,
        categories,
        newArrivals,
        bestSellingProducts,
        recentlyBoughtProducts,
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch categories
const fetchCategory = async () => {
  try {
    const categories = await repository.fetchCategory();

    if (!categories.length) return { success: false, key: "noCategoriesFound" };

    return { success: true, key: "categoriesFound", categories };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch product details
const fetchProductDetails = async (data) => {
  try {
    const productDetails = await repository.fetchProductDetails(data);
    const productData = await repository.fetchProductData(data.product_id);
    const productSizes = await repository.fetchProductSizes(data.product_id);
    const productColors = await repository.fetchProductColors(data.product_id);
    const suggestedProducts = await repository.fetchSuggestedProducts(
      productDetails[0].category_id,
    );
    // console.log(productDetails[0].category_id);

    if (!productDetails.length)
      return { success: false, key: "noProductDetailsFound" };

    // const firstRow = productDetails[0];
    productDetails[0].product_data = productData;
    productDetails[0].product_sizes = productSizes;
    productDetails[0].product_colors = productColors;
    productDetails[0].suggested_products = suggestedProducts;

    return {
      success: true,
      key: "productDetailsFound",
      productDetails: productDetails[0],
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch banners
const fetchBanners = async () => {
  try {
    const banners = await repository.fetchBanners();
    if (!banners.length) return { success: false, key: "noBannersFound" };
    return { success: true, key: "bannersFound", banners };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch stores
const fetchStores = async (data) => {
  try {
    const stores = await repository.fetchStores(data);
    console.log(stores);

    // if no stores found
    // if(stores.) return { success: false, key: "noStoresFound" }

    if (!stores) return { success: false, key: "noStoresFound" };

    return { success: true, key: "storesFound", stores };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch rating and review
const fetchRatingAndReview = async (data) => {
  try {
    const ratingsAndReviews = await repository.fetchRatingAndReview(data);

    if (!ratingsAndReviews.length)
      return { success: false, key: "noRatingsAndReviewsFound" };

    return { success: true, key: "ratingsAndReviewsFound", ratingsAndReviews };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch store details
const fetchStoreDetails = async (store_id) => {
  try {
    const storeDetails = await repository.fetchStoreDetails(store_id);

    if (!storeDetails) return { success: false, key: "noStoreDetailsFound" };

    return { success: true, key: "storeDetailsFound", storeDetails };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch store products
const fetchStoreProducts = async (data) => {
  try {
    const storeProducts = await repository.fetchStoreProducts(data);

    if (!storeProducts.length)
      return { success: false, key: "noStoreProductsFound" };

    return { success: true, key: "storeProductsFound", storeProducts };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch top discounted deals
const fetchTopDeals = async (data) => {
  try {
    const topDeals = await repository.fetchTopDeals(data);

    if (!topDeals.length) return { success: false, key: "noTopDealsFound" };

    return { success: true, key: "topDealsFound", topDeals };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch trending now
const fetchTrendingNow = async (data) => {
  try {
    const trendingProducts = await repository.fetchTrendingNow(data);

    if (!trendingProducts.length)
      return { success: false, key: "noTrendingProductsFound" };

    return { success: true, key: "trendingProductsFound", trendingProducts };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch new arrivals
const fetchNewArrivals = async (data) => {
  try {
    const newArrivals = await repository.fetchNewArrivals(data);

    if (!newArrivals.length)
      return { success: false, key: "noNewArrivalsFound" };

    return { success: true, key: "newArrivalsFound", newArrivals };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch best selling
const fetchBestSelling = async (data) => {
  try {
    const bestSellingProducts = await repository.fetchBestSelling(data);

    if (!bestSellingProducts.length)
      return { success: false, key: "noBestSellingProductsFound" };

    return {
      success: true,
      key: "bestSellingProductsFound",
      bestSellingProducts,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch recently bought
const fetchRecentlyBought = async (data) => {
  try {
    const recentlyBoughtProducts = await repository.fetchRecentlyBought(data);

    if (!recentlyBoughtProducts.length)
      return { success: false, key: "noRecentlyBoughtProductsFound" };

    return {
      success: true,
      key: "recentlyBoughtProductsFound",
      recentlyBoughtProducts,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Size Chart
const fetchSizeChart = async (product_id) => {
  try {
    const sizeChart = await repository.fetchSizeChart(product_id);

    if (!sizeChart.length) return { success: false, key: "noSizeChartFound" };
    console.log(sizeChart);
    return {
      success: true,
      key: "sizeChartFound",
      sizeChart,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Available Sizes
const fetchAvailableSizes = async (product_id) => {
  try {
    const availableSizes = await repository.fetchAvailableSizes(product_id);

    if (!availableSizes.length)
      return { success: false, key: "noAvailableSizesFound" };

    return {
      success: true,
      key: "availableSizesFound",
      availableSizes,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Available Product Types
const fetchAvailableProductTypes = async (product_id) => {
  try {
    const availableProductTypes =
      await repository.fetchAvailableProductTypes(product_id);

    if (!availableProductTypes.length)
      return { success: false, key: "noAvailableProductTypesFound" };

    return {
      success: true,
      key: "availableProductTypesFound",
      availableProductTypes,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Create Cart
const createCart = async (data) => {
  try {
    const cart = await repository.createCart(data);

    if (!cart.success) return { success: false, key: cart.key };
    return { success: true, key: cart.key, cart: cart.cart };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Create Address
const createAddress = async (data) => {
  try {
    const address = await repository.createAddress(data);

    if (!address.success) return { success: false, key: address.key };

    const addressData = await repository.fetchAddress({
      address_id: address.address,
      user_id: data.user_id,
    });

    return { success: true, key: address.key, address: addressData };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Addresses
const fetchAddresses = async (data) => {
  try {
    const addresses = await repository.fetchAddresses(data);
    // console.log('from service', addresses)
    if (!addresses.length) return { success: false, key: "noAddressFound" };
    return { success: true, key: "addressFound", address: addresses };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Create Card
const createCard = async (data) => {
  try {
    const encryptedCardNumber = await common.encrypt_card(data.card_number);
    if (encryptedCardNumber === "cardEncryptionFailed") {
      return { success: false, key: "cardEncryptionFailed" };
    }

    const card = await repository.createCard({
      ...data,
      card_number: encryptedCardNumber,
    });

    if (!card.success) return { success: false, key: card.key };

    const cardData = await repository.fetchCard({
      card_detail_id: card.card_detail_id,
      user_id: data.user_id,
    });

    if (!cardData) return { success: false, key: "cardNotFound" };

    cardData.card_number = common.decrypt_card(cardData.card_number);

    return { success: true, key: card.key, card: cardData };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Cards
const fetchCards = async (data) => {
  try {
    const cards = await repository.fetchCards(data);

    if (!cards.length) return { success: false, key: "noCardFound" };

    const cardList = await Promise.all(
      cards.map(async (card) => ({
        ...card,
        card_number: await common.decrypt_card(card.card_number),
      })),
    );
    console.log(cards.card);
    return { success: true, key: "cardFound", card: cardList };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Update address
const updateAddress = async (data) => {
  try {
    // Is address exists
    const is_addressExist = await repository.fetchAddress({
      address_id: data.address_id,
      user_id: data.user_id,
    });
    if (!is_addressExist) return { success: false, key: "addressNotFound" };

    const address = await repository.updateAddress(data);
    if (!address.success) return { success: false, key: address.key };

    const updatedAddress = await repository.fetchAddress({
      address_id: data.address_id,
      user_id: data.user_id,
    });

    return { success: true, key: address.key, address: updatedAddress };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

const deleteAddress = async (data) => {
  try {
    // Is address exists
    const is_addressExist = await repository.fetchAddress({
      address_id: data.address_id,
      user_id: data.user_id,
    });
    if (!is_addressExist) return { success: false, key: "addressNotFound" };

    const address = await repository.deleteAddress(data);

    if (!address.success) return { success: false, key: address.key };

    return { success: true, key: address.key };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Delete Card
const deleteCard = async (data) => {
  try {
    const isCardExist = await repository.fetchCard(data);
    if (!isCardExist) return { success: false, key: "cardNotFound" };

    const card = await repository.deleteCard(data);

    if (!card.success) return { success: false, key: card.key };

    return { success: true, key: card.key };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Cart
const fetchCart = async (data) => {
  try {
    const cart = await repository.fetchCart(data);

    if (!cart.length) return { success: false, key: "noCartFound" };

    return { success: true, key: "cartFound", cart };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Place Order from Cart
const placeOrderFromCart = async (data) => {
  try {
    // Fetch cart items
    let cartItems = await repository.fetchCart(data);
    let totalAmount = 0;
    let card;
    if (!cartItems.length) return { success: false, key: "noCartFound" };

    // Check for product and variant availability
    cartItems = await Promise.all(
      cartItems.map(async (item) => {
        const checkAvailability = await repository.fetchProductDetails({
          product_id: item.product_id,
          user_id: data.user_id,
        });
        if (!checkAvailability) {
          return { success: false, key: checkAvailability.key };
        }

        const variant = await repository.fetchVariant(item.variant_id);
        if (!variant) {
          return { success: false, key: variant.key };
        }

        if (variant.qty < item.quantity) {
          return { success: false, key: "insufficientStock" };
        }

        item.color_name = variant.color_name;
        item.size_name = variant.size_name;
        item.sub_category_name = checkAvailability.sub_category_name;
        item.category_name = checkAvailability.category_name;
        item.title = checkAvailability.title;

        item.price = variant.price;
        item.total_price = Number(variant.price) * Number(item.quantity);

        return item;
      }),
    );

    // Calculate total amount
    totalAmount = cartItems.reduce((sum, item) => sum + item.total_price, 0);
    // fetch address details
    const address = await repository.fetchAddress({
      address_id: data.address_id,
      user_id: data.user_id,
    });
    if (!address) return { success: false, key: "addressNotFound" };

    // fetch tax details if tax_id is provided
    let tax = null;
    if (data.tax_id) {
      tax = await repository.fetchTax(data.tax_id);
      if (!tax) return { success: false, key: "taxNotFound" };
      if (tax.value_type === "percentage") {
        totalAmount += (totalAmount * Number(tax.tax_value)) / 100;
      } else {
        totalAmount += Number(tax.tax_value);
      }
    }

    // fetch discount details if discount_id is provided
    let discount = null;
    if (data.discount_id) {
      discount = await repository.fetchDiscount(data.discount_id);
      if (!discount) return { success: false, key: "discountNotFound" };

      if (discount.amount_type === "percentage") {
        if (discount.max_value) {
          const discountAmount = (totalAmount * Number(discount.amount)) / 100;
          totalAmount -=
            discountAmount > Number(discount.max_value)
              ? Number(discount.max_value)
              : discountAmount;
        } else {
          totalAmount -= (totalAmount * Number(discount.amount)) / 100;
        }
      } else {
        totalAmount -= Number(discount.amount);
      }
    }

    // if payment type is card then fetch card details
    if (data.payment_type !== "COD") {
      card = await repository.fetchCard({
        card_detail_id: data.card_detail_id,
        user_id: data.user_id,
      });
      if (!card) return { success: false, key: "cardNotFound" };
    }
    // Place order from cart
    const order = await repository.placeOrderFromCart({
      user_id: data.user_id,
      name: address.name,
      company: address.company,
      address1: address.address1,
      address2: address.address2,
      city: address.city_name,
      state: address.state_name,
      country: address.country_name,
      postal_code: address.postal_code,
      latitude: address.latitude,
      longitude: address.longitude,
      tax_name: tax ? tax.tax_name : null,
      tax_value: tax ? tax.tax_value : null,
      discount_name: discount ? discount.discount_name : null,
      discount_type: discount ? discount.amount_type : null,
      discount_value: discount ? discount.discount_value : null,
      payment_type: data.payment_type,
      card_name: card ? card.card_name : null,
      card_holder_name: card ? card.card_holder_name : null,
      card_type: card ? card.card_type : null,
      total_price: totalAmount,
      cartItems,
    });

    if (!order.success) return { success: false, key: order.key };
    return { success: true, key: order.key, order: order.order };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Search
const search = async (data) => {
  try {
    let searchResult = [];

    if (data.query_for === "product") {
      searchResult = await repository.fetchProductSearchResult(data);
    } else if (data.query_for === "store") {
      searchResult = await repository.fetchStoreSearchResult(data);
    }

    await repository.insertSearchHistory(data);

    if (!searchResult.length)
      return { success: false, key: "noSearchResultFound" };

    return { success: true, key: "searchResultFound", searchResult };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Search History
const fetchSearchHistory = async (data) => {
  try {
    const searchHistory = await repository.fetchSearchHistory(data);

    if (!searchHistory.length)
      return { success: false, key: "noSearchHistoryFound" };

    return { success: true, key: "searchHistoryFound", searchHistory };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch order history
const fetchOrderHistory = async (data) => {
  try {
    const orders = await repository.fetchOrderHistory(data);
    if (!orders.length) return { success: false, key: "noOrderHistoryFound" };
    return { success: true, key: "orderHistoryFound", orders };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch order details
const fetchOrderDetails = async (data) => {
  try {
    const order = await repository.fetchOrderDetails(data);
    if (!order) return { success: false, key: "noOrderDetailsFound" };
    return { success: true, key: "orderDetailsFound", order };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch order timeline
const fetchOrderTimeline = async (data) => {
  try {
    const timeline = await repository.fetchOrderTimeline(data);
    if (!timeline) return { success: false, key: "noOrderDetailsFound" };
    if (!timeline.length)
      return { success: false, key: "noOrderTimelineFound" };
    return { success: true, key: "orderTimelineFound", timeline };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Update profile
const updateProfile = async (data) => {
  try {
    const user = await repository.fetchUserById(data.user_id);
    if (!user) return { success: false, key: "userNotFound" };

    const profile = await repository.updateProfile(data);
    if (!profile.success) return { success: false, key: profile.key };

    return { success: true, key: profile.key, user: profile.user };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch wishlist
const fetchWishlist = async (data) => {
  try {
    const wishlist = await repository.fetchWishlist(data);

    if (!wishlist.length) return { success: false, key: "noWishlistFound" };

    return { success: true, key: "wishlistFound", wishlist };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch notifications
const fetchNotifications = async (data) => {
  try {
    const notifications = await repository.fetchNotifications(data);

    if (!notifications.length)
      return { success: false, key: "noNotificationsFound" };

    await repository.markNotificationsRead({
      user_id: data.user_id
    });


    return {
      success: true,
      key: "notificationsFound",
      notifications: notifications,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Delete notification
const deleteNotification = async (data) => {
  try {
    const notification = await repository.fetchNotificationById(
      data.notification_id,
      data.user_id,
    );
    if (!notification) return { success: false, key: "notificationNotFound" };

    const result = await repository.deleteNotification(data);
    if (!result.success) return { success: false, key: result.key };

    return { success: true, key: result.key };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch blogs
const fetchBlogs = async (data) => {
  try {
    const blogs = await repository.fetchBlogs(data);

    if (!blogs.length) return { success: false, key: "noBlogsFound" };

    return { success: true, key: "blogsFound", blogs };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch specific blog
const fetchBlogById = async (blog_id) => {
  try {
    const blog = await repository.fetchBlogById(blog_id);

    if (!blog) return { success: false, key: "noBlogFound" };

    return { success: true, key: "blogFound", blog };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// CMS helpers
const fetchAboutUs = async () => {
  try {
    const cms = await repository.fetchCmsAboutUs();
    if (!cms) return { success: false, key: "noCmsFound" };
    return { success: true, key: "cmsFound", cms };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

const fetchPrivacyPolicy = async () => {
  try {
    const cms = await repository.fetchCmsPrivacyPolicy();
    if (!cms) return { success: false, key: "noCmsFound" };
    return { success: true, key: "cmsFound", cms };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

const fetchTermsAndConditions = async () => {
  try {
    const cms = await repository.fetchCmsTerms();
    if (!cms) return { success: false, key: "noCmsFound" };
    return { success: true, key: "cmsFound", cms };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

const fetchReturnRefundPolicy = async () => {
  try {
    const cms = await repository.fetchCmsReturnRefundPolicy();
    if (!cms) return { success: false, key: "noCmsFound" };
    return { success: true, key: "cmsFound", cms };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch FAQs
const fetchFaq = async () => {
  try {
    const faqs = await repository.fetchFaqs();

    if (!faqs.length) return { success: false, key: "noFaqFound" };

    return { success: true, key: "faqFound", faqs };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch chat
const fetchChat = async (data) => {
  try {
    const chat = await repository.fetchChat(data);

    if (!chat.length) return { success: false, key: "noChatFound" };

    return { success: true, key: "chatFound", chat };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch return reasons
const fetchReturnReasons = async () => {
  try {
    const reasons = await repository.fetchReturnReasons();

    if (!reasons.length) return { success: false, key: "noReturnReasonsFound" };

    return { success: true, key: "returnReasonsFound", reasons };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Add rating and review
const addRatingAndReview = async (data) => {
  try {
    const orderItem = await repository.fetchOrderItemForRating(data);
    if (!orderItem) return { success: false, key: "orderItemNotFound" };


    const rating = await repository.createProductRating({
      user_id: data.user_id,
      product_id: orderItem.product_id,
      rating: data.rating,
      description: data.description,
    });

    if (!rating.success) return { success: false, key: rating.key };
    const ratingData = await repository.fetchRatingById(rating.product_rating_id);
    return { success: true, key: rating.key, rating: ratingData };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Place return order
const placeReturnOrder = async (data) => {
  try {
    const orderItem = await repository.fetchOrderItemForRating(data);
    if (!orderItem) return { success: false, key: "orderItemNotFound" };
    if (orderItem.order_status !== "delivered")
      return { success: false, key: "orderNotDelivered" };

    const existingReturn = await repository.fetchReturnOrderByItem(
      data.order_item_id,
    );
    if (existingReturn)
      return { success: false, key: "returnAlreadyRequested" };

    const result = await repository.placeReturnOrder({
      ...data,
      user_id: data.user_id,
      order_id: orderItem.order_id,
    });

    if (!result.success) return { success: false, key: result.key };

    return {
      success: true,
      key: result.key,
      return_order_id: result.return_order_id,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch contact form pages
const createContactUs = async (data) => {
  try {
    const result = await repository.fetchContactUs(data);
    if (!result.success) return { success: false, key: result.key };
    return { success: true, key: result.key, contact_id: result.contact_id };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

module.exports = {
  fetchHome,
  fetchBanners,
  fetchStores,
  fetchRatingAndReview,
  fetchStoreDetails,
  fetchStoreProducts,
  fetchProductDetails,
  fetchTopDeals,
  fetchTrendingNow,
  fetchCategory,
  fetchNewArrivals,
  fetchBestSelling,
  fetchRecentlyBought,
  fetchSizeChart,
  fetchAvailableSizes,
  fetchAvailableProductTypes,
  createCart,
  createAddress,
  createCard,
  fetchAddresses,
  fetchCards,
  updateAddress,
  deleteAddress,
  deleteCard,
  fetchCart,
  placeOrderFromCart,
  search,
  fetchSearchHistory,
  fetchOrderHistory,
  fetchOrderDetails,
  fetchOrderTimeline,
  updateProfile,
  fetchWishlist,
  fetchNotifications,
  deleteNotification,
  fetchBlogs,
  fetchBlogById,
  fetchAboutUs,
  fetchPrivacyPolicy,
  fetchTermsAndConditions,
  fetchReturnRefundPolicy,
  fetchFaq,
  fetchChat,
  fetchReturnReasons,
  addRatingAndReview,
  placeReturnOrder,
  createContactUs,
};
