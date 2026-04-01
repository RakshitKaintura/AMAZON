'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')
    const [reviewSummary, setReviewSummary] = useState('')
    const [averageRating, setAverageRating] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [distribution, setDistribution] = useState([
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
    ])
    const [summaryLoading, setSummaryLoading] = useState(false)

    useEffect(() => {
        let mounted = true

        const fetchReviewSummary = async () => {
            if (!product?.id) return

            setSummaryLoading(true)
            try {
                const response = await fetch(`/api/rating/summary?productId=${product.id}`)
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data?.error || 'Failed to fetch review summary')
                }

                if (mounted) {
                    const safeDistribution = [
                        { stars: 5, count: 0, percentage: 0 },
                        { stars: 4, count: 0, percentage: 0 },
                        { stars: 3, count: 0, percentage: 0 },
                        { stars: 2, count: 0, percentage: 0 },
                        { stars: 1, count: 0, percentage: 0 },
                    ]

                    setReviewSummary(data.summary || '')
                    setAverageRating(data.averageRating || 0)
                    setTotalReviews(data.totalReviews || 0)
                    setDistribution(Array.isArray(data.distribution) ? data.distribution : safeDistribution)
                }
            } catch {
                if (mounted) {
                    const fallbackAverage = product.rating.length > 0
                        ? product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length
                        : 0
                    const fallbackDistribution = [5, 4, 3, 2, 1].map((stars) => {
                        const count = product.rating.filter((item) => item.rating === stars).length
                        const percentage = product.rating.length > 0
                            ? Math.round((count / product.rating.length) * 100)
                            : 0
                        return { stars, count, percentage }
                    })

                    setAverageRating(Number(fallbackAverage.toFixed(1)))
                    setTotalReviews(product.rating.length)
                    setReviewSummary('Customer feedback is currently unavailable. Please check individual reviews below.')
                    setDistribution(fallbackDistribution)
                }
            } finally {
                if (mounted) {
                    setSummaryLoading(false)
                }
            }
        }

        fetchReviewSummary()

        return () => {
            mounted = false
        }
    }, [product])

    return (
        <div className="my-18 text-sm text-slate-600">

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
                {['Description', 'Reviews'].map((tab, index) => (
                    <button className={`${tab === selectedTab ? 'border-b-[1.5px] font-semibold' : 'text-slate-400'} px-3 py-2 font-medium`} key={index} onClick={() => setSelectedTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <p className="max-w-xl">{product.description}</p>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-3 mt-14">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                            <div>
                                <p className="text-slate-800 text-2xl font-semibold">Customer reviews</p>
                                <div className="flex items-center mt-1">
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={16} className='text-transparent mt-0.5' fill={averageRating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                                    ))}
                                    <p className="text-slate-700 ml-2 font-medium">{averageRating.toFixed(1)} out of 5</p>
                                </div>
                                <p className="text-slate-500 mt-1">{totalReviews} global ratings</p>

                                <div className="mt-5 space-y-3">
                                    {distribution.map((item) => (
                                        <div key={item.stars} className="flex items-center gap-3">
                                            <p className="w-12 text-sm text-slate-600">{item.stars} star</p>
                                            <div className="h-4 bg-slate-200 rounded-full flex-1 overflow-hidden">
                                                <div
                                                    className="h-full bg-amber-500 rounded-full"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                            <p className="w-12 text-right text-sm text-slate-600">{item.percentage}%</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500 border border-slate-300 rounded-full px-3 py-1 inline-flex">AI summary</p>
                                <p className="text-lg font-semibold text-slate-800 mt-3">Customers say</p>
                                <p className="mt-2 text-slate-600 leading-7 whitespace-pre-line">
                                    {summaryLoading ? 'Generating review summary...' : reviewSummary}
                                </p>
                            </div>
                        </div>
                    </div>

                    {product.rating.map((item,index) => (
                        <div key={index} className="flex gap-5 mb-10">
                            <Image src={item.user.image} alt="" className="size-10 rounded-full" width={100} height={100} />
                            <div>
                                <div className="flex items-center" >
                                    {Array(5).fill('').map((_, index) => (
                                        <StarIcon key={index} size={18} className='text-transparent mt-0.5' fill={item.rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                                    ))}
                                </div>
                                <p className="text-sm max-w-lg my-4">{item.review}</p>
                                <p className="font-medium text-slate-800">{item.user.name}</p>
                                <p className="mt-3 font-light">{new Date(item.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store Page */}
            <div className="flex gap-3 mt-14">
                <Image src={product.store.logo} alt="" className="size-11 rounded-full ring ring-slate-400" width={100} height={100} />
                <div>
                    <p className="font-medium text-slate-600">Product by {product.store.name}</p>
                    <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1.5 text-green-500"> view store <ArrowRight size={14} /></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription