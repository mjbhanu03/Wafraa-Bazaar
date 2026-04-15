const conn = require("../../../Config/db");
const { param } = require("../Routes/user.routes");

// == Check Functions ==

// Check if product exists
const getProductById  = async (product_id) => {   
const [[product]] = await conn.query(
    `select product_id from tbl_product where product_id = ? and is_active = 1 and is_delete = 0`,
    [product_id],
  ); 
return product || null;
};

// Check variant exists for product
const getVariantById = async (product_id, variant_id) => {
  const [[variant]] = await conn.query(
    `select variant_id, qty, price from tbl_variants where variant_id = ? and product_id = ? and is_active = 1 and is_delete = 0`,
    [variant_id, product_id],
  );
  return variant || null;
};

// Fetch user details by ID
const getUserById = async (user_id) => {
  const query = `select user_id, name, email, country_code, phone, profile_pic from tbl_user where user_id = ? and is_active = 1 and is_deleted = 0`;
  const params = [user_id];

  const [[user]] = await conn.query(query, params);
  return user || null;
};

// Check category exists by ID
const getCategoryById = async (category_id) => {
      const [[category]] = await conn.query(
      `select category_id from tbl_category where parent_id is not null and is_active = 1 and is_delete = 0 order by category_id limit 1`,
    );
    return category || null;
};

// Get cart item by user_id, product_id and variant_id
const getCartItem = async (user_id, product_id, variant_id) => {
  const [rows] = await conn.query(
    `SELECT cart_item_id 
     FROM tbl_cart_items 
     WHERE user_id = ? 
       AND product_id = ? 
       AND variant_id = ? 
       AND is_active = 1 
       AND is_delete = 0 
     LIMIT 1`,
    [user_id, product_id, variant_id]
  );
  return rows;
};
// == Check Functions ==

// fetch banners
const fetchBanners = async () => {
  const [banners] = await conn.query(
    `select banner_id, image_url, redirect_type, redirect_id, sort_order from tbl_banner where is_active = 1 and is_deleted = 0 order by sort_order`,
  );

  return banners;
};

// fetch stores
const fetchStores = async (data) => {
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 10;
  const query = `select s.store_id, s.name, min(sd.image_url), ifnull(avg(sr.rating), 0) as rating, count(sr.rating) as review_count 
        from tbl_store s 
        left join tbl_store_data sd on s.store_id = sd.store_id and sd.is_active = 1 and sd.is_deleted = 0
        left join tbl_store_rating sr on s.store_id = sr.store_id and sr.is_active = 1 and sr.is_delete = 0
        where s.is_active = 1 and s.is_delete = 0
        group by s.store_id
        limit ?, ?`;
  const params = [(page - 1) * limit, limit];

  const [stores] = await conn.query(query, params);

  return stores;
};

// fetch rating and review for product
const fetchRatingAndReview = async (data) => {
  const product_id = Number(data?.product_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 10;

  const query = `SELECT
    pr.product_rating_id,
    u.name,
    u.profile_pic,
    pr.user_id,
    pr.rating,
    pr.description,
    pr.updated_at
  FROM tbl_product_rating pr
  LEFT JOIN tbl_user u
    ON pr.user_id = u.user_id
    AND u.is_active = 1
    AND u.is_deleted = 0
  WHERE pr.product_id = ?
    AND pr.is_active = 1
    AND pr.is_delete = 0
  ORDER BY pr.updated_at DESC
  LIMIT ?, ?`;
  const params = [product_id, (page - 1) * limit, limit];

  const [ratingsAndReviews] = await conn.query(query, params);

  return ratingsAndReviews;
};

// fetch specific store details
const fetchStoreDetails = async (store_id) => {
  const query = `SELECT
    s.store_id,
    s.name,
    COUNT(sr.store_rating_id) AS total_rating,
    IFNULL(AVG(sr.rating), 0) AS avg_rating,
    s.latitude,
    s.longitude,
    s.office_name,
    s.street_name,
    s.city_id,
    c.city_name,
    st.state_id,
    st.state_name,
    cnt.country_id,
    cnt.country_name
  FROM tbl_store s
  LEFT JOIN tbl_store_rating sr
    ON s.store_id = sr.store_id
    AND sr.is_active = 1
    AND sr.is_delete = 0
  LEFT JOIN tbl_city c
    ON s.city_id = c.city_id
    AND c.is_active = 1
    AND c.is_deleted = 0
  LEFT JOIN tbl_state st
    ON c.state_id = st.state_id
    AND st.is_active = 1
    AND st.is_deleted = 0
  LEFT JOIN tbl_country cnt
    ON st.country_id = cnt.country_id
    AND cnt.is_active = 1
    AND cnt.is_deleted = 0
  WHERE s.store_id = ?
    AND s.is_active = 1
    AND s.is_delete = 0
  GROUP BY s.store_id`;
  const params = [store_id];

  const [[stores]] = await conn.query(query, params);

  return stores || null;
};

// fetch all products of specific store
const fetchStoreProducts = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const store_id = Number(data?.store_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 10;

  const query = `SELECT
    p.product_id,
    p.title,
    MIN(pd.image_url) AS image_url,
    MAX(d.discount_id) AS discount_id,
    MAX(d.amount_type) AS amount_type,
    MAX(d.amount) AS amount,
    MAX(d.max_value) AS max_value,
    CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
    IFNULL(AVG(pr.rating), 0) AS avg_rating,
    COUNT(pr.product_rating_id) AS rating_count
  FROM tbl_product p
  LEFT JOIN tbl_product_data pd
    ON p.product_id = pd.product_id
    AND pd.is_active = 1
    AND pd.is_delete = 0
  LEFT JOIN tbl_discount d
    ON p.product_id = d.product_id
    AND d.is_active = 1
    AND d.is_delete = 0
    AND (d.start_time IS NULL OR d.start_time <= NOW())
    AND (d.end_time IS NULL OR d.end_time >= NOW())
  LEFT JOIN tbl_wishlist w
    ON p.product_id = w.product_id
    AND w.user_id = ?
    AND w.is_active = 1
    AND w.is_delete = 0
  LEFT JOIN tbl_product_rating pr
    ON p.product_id = pr.product_id
    AND pr.is_active = 1
    AND pr.is_delete = 0
  WHERE p.store_id = ?
    AND p.is_active = 1
    AND p.is_delete = 0
  GROUP BY p.product_id
  ORDER BY p.created_at DESC
  LIMIT ?, ?`;
  const params = [user_id, store_id, (page - 1) * limit, limit];

  const [storeProducts] = await conn.query(query, params);

  return storeProducts;
};

// fetch product details
const fetchProductDetails = async (data) => {
  const product_id = Number(data?.product_id) || 0;
  const user_id = Number(data?.user_id) || 0;

  const query = `SELECT
  p.product_id,
  p.store_id,
  p.title,
  p.category_id,
  c.cate_name AS sub_category_name,
  parent_c.cate_name AS category_name,
  p.description,
  p.additional_info,
  AVG(pr.rating) AS product_rating,
  count(pr.product_rating_id) AS rating_count,
  d.discount_id AS discount_id,
  d.amount_type AS amount_type,
  d.amount AS amount,
  d.max_value AS max_value,
  CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
  s.name AS store_name,
  s.description AS store_description,
  s.office_name,
  s.street_name,
  s.city_id

FROM tbl_product p
INNER JOIN tbl_store s
  ON p.store_id = s.store_id
  AND s.is_active = 1
  AND s.is_delete = 0

LEFT JOIN tbl_product_rating pr
  ON p.product_id = pr.product_id
  AND pr.is_active = 1
  AND pr.is_delete = 0

LEFT JOIN tbl_discount d
  ON p.product_id = d.product_id
  AND d.is_active = 1
  AND d.is_delete = 0
  AND (d.start_time IS NULL OR d.start_time <= NOW())
  AND (d.end_time IS NULL OR d.end_time >= NOW())

LEFT JOIN tbl_wishlist w
  ON p.product_id = w.product_id
  AND w.user_id = ?
  AND w.is_active = 1
  AND w.is_delete = 0

LEFT JOIN tbl_category c
  ON p.category_id = c.category_id
  AND c.is_active = 1
  AND c.is_delete = 0

LEFT JOIN tbl_category parent_c
  ON c.parent_id = parent_c.category_id
  AND parent_c.is_active = 1
  AND parent_c.is_delete = 0

WHERE p.product_id = ?
  AND p.is_active = 1
  AND p.is_delete = 0
GROUP BY p.product_id`;
  const params = [user_id, product_id];

  const [[productDetails]] = await conn.query(query, params);

  return productDetails;
};

// Fetch Product Data
const fetchProductData = async (product_id) => {
  const [productData] = await conn.query(
    `SELECT image_url FROM tbl_product_data WHERE product_id = ? AND is_active = 1 AND is_delete = 0`,
    [product_id],
  );
  return productData;
};

// fetch top deals
const fetchTopDeals = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 3;

  const query = `SELECT
  d.discount_id,
  p.product_id,
  p.title,
  MIN(pd.image_url) AS image_url,
  d.amount_type,
  d.amount,
  d.max_value,
  CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
  IFNULL(AVG(pr.rating), 0) AS avg_rating,
  COUNT(pr.product_rating_id) AS rating_count
FROM tbl_discount d
INNER JOIN tbl_product p
  ON d.product_id = p.product_id
  AND p.is_active = 1
  AND p.is_delete = 0
LEFT JOIN tbl_product_data pd
  ON p.product_id = pd.product_id
  AND pd.is_active = 1
  AND pd.is_delete = 0
LEFT JOIN tbl_product_rating pr
  ON p.product_id = pr.product_id
  AND pr.is_active = 1
  AND pr.is_delete = 0
LEFT JOIN tbl_wishlist w
  ON p.product_id = w.product_id
  AND w.user_id = ?
  AND w.is_active = 1
  AND w.is_delete = 0
WHERE d.is_active = 1
  AND d.is_delete = 0
  AND d.amount > 0
  AND (d.start_time IS NULL OR d.start_time <= NOW())
  AND (d.end_time IS NULL OR d.end_time >= NOW())
GROUP BY d.discount_id
ORDER BY avg_rating DESC, rating_count DESC
LIMIT ?, ?`;
  const params = [user_id, (page - 1) * limit, limit];

  const [deals] = await conn.query(query, params);
  return deals;
};

