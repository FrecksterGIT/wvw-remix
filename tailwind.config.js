module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  safelist: [
    "text-red",
    "text-blue",
    "text-green",
    "bg-owner-red",
    "bg-owner-blue",
    "bg-owner-green",
  ],
  theme: {
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
        "owner-red": "radial-gradient(circle at 50%, #BA7471, #b02822 53%)",
        "owner-blue": "radial-gradient(circle at 50%, #839AC0, #1a4da1 53%)",
        "owner-green": "radial-gradient(circle at 50%, #7DBE63, #1e7b2d 53%)",
      },
    },
  },
};
