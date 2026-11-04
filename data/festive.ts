// Diwali 2026 falls on 8 November. The festive theme switches itself off after `diwaliUntil`,
// so nothing needs to be removed by hand once the season is over.
export const diwaliUntil = "2026-11-16T00:00:00+05:30";

export const isDiwali = (now = Date.now()) => now < Date.parse(diwaliUntil);

export const diwaliOffers = [
  {
    icon: "reels",
    title: "Festive Reels",
    text: "Diwali reels and short videos made to ride the festive scroll and get shared.",
  },
  {
    icon: "greeting",
    title: "Greeting Videos",
    text: "Branded Diwali greetings for your customers, partners and team, ready for WhatsApp and Instagram.",
  },
  {
    icon: "ads",
    title: "Festive Offer Ads",
    text: "Meta and Google campaigns that turn your Diwali offers into enquiries and sales.",
  },
  {
    icon: "kit",
    title: "Festive Social Kit",
    text: "Posts, stories and a content calendar that cover the whole Diwali week.",
  },
] as const;