// fetch trending products
const fetchTrendingNow = async (data) => {
  const { user_id, category_id, page = 1, limit = 10 } = data;

  let query = `SELECT
  p.product_id,
  p.title,
  MIN(pd.image_url) AS image_url,
  MAX(d.discount_id) AS discount_id,
  MAX(d.amount_type) AS amount_type,
  MAX(d.amount) AS amount,
  MAX(d.max_value) AS max_value,
  cs.cate_name AS sub_category_name,
  c.cate_name AS category_name,
  CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
  IFNULL(AVG(pr.rating), 0) AS avg_rating,
  COUNT(pr.product_rating_id) AS rating_count
FROM tbl_product p
LEFT JOIN tbl_product_data pd
  ON p.product_id = pd.product_id
  AND pd.is_active = 1
  AND pd.is_delete = 0
LEFT JOIN tbl_product_rating pr
  ON p.product_id = pr.product_id
  AND pr.is_active = 1
  AND pr.is_delete = 0
LEFT JOIN tbl_category cs
  ON p.category_id = cs.category_id
  AND cs.is_active = 1
  AND cs.is_delete = 0
LEFT JOIN tbl_category c
  ON cs.parent_id = c.category_id
  AND c.is_active = 1
  AND c.is_delete = 0
LEFT JOIN tbl_discount d
  ON p.product_id = d.product_id
  AND d.is_active = 1
  AND d.is_delete = 0
  AND (d.start_time IS NULL OR d.start_time <= NOW())
  AND (d.end_time IS NULL OR d.end_time >= NOW())
LEFT JOIN tbl_wishlist w
  ON p.product_id = w.product_id
  AND w.user_id = ?
  AND w.is_active = 1
  AND w.is_delete = 0
WHERE p.is_active = 1
  AND p.is_delete = 0
`;
  const params = [user_id];
  category_id &&
    (query += ` AND p.category_id = ?`) &&
    params.push(category_id);
  query += `
GROUP BY p.product_id
ORDER BY avg_rating DESC, rating_count DESC
LIMIT ?, ?`;
  params.push((page - 1) * Number(limit), Number(limit));

  // console.log(query, params);
  const [products] = await conn.query(query, params);
  console.log(products);
  return products;
};

// fetch new arrivals
const fetchNewArrivals = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const sub_category_id = Number(data?.sub_category_id) || 1;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 3;

  const query = `SELECT
  p.product_id,
  p.title,
  p.category_id,
  MIN(pd.image_url) AS image_url,
  MAX(d.discount_id) AS discount_id,
  MAX(d.amount_type) AS amount_type,
  MAX(d.amount) AS amount,
  MAX(d.max_value) AS max_value,
  CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
  p.created_at
FROM tbl_product p
LEFT JOIN tbl_product_data pd
  ON p.product_id = pd.product_id
  AND pd.is_active = 1
  AND pd.is_delete = 0
LEFT JOIN tbl_discount d
  ON p.product_id = d.product_id
  AND d.is_active = 1
  AND d.is_delete = 0
  AND (d.start_time IS NULL OR d.start_time <= NOW())
  AND (d.end_time IS NULL OR d.end_time >= NOW())
LEFT JOIN tbl_wishlist w
  ON p.product_id = w.product_id
  AND w.user_id = ?
  AND w.is_active = 1
  AND w.is_delete = 0
WHERE p.is_active = 1
  AND p.is_delete = 0
  AND p.category_id = ?
GROUP BY p.product_id
ORDER BY p.created_at DESC
LIMIT ?, ?`;
  const params = [user_id, sub_category_id, (page - 1) * limit, limit];

  const [products] = await conn.query(query, params);

  return products;
};

