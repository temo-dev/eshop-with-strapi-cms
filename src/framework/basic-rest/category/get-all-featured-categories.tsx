import { QueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchFeaturedCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.FEATURED_CATEGORIES);
  const categories: any[] = [];
  for (let index = 0; index < data.length; index++) {
    let newProducts = [];
    if (data[index].products.length === 0) continue;
    for (let i = 0; i < data[index].products.length; i++) {
      let product = {
        id: data[index].products[i].id,
        slug: data[index].products[i].slug,
        image: {
          id: data[index].products[i].image.id,
          thumbnail: data[index].products[i].image.formats.thumbnail.url,
          original: data[index].products[i].image.url,
        },
      };
      newProducts.push(product);
    }
    let featurecategory = {
      id: data[index].id,
      name: data[index].name,
      products: newProducts,
    };
    categories.push(featurecategory);
  }

  return categories;
};
export const useFeaturedCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<Category[], Error>(
    [API_ENDPOINTS.FEATURED_CATEGORIES, options],
    fetchFeaturedCategories
  );
};
