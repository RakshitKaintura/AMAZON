'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

 function ShopContent() {

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    const filteredProducts = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return (
        <div className="min-h-[70vh] mx-6">
            <div className=" max-w-7xl mx-auto">
                <div className="my-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer"> {search && <MoveLeftIcon size={20} />}  All <span className="text-slate-700 font-medium">Products</span></h1>

                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Link href="/best-selling" className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                            Most Selling
                        </Link>
                        <Link href="/discounts" className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                            Most Discounted
                        </Link>
                        <Link href="/lowest-price" className="px-3 py-1.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                            Lowest Price
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                    {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    )
}


export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}