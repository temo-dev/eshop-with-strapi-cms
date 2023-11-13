import { QueryOptionsType } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchFlashSaleProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  // ============ Start Convert data from strapi ======================
  let responseSaleProducts: any[] = [];
  const resData = (await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS))?.data
    .data;
  const endDate = resData[0].attributes.end_date;

  for (let index = 0; index < resData.length; index++) {
    if (resData[index].attributes.isFlashSale) {
      const listSaleProduct = resData[index].attributes.products.data;
      for (let index = 0; index < listSaleProduct.length; index++) {
        const item = listSaleProduct[index];
        let newVariations: any[] = [];
        const variations = item.attributes.variations.data;
        for (let index = 0; index < variations.length; index++) {
          let variation = {
            id: variations[index].id,
            value: variations[index].attributes.value,
            meta: variations[index].attributes.meta,
            attribute: {
              id: variations[index].attributes.attribute.data.id,
              name: variations[index].attributes.attribute.data.attributes.name,
              slug: variations[index].attributes.attribute.data.attributes.slug,
            },
          };
          newVariations.push(variation);
        }
        let product = {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
          slug: item.attributes.slug,
          image: {
            id: item.attributes.image.data.id,
            thumbnail:
              item.attributes.image.data.attributes.formats.thumbnail.url,
            original: item.attributes.image.data.attributes.url,
          },
          gallery: item.attributes.gallery.data,
          price: 120.0,
          sale_price: 80.0,
          quantity: 320,
          sold: 180,
          variations: newVariations,
        };
        responseSaleProducts.push(product);
      }
    }
  }
  // ============ End Convert data from strapi ======================

  return { products: responseSaleProducts, days: endDate };
};
export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    fetchFlashSaleProducts
  );
};