// fetch best selling products
const fetchBestSelling = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 3;
  const query = `SELECT
  p.product_id,
  p.title,
  MIN(pd.image_url) AS image_url,
  MAX(d.discount_id) AS discount_id,
  MAX(d.amount_type) AS amount_type,
  MAX(d.amount) AS amount,
  MAX(d.max_value) AS max_value,
  CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
  COUNT(oi.order_item_id) AS order_count
FROM tbl_product p
LEFT JOIN tbl_order_items oi
  ON p.product_id = oi.product_id
  AND oi.is_active = 1
  AND oi.is_delete = 0
LEFT JOIN tbl_order o
  ON oi.order_id = o.order_id
  AND o.is_active = 1
  AND o.is_delete = 0
LEFT JOIN tbl_product_data pd
  ON p.product_id = pd.product_id
  AND pd.is_active = 1
  AND pd.is_delete = 0
LEFT JOIN tbl_discount d
  ON p.product_id = d.product_id
  AND d.is_active = 1
  AND d.is_delete = 0
  AND (d.start_time IS NULL OR d.start_time <= NOW())
  AND (d.end_time IS NULL OR d.end_time >= NOW())
LEFT JOIN tbl_wishlist w
  ON p.product_id = w.product_id
  AND w.user_id = ?
  AND w.is_active = 1
  AND w.is_delete = 0
WHERE p.is_active = 1
  AND p.is_delete = 0
GROUP BY p.product_id
ORDER BY order_count DESC
LIMIT ?, ?`;
  const params = [user_id, (page - 1) * limit, limit];

  console.log(query, params);
  const [products] = await conn.query(query, params);
  console.log(products);
  return products;
};

// fetch recently bought products
const fetchRecentlyBought = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 3;
  const query = `SELECT
  p.product_id,
  p.title,
  MIN(pd.image_url) AS image_url,
  MAX(d.discount_id) AS discount_id,
  MAX(d.amount_type) AS amount_type,
  MAX(d.amount) AS amount,
  MAX(d.max_value) AS max_value,
  CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
  MAX(o.created_at) AS bought_at,
  COUNT(oi.order_item_id) AS bought_count
FROM tbl_order o
INNER JOIN tbl_order_items oi
  ON o.order_id = oi.order_id
  AND oi.is_active = 1
  AND oi.is_delete = 0
INNER JOIN tbl_product p
  ON oi.product_id = p.product_id
  AND p.is_active = 1
  AND p.is_delete = 0
LEFT JOIN tbl_product_data pd
  ON p.product_id = pd.product_id
  AND pd.is_active = 1
  AND pd.is_delete = 0
LEFT JOIN tbl_discount d
  ON p.product_id = d.product_id
  AND d.is_active = 1
  AND d.is_delete = 0
  AND (d.start_time IS NULL OR d.start_time <= NOW())
  AND (d.end_time IS NULL OR d.end_time >= NOW())
LEFT JOIN tbl_wishlist w
  ON p.product_id = w.product_id
  AND w.user_id = ?
  AND w.is_active = 1
  AND w.is_delete = 0
WHERE o.user_id = ?
  AND o.is_active = 1
  AND o.is_delete = 0
GROUP BY p.product_id
ORDER BY bought_at DESC
LIMIT ?, ?`;
  const params = [user_id, user_id, (page - 1) * limit, limit];

  const [products] = await conn.query(query, params);
  return products;
};

// fetch categories
const fetchCategory = async () => {
  const [categories] = await conn.query(
    `select category_id, cate_name, parent_id, image_url from tbl_category where parent_id is null and is_active = 1 and is_delete = 0 order by category_id`,
  );

  return categories;
};

// Fetch Product Sizes
const fetchProductSizes = async (product_id) => {
  const [sizes] = await conn.query(
    `SELECT s.size_id, s.value AS size_value 
    FROM tbl_variants v 
    left join tbl_size s on v.size_id = s.size_id and s.is_active = 1 and s.is_delete = 0
    WHERE v.product_id = ? and v.is_active = 1 and v.is_delete = 0
    group by s.value`,
    [product_id],
  );
  return sizes;
};

// Fetch Available Sizes
const fetchAvailableSizes = async (product_id) => {
  const [sizes] = await conn.query(
    `SELECT
      s.size_id,
      s.value AS size_value,
      SUM(v.qty) AS available_qty
    FROM tbl_variants v
    LEFT JOIN tbl_size s ON v.size_id = s.size_id AND s.is_active = 1 AND s.is_delete = 0
    WHERE v.product_id = ?
      AND v.is_active = 1
      AND v.is_delete = 0
      AND v.qty > 0
    GROUP BY s.size_id, s.value
    ORDER BY s.size_id`,
    [product_id],
  );
  return sizes;
};

// Fetch Available Product Types
const fetchAvailableProductTypes = async (product_id) => {
  const [productTypes] = await conn.query(
    `SELECT DISTINCT
      pt.product_type_id,
      pt.name AS product_type_value
    FROM tbl_variants v
    INNER JOIN tbl_product_type pt
      ON v.product_type_id = pt.product_type_id
      AND pt.is_active = 1
    WHERE v.product_id = ?
      AND v.is_active = 1
      AND v.is_delete = 0
      AND v.qty > 0`,
    [product_id],
  );
  return productTypes;
};

// Fetch Colors of Product
const fetchProductColors = async (product_id) => {
  const [colors] = await conn.query(
    `SELECT c.color_id, c.name AS color_value
    FROM tbl_variants v
    LEFT JOIN tbl_color c ON v.color_id = c.color_id AND c.is_active = 1 AND c.is_delete = 0
    WHERE v.product_id = ? and v.is_active = 1 and v.is_delete = 0 and v.qty > 0
    GROUP BY c.name`,
    [product_id],
  );
  return colors;
};

// Suggested Products based on category
const fetchSuggestedProducts = async (data) => {
  const category_id = Number(data) || 5;
  // console.log(category_id)
  const query = `SELECT
    p.product_id,
    p.title,
    MIN(pd.image_url) AS image_url, 
    d.discount_id AS discount_id,
    d.amount_type AS amount_type,
    d.amount AS amount,
    d.max_value AS max_value,
    CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist

    from tbl_product p

    LEFT JOIN tbl_product_data pd
      ON p.product_id = pd.product_id AND pd.is_active = 1 AND pd.is_delete = 0

    LEFT JOIN tbl_discount d
      ON p.product_id = d.product_id AND d.is_active = 1 AND d.is_delete = 0
      AND d.is_active = 1
        AND d.is_delete = 0
        AND (d.start_time IS NULL OR d.start_time <= NOW())
        AND (d.end_time IS NULL OR d.end_time >= NOW()) 

    LEFT JOIN tbl_wishlist w
      ON p.product_id = w.product_id 
      AND w.is_active = 1
        AND w.is_delete = 0

    WHERE p.is_active = 1
      AND p.is_delete = 0
      AND p.category_id = ?

    GROUP BY p.product_id
    ORDER BY p.created_at DESC
    LIMIT 10`;
  const params = [category_id];

  const [products] = await conn.query(query, params);

  return products || null;
};

