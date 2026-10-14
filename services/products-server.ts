import "server-only";

import { validateProductsResponse } from "@/services/products";
import type { Product } from "@/types/product";

function getProductsEndpoint(): URL {
  const configuredEndpoint = process.env.PRODUCTS_ENDPOINT;
  if (!configuredEndpoint) {
    throw new Error("A variável de ambiente PRODUCTS_ENDPOINT não foi configurada.");
  }

  const endpoint = new URL(configuredEndpoint);
  if (endpoint.protocol !== "https:") {
    throw new Error("PRODUCTS_ENDPOINT deve utilizar HTTPS.");
  }

  return endpoint;
}

export async function fetchOfficialProducts(): Promise<Product[]> {
  const response = await fetch(getProductsEndpoint(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Endpoint oficial respondeu ${response.status}.`);
  }

  return validateProductsResponse(await response.json());
}
