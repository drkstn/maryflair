import { authenticator } from "../services/auth.server";
import { SocialsProvider } from "remix-auth-socials";

export const action = async ({ request }) => {
  // initiating authentication using Google Strategy
  // on success --> redirect to home
  // on failure --> back to root
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: "/home",
    failureRedirect: "/",
  });
};