// Fetch Size Chart
const fetchSizeChart = async (product_id) => {
    const [sizeChart] = await conn.query(
      `SELECT 
    s.value AS size_value,
    scv.measurement_name,
    scv.value AS measurement_value,
    scv.unit

FROM tbl_product p

JOIN tbl_size_chart sc 
    ON p.category_id = sc.category_id 
    AND sc.is_active = 1 
    AND sc.is_delete = 0

JOIN tbl_size_chart_values scv 
    ON sc.size_chart_id = scv.size_chart_id 
    AND scv.is_active = 1 
    AND scv.is_delete = 0

JOIN tbl_size s 
    ON scv.size_id = s.size_id 
    AND s.is_active = 1 
    AND s.is_delete = 0

WHERE p.product_id = ?`,
      [product_id],
    );

    return sizeChart || null;

};

// Update cart item
const updateCartItem = async (cart_item_id, quantity, price) => {
  await conn.query(
    `UPDATE tbl_cart_items 
     SET quantity = ?, price = ? 
     WHERE cart_item_id = ?`,
    [quantity, price, cart_item_id]
  );
};

// Insert item into cart
const insertCartItem = async (user_id, product_id, variant_id, quantity, price) => {
  const [result] = await conn.query(
    `INSERT INTO tbl_cart_items 
     (user_id, product_id, variant_id, quantity, price) 
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, product_id, variant_id, quantity, price]
  );
  return result.insertId;
};

// Delete cart item
const deleteCartItem = async (conn, cart_item_id) => {
  await conn.query(
    `DELETE FROM tbl_cart_items WHERE cart_item_id = ?`,
    [cart_item_id]
  );
};

// Create address
const createAddress = async (data) => {
  const {
    user_id,
    name,
    company,
    address1,
    address2,
    city_id,
    postal_code,
    latitude,
    longitude,
  } = data;
  const object = {
    user_id,
    name,
    company,
    address1,
    address2,
    city_id,
    postal_code,
    latitude,
    longitude,
  };
  const [address] = await conn.query(`INSERT INTO tbl_address set ?`, [object]);

  return address.insertId || null;
};

// Fetch address
const fetchAddress = async (data) => {
  const { address_id, user_id, page = 1, limit = 10 } = data;

  const [[address]] = await conn.query(
    `SELECT
      a.address_id,
      a.user_id,
      a.name,
      a.company,
      a.address1,
      a.address2,
      a.city_id,
      c.city_name,
      c.state_id,
      st.state_name,
      st.country_id,
      cnt.country_name,
      a.postal_code,
      a.latitude,
      a.longitude,
      a.is_default
    FROM tbl_address a
    LEFT JOIN tbl_city c
      ON a.city_id = c.city_id
      AND c.is_active = 1
      AND c.is_deleted = 0
    LEFT JOIN tbl_state st
    ON c.state_id = st.state_id
    AND st.is_active=1
    LEFT JOIN tbl_country cnt
    ON st.country_id = cnt.country_id
    AND cnt.is_active=1
    WHERE a.user_id = ?
      AND a.is_active = 1
      AND a.is_deleted = 0
      AND address_id = ? LIMIT ?, ?`,
    [user_id, address_id, (page - 1) * limit, limit],
  );

  return address || null;
};

// Fetch addresses
const fetchAddresses = async (data) => {
  const { user_id, page = 1, limit = 10 } = data;

  const [addresses] = await conn.query(
    `SELECT
      a.address_id,
      a.user_id,
      a.name,
      a.company,
      a.address1,
      a.address2,
      a.city_id,
      c.city_name,
      c.state_id,
      st.state_name,
      st.country_id,
      cnt.country_name,
      a.postal_code,
      a.latitude,
      a.longitude,
      a.is_default
    FROM tbl_address a

    LEFT JOIN tbl_city c
      ON a.city_id = c.city_id
      AND c.is_active = 1
      AND c.is_deleted = 0

    LEFT JOIN tbl_state st
    ON c.state_id = st.state_id
    AND st.is_active=1
    AND st.is_deleted=0

    LEFT JOIN tbl_country cnt
    ON st.country_id = cnt.country_id
    AND cnt.is_active=1
    AND cnt.is_deleted=0

    WHERE a.user_id = ?
      AND a.is_active = 1
      AND a.is_deleted = 0

      LIMIT ?, ?`,
    [user_id, (page - 1) * limit, limit],
  );
  // console.log(addresses);
  return addresses || null;
};

// Update address
const updateAddress = async (data, address_id, user_id) => {
  const [result] = await conn.query(
    `UPDATE tbl_address SET ? WHERE address_id = ? AND user_id = ? AND is_active = 1 AND is_deleted = 0`,
    [data, address_id, user_id],
  );

  return result.changedRows;
};

// Delete address
const deleteAddress = async (data) => {
  const { address_id, user_id } = data;

  const [result] = await conn.query(
    `UPDATE tbl_address
     SET is_active = 0,
         is_deleted = 1
     WHERE address_id = ? AND user_id = ? AND is_active = 1 AND is_deleted = 0`,
    [address_id, user_id],
  );
  return result.changedRows || 0;
};

// Create card
const createCard = async (data) => {
  const {
    user_id,
    card_name,
    card_holder_name,
    bank,
    card_type,
    card_number,
    exp_at,
  } = data;

  const object = {
    user_id,
    card_name: card_name || null,
    card_holder_name,
    bank: bank || null,
    card_type,
    card_number,
    exp_at,
  };

  const [card] = await conn.query(`INSERT INTO tbl_card_details SET ?`, [object]);

  return  card.insertId

};

// Fetch card
const fetchCard = async (data) => {
  const { card_detail_id, user_id } = data;

  const [[card]] = await conn.query(
    `SELECT
      card_detail_id,
      card_name,
      card_holder_name,
      bank,
      card_type,
      card_number,
      exp_at,
      is_default
    FROM tbl_card_details
    WHERE user_id = ?
      AND card_detail_id = ?
    LIMIT 1`,
    [user_id, card_detail_id],
  );

  // console.log(card, user_id, card_detail_id);
  return card || null;
};

// Fetch cards
const fetchCards = async (data) => {
  const { user_id, page = 1, limit = 10 } = data;

  const [cards] = await conn.query(
    `SELECT

      card_detail_id,
      card_name,
      card_holder_name,
      bank,
      card_type,
      card_number,
      exp_at,
      is_default

    FROM tbl_card_details
    WHERE user_id = ?
    ORDER BY is_default DESC, created_at DESC
    LIMIT ?, ?`,
    [user_id, (page - 1) * limit, limit],
  );

  return cards || null;
};

// Delete card
const deleteCard = async (data) => {
  const { card_detail_id, user_id } = data;

  const [result] = await conn.query(
    `delete from tbl_card_details where card_detail_id = ? and user_id = ?`,
    [card_detail_id, user_id],
  );
  console.log('kem cho', result.affectedRows);
  return result.affectedRows || 0;
};

// fetch cart items
const fetchCart = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 20;

  const [cartItems] = await conn.query(
    `SELECT
      ci.cart_item_id,
      ci.product_id,
      p.title ,
      MIN(pd.image_url) AS image_url,
      ci.variant_id,
      v.size_id,
      v.color_id,
      pt.name AS product_type_name,
      v.sku,
      ci.quantity,
      ci.price,
      (ci.quantity * ci.price) AS total_price,
      s.store_id,
      s.name AS store_name,
      ci.created_at,
      ci.updated_at
    FROM tbl_cart_items ci
    LEFT JOIN tbl_product p
      ON ci.product_id = p.product_id
      AND p.is_active = 1
      AND p.is_delete = 0
    LEFT JOIN tbl_product_data pd
      ON p.product_id = pd.product_id
      AND pd.is_active = 1
      AND pd.is_delete = 0
    LEFT JOIN tbl_variants v
      ON ci.variant_id = v.variant_id
      AND v.is_active = 1
      AND v.is_delete = 0
    LEFT JOIN tbl_store s
      ON p.store_id = s.store_id
      AND s.is_active = 1
      AND s.is_delete = 0
    LEFT JOIN tbl_product_type pt
      ON v.product_type_id = pt.product_type_id
      AND pt.is_active = 1
    WHERE ci.user_id = ?
      AND ci.is_active = 1
      AND ci.is_delete = 0
    GROUP BY ci.cart_item_id
    ORDER BY ci.created_at DESC
    LIMIT ?, ?`,
    [user_id, (page - 1) * limit, limit],
  );

  return cartItems;
};

// Fetch Discount
const fetchDiscount = async (discount_id) => {
  const [[discount]] = await conn.query(
    `SELECT discount_id, product_id, discount_name,amount_type, amount, max_value FROM tbl_discount WHERE discount_id = ? AND is_active = 1 AND is_delete = 0 AND (start_time IS NULL OR start_time <= NOW()) AND (end_time IS NULL OR end_time >= NOW())`,
    [discount_id],
  );
  return discount || null;
};

// Fetch Variant
const fetchVariant = async (variant_id) => {
  const [[variant]] = await conn.query(
    `SELECT v.variant_id, v.product_id, v.size_id, v.color_id, s.value as size_name, c.name as color_name, v.product_type_id, v.sku, v.price, v.qty
    FROM tbl_variants v
    LEFT JOIN tbl_size s ON v.size_id = s.size_id AND s.is_active = 1 AND s.is_delete = 0
    LEFT JOIN tbl_color c ON v.color_id = c.color_id AND c.is_active = 1 AND c.is_delete = 0
    WHERE v.variant_id = ? AND v.is_active = 1 AND v.is_delete = 0`,
    [variant_id],
  );
  return variant || null;
};

// Fetch Tax
const fetchTax = async (tax_id) => {
  const [[tax]] = await conn.query(
    `SELECT tax_id, tax_name, value AS tax_value FROM tbl_tax WHERE tax_id = ? AND is_active = 1 AND is_delete = 0`,
    [tax_id],
  );

  return tax || null;
};

// Place order from cart

const insertOrder = async (object) => {
  const [result] = await conn.query(
    `INSERT INTO tbl_order SET ?`,
    [object]
  );
  return result.insertId;
};

const insertOrderItems = async (items) => {
  const values = items.map((item) => [
    item.order_id,
    item.product_id,
    item.variant_id,
    item.title,
    item.image_url,
    item.quantity,
    item.price,
    item.size,
    item.color,
    item.sub_category_name,
    item.category_name,
  ]);

  await conn.query(
    `INSERT INTO tbl_order_items
     (order_id, product_id, variant_id, title, image_url, quantity, price, size, color, sub_category_name, category_name)
     VALUES ?`,
    [values]
  );
};

const insertOrderTracking = async (order_id) => {
  await conn.query(
    `INSERT INTO tbl_order_tracking (order_id, order_status) VALUES (?, 'pending')`,
    [order_id],
  );
}

const updateVariantStock = async (item) => {
  const [result] = await conn.query(
    `UPDATE tbl_variants
     SET qty = qty - ?
     WHERE variant_id = ?
       AND qty >= ?
       AND is_active = 1
       AND is_delete = 0`,
    [item.quantity, item.variant_id, item.quantity]
  );

  return result.affectedRows;
};

const clearCart = async (data) => {
  const { user_id, cartItemIds } = data;
  await conn.query(
    `UPDATE tbl_cart_items
     SET is_active = 0,
         is_delete = 1
     WHERE user_id = ?
       AND cart_item_id IN (?)`,
    [user_id, cartItemIds]
  );
};

// Order placed done 

// Place Notification
const placeNotification = async (data) => {
  const { user_id, message, order_id } = data;
  const object = {
    user_id,
    message,
    order_id,
  };

  await conn.query(`INSERT INTO tbl_notification SET ?`, [object]);
};

// Update profile
const updateProfile = async (data) => {
  const { user_id, name, country_code, phone, profile_pic, lang_id } = data;
  const object = {};

  name && (object.name = name);
  country_code && (object.country_code = country_code);
  phone && (object.phone = phone);
  profile_pic && (object.profile_pic = profile_pic);
  lang_id && (object.lang_id = lang_id);

  if (!Object.keys(object).length) {
    return { success: false, key: "invalidProfileData" };
  }

  const [result] = await conn.query(
    `UPDATE tbl_user SET ? WHERE user_id = ? AND is_active = 1 AND is_deleted = 0`,
    [object, user_id],
  );

  return result.affectedRows;
};

// Fetch wishlist
const fetchWishlist = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 10;

  const [wishlist] = await conn.query(
    `SELECT
      w.wishlist_id,
      w.product_id,
      p.title,
      MIN(pd.image_url) AS image_url,
      MAX(d.discount_id) AS discount_id,
      MAX(d.amount_type) AS amount_type,
      MAX(d.amount) AS amount,
      MAX(d.max_value) AS max_value,
      IFNULL(AVG(pr.rating), 0) AS avg_rating,
      COUNT(pr.product_rating_id) AS rating_count
    FROM tbl_wishlist w
    INNER JOIN tbl_product p
      ON w.product_id = p.product_id
      AND p.is_active = 1
      AND p.is_delete = 0
    LEFT JOIN tbl_product_data pd
      ON p.product_id = pd.product_id
      AND pd.is_active = 1
      AND pd.is_delete = 0
    LEFT JOIN tbl_discount d
      ON p.product_id = d.product_id
      AND d.is_active = 1
      AND d.is_delete = 0
      AND (d.start_time IS NULL OR d.start_time <= NOW())
      AND (d.end_time IS NULL OR d.end_time >= NOW())
    LEFT JOIN tbl_product_rating pr
      ON p.product_id = pr.product_id
      AND pr.is_active = 1
      AND pr.is_delete = 0
    WHERE w.user_id = ?
      AND w.is_active = 1
      AND w.is_delete = 0
    GROUP BY w.wishlist_id
    ORDER BY w.created_at DESC
    LIMIT ?, ?`,
    [user_id, (page - 1) * limit, limit],
  );
  return wishlist;
};

// Fetch notifications
const fetchNotifications = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 20;

  const [notifications] = await conn.query(
    `SELECT
      notification_id,
      user_id,
      order_id,
      is_read,
      message,
      created_at
    FROM tbl_notification
    WHERE user_id = ?
      AND is_active = 1
      AND is_delete = 0
    ORDER BY created_at DESC
    LIMIT ?, ?`,
    [user_id, (page - 1) * limit, limit],
  );

  return notifications;
};

// Mark notifications as read
const markNotificationsRead = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  // const notificationIds = data?.notification_ids || [];

  const [result] = await conn.query(
    `UPDATE tbl_notification
     SET is_read = 1
     WHERE user_id = ?
     AND is_read = 0
       AND is_active = 1
       AND is_delete = 0`,
    [user_id],
  );

  return result.affectedRows;
};

// Delete notification
const deleteNotification = async (data) => {
  const { notification_id, user_id } = data;

  const [result] = await conn.query(
    `UPDATE tbl_notification
     SET is_active = 0
     WHERE notification_id = ?
       AND user_id = ?
       AND is_active = 1
       AND is_delete = 0`,
    [notification_id, user_id],
  );
  return result.affectedRows;
};

// Fetch blogs
const fetchBlogs = async (data) => {
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 10;

  const [blogs] = await conn.query(
    `SELECT
      blog_id,
      title,
      description,
      created_at
    FROM tbl_blogs
    WHERE is_active = 1
      AND is_delete = 0
    ORDER BY created_at DESC
    LIMIT ?, ?`,
    [(page - 1) * limit, limit],
  );

  return blogs || null;
};

// Fetch blog by id
const fetchBlogById = async (blog_id) => {
  const [[blog]] = await conn.query(
    `SELECT
      blog_id,
      title,
      description,
      created_at
    FROM tbl_blogs
    WHERE blog_id = ?
      AND is_active = 1
      AND is_delete = 0
    LIMIT 1`,
    [blog_id],
  );

  return blog || null;
};

// Fetch CMS page
const fetchCmsByTitle = async (title) => {
  const [[cms]] = await conn.query(
    `SELECT
      cms_id,
      title,
      description
    FROM tbl_cms
    WHERE title = ?
      AND is_active = 1
      AND is_delete = 0
    LIMIT 1`,
    [title],
  );

  return cms || null;
};

// Fetch FAQs
const fetchFaqs = async () => {
  const [faqs] = await conn.query(
    `SELECT
      faq_id,
      question,
      answer
    FROM tbl_faqs
    WHERE is_active = 1
      AND is_delete = 0
    ORDER BY faq_id ASC`,
  );

  return faqs || null;
};

// Fetch chat messages
const fetchChat = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const other_user_id = data?.other_user_id ? Number(data.other_user_id) : null;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 20;

  let query = `SELECT
      c.chat_id,
      c.sender_id,
      sender.name AS sender_name,
      sender.profile_pic AS sender_profile_pic,
      c.receiver_id,
      receiver.name AS receiver_name,
      receiver.profile_pic AS receiver_profile_pic,
      c.message,
      c.created_at
    FROM tbl_chat c
    LEFT JOIN tbl_user sender
      ON c.sender_id = sender.user_id
      AND sender.is_active = 1
      AND sender.is_deleted = 0
    LEFT JOIN tbl_user receiver
      ON c.receiver_id = receiver.user_id
      AND receiver.is_active = 1
      AND receiver.is_deleted = 0
    WHERE c.is_active = 1
      AND c.is_delete = 0
      AND (c.sender_id = ? OR c.receiver_id = ?)`;
  const params = [user_id, user_id];

  if (other_user_id) {
    query += ` AND (c.sender_id = ? OR c.receiver_id = ?)`;
    params.push(other_user_id, other_user_id);
  }

  query += ` ORDER BY c.created_at ASC LIMIT ?, ?`;
  params.push((page - 1) * limit, limit);

  const [chat] = await conn.query(query, params);
  return chat;
};

// Fetch return reasons
const fetchReturnReasons = async () => {
  const [reasons] = await conn.query(
    `SELECT
      return_reason_id,
      description
    FROM tbl_return_reasons
    WHERE is_active = 1
      AND is_delete = 0
    ORDER BY return_reason_id ASC`,
  );

  return reasons || null;
};

// Fetch order item for rating
const fetchOrderItemForRating = async (data) => {
  const order_item_id = Number(data?.order_item_id) || 0;
  const user_id = Number(data?.user_id) || 0;

  const [[orderItem]] = await conn.query(
    `SELECT
      oi.order_item_id,
      oi.order_id,
      oi.product_id,
      o.user_id,
      ots.order_status
    FROM tbl_order_items oi
    INNER JOIN tbl_order o
      ON oi.order_id = o.order_id
      AND o.is_active = 1
      AND o.is_delete = 0
    LEFT JOIN (
      SELECT t1.order_id, t1.order_status
      FROM tbl_order_tracking t1
      INNER JOIN (
        SELECT order_id, MAX(created_at) AS latest_created_at
        FROM tbl_order_tracking
        WHERE is_active = 1
          AND is_deleted = 0
        GROUP BY order_id
      ) t2
        ON t1.order_id = t2.order_id
       AND t1.created_at = t2.latest_created_at
      WHERE t1.is_active = 1
        AND t1.is_deleted = 0
    ) ots
      ON o.order_id = ots.order_id
    WHERE oi.order_item_id = ?
      AND oi.is_active = 1
      AND oi.is_delete = 0
      AND o.user_id = ?
    LIMIT 1`,
    [order_item_id, user_id],
  );

  return orderItem || null;
};

// Fetch product 
const fetchRatingById = async (rating_id) => {
  const [[rating]] = await conn.query(
    `SELECT
      product_rating_id,
      user_id,
      product_id,
      rating,
      description,
      created_at
    FROM tbl_product_rating
    WHERE product_rating_id = ?
      AND is_active = 1
      AND is_delete = 0
    LIMIT 1`,
    [rating_id],
  );

  return rating || null;
};


// Create product rating
const createProductRating = async (data) => {
  const object = {
    user_id: data.user_id,
    product_id: data.product_id,
    rating: data.rating,
    description: data.description || null,
  };

  const [rating] = await conn.query(`INSERT INTO tbl_product_rating SET ?`, [
    object,
  ]);

  return rating.insertId
};

// Place return order
const placeReturnOrder = async (data) => {
  const object = {
    order_item_id: data.order_item_id,
    return_reason_id: data.return_reason_id,
    description: data.description || null,
  };

  const [returnOrder] = await conn.query(`INSERT INTO tbl_return_order SET ?`, [
    object,
  ]);

  if (Array.isArray(data.image_urls) && data.image_urls.length) {
    for (const imageUrl of data.image_urls) {
      await conn.query(
        `INSERT INTO tbl_return_order_data (order_item_id, image_url) VALUES (?, ?)`,
        [data.order_item_id, imageUrl],
      );
    }
  }

  await conn.query(
    `INSERT INTO tbl_order_tracking (order_id, order_status) VALUES (?, ?)`,
    [data.order_id, "returned"],
  );

  await placeNotification({
    user_id: data.user_id,
    order_id: data.order_id,
    message: `Your return request for order id ${data.order_id} has been placed successfully.`,
  });

  return {
    success: true,
    key: "returnOrderCreated",
    return_order_id: returnOrder.insertId,
  };
};

// Fetch return order reasons already used by order item
const fetchReturnOrderByItem = async (order_item_id) => {
  const [[returnOrder]] = await conn.query(
    `SELECT
      order_return_id,
      order_item_id,
      return_reason_id,
      description
    FROM tbl_return_order
    WHERE order_item_id = ?
      AND is_active = 1
      AND is_deleted = 0
    LIMIT 1`,
    [order_item_id],
  );

  return returnOrder || null;
};

// Fetch notification by id
const fetchNotificationById = async (notification_id, user_id) => {
  const [[notification]] = await conn.query(
    `SELECT
      notification_id,
      user_id,
      order_id,
      is_read,
      message,
      created_at
    FROM tbl_notification
    WHERE notification_id = ?
      AND user_id = ?
      AND is_active = 1
      AND is_delete = 0
    LIMIT 1`,
    [notification_id, user_id],
  );

  return notification || null;
};

// Fetch CMS pages by keyword helper aliases
const fetchCmsAboutUs = async () => fetchCmsByTitle("About Us");
const fetchCmsPrivacyPolicy = async () => fetchCmsByTitle("Privacy Policy");
const fetchCmsTerms = async () => fetchCmsByTitle("Terms & Conditions");
const fetchCmsReturnRefundPolicy = async () => fetchCmsByTitle("Refund & Return Policy");


// insert search history
const insertSearchHistory = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const query_for = data?.query_for || "";
  const query = data?.query || "";

  await conn.query(
    `insert into tbl_search_history (user_id, query_for, \`query\`, is_active, is_delete) values (?, ?, ?, 1, 0)`,
    [user_id, query_for, query],
  );
};

// fetch product search result
const fetchProductSearchResult = async (data) => {
  const {
    user_id,
    query,
    sortBy,
    minPrice,
    maxPrice,
    category,
    subCategory,
    storeRating,
    page = 1,
    limit = 10,
  } = data;
  // console.log('here to reach')
  const whereConditions = [];
  const havingConditions = [];
  const params = [user_id];

  let sql = `SELECT
      p.product_id,
      p.title,
      MIN(pd.image_url) AS image_url,
      MAX(d.discount_id) AS discount_id,
      MAX(d.amount_type) AS amount_type,
      MAX(d.amount) AS amount,
      MAX(d.max_value) AS max_value,
      MIN(v.price) AS price,
      CASE WHEN MAX(w.wishlist_id) IS NOT NULL THEN 1 ELSE 0 END AS is_wishlist,
      c.cate_name AS sub_category_name,
      parent_c.cate_name AS category_name
    FROM tbl_product p
    LEFT JOIN tbl_product_data pd
      ON p.product_id = pd.product_id
      AND pd.is_active = 1
      AND pd.is_delete = 0
    LEFT JOIN tbl_discount d
      ON p.product_id = d.product_id
      AND d.is_active = 1
      AND d.is_delete = 0
      AND (d.start_time IS NULL OR d.start_time <= NOW())
      AND (d.end_time IS NULL OR d.end_time >= NOW())
    LEFT JOIN tbl_wishlist w
      ON p.product_id = w.product_id
      AND w.user_id = ?
      AND w.is_active = 1
      AND w.is_delete = 0
    LEFT JOIN tbl_variants v
      ON p.product_id = v.product_id
      AND v.is_active = 1
      AND v.is_delete = 0
    LEFT JOIN tbl_category c
      ON p.category_id = c.category_id
      AND c.is_active = 1
      AND c.is_delete = 0
    LEFT JOIN tbl_category parent_c
      ON c.parent_id = parent_c.category_id
      AND parent_c.is_active = 1
      AND parent_c.is_delete = 0`;

  if (category !== undefined && category !== null && category !== "") {
    whereConditions.push(`parent_c.category_id = ?`);
    params.push(Number(category));
  }

  if (subCategory !== undefined && subCategory !== null && subCategory !== "") {
    whereConditions.push(`c.category_id = ?`);
    params.push(Number(subCategory));
  }

  if (storeRating !== undefined && storeRating !== null && storeRating !== "") {
    whereConditions.push(`p.store_id IN (
      SELECT store_id
      FROM tbl_store_rating
      WHERE is_active = 1
        AND is_delete = 0
      GROUP BY store_id
      HAVING AVG(rating) >= ?
    )`);
    params.push(Number(storeRating));
  }
  if (query) {
    whereConditions.push(`p.title LIKE ?`);
    params.push(`%${query}%`);
  }
  if (whereConditions.length) {
    sql += ` WHERE ${whereConditions.join(" AND ")}`;
  }
  sql += ` GROUP BY p.product_id`;

  if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
    havingConditions.push(`price >= ?`);
    params.push(Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
    havingConditions.push(`price <= ?`);
    params.push(Number(maxPrice));
  }

  if (havingConditions.length) {
    sql += ` HAVING ${havingConditions.join(" AND ")}`;
  }

  switch (sortBy) {
    case "priceLowToHigh":
      sql += ` ORDER BY price ASC`;
      break;
    case "priceHighToLow":
      sql += ` ORDER BY price DESC`;
      break;
    case "alphabetically":
      sql += ` ORDER BY p.title ASC`;
      break;
    case "alphabeticallyDesc":
      sql += ` ORDER BY p.title DESC`;
      break;
    default:
      sql += ` ORDER BY p.created_at DESC`;
      break;
  }

  sql += ` LIMIT ?, ?`;
  params.push((page - 1) * limit, limit);
  // console.log(sql, params);
  const [products] = await conn.query(sql, params);
  // console.log(products);
  return products;
};

// fetch store search result
const fetchStoreSearchResult = async (data) => {
  const { query, storeRating, page = 1, limit = 10 } = data;

  const params = [`%${query}%`];
  let sql = `SELECT
      s.store_id,
      s.name,
      MIN(sd.image_url) AS image_url,
      IFNULL(AVG(sr.rating), 0) AS avg_rating,
      COUNT(sr.store_rating_id) AS total_rating
    FROM tbl_store s
    LEFT JOIN tbl_store_data sd
      ON s.store_id = sd.store_id
      AND sd.is_active = 1
    LEFT JOIN tbl_store_rating sr
      ON s.store_id = sr.store_id
      AND sr.is_active = 1
    WHERE s.is_active = 1
      AND s.name LIKE ?
    GROUP BY s.store_id`;

  if (storeRating !== undefined && storeRating !== null && storeRating !== "") {
    sql += ` HAVING avg_rating >= ?`;
    params.push(Number(storeRating));
    sql += ` ORDER BY avg_rating DESC, total_rating DESC, s.created_at DESC`;
  } else {
    sql += ` ORDER BY s.created_at DESC`;
  }

  sql += ` LIMIT ?, ?`;
  params.push((page - 1) * limit, limit);

  const [stores] = await conn.query(sql, params);

  return stores;
};

// fetch search history
const fetchSearchHistory = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 20;

  const [history] = await conn.query(
    `SELECT
      search_id,
      query_for,
      \`query\`,
      created_at
    FROM tbl_search_history
    WHERE user_id = ?
      AND is_active = 1
      AND is_delete = 0
    ORDER BY created_at DESC
    LIMIT ?, ?`,
    [user_id, (page - 1) * limit, limit],
  );

  return history;
};

// Fetch order history
const fetchOrderHistory = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const page = Number(data?.page) || 1;
  const limit = Number(data?.limit) || 10;
  const tab = String(data?.tab || "current").toLowerCase();
  let query = `SELECT
      o.order_id,
      o.total_price,
      o.payment_type,
      o.tax_name,
      o.tax_value,
      o.discount_name,
      o.discount_type,
      o.discount_value,
      o.name as addressee_name,
      o.company as address_company,
      o.address1,
      o.address2,
      o.postal_code,
      o.latitude,
      o.longitude,
      o.city,
      o.state,
      o.country,
      o.card_name,
      o.card_number,
      o.card_type,
      o.card_holder_name,
      ots.order_status AS current_status,
      o.created_at
    FROM tbl_order o
    LEFT JOIN tbl_order_tracking ots
      ON o.order_id = ots.order_id
      AND ots.is_active = 1 AND ots.is_deleted = 0 AND ots.created_at = (
      SELECT MAX(created_at) FROM tbl_order_tracking WHERE order_id = o.order_id AND is_active = 1 AND is_deleted = 0)
    WHERE o.user_id = ?
      AND o.is_active = 1
      AND o.is_delete = 0`
    tab === "delivered" && (query += ` AND ots.order_status = 'delivered' `)
    tab === "current" && (query += ` AND ots.order_status != 'delivered' `)
    query += ` ORDER BY o.created_at DESC LIMIT ?, ?`;

  const [orders] = await conn.query(
    query,
    [user_id, (page - 1) * limit, limit],
  );

  if (!orders.length) return [];

  const orderIds = orders.map((order) => order.order_id);

  const [items] = await conn.query(
    `SELECT order_id, image_url, title AS product_name
     FROM tbl_order_items
     WHERE order_id IN (?)
       AND is_active = 1
       AND is_delete = 0`,
    [orderIds],
  );  

  const itemMap = items.reduce((acc, item) => {
    if (!acc[item.order_id]) acc[item.order_id] = [];
    acc[item.order_id].push(item);
    console.log(acc)
    return acc;
  }, {});

  return orders.map((order) => ({
    ...order,
    items: itemMap[order.order_id] || [],
  }));
};

