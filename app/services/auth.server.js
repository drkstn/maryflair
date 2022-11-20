import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";
import User from "./models/User";

// Create an instance of the authenticator
// It will take session storage as an input parameter and creates the user session on successful authentication
export const authenticator = new Authenticator(sessionStorage);

// callback function that will be invoked upon successful authentication from social provider
async function handleSocialAuthCallback({
  accessToken,
  refreshToken,
  profile,
}) {
  // console.log(profile);
  const { email, name, given_name, family_name, sub } = profile._json;

  const user = {
    email,
    name,
    givenName: given_name,
    familyName: family_name,
    googleId: sub,
    accessToken,
    refreshToken,
  };

  const isReturningUser = await User.findOne({ email });

  if (isReturningUser) {
    await User.updateOne({ email }, { accessToken, refreshToken });
  }
  if (!isReturningUser) {
    await User.create(user);
  }
  // profile object contains all the user data like image, displayName, id
  return profile;
}

// Configuring Google Strategy
authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: [
        "openid email profile",
        "https://www.googleapis.com/auth/calendar",
      ],
      prompt: "consent",
      accessType: "offline",
      // callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`,
      callbackURL:
        process.env.NODE_ENV === "development"
          ? `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`
          : `https://maryflair.vercel.app/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    handleSocialAuthCallback
  )
);
