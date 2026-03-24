'use client'
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useSelector } from "react-redux"

export default function DiscountsPage() {
    const router = useRouter()
    const products = useSelector(state => state.product.list)

    const topDiscountedProducts = useMemo(() => {
        return [...products]
            .filter(product => Number(product.mrp) > Number(product.price))
            .map(product => ({
                ...product,
                discountPercent: Math.round(((Number(product.mrp) - Number(product.price)) / Number(product.mrp)) * 100)
            }))
            .filter(product => product.discountPercent >= 20)
            .sort((a, b) => b.discountPercent - a.discountPercent)
    }, [products])

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer">
                    <MoveLeftIcon size={20} /> Top <span className="text-slate-700 font-medium">Discounted Products</span>
                </h1>

                {topDiscountedProducts.length === 0 ? (
                    <p className="text-slate-500 mb-20">No discounted products available right now.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                        {topDiscountedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
