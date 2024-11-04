import Stripe from "stripe";
import { Resource } from "sst";
import { Util } from "@monorepo-template/core/util";
import { Billing } from "@monorepo-template/core/billing";

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body ?? "{}");
  const amount = Billing.compute(storage);
  const description = "Scratch charge";

  const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: "2024-10-28.acacia",
  });

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return JSON.stringify({ status: true });
});
