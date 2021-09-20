"use strict"
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
    post: async (ctx) => {
        const amt = ctx.request.body.total
        console.log(amt);
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2020-08-27'}
        )
        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amt) * 100,
            currency: 'inr',
            customer: customer.id,
        })
        ctx.send({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        })
    }
}