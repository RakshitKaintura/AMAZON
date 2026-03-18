'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                
                {/* Main Hero Card */}
                <div className='relative flex-1 flex flex-col bg-green-200 rounded-3xl xl:min-h-112.5 overflow-hidden group'>
                    <div className='p-8 sm:p-16 z-10'>
                        <div className='inline-flex items-center gap-3 bg-green-300/50 text-green-600 pr-4 p-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-green-600 px-3 py-1 rounded-full text-white text-xs'>NEWS</span> 
                            Free Shipping on Orders Above $50! 
                            <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-4xl sm:text-6xl leading-[1.1] my-4 font-semibold text-slate-800 max-w-md'>
                            Gadgets you'll love. <br /> Prices you'll trust.
                        </h2>
                        <div className='text-slate-800 mt-6'>
                            <p className='text-sm font-medium'>Starts from</p>
                            <p className='text-4xl font-bold'>{currency}4.90</p>
                        </div>
                        <button className='bg-slate-800 text-white text-sm font-medium py-4 px-10 mt-10 rounded-lg hover:bg-slate-900 hover:scale-105 active:scale-95 transition-all'>
                            LEARN MORE
                        </button>
                    </div>
                    <Image 
                        className='md:absolute bottom-0 right-0 w-full md:max-w-125 h-auto object-contain' 
                        src={assets.hero_model_img} 
                        alt="Hero Model" 
                    />
                </div>

                {/* Side Cards */}
                <div className='flex flex-col gap-5 w-full xl:max-w-md'>
                    {/* Top Side Card */}
                    <div className='flex-1 flex items-center justify-between bg-orange-200 rounded-3xl p-8 group overflow-hidden'>
                        <div>
                            <p className='text-3xl font-semibold text-slate-800'>Best <br /> products</p>
                            <p className='flex items-center gap-2 mt-4 text-slate-700 font-medium cursor-pointer'>
                                View more <ArrowRightIcon className='group-hover:translate-x-1 transition-all' size={18} />
                            </p>
                        </div>
                        <Image className='w-120 absolute object-contain self-end' src={assets.hero_product_img1} alt="Product 1" />
                    </div>

                    {/* Bottom Side Card */}
                    <div className='flex-1 flex items-center justify-between bg-blue-200 rounded-3xl p-8 group overflow-hidden'>
                        <div>
                            <p className='text-3xl font-semibold text-slate-800'>20% <br /> discounts</p>
                            <p className='flex items-center gap-2 mt-4 text-slate-700 font-medium cursor-pointer'>
                                View more <ArrowRightIcon className='group-hover:translate-x-1 transition-all' size={18} />
                            </p>
                        </div>
                        <Image className='w-48 object-contain self-end' src={assets.hero_product_img2} alt="Product 2" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    )
}

export default Hero