// Fetch order details
const fetchOrderDetails = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const order_id = Number(data?.order_id) || 0;

  const [[order]] = await conn.query(
    `SELECT
      o.order_id,
      o.created_at,
      o.total_price,
      o.payment_type,
      o.tax_name,
      o.tax_value,
      o.discount_name,
      o.discount_type,
      o.discount_value,
      o.name,
      o.company,
      o.address1,
      o.address2,
      o.postal_code,
      o.latitude,
      o.longitude,
      o.city,
      o.state,
      o.country,
      ots.order_status AS current_status,
      o.card_name,
      o.card_number,
      NULL AS expiry,
      o.card_type,
      o.card_holder_name
    FROM tbl_order o
    LEFT JOIN (
      SELECT t1.order_id, t1.order_status
      FROM tbl_order_tracking t1
      INNER JOIN (
        SELECT order_id, MAX(created_at) AS latest_created_at
        FROM tbl_order_tracking
        WHERE is_active = 1
          AND is_deleted = 0
        GROUP BY order_id
      ) t2
        ON t1.order_id = t2.order_id
       AND t1.created_at = t2.latest_created_at
      WHERE t1.is_active = 1
        AND t1.is_deleted = 0
    ) ots
      ON o.order_id = ots.order_id
    WHERE o.order_id = ?
      AND o.user_id = ?
      AND o.is_active = 1
      AND o.is_delete = 0
    LIMIT 1`,
    [order_id, user_id],
  );

  if (!order) return null;

  const [items] = await conn.query(
    `SELECT
      order_item_id,
      order_id,
      product_id,
      variant_id,
      title AS product_name,
      image_url,
      quantity,
      price,
      size,
      color,
      category_name
     FROM tbl_order_items
     WHERE order_id = ?
       AND is_active = 1
       AND is_delete = 0`,
    [order_id],
  );

  return {
    ...order,
    items,
  };
};

