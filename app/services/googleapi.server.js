import { google } from "googleapis";
import { authenticator } from "./auth.server";
import { SocialsProvider } from "remix-auth-socials";
import User from "./models/User";

const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`
      : `https://maryflair.vercel.app/auth/${SocialsProvider.GOOGLE}/callback`,
};

const authenticateWithGoogle = async (request) => {
  const user = await authenticator.isAuthenticated(request);
  const userData = await User.findOne({ email: user._json.email });
  const { accessToken, refreshToken } = userData;

  const myAuth = new google.auth.OAuth2(
    config.clientID,
    config.clientSecret,
    config.callbackURL
  );

  myAuth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  google.options({ auth: myAuth });

  return myAuth;
};

export const getCalendarList = async (request) => {
  const myAuth = await authenticateWithGoogle(request);

  const calendar = google.calendar("v3");
  const calendarList = await calendar.calendarList.list({
    auth: myAuth,
    calendarId: "primary",
  });

  return calendarList;
};

export const getEventList = async (request) => {
  const myAuth = await authenticateWithGoogle(request);

  const calendar = google.calendar("v3");
  const calendarEvents = await calendar.events.list({
    auth: myAuth,
    calendarId: "primary",
    // timeMin: new Date(),
  });

  return calendarEvents;
};

export const quickAddEvent = async (request, date) => {
  const myAuth = await authenticateWithGoogle(request);

  const calendar = google.calendar("v3");

  // const calendarIsFound = await calendar.calendars
  //   .get({ calendarId: "Fall 2022" })
  //   .catch((e) => console.log(e));

  // if (!calendarIsFound) {
  //   await calendar.calendars
  //     .insert({
  //       resource: { summary: "Fall 2022" },
  //     })
  //     .catch((e) => console.log(e));
  // }
  const calendarList = await calendar.calendarList.list({});

  const calendarSearch = calendarList.data.items
    .filter((item) => item.summary === "Fall 2022")
    .flat();
  // const newCalendarEvent = await calendar.events
  //   .quickAdd({
  //     calendarId: "ta1pcqibu4shajmvddmt85h8pk@group.calendar.google.com",
  //     text: "Test event on " + date,
  //   })
  //   .catch((e) => console.log(e));

  return calendarSearch[0].id || null;
  // return isCalendar2;
  // console.log(isCalendar.data);

  // return calendarEvents;
};
