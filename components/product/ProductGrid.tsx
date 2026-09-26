import { products } from "@/lib/products";
import { Item, Stagger } from "@/components/motion/primitives";
import BundleCard from "./BundleCard";
import ProductCard from "./ProductCard";

/**
 * The playbooks, entering in a soft cascade. By default all seven plus the complete-series
 * tile; with `limit`, just the first few in one row (two on phones).
 */
export default function ProductGrid({ limit }: { limit?: number }) {
  const shown = limit ? products.slice(0, limit) : products;

  return (
    <Stagger
      stagger={0.06}
      className={`grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-7 ${limit ? "" : "md:grid-cols-3"}`}
    >
      {shown.map((product) => (
        <Item key={product.slug} className="flex">
          <ProductCard product={product} />
        </Item>
      ))}
      {!limit && (
        <Item className="flex md:col-span-2 lg:col-span-1">
          <BundleCard />
        </Item>
      )}
    </Stagger>
  );
}
