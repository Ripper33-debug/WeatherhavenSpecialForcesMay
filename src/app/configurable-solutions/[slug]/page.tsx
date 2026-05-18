import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "System not found" };
  return {
    title: product.code,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <div className="border-b border-white/[0.08] bg-[#080a0c]">
        <div className="mx-auto max-w-[1400px] px-4 py-4 sm:px-6 lg:px-12">
          <Link
            href="/configurable-solutions"
            className="font-mono text-[11px] uppercase tracking-wider text-[#8a9099] transition hover:text-[#c8a96e]"
          >
            ← All shelter systems
          </Link>
        </div>
      </div>
      <ProductDetailView product={product} />
    </>
  );
}
