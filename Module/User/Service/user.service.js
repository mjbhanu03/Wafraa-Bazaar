const repository = require("../Repository/user.repository");
const common = require("../../../Common/common");
const { sub } = require("framer-motion/m");

// Fetch Home data
const fetchHome = async (user_id) => {
  try {
    const user = await repository.getUserById(user_id);
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
    const notifications = await repository.countNotifications(user_id);
    const cart = await repository.countCart(user_id);
    // console.log(cart, notifications);
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
        notifications,
        cart,
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
    if (!productDetails)
      return { success: false, key: "noProductDetailsFound" };
    const productData = await repository.fetchProductData(data.product_id);
    const suggestedProducts = await repository.fetchSuggestedProducts(
      productDetails.category_id,
    );
    const productSizes = await repository.fetchProductSizes(data.product_id);
    const productSizesWithColors = await Promise.all(
      productSizes.map(async (size) => ({
        ...size,
        colors: await repository.fetchProductColors(
          data.product_id,
          size.size_id,
        ),
      })),
    );
    // console.log(productDetails[0].category_id);

    // const firstRow = productDetails[0];
    productDetails.product_data = productData;
    productDetails.product_sizes = productSizesWithColors;
    // productDetails.product_colors = productSizesWithColors;
    productDetails.suggested_products = suggestedProducts;

    return {
      success: true,
      key: "productDetailsFound",
      productDetails: productDetails,
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

    // if no stores found
    // if(stores.) return { success: false, key: "noStoresFound" }

    if (!stores.length) return { success: false, key: "noStoresFound" };

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
    if (data.category_id) {
      const category = await repository.getCategoryById(data.category_id);
      if (!category) return { success: false, key: "categoryNotFound" };
    }

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
    const user_id = Number(data?.user_id) || 0;
    const isItemUpdate =
      data.product_id !== undefined ||
      data.variant_id !== undefined ||
      data.quantity !== undefined;

    let activeCart = await repository.getActiveCartByUserId(user_id);
    if (!activeCart) {
      const cart_id = await repository.createCartHeader(user_id);
      activeCart = await repository.getActiveCartByUserId(user_id);
      if (!activeCart) activeCart = { cart_id, user_id };
    }

    const recalculateCartHeaderAmounts = async () => {
      const latestCart = await repository.getActiveCartByUserId(user_id);
      if (!latestCart) return;

      const cartItems = await repository.fetchCartItems({
        user_id,
        page: 1,
        limit: 1000,
      });
      const subtotal = cartItems.reduce(
        (sum, item) => sum + Number(item.total_price || 0),
        0,
      );

      let taxAmount = 0;
      if (latestCart.tax_id) {
        const tax = await repository.fetchTax(latestCart.tax_id);
        if (tax) {
          if (tax.value_type === "percentage") {
            taxAmount = (subtotal * Number(tax.tax_value)) / 100;
          } else {
            taxAmount = Number(tax.tax_value);
          }
        }
      }

      const deliveryCharge = Number(latestCart.delivery_charge || 0);
      let offerAmount = 0;
      if (latestCart.voucher_id) {
        const voucher = await repository.fetchVoucherById(
          latestCart.voucher_id,
        );
        if (voucher) {
          const discountBase = subtotal + taxAmount + deliveryCharge;
          if (voucher.discount_type === "percentage") {
            offerAmount = (discountBase * Number(voucher.amount)) / 100;
          } else {
            offerAmount = Number(voucher.amount);
          }
        }
      }

      const totalPrice = Math.max(
        0,
        subtotal + taxAmount + deliveryCharge - offerAmount,
      );

      await repository.updateCartHeader(latestCart.cart_id, {
        tax_amount: taxAmount,
        offer_amount: offerAmount,
        subtotal,
        total_price: totalPrice,
      });
    };

    if (isItemUpdate) {
      const product_id = Number(data?.product_id) || 0;
      const variant_id = Number(data?.variant_id) || 0;
      const quantity = Number(data?.quantity);

      const productExists = await repository.getProductById(product_id);
      if (!productExists) {
        return { success: false, key: "productNotFound" };
      }

      const variantExists = await repository.getVariantById(
        product_id,
        variant_id,
      );
      if (!variantExists) {
        return { success: false, key: "variantNotFound" };
      }

      if (quantity > variantExists.qty) {
        return { success: false, key: "insufficientStock" };
      }

      const price = Number(variantExists.price);
      const cartItem = await repository.getCartItem(
        user_id,
        product_id,
        variant_id,
      );

      if (quantity === 0) {
        if (cartItem.length) {
          await repository.deleteCartItem(cartItem[0].cart_item_id);
          await recalculateCartHeaderAmounts();
          return { success: true, key: "cartItemDeleted" };
        }

        return { success: false, key: "cartItemNotFound" };
      }

      if (cartItem.length) {
        await repository.updateCartItem(
          cartItem[0].cart_item_id,
          quantity,
          price,
        );
        await recalculateCartHeaderAmounts();

        return {
          success: true,
          key: "cartUpdated",
          cart: {
            user_id,
            cart_item_id: cartItem[0].cart_item_id,
            product_id,
            variant_id,
            quantity,
            price,
          },
        };
      }

      const insertId = await repository.insertCartItem(
        user_id,
        product_id,
        variant_id,
        quantity,
        price,
      );

      await recalculateCartHeaderAmounts();

      return {
        success: true,
        key: "cartCreated",
        cart: {
          user_id,
          cart_item_id: insertId,
          product_id,
          variant_id,
          quantity,
          price,
        },
      };
    }

    const cartItems = await repository.fetchCartItems({
      user_id,
      page: 1,
      limit: 1000,
    });
    const subtotal = cartItems.reduce(
      (sum, item) => sum + Number(item.total_price || 0),
      0,
    );

    const hasTaxId = data.tax_id !== undefined;
    const hasVoucherId = data.voucher_id !== undefined;
    const hasAddressId = data.address_id !== undefined;
    const hasDeliveryCharge = data.delivery_charge !== undefined;

    const nextTaxId = hasTaxId
      ? data.tax_id === null
        ? null
        : Number(data.tax_id)
      : activeCart.tax_id;

    const nextVoucherId = hasVoucherId
      ? data.voucher_id === null
        ? null
        : Number(data.voucher_id)
      : activeCart.voucher_id;

    const nextAddressId = hasAddressId
      ? data.address_id === null
        ? null
        : Number(data.address_id)
      : activeCart.address_id;

    const deliveryChargeInput = hasDeliveryCharge
      ? Number(data.delivery_charge || 0)
      : Number(activeCart.delivery_charge || 0);

    let tax = null;
    let taxAmount = 0;
    if (nextTaxId) {
      tax = await repository.fetchTax(nextTaxId);
      if (!tax) return { success: false, key: "taxNotFound" };
      if (tax.value_type === "percentage") {
        taxAmount = (subtotal * Number(tax.tax_value)) / 100;
      } else {
        taxAmount = Number(tax.tax_value);
      }
    }

    let voucher = null;
    let offerAmount = 0;
    if (nextVoucherId) {
      voucher = await repository.fetchVoucherById(nextVoucherId);
      if (!voucher) return { success: false, key: "voucherNotFound" };

      const discountBase = subtotal + taxAmount + deliveryChargeInput;
      if (voucher.discount_type === "percentage") {
        offerAmount = (discountBase * Number(voucher.amount)) / 100;
      } else {
        offerAmount = Number(voucher.amount);
      }
    }

    if (nextAddressId) {
      const address = await repository.fetchAddress({
        address_id: nextAddressId,
        user_id,
      });
      if (!address) return { success: false, key: "addressNotFound" };
    }

    const totalPrice = Math.max(
      0,
      subtotal + taxAmount + deliveryChargeInput - offerAmount,
    );

    const headerUpdate = {
      tax_id: nextTaxId,
      voucher_id: nextVoucherId,
      address_id: nextAddressId,
      tax_amount: taxAmount,
      delivery_charge: deliveryChargeInput,
      offer_amount: offerAmount,
      subtotal,
      total_price: totalPrice,
      updated_at: new Date(),
    };

    await repository.updateCartHeader(activeCart.cart_id, headerUpdate);

    const updatedCart = await repository.fetchCart({ user_id });
    return {
      success: true,
      key: "cartHeaderUpdated",
      cart: updatedCart,
    };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Create Address
const createAddress = async (data) => {
  try {
    // Check if this is the first address
    const addressCount = await repository.countUserAddresses(data.user_id);
    const is_default = addressCount === 0 ? 1 : 0;

    const address = await repository.createAddress({
      ...data,
      is_default,
    });

    if (!address) return { success: false, key: "addressCreationFailed" };
    const addressData = await repository.fetchAddress({
      address_id: address,
      user_id: data.user_id,
    });

    return { success: true, key: "addressCreated", address: addressData };
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

    if (!card) return { success: false, key: "cardCreationFailed" };

    const cardData = await repository.fetchCard({
      card_detail_id: card,
      user_id: data.user_id,
    });

    if (!cardData) return { success: false, key: "cardNotFound" };

    cardData.card_number = common.decrypt_card(cardData.card_number);

    return { success: true, key: "cardCreated", card: cardData };
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
    return { success: true, key: "cardFound", card: cardList };
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

    if (!card) return { success: false, key: "cardDeletionFailed" };

    return { success: true, key: "cardDeleted" };
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

    const object = {};

    if (data.name) object.name = data.name;
    if (data.company) object.company = data.company;
    if (data.address1) object.address1 = data.address1;
    if (data.address2) object.address2 = data.address2;
    if (data.city_id) object.city_id = data.city_id;
    if (data.postal_code) object.postal_code = data.postal_code;
    if (data.latitude) object.latitude = data.latitude;
    if (data.longitude) object.longitude = data.longitude;

    // Handle setting as default address
    if (data.is_default === 1) {
      await repository.setDefaultAddress(data.address_id, data.user_id);
    }

    const updatedAddress = await repository.updateAddress(
      object,
      data.address_id,
      data.user_id,
    );

    return { success: true, key: "addressUpdated", address: updatedAddress };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Delete address
const deleteAddress = async (data) => {
  try {
    // Is address exists
    const is_addressExist = await repository.fetchAddress({
      address_id: data.address_id,
      user_id: data.user_id,
    });
    if (!is_addressExist) return { success: false, key: "addressNotFound" };

    const address = await repository.deleteAddress(data);

    if (!address) return { success: false, key: "addressDeletionFailed" };

    return { success: true, key: "addressDeleted" };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Fetch Cart
const fetchCart = async (data) => {
  try {
    const cart = await repository.fetchCart(data);

    if (!cart) return { success: false, key: "noCartFound" };

    return { success: true, key: "cartFound", data: cart };
  } catch (error) {
    console.log(error);
    return { success: false, key: "somethingWentWrong" };
  }
};

// Place Order from Cart
const placeOrderFromCart = async (data) => {
  try {
    const activeCart = await repository.getActiveCartByUserId(data.user_id);
    if (!activeCart) return { success: false, key: "noCartFound" };

    // Fetch cart items
    let cartItems = await repository.fetchCartItems(data);
    let subTotal = 0;
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
          return { success: false, key: "productNotFound" };
        }

        const variant = await repository.fetchVariant(item.variant_id);
        if (!variant) {
          return { success: false, key: "variantNotFound" };
        }

        if (variant.qty < item.quantity) {
          return { success: false, key: "insufficientStock" };
        }
        console.log(variant);
        item.color_name = variant.color_name;
        item.size_name = variant.size_name;
        item.sub_category_name = checkAvailability.sub_category_name;
        item.category_name = checkAvailability.category_name;
        item.title = checkAvailability.title;
        subTotal += Number(variant.price) * Number(item.quantity);
        item.price = variant.price;
        item.total_price = Number(variant.price) * Number(item.quantity);

        return item;
      }),
    );

    const failedItem = cartItems.find((item) => item.success === false);

    if (failedItem) {
      return {
        success: false,
        key: failedItem.key,
      };
    }

    // fetch address details
    const address = await repository.fetchAddress({
      address_id: data.address_id,
      user_id: data.user_id,
    });
    if (!address) return { success: false, key: "addressNotFound" };

    // Starting calculations
    totalAmount = subTotal;

    // fetch tax details if tax_id is provided
    let tax = null;
    let totalTaxAmount = 0;
    if (data.tax_id) {
      tax = await repository.fetchTax(data.tax_id);
      if (!tax) return { success: false, key: "taxNotFound" };
      if (tax.value_type === "percentage") {
        totalTaxAmount = (totalAmount * Number(tax.tax_value)) / 100;
        totalAmount += totalTaxAmount;
      } else {
        totalTaxAmount = Number(tax.tax_value);
        totalAmount += totalTaxAmount;
      }
    }

    // fetch voucher details if voucher_code is provided
    let voucher = null;
    let voucherAmount = 0;
    if (data.voucher_code) {
      voucher = await repository.fetchVoucherByCode(data.voucher_code);
      if (!voucher) return { success: false, key: "voucherNotFound" };

      const voucherRedeem = await repository.fetchVoucherRedeem(
        voucher.voucher_id,
        data.user_id,
      );
      if (voucherRedeem) {
        return { success: false, key: "voucherAlreadyRedeemed" };
      }

      if (voucher.discount_type === "percentage") {
        voucherAmount = (totalAmount * Number(voucher.amount)) / 100;
        if (voucher.max_value && voucherAmount > Number(voucher.max_value)) {
          voucherAmount = Number(voucher.max_value);
          totalAmount -= voucherAmount;
        } else {
          totalAmount -= voucherAmount;
        }
      } else {
        totalAmount -= Number(voucher.amount);
      }

      if (totalAmount < 0) {
        totalAmount = 0;
      }
    }

    // if payment type is card then fetch card details
    if (data.payment_type !== "COD") {
      card = await repository.fetchCard({
        card_detail_id: data.card_detail_id,
        user_id: data.user_id,
      });
      console.log("fetching card details", card);
      if (!card) return { success: false, key: "cardNotFound" };
    }
    // Place order from cart

    let order = await repository.insertOrder({
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
      discount_type: voucher ? voucher.amount_type : null,
      discount_value: voucherAmount ? voucherAmount : null,
      voucher_name: voucher ? voucher.voucher_name : null,
      payment_type: data.payment_type,
      card_name: card ? card.card_name : null,
      card_holder_name: card ? card.card_holder_name : null,
      card_number: card ? card.card_number : null,
      card_type: card ? card.card_type : null,
      total_final_tax: tax ? totalTaxAmount : null,
      subtotal: subTotal,
      total_price: totalAmount,
    });

    let order_id = order;
    // Map Items with order id
    const itemsWithOrderId = cartItems.map((item) => ({
      ...item,
      order_id,
      size: item.size_name,
      color: item.color_name,
    }));

    await repository.insertOrderItems(itemsWithOrderId);

    if (voucher) {
      await repository.insertVoucherRedeem({
        voucher_id: voucher.voucher_id,
        user_id: data.user_id,
        order_id,
        is_active: 1,
        is_deleted: 0,
      });
    }

    if (order) await repository.insertOrderTracking(order_id);

    const cartItemIds = cartItems.map((item) => item.cart_item_id);

    // Clear cart
    await repository.clearCart({
      user_id: data.user_id,
      cartItemIds,
    });

    await repository.markCartCheckedout(activeCart.cart_id);

    for (const item of cartItems) {
      const updated = await repository.updateVariantStock(item);

      if (!updated) {
        return { success: false, key: "insufficientStock" };
      }
    }
    await repository.placeNotification({
      user_id: data.user_id,
      message: `Your order with order id ${order_id} has been placed successfully.`,
      order_id,
    });
    if (!order) return { success: false, key: "orderPlacementFailed" };

    let orderDetails = await repository.fetchOrderDetails({
      order_id: order_id,
      user_id: data.user_id,
    });
    return { success: true, key: "orderPlaced", order: orderDetails };
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
    const profile = await repository.updateProfile(data);
    if (!profile) return { success: false, key: "profileUpdateFailed" };

    const Updateduser = await repository.getUserById(data.user_id);

    return { success: true, key: "profileUpdated", user: Updateduser };
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
      user_id: data.user_id,
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
    if (!result) return { success: false, key: "notificationDeletionFailed" };

    return { success: true, key: "notificationDeleted" };
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

    if (!rating) return { success: false, key: "ratingCreationFailed" };
    const ratingData = await repository.fetchRatingById(rating);
    return { success: true, key: "ratingCreated", rating: ratingData };
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
