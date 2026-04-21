const service = require("../Service/user.service");
const validator = require("../Validator/user.validator");
const {responseCode} = require("../../../Constant/constant");
const common = require("../../../Common/common");
const { sendResponse } = require("../../../Common/Middleware/middleware");
const env = require("dotenv").config();

// Fetch Home data
const Home = async (req, res) => {
  try {
    const response = await service.fetchHome(req.user.user_id);
    // console.log(req.user)
    if (!response.success)
      sendResponse(req, res, 400, responseCode.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        responseCode.SUCCESS,
        { key: "homeDataFound" },
        response.data,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      responseCode.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch banners
const fetchBanners = async (req, res) => {
  try {
    const response = await service.fetchBanners();

    if (!response.key === "noBannersFound")
      sendResponse(
        req,
        res,
        200,
        responseCode.NO_DATA_FOUND,
        { key: "noBannersFound" },
        {},
      );
    else if (!response.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: "somethingWentWrong" },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "bannersFound" },
        response.banners,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch stores
const fetchStores = async (req, res) => {
  try {
    const stores = await service.fetchStores(req.query);
    console.log(stores);

    // if no stores found
    if (stores.key === "noStoresFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noStoresFound" },
        {},
      );
    // if something went wrong
    else if (!stores.success)
      sendResponse(req, res, 400, constants.ERROR, { key: stores.key }, {});
    // if stores found
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "storesFound" },
        stores.stores,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch rating and review
const fetchRatingAndReview = async (req, res) => {
  try {
    const ratingsAndReviews = await service.fetchRatingAndReview(req.query);

    if (ratingsAndReviews.key === "noRatingsAndReviewsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noRatingsAndReviewsFound" },
        {},
      );
    else if (!ratingsAndReviews.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: ratingsAndReviews.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "ratingsAndReviewsFound" },
        ratingsAndReviews.ratingsAndReviews,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch store details
const fetchStoreDetails = async (req, res) => {
  try {
    const storeDetails = await service.fetchStoreDetails(req.query.store_id);

    if (storeDetails.key === "noStoreDetailsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noStoreDetailsFound" },
        {},
      );
    else if (!storeDetails.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: storeDetails.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "storeDetailsFound" },
        storeDetails.storeDetails,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch store products
const fetchStoreProducts = async (req, res) => {
  try {
    const storeProducts = await service.fetchStoreProducts({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (storeProducts.key === "noStoreProductsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noStoreProductsFound" },
        {},
      );
    else if (!storeProducts.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: storeProducts.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "storeProductsFound" },
        storeProducts.storeProducts,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch top discounted deals
const fetchTopDeals = async (req, res) => {
  try {
    const deals = await service.fetchTopDeals({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (deals.key === "noTopDealsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noTopDealsFound" },
        {},
      );
    else if (!deals.success)
      sendResponse(req, res, 400, constants.ERROR, { key: deals.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "topDealsFound" },
        deals.topDeals,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch categories
const fetchCategory = async (req, res) => {
  try {
    const categories = await service.fetchCategory();

    if (categories.key === "noCategoriesFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCategoriesFound" },
        {},
      );
    else if (!categories.success)
      sendResponse(req, res, 400, constants.ERROR, { key: categories.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "categoriesFound" },
        categories.categories,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch product details
const fetchProductDetails = async (req, res) => {
  try {
    const response = await service.fetchProductDetails({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (response.key === "noProductDetailsFound")
      sendResponse(
        req,
        res,
        200,
        responseCode.NO_DATA_FOUND,
        { key: "noProductDetailsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, responseCode.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        responseCode.SUCCESS,
        { key: "productDetailsFound" },
        response.productDetails,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      responseCode.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch trending now
const fetchTrendingNow = async (req, res) => {
  try {
    const trendingProducts = await service.fetchTrendingNow({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (trendingProducts.key === "noTrendingProductsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noTrendingProductsFound" },
        {},
      );
    else if (!trendingProducts.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: trendingProducts.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "trendingProductsFound" },
        trendingProducts.trendingProducts,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch new arrivals
const fetchNewArrivals = async (req, res) => {
  try {
    const newArrivals = await service.fetchNewArrivals({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (newArrivals.key === "noNewArrivalsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noNewArrivalsFound" },
        {},
      );
    else if (!newArrivals.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: newArrivals.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "newArrivalsFound" },
        newArrivals.newArrivals,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch best selling
const fetchBestSelling = async (req, res) => {
  try {
    const bestSellingProducts = await service.fetchBestSelling({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (bestSellingProducts.key === "noBestSellingProductsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noBestSellingProductsFound" },
        {},
      );
    else if (!bestSellingProducts.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: bestSellingProducts.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "bestSellingProductsFound" },
        bestSellingProducts.bestSellingProducts,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch recently bought
const fetchRecentlyBought = async (req, res) => {
  try {
    const data = { ...req.query, user_id: req.user.user_id };
    const recentlyBoughtProducts = await service.fetchRecentlyBought(data);

    if (recentlyBoughtProducts.key === "noRecentlyBoughtProductsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noRecentlyBoughtProductsFound" },
        {},
      );
    else if (!recentlyBoughtProducts.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: recentlyBoughtProducts.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "recentlyBoughtProductsFound" },
        recentlyBoughtProducts.recentlyBoughtProducts,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch Size Chart
const fetchSizeChart = async (req, res) => {
  try {
    const sizeChart = await service.fetchSizeChart(req.query.product_id);

    if (sizeChart.key === "noSizeChartFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noSizeChartFound" },
        {},
      );
    else if (!sizeChart.success)
      sendResponse(req, res, 400, constants.ERROR, { key: sizeChart.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "sizeChartFound" },
        sizeChart.sizeChart,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch Available Sizes
const fetchAvailableSizes = async (req, res) => {
  try {
    const availableSizes = await service.fetchAvailableSizes(
      req.query.product_id,
    );

    if (availableSizes.key === "noAvailableSizesFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noAvailableSizesFound" },
        {},
      );
    else if (!availableSizes.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: availableSizes.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "availableSizesFound" },
        availableSizes.availableSizes,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch Available Product Types
const fetchAvailableProductTypes = async (req, res) => {
  try {
    const availableProductTypes = await service.fetchAvailableProductTypes(
      req.query.product_id,
    );

    if (availableProductTypes.key === "noAvailableProductTypesFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noAvailableProductTypesFound" },
        {},
      );
    else if (!availableProductTypes.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: availableProductTypes.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "availableProductTypesFound" },
        availableProductTypes.availableProductTypes,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Create or update cart
const createCart = async (req, res) => {
  try {
    const cart = await service.createCart({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (
      [
        "invalidCartData",
        "invalidQuantity",
        "productNotFound",
        "variantNotFound",
        "insufficientStock",
        "taxNotFound",
        "voucherNotFound",
        "addressNotFound",
      ].includes(cart.key)
    )
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: cart.key },
        {},
      );
    else if (!cart.success)
      sendResponse(req, res, 400, constants.ERROR, { key: cart.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: cart.key },
        cart.cart,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Create address
const createAddress = async (req, res) => {
  try {
    const address = await service.createAddress({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (address.key === "invalidAddressData")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "invalidAddressData" },
        {},
      );
    else if (!address.success)
      sendResponse(req, res, 400, constants.ERROR, { key: address.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "addressCreated" },
        address.address,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Create card
const createCard = async (req, res) => {
  try {
    const card = await service.createCard({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (card.key === "invalidCardData")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "invalidCardData" },
        {},
      );
    else if (!card.success)
      sendResponse(req, res, 400, constants.ERROR, { key: card.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cardCreated" },
        card.card,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch addresses
const fetchAddresses = async (req, res) => {
  try {
    const addresses = await service.fetchAddresses({
      user_id: req.user.user_id,
      ...req.query,
    });
    // console.log('controller', addresses)
    if (addresses.key === "noAddressFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noAddressFound" },
        {},
      );
    else if (!addresses.success)
      sendResponse(req, res, 400, constants.ERROR, { key: addresses.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "addressFound" },
        addresses.address,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch cards
const fetchCards = async (req, res) => {
  try {
    const cards = await service.fetchCards({
      user_id: req.user.user_id,
      ...req.query,
    });

    if (cards.key === "noCardFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCardFound" },
        {},
      );
    else if (!cards.success)
      sendResponse(req, res, 400, constants.ERROR, { key: cards.key }, {});
    else console.log(cards.card);
    sendResponse(
      req,
      res,
      200,
      constants.SUCCESS,
      { key: "cardFound" },
      cards.card,
    );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const address = await service.updateAddress({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (address.key === "addressNotFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "addressNotFound" },
        {},
      );
    else if (address.key === "invalidAddressData")
      sendResponse(
        req,
        res,
        200,
        constants.ERROR,
        { key: "invalidAddressData" },
        {},
      );
    else if (!address.success)
      sendResponse(req, res, 400, constants.ERROR, { key: address.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "addressUpdated" },
        address.address,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Delete address
const deleteAddress = async (req, res) => {
  try {
    const address = await service.deleteAddress({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (address.key === "addressNotFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "addressNotFound" },
        {},
      );
    else if (!address.success)
      sendResponse(req, res, 400, constants.ERROR, { key: address.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "addressDeleted" },
        {},
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Delete card
const deleteCard = async (req, res) => {
  try {
    const card = await service.deleteCard({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (card.key === "cardNotFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "cardNotFound" },
        {},
      );
    else if (!card.success)
      sendResponse(req, res, 400, constants.ERROR, { key: card.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cardDeleted" },
        {},
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch Cart
const fetchCart = async (req, res) => {
  try {
    const cart = await service.fetchCart({
      user_id: req.user.user_id,
    });

    if (cart.key === "noCartFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCartFound" },
        {},
      );
    else if (!cart.success)
      sendResponse(req, res, 400, constants.ERROR, { key: cart.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cartFound" },
        cart.data,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Place order from cart
const placeOrderFromCart = async (req, res) => {
  try {
    const order = await service.placeOrderFromCart({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (
      ["noCartFound", "addressNotFound", "insufficientStock"].includes(
        order.key,
      )
    )
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: order.key },
        {},
      );
    else if (!order.success)
      sendResponse(req, res, 400, constants.ERROR, { key: order.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "orderPlaced" },
        order.order,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};


// Search
const search = async (req, res) => {
  try {
    const searchResponse = await service.search({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (searchResponse.key === "noSearchResultFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noSearchResultFound" },
        {},
      );
    else if (!searchResponse.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: searchResponse.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "searchResultFound" },
        searchResponse.searchResult,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch Search History
const fetchSearchHistory = async (req, res) => {
  try {
    const searchHistory = await service.fetchSearchHistory({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (searchHistory.key === "noSearchHistoryFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noSearchHistoryFound" },
        {},
      );
    else if (!searchHistory.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: searchHistory.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "searchHistoryFound" },
        searchHistory.searchHistory,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch order history
const fetchOrderHistory = async (req, res) => {
  try {
    const response = await service.fetchOrderHistory({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (response.key === "noOrderHistoryFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noOrderHistoryFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "orderHistoryFound" },
        response.orders,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch order details
const fetchOrderDetails = async (req, res) => {
  try {
    const response = await service.fetchOrderDetails({
      user_id: req.user.user_id,
      order_id: req.params.order_id,
    });

    if (response.key === "noOrderDetailsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noOrderDetailsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "orderDetailsFound" },
        response.order,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch order timeline
const fetchOrderTimeline = async (req, res) => {
  try {
    const response = await service.fetchOrderTimeline({
      user_id: req.user.user_id,
      order_id: req.params.order_id,
    });

    if (["noOrderDetailsFound", "noOrderTimelineFound"].includes(response.key))
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: response.key },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "orderTimelineFound" },
        response.timeline,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const profile = await service.updateProfile({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (profile.key === "invalidProfileData")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "invalidProfileData" },
        {},
      );
    else if (!profile.success)
      sendResponse(req, res, 400, constants.ERROR, { key: profile.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "profileUpdated" },
        profile.user,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch wishlist
const fetchWishlist = async (req, res) => {
  try {
    const wishlist = await service.fetchWishlist({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (wishlist.key === "noWishlistFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noWishlistFound" },
        {},
      );
    else if (!wishlist.success)
      sendResponse(req, res, 400, constants.ERROR, { key: wishlist.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "wishlistFound" },
        wishlist.wishlist,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch notifications
const fetchNotifications = async (req, res) => {
  try {
    const notifications = await service.fetchNotifications({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (notifications.key === "noNotificationsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noNotificationsFound" },
        {},
      );
    else if (!notifications.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: notifications.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "notificationsFound" },
        notifications.notifications,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const notification = await service.deleteNotification({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (notification.key === "notificationNotFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "notificationNotFound" },
        {},
      );
    else if (!notification.success)
      sendResponse(
        req,
        res,
        400,
        constants.ERROR,
        { key: notification.key },
        {},
      );
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "notificationDeleted" },
        {},
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch blogs
const fetchBlogs = async (req, res) => {
  try {
    const blogs = await service.fetchBlogs(req.query);

    if (blogs.key === "noBlogsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noBlogsFound" },
        {},
      );
    else if (!blogs.success)
      sendResponse(req, res, 400, constants.ERROR, { key: blogs.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "blogsFound" },
        blogs.blogs,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch specific blog
const fetchBlogById = async (req, res) => {
  try {
    const blog = await service.fetchBlogById(req.params.blog_id);

    if (blog.key === "noBlogFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noBlogFound" },
        {},
      );
    else if (!blog.success)
      sendResponse(req, res, 400, constants.ERROR, { key: blog.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "blogFound" },
        blog.blog,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// CMS pages
const fetchAboutUs = async (req, res) => {
  try {
    const response = await service.fetchAboutUs();
    if (response.key === "noCmsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCmsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cmsFound" },
        response.cms,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

const fetchPrivacyPolicy = async (req, res) => {
  try {
    const response = await service.fetchPrivacyPolicy();
    if (response.key === "noCmsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCmsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cmsFound" },
        response.cms,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

const fetchTermsAndConditions = async (req, res) => {
  try {
    const response = await service.fetchTermsAndConditions();
    if (response.key === "noCmsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCmsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cmsFound" },
        response.cms,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

const fetchReturnRefundPolicy = async (req, res) => {
  try {
    const response = await service.fetchReturnRefundPolicy();
    if (response.key === "noCmsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noCmsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "cmsFound" },
        response.cms,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// FAQs
const fetchFaq = async (req, res) => {
  try {
    const response = await service.fetchFaq();
    if (response.key === "noFaqFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noFaqFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "faqFound" },
        response.faqs,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch chat
const fetchChat = async (req, res) => {
  try {
    const response = await service.fetchChat({
      ...req.query,
      user_id: req.user.user_id,
    });

    if (response.key === "noChatFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noChatFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "chatFound" },
        response.chat,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Fetch return reasons
const fetchReturnReasons = async (req, res) => {
  try {
    const response = await service.fetchReturnReasons();

    if (response.key === "noReturnReasonsFound")
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: "noReturnReasonsFound" },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "returnReasonsFound" },
        response.reasons,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Add rating and review
const addRatingAndReview = async (req, res) => {
  try {
    const response = await service.addRatingAndReview({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (["orderItemNotFound", "orderNotDelivered"].includes(response.key))
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: response.key },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "ratingCreated" },
        response.rating,
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Place return order
const placeReturnOrder = async (req, res) => {
  try {
    const response = await service.placeReturnOrder({
      ...req.body,
      user_id: req.user.user_id,
    });

    if (
      [
        "orderItemNotFound",
        "orderNotDelivered",
        "returnAlreadyRequested",
      ].includes(response.key)
    )
      sendResponse(
        req,
        res,
        200,
        constants.NO_DATA_FOUND,
        { key: response.key },
        {},
      );
    else if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "returnOrderCreated" },
        { return_order_id: response.return_order_id },
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

// Contact us
const createContactUs = async (req, res) => {
  try {
    const response = await service.createContactUs(req.body);

    if (!response.success)
      sendResponse(req, res, 400, constants.ERROR, { key: response.key }, {});
    else
      sendResponse(
        req,
        res,
        200,
        constants.SUCCESS,
        { key: "contactUsCreated" },
        { contact_id: response.contact_id },
      );
  } catch (error) {
    console.log(error);
    sendResponse(
      req,
      res,
      400,
      constants.ERROR,
      { key: "somethingWentWrong" },
      {},
    );
  }
};

module.exports = {
  Home,
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
