import { authenticator } from "../services/auth.server";
import { SocialsProvider } from "remix-auth-socials";
import { redirect } from "@remix-run/node";

export let loader = () => redirect("/");

export const action = async ({ request }) => {
  // initiating authentication using Google Strategy
  // on success --> redirect to home
  // on failure --> back to root
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/home",
    failureRedirect: "/",
  });
};
