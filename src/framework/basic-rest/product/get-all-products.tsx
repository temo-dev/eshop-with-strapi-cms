import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "react-query";
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({ queryKey }: any) => {
  const [_key, params] = queryKey;
  let data: any[] = [];
  if (params.category == undefined) {
    const { data: products } = await http.get(
      `${API_ENDPOINTS.ON_SELLING_PRODUCTS}`
    );
    data = products;
  } else {
    const { data: products } =
      await http.get(`${API_ENDPOINTS.SEARCH}?price=${params.price}&category
=${params.category}`);
    data = products;
  }
  // =================== Start Convert data from strapi =================================
  let listProducts: any[] = [];
  for (let index = 0; index < data.length; index++) {
    let newVariations: any[] = [];
    for (let index = 0; index < data[index].variations; index++) {
      const item = data[index].variations;
      let variation = {
        id: item.id,
        value: item.value,
        meta: item.meta,
        attribute: {
          id: item.attribute.id,
          name: item.attribute.name,
          slug: item.attribute.slug,
        },
      };
      newVariations.push(variation);
    }

    let product = {
      id: data[index].id,
      name: data[index].name,
      description: data[index].description,
      slug: data[index].slug,
      image: {
        id: data[index].image.id,
        thumbnail: data[index].image.formats.thumbnail.url,
        original: data[index].image.url,
      },
      price: 120.0,
      sale_price: 80.0,
      quantity: 320,
      sold: 180,
      variations: newVariations,
    };
    listProducts.push(product);
  }
  // =================== End Convert data from strapi =================================
  return {
    data: shuffle(listProducts),
    paginatorInfo: {
      nextPageUrl: "",
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
