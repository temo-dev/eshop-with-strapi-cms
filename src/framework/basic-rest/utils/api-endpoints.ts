// export const API_ENDPOINTS = {
//   LOGIN: "/login",
//   REGISTER: "/register",
//   LOGOUT: "/logout",
//   FORGET_PASSWORD: "/forget-password",
//   CATEGORIES: "/categories.json",
//   FEATURED_CATEGORIES: "/featured_categories.json",
//   COLLECTIONS: "/collections.json",
//   BRANDS: "/brands.json",
//   PRODUCTS: "/products.json",
//   FEATURED_PRODUCTS: "/featured_products.json",
//   TOP_SELLER_PRODUCTS: "/products_top_seller.json",
//   ON_SELLING_PRODUCTS: "/products_on_selling.json",
//   PRODUCT: "/product.json",
//   RELATED_PRODUCTS: "/related_products.json",
//   BEST_SELLER_PRODUCTS: "/products_best_seller.json",
//   NEW_ARRIVAL_PRODUCTS: "/products_new_arrival.json",
//   FLASH_SALE_PRODUCTS: "/products_flash_sale.json",
//   SEARCH: "/search.json",
//   ORDERS: "/orders.json",
//   ORDER: "/order.json",
// };

export const API_ENDPOINTS = {
  SLUG: "/products-slug",
  LOGIN: "/search-products",
  REGISTER: "/search-products",
  LOGOUT: "/search-products",
  FORGET_PASSWORD: "/forget-password",
  CATEGORIES: "/categories?populate=*",
  FEATURED_CATEGORIES: "/feature-categories",
  COLLECTIONS: "/search-products",
  BRANDS: "/all-brands",
  PRODUCTS: "/search-products",
  FEATURED_PRODUCTS: "/products-isHot",
  TOP_SELLER_PRODUCTS: "/products-isBestSeller",
  ON_SELLING_PRODUCTS: "/products-isBestSeller",
  PRODUCT: "/products",
  RELATED_PRODUCTS: "/search-products",
  BEST_SELLER_PRODUCTS: "/products-isBestSeller",
  NEW_ARRIVAL_PRODUCTS: "/products-isNew",
  FLASH_SALE_PRODUCTS: "/sales?populate=deep",
  SEARCH: "/search-products",
  ORDERS: "/search-products",
  ORDER: "/search-products",
};
