module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  safelist: [
    "text-red",
    "text-blue",
    "text-green",
    "bg-owner-red",
    "bg-owner-blue",
    "bg-owner-green",
    "bg-tier1",
    "bg-tier2",
    "bg-tier3",
    "bg-claimed",
    "bg-waypoint",
  ],
  theme: {
    fontFamily: {
      sans: ["Open Sans"],
    },
    fontSize: {
      base: ["11px", { lineHeight: "13px" }],
    },
    extend: {
      colors: {
        white: "#ffffff",
        red: "#b02822",
        blue: "#1a4da1",
        green: "#1e7b2d",
        gray: "#707070",
      },
      backgroundImage: {
        world: "url(/_static/world.jpg)",
        border: "url(/_static/map-border.png)",
        tier1: "url(/_static/tier1.png)",
        tier2: "url(/_static/tier2.png)",
        tier3: "url(/_static/tier3.png)",
        waypoint: "url(/_static/waypoint.png)",
        claimed: "url(/_static/claimed.png)",
        "owner-red": "radial-gradient(circle at 50%, #BA7471, #b02822 53%)",
        "owner-blue": "radial-gradient(circle at 50%, #839AC0, #1a4da1 53%)",
        "owner-green": "radial-gradient(circle at 50%, #7DBE63, #1e7b2d 53%)",
      },
    },
  },
};
