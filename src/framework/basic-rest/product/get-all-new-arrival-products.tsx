import { QueryOptionsType, Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchNewArrivalProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
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

  return listProducts as Product[];
};
export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, options],
    fetchNewArrivalProducts
  );
};
