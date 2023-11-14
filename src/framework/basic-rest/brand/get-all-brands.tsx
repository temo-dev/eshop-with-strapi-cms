import { QueryOptionsType, Brand } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BRANDS);
  const listBrands: Brand[] = [];
  for (let index = 0; index < data.length; index++) {
    let dataBrand = {
      id: data[index].id,
      name: data[index].name,
      slug: data[index].slug,
      image: {
        id: data[index].image.id,
        thumbnail: data[index].image.formats.thumbnail.url,
        original: data[index].image.url,
      },
    };
    listBrands.push(dataBrand);
  }
  return { brands: listBrands, brandsGrid: listBrands };
};
export const useBrandsQuery = (options: QueryOptionsType) => {
  return useQuery<{ brands: Brand[]; brandsGrid: Brand[] }, Error>(
    [API_ENDPOINTS.BRANDS, options],
    fetchBrands
  );
};
