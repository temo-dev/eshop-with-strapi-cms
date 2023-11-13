import { Product } from "@framework/types";
import http from "@framework/utils/http";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import { useQuery } from "react-query";

export const fetchProduct = async (slug: string) => {
  const productId = await http.get(
    `${API_ENDPOINTS.SLUG}?slug=${slug}&populate=deep`
  );

  // ============ Start Convert data from strapi ======================
  const { data } = await http.get(
    `${API_ENDPOINTS.PRODUCT}/${productId?.data.id}?populate=deep`
  );
  const responseProduct = data.data;

  // ========= Convert Category======================
  const category = responseProduct.attributes.category.data;
  const newCategoy = {
    id: category.id,
    name: category.attributes.name,
    slug: category.attributes.slug,
  };
  // ========= Convert Gallery======================

  let newGallery: any[] = [];
  const gallery = responseProduct.attributes.gallery.data;
  for (let index = 0; index < gallery.length; index++) {
    let galleryData = {
      id: gallery[index].id,
      thumbnail: gallery[index].attributes.formats.thumbnail.url,
      original: gallery[index].attributes.url,
    };

    newGallery.push(galleryData);
  }
  // ========= Convert Meta======================
  let newMeta: any[] = [];
  const meta = responseProduct.attributes.meta.data;
  for (let index = 0; index < meta.length; index++) {
    let metaData = {
      id: meta[index].id,
      title: meta[index].attributes.title,
      content: meta[index].attributes.content,
    };
    newMeta.push(metaData);
  }
  // ========= Convert Variations======================
  let newVariations: any[] = [];
  const variations = responseProduct.attributes.variations.data;
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
    id: responseProduct.id,
    name: responseProduct.attributes.name,
    sku: responseProduct.attributes.sku,
    description: responseProduct.attributes.description,
    slug: responseProduct.attributes.slug,
    image: {
      id: responseProduct.attributes.image.data.id,
      thumbnail:
        responseProduct.attributes.image.data.attributes.formats.thumbnail.url,
      original: responseProduct.attributes.image.data.attributes.url,
    },
    gallery: newGallery,
    price: 120.0,
    sale_price: 80.0,
    quantity: 320,
    sold: 180,
    variations: newVariations,
    meta: newMeta,
    category: newCategoy,
  };
  // ============ End Convert data from strapi ======================
  return product;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
    fetchProduct(slug)
  );
};
