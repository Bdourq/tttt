import { PRODUCTS, Product } from "../data";
import { BundleItemValue, BundleSummaryItem } from "../types";

export const BUNDLE_OFFER_LABEL = "العرض الذهبي 2+1 مجاناً";
export const SINGLE_ITEM_LABEL = "قطعة واحدة فقط";

export const isBundleOffer = (bundleOffer: string) => bundleOffer === BUNDLE_OFFER_LABEL;

export const getProductByName = (name: string): Product | undefined =>
  PRODUCTS.find((p) => p.name === name);

/**
 * Builds the 3-item summary for the "2+1 free" offer.
 * Per the store's own FAQ: customer picks any 3 models (colors/sizes can
 * differ), pays for the two most expensive, and the cheapest of the three
 * is free automatically — so we compute that here rather than letting the
 * customer hand-pick which one is "free" (which would let them always mark
 * the priciest item as free).
 * Returns null until all 3 items have a product selected.
 */
export function buildBundleSummary(
  item1: BundleItemValue,
  item2: BundleItemValue,
  item3: BundleItemValue
): BundleSummaryItem[] | null {
  const items = [item1, item2, item3];
  const products = items.map((i) => getProductByName(i.product));
  if (products.some((p) => !p)) return null;

  const prices = products.map((p) => p!.price);
  const minPrice = Math.min(...prices);
  let freeAssigned = false;

  return items.map((item, i) => {
    const isFree = !freeAssigned && prices[i] === minPrice;
    if (isFree) freeAssigned = true;
    return {
      productName: item.product,
      price: products[i]!.price,
      color: item.color,
      size: item.size,
      isFree,
    };
  });
}

export function bundleTotal(summary: BundleSummaryItem[]): number {
  return summary.reduce((sum, item) => sum + (item.isFree ? 0 : item.price), 0);
}
