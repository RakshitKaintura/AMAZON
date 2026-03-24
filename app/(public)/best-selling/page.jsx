'use client'
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useSelector } from "react-redux"

export default function BestSellingPage() {
    const router = useRouter()
    const products = useSelector(state => state.product.list)

    const mostSellingProducts = useMemo(() => {
        return [...products]
            .map(product => {
                const soldCount = (product.orderItems || []).reduce((sum, item) => sum + Number(item.quantity || 0), 0)
                return { ...product, soldCount }
            })
            .sort((a, b) => b.soldCount - a.soldCount)
            .filter(product => product.soldCount > 0)
    }, [products])

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer">
                    <MoveLeftIcon size={20} /> Most <span className="text-slate-700 font-medium">Selling Products</span>
                </h1>

                {mostSellingProducts.length === 0 ? (
                    <p className="text-slate-500 mb-20">No best-selling products available yet.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
                        {mostSellingProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
