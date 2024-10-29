import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
let isInitialized = false;

export const initMixpanel = () => {
  if (!isInitialized) {
    console.log("Initializing Mixpanel...");
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: true,
      cookie: {
        sameSite: "None",
        secure: true,
      },
    });
    isInitialized = true;

    let userId = localStorage.getItem("mixpanel_user_id");
    if (!userId) {
      userId = Math.floor(Math.random() * 1000000000 + 1);
      localStorage.setItem("mixpanel_user_id", userId);
    }

    mixpanel.identify(userId);
    console.log(`User ID: ${userId}`);

    mixpanel.people.set({
      email: `user${userId}@example.com`,
      name: `User ${userId}`,
    });
  }
};

export const trackEvent = (eventName, properties = {}) => {
  if (isInitialized) {
    mixpanel.track(eventName, properties);
  } else {
    console.warn("Mixpanel not initialized. Event not tracked.");
  }
};