// Fetch order timeline
const fetchOrderTimeline = async (data) => {
  const user_id = Number(data?.user_id) || 0;
  const order_id = Number(data?.order_id) || 0;

  const [[order]] = await conn.query(
    `SELECT order_id
     FROM tbl_order
     WHERE order_id = ?
       AND user_id = ?
       AND is_active = 1
       AND is_delete = 0
     LIMIT 1`,
    [order_id, user_id],
  );

  if (!order) return null;

  const [timeline] = await conn.query(
    `SELECT *
     FROM tbl_order_tracking
     WHERE order_id = ?
       AND is_active = 1
       AND is_deleted = 0
     ORDER BY created_at ASC`,
    [order_id],
  );

  return timeline;
};

// Fetch order tracking by order id
const fetchOrderTrackingByOrderId = async (data) => fetchOrderTimeline(data);

// Count unread notifications
const countNotifications = async (user_id) => {
  const [[{ count }]] = await conn.query(
    `SELECT COUNT(*) AS count FROM tbl_notification WHERE user_id = ? AND is_read = 0 AND is_active = 1 AND is_delete = 0`,
    [user_id],
  );
  return count || 0;
}
// Count cart items
const countCart = async (user_id) => {
  const [[{ count }]] = await conn.query(
    `SELECT COUNT(*) AS count FROM tbl_cart_items WHERE user_id = ? AND is_active = 1 AND is_delete = 0`,
    [user_id],
  );
  return count || 0;
}

