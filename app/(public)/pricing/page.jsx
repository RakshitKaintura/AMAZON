export default function PricingPage() {
    return (
        <div className='mx-6 my-20 text-slate-700'>
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-3xl sm:text-4xl font-semibold text-slate-900 text-center'>Choose Your Plan</h1>
                <p className='text-slate-500 text-center mt-2'>Simple pricing with clear benefits.</p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
                    <div className='rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
                        <div className='p-6 border-b border-slate-200'>
                            <p className='text-lg font-semibold'>Free</p>
                            <p className='text-4xl font-bold mt-2'>0 rupees</p>
                            <p className='text-slate-500 text-sm mt-2'>Always free</p>
                        </div>
                        <div className='p-6 space-y-2 text-sm'>
                            <p>✓ Limited Coupons</p>
                            <p>✓ No early access to sales</p>
                            <p>✓ Limited Cashback and rewards</p>
                            <p>✓ Paid Shipping</p>
                            <p>✓ Limited Discounts</p>
                            <button className='w-full mt-4 bg-slate-700 text-white py-2.5 rounded-md hover:bg-slate-800 transition'>Subscribe</button>
                        </div>
                    </div>

                    <div className='rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
                        <div className='p-6 border-b border-slate-200'>
                            <p className='text-lg font-semibold'>Plus</p>
                            <div className='flex items-end gap-1 mt-2'>
                                <p className='text-4xl font-bold'>₹100</p>
                                <p className='text-slate-500 mb-1'>/month</p>
                            </div>
                            <p className='text-slate-500 text-sm mt-2'>Billed annually</p>
                        </div>
                        <div className='p-6 space-y-2 text-sm'>
                            <p>✓ Member Exclusive Coupons</p>
                            <p>✓ Exclusive Discounts</p>
                            <p>✓ Early Access to Sales</p>
                            <p>✓ Cashbacks and rewards boost</p>
                            <p>✓ Free or Faster Shipping</p>
                            <button className='w-full mt-4 bg-slate-700 text-white py-2.5 rounded-md hover:bg-slate-800 transition'>Start 7-day free trial</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}