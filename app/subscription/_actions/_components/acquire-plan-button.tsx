"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";

const AcquirePlanButton = () => {
  const { user } = useUser();

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PLUBISHABLE_KEY) {
      throw new Error("Stripe publishable key is missing");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PLUBISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  return (
    <Button
      className="w-full rounded-full border border-primary font-bold hover:bg-primary hover:text-white"
      onClick={handleAcquirePlanClick}
      variant={hasPremiumPlan ? "link" : "default"}
    >
      {hasPremiumPlan ? "Gerenciar plano" : "Adquirir plano"}
    </Button>
  );
};

export default AcquirePlanButton;