module.exports = {
  getProductById ,
  getVariantById ,                  
  getUserById,
  getCategoryById,
  getCartItem,
  fetchBanners,
  fetchStores,
  fetchRatingAndReview,
  fetchStoreDetails,
  fetchStoreProducts,
  fetchProductDetails,
  fetchProductData,
  fetchTopDeals,
  fetchTrendingNow,
  fetchCategory,
  fetchNewArrivals,
  fetchBestSelling,
  fetchRecentlyBought,
  fetchProductSizes,
  fetchAvailableSizes,
  fetchAvailableProductTypes,
  fetchProductColors,
  fetchSuggestedProducts,
  fetchSizeChart,
  insertCartItem,
  updateCartItem,
  deleteCartItem,
  createAddress,
  createCard,
  fetchAddress,
  fetchCard,
  fetchCards,
  fetchAddresses,
  updateAddress,
  deleteAddress,
  deleteCard,
  fetchCart,

  insertOrder,
  insertOrderItems,
  updateVariantStock,
  clearCart,

  insertOrderTracking,
  placeNotification,
  updateProfile,
  fetchWishlist,
  fetchNotifications,
  markNotificationsRead,
  deleteNotification,
  fetchBlogs,
  fetchBlogById,
  fetchCmsAboutUs,
  fetchCmsPrivacyPolicy,
  fetchCmsTerms,
  fetchCmsReturnRefundPolicy,
  fetchFaqs,
  fetchChat,
  fetchReturnReasons,
  fetchOrderItemForRating,
  createProductRating,
  placeReturnOrder,
  fetchReturnOrderByItem,
  fetchNotificationById,
  fetchOrderTrackingByOrderId,
  insertSearchHistory,
  fetchProductSearchResult,
  fetchStoreSearchResult,
  fetchSearchHistory,
  fetchOrderHistory,
  fetchOrderDetails,
  fetchOrderTimeline,
  fetchVariant,
  fetchTax,
  fetchDiscount,
  fetchRatingById,
  countNotifications,
  countCart
};
