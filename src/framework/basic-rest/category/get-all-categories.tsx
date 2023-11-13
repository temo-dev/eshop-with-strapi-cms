import { CategoriesQueryOptionsType, Category } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  let responseData = [];
  const resData = (await http.get(API_ENDPOINTS.CATEGORIES))?.data.data;

  for (let index = 0; index < resData.length; index++) {
    let category = {
      id: resData[index].id,
      name: resData[index].attributes.name,
      slug: resData[index].attributes.slug,
      productCount: resData[index].attributes.products.data.length,
      image: {
        id: resData[index].attributes.image.data.id,
        thumbnail:
          resData[index].attributes.image.data.attributes.formats.thumbnail.url,
        original: resData[index].attributes.image.data.attributes.url,
      },
    };

    responseData.push(category);
  }

  return { categories: { data: responseData as Category[] } };
};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>(
    [API_ENDPOINTS.CATEGORIES, options],
    fetchCategories
  );
};
