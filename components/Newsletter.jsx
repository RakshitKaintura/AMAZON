import React from 'react'
import Title from './Title'
import Link from 'next/link'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center mx-4 my-36'>
            <Title
                title="GoCart Plus Membership"
                description="Unlock premium shopping perks with our Plus service and get more value from every order."
                visibleButton={false}
            />

            <div className='w-full max-w-3xl my-10 rounded-3xl border border-slate-200 bg-linear-to-r from-emerald-50 to-teal-50 p-6 sm:p-8'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-700'>
                    <div className='rounded-xl bg-white/70 border border-emerald-100 p-4'>
                        <p className='font-semibold text-slate-900'>Free Priority Delivery</p>
                        <p className='mt-1'>Faster shipping on eligible products without extra fees.</p>
                    </div>
                    <div className='rounded-xl bg-white/70 border border-emerald-100 p-4'>
                        <p className='font-semibold text-slate-900'>Member-Only Discounts</p>
                        <p className='mt-1'>Get exclusive price drops and early access to major sales.</p>
                    </div>
                    <div className='rounded-xl bg-white/70 border border-emerald-100 p-4'>
                        <p className='font-semibold text-slate-900'>Premium Support</p>
                        <p className='mt-1'>24/7 faster support response for all Plus members.</p>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6'>
                    <p className='text-slate-600 text-sm'>Starting at ₹99/month. Cancel anytime.</p>
                    <Link href='/pricing' className='font-medium bg-green-500 text-white px-7 py-3 rounded-full hover:scale-103 active:scale-95 transition'>
                        Subscribe to Plus
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Newsletter