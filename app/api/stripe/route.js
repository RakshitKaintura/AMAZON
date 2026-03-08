import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers" 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    //  Get the raw text body for Stripe verification
    const body = await request.text()
    
    //  Access headers using the App Router utility
    const headerList = await headers()
    const sig = headerList.get('stripe-signature')

    //  Verify the event came from Stripe
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    const handlePaymentIntent = async (paymentIntentId, isPaid) => {
      // Retrieve the session to access metadata (where orderIds and userId are stored)
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntentId
      })

      if (!session.data.length) return;

      const { orderIds, userId, appId } = session.data[0].metadata

      // Security check to ensure the webhook is for the correct application
      if (appId !== 'gocart') {
        return;
      }

      const orderIdsArray = orderIds.split(',')

      if (isPaid) {
        // Mark orders (which already include coupon discounts in DB) as paid
        await Promise.all(orderIdsArray.map(async (orderId) => {
          await prisma.order.update({
            where: { id: orderId },
            data: { isPaid: true }
          })
        }))

        // Clear the user's cart after successful purchase
        await prisma.user.update({
          where: { id: userId },
          data: { cart: {} }
        })
      } else {
        
        await Promise.all(orderIdsArray.map(async (orderId) => {
          await prisma.order.delete({
            where: { id: orderId }
          })
        }))
      }
    }

   
    switch (event.type) {
      case 'payment_intent.succeeded': {
        await handlePaymentIntent(event.data.object.id, true)
        break
      }
      case 'payment_intent.canceled': {
        await handlePaymentIntent(event.data.object.id, false)
        break
      }
      default:
        console.log('Unhandled event type:', event.type)
        break
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("Webhook Error:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
