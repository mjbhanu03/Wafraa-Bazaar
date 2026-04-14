const joi = require("joi");

const createCartSchema = joi.object({
  product_id: joi.number().integer().required(),
  variant_id: joi.number().integer().required(),
  quantity: joi.number().integer().min(1).required(),
});

const createAddressSchema = joi.object({
  name: joi.string().trim().required(),
  company: joi.string().trim().allow("").optional(),
  address1: joi.string().trim().required(),
  address2: joi.string().trim().allow("").optional(),
  city_id: joi.number().integer().required(),
  postal_code: joi.string().trim().required(),
  latitude: joi.number().required(),
  longitude: joi.number().required(),
});

const updateAddressSchema = joi.object({
  address_id: joi.number().integer().required(),
  name: joi.string().trim().optional(),
  company: joi.string().trim().allow("").optional(),
  address1: joi.string().trim().optional(),
  address2: joi.string().trim().allow("").optional(),
  city_id: joi.number().integer().optional(),
  postal_code: joi.string().trim().optional(),
  latitude: joi.number().optional(),
  longitude: joi.number().optional(),
});

const deleteAddressSchema = joi.object({
  address_id: joi.number().integer().required(),
});

const createCardSchema = joi.object({
  card_name: joi.string().trim().allow("").optional(),
  card_holder_name: joi.string().trim().required(),
  bank: joi.string().trim().allow("").optional(),
  card_type: joi.string().valid("credit", "debit").required(),
  card_number: joi
    .string()
    .trim()
    .pattern(/^\d{13,19}$/)
    .required(),
  exp_at: joi
    .string()
    .trim()
    .pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
    .required(),
  is_default: joi.number().integer().valid(0, 1).optional(),
});

const deleteCardSchema = joi.object({
  card_detail_id: joi.number().integer().required(),
});

const updateProfileSchema = joi.object({
  name: joi.string().trim().optional(),
  country_code: joi.string().trim().optional(),
  phone: joi.string().trim().optional(),
  profile_pic: joi.string().trim().optional(),
  lang_id: joi.number().integer().optional(),
});

const addRatingAndReviewSchema = joi.object({
  order_item_id: joi.number().integer().required(),
  rating: joi.number().integer().min(1).max(5).required(),
  description: joi.string().trim().allow("").optional(),
});

const placeReturnOrderSchema = joi.object({
  order_item_id: joi.number().integer().required(),
  return_reason_id: joi.number().integer().required(),
  description: joi.string().trim().allow("").optional(),
  image_urls: joi
    .array()
    .items(joi.string().trim().required())
    .min(1)
    .optional(),
});

const deleteNotificationSchema = joi.object({
  notification_id: joi.number().integer().required(),
});

const contactUsSchema = joi.object({
  contact_type: joi.string().trim().required(),
  title: joi.string().trim().required(),
  email: joi.string().email().when("contact_type", {
    is: "email",
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  description: joi.string().trim().required(),
  country_code: joi.string().trim().when("contact_type", {
    is: "phone",
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  phone: joi.string().trim().when("contact_type", {
    is: "phone",
    then: joi.required(),
    otherwise: joi.optional(),
  }),
}).or("email", "phone");

const placeOrderSchema = joi.object({
  address_id: joi.number().integer().required(),
  tax_id: joi.number().optional(),
  payment_type: joi.string().trim().required(),
  discount_id: joi.number().integer().optional(),
  card_detail_id: joi
    .number()
    .integer()
    .when("payment_type", {
      is: joi.valid("COD").not(),
      then: joi.required(),
      otherwise: joi.optional(),
    }),
});

const searchSchema = joi.object({
  query_for: joi.string().valid("product", "store").required(),
  query: joi.string().trim().optional(),
  minPrice: joi.number().min(0).optional(),
  maxPrice: joi.number().min(0).optional(),
  category: joi.number().optional(),
  subCategory: joi.number().optional(),
  storeRating: joi.number().min(0).max(5).optional(),
  page: joi.number().integer().min(1).optional(),
  limit: joi.number().integer().min(1).optional(),
});

module.exports = {
  createCartSchema,
  createAddressSchema,
  updateAddressSchema,
  deleteAddressSchema,
  createCardSchema,
  deleteCardSchema,
  updateProfileSchema,
  addRatingAndReviewSchema,
  placeReturnOrderSchema,
  deleteNotificationSchema,
  contactUsSchema,
  placeOrderSchema,
  searchSchema,
};
