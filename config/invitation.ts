export type InvitationConfig = typeof invitationConfig;

export const invitationConfig = {
  couple: {
    groom: {
      name: "Muhammad Adil",
      details: ["Son of Muhammad Gulzar"]
    },
    bride: {
      details: ["Daughter of Shaukat Ali"]
    }
  },

  hero: {
    eyebrow: "We are honored to welcome you to the wedding ceremony",
    backgroundImage: "", // optional URL - falls back to a generated cinematic gradient
    backgroundVideo: "/videos/background.mp4", // optional muted, looping MP4/WebM background clip
    scrollLabel: "Scroll"
  },

  welcome: {
    message:
      "We are honored to welcome you to the Wedding ceremony of Muhammad Adil as he begins his journey in faith and love. We thank you for being part of this blessed occasion."
  },

  scratchReveal: {
    heading: "Scratch to Reveal",
    hiddenMessage: "Together\nForever",
    hiddenSubMessage: "15th November 2026",
    completionThreshold: 55 // percent of the heart that must be scratched to auto-clear
  },

  photo: {
    image: "/couple.jpg",
    caption: "Forever starts here."
  },

  countdown: {
    heading: "Counting Down to Forever",
    // ISO 8601 with explicit offset so the countdown is correct regardless of guest timezone
    weddingDateTimeISO: "2026-11-15T18:00:00+05:30"
  },

  programTimeline: {
    heading: "Program Timeline",
    arrivalLeadMinutes: 30,
    events: [
      {
        title: "Guest Arrival",
        timeOffsetMinutes: -270,
        description: "Please arrive and make yourself comfortable."
      },
      {
        title: "Reception",
        timeOffsetMinutes: -240,
        description: "Lunch and celebration to follow."
      }
    ]
  },

  venue: {
    heading: "Venue",
    name: "Avior Marquee",
    address: "33.5981834, 73.1447981",
    mapsUrl:
      "https://www.google.com/maps/place/Avior+Marquee/@33.5981834,73.1447981,17z/data=!3m1!4b1!4m6!3m5!1s0x38dfed005f13ebb3:0x128562dc2fb30fbf!8m2!3d33.5981834!4d73.1447981!16s%2Fg%2F11xw9rvtbl?entry=ttu&g_ep=EgoyMDI2MDkyNy4xIKXMDSoASAFQAw%3D%3D"
  },

  transportation: {
    heading: "Shuttle Service",
    text: "A complimentary shuttle will depart from Gateway of India, Colaba every 30 minutes.",
    pickupPoint: "Gateway of India, Colaba",
    pickupTime: "4:30 PM onwards"
  },

  accommodation: {
    heading: "Accommodation",
    text:
      "Special rates have been arranged for our guests at The Taj Mahal Palace and nearby partner hotels. Please mention the code below while booking.",
    bookingCode: "WEDDING2026"
  },

  gifts: {
    heading: "Gifts",
    text:
      "Your presence is the greatest gift of all. Should you wish to celebrate further, a small registry has been arranged for your convenience.",
    registryUrl: ""
  },

  guestMessage: {
    heading: "Send a Message",
    // Optional: point this at your own API route (e.g. "/api/rsvp") to persist submissions.
    // Left empty, the form simulates a network call so the UI can be reviewed end to end.
    endpoint: ""
  },

  closing: {
    message: "We can't wait to celebrate with you!",
    signature: "Your Presence Would Make This Celebration Truly Special"
  },

  footer: {
    names: "Muhammad Adil",
    tagline: "zareqia • Create your own wedding invitation"
  },

  music: {
    src: "/song.mp3",
    label: "Music"
  },

  languages: [
    { code: "en", label: "English" },
    { code: "ur", label: "Urdu" }
  ] as const,

  theme: {
    blush: "#D2C3F6",
    ivory: "#FAF7F2",
    wine: "#54263D",
    gold: "#C9A96A"
  }
};
