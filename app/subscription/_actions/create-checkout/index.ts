"use server";

import { auth } from "@clerk/nextjs/server";
// import Stripe from "stripe";
export const createStripeCheckout = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  //     apiVersion: "2020-08-27",
  // });
  // )
};
