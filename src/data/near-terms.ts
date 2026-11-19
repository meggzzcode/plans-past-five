/**
 * "Find this near me" search phrases. These are generic Google Maps search words, never venue names
 * or claims about what exists nearby. Keys are activity ids from src/data/activities.ts; activities
 * done at home are left out on purpose. Edit here to change what a link searches for.
 */
export const nearTermsByActivity: Record<string, string> = {
  market: "farmers market",
  trail: "walking trail",
  "park-walk": "park",
  birds: "nature reserve",
  "photo-walk": "park",
  picnic: "park",
  thrift: "thrift store",
  museum: "museum",
  bookstore: "bookstore",
  "cafe-sketch": "cafe",
  "pottery-studio": "paint your own pottery",
  tennis: "public tennis courts",
  pickleball: "pickleball courts",
  skate: "roller skating rink",
  "book-club": "book club",
  "call-walk": "park",
  "film-roll": "park",
  sunset: "park",
  volunteer: "volunteer opportunities",
  "drop-in": "drop in class",
  "bike-ride": "bike trail",
  frisbee: "park",
  stargaze: "park",
  "thermos-walk": "park",
  "crossword-cafe": "cafe",
};
