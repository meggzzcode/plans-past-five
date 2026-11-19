/**
 * Pinterest pin images (1000 x 1500, 2:3) by the page they promote. Generated from
 * design/pins/manifest.json (the files live in public/pins). The first file for a page is the one the
 * Pin button and og:image use; the rest are alternates. A page with no entry falls back to its hero
 * image (see src/lib/pins.ts). To add a pin: add the file to public/pins and a line here, then
 * update design/pins/manifest.json and docs/pinterest-pins.csv (src/test/pins.test.ts checks all three).
 */
export const pinFiles: Record<string, string[]> = {
  "/journal/hobbies-to-try-when-life-feels-like-work-sleep-repeat": [
    "01-35-hobbies-1-cover.jpg",
    "01-35-hobbies-2-headline.png",
    "01-35-hobbies-3-quote.png",
  ],
  "/journal/things-to-do-after-work-instead-of-scrolling": [
    "02-after-work-25-1-checklist.png",
    "02-after-work-25-2-editorial.jpg",
    "02-after-work-25-3-headline.png",
  ],
  "/journal/creative-hobbies-you-can-start-at-home": [
    "03-creative-home-21-1-editorial.jpg",
    "03-creative-home-21-2-steps.png",
    "03-creative-home-21-3-quote.png",
  ],
  "/journal/how-to-start-junk-journaling": [
    "04-junk-journal-1-cover.jpg",
    "04-junk-journal-2-checklist.png",
    "04-junk-journal-3-steps.png",
  ],
  "/journal/low-energy-hobbies": [
    "05-low-energy-1-headline.png",
    "05-low-energy-2-headline.png",
    "05-low-energy-3-checklist.png",
  ],
  "/hobby-finder": ["31-quiz-1-quiz.png", "31-quiz-2-quiz.png", "31-quiz-3-quiz.png"],
  "/journal/how-to-find-a-hobby-as-an-adult": [
    "06-find-a-hobby-1-headline.png",
    "06-find-a-hobby-2-steps.png",
    "06-find-a-hobby-3-quote.png",
  ],
  "/journal/junk-journaling-supplies-for-beginners": [
    "08-junk-supplies-1-checklist.png",
    "08-junk-supplies-2-editorial.jpg",
    "08-junk-supplies-3-headline.png",
  ],
  "/journal/flower-arranging-as-a-hobby": [
    "13-flower-arranging-1-headline.png",
    "13-flower-arranging-2-steps.png",
  ],
  "/journal/creative-hobby-starter-kits-worth-considering": [
    "14-starter-kits-1-cover.jpg",
    "14-starter-kits-2-checklist.png",
    "14-starter-kits-3-headline.png",
  ],
  "/journal/things-to-do-on-the-weekend": [
    "15-weekend-things-1-cover.jpg",
    "15-weekend-things-2-headline.png",
    "15-weekend-things-3-checklist.png",
  ],
  "/make-plans": ["32-plans-1-headline.png", "32-plans-2-quiz.png"],
  "/journal/at-home-creative-weekend": [
    "16-creative-weekend-1-headline.png",
    "16-creative-weekend-2-steps.png",
  ],
  "/journal/how-to-plan-a-perfect-picnic": [
    "17-picnic-1-editorial.jpg",
    "17-picnic-2-checklist.png",
  ],
  "/journal/cheap-weekend-adventures": [
    "18-cheap-adventures-1-cover.jpg",
    "18-cheap-adventures-2-headline.png",
  ],
  "/journal/solo-date-ideas": [
    "19-solo-dates-1-cover.jpg",
    "19-solo-dates-2-quote.png",
    "19-solo-dates-3-checklist.png",
  ],
  "/journal/how-to-take-yourself-on-a-solo-coffee-shop-date": [
    "20-solo-coffee-1-editorial.jpg",
    "20-solo-coffee-2-steps.png",
  ],
  "/shop/pottery-era": ["35-shop-pottery-era-1-cover.jpg"],
  "/journal/cozy-solo-dates-at-home": [
    "21-cozy-solo-home-1-headline.png",
    "21-cozy-solo-home-2-headline.png",
  ],
  "/journal/girls-night-ideas-that-arent-drinks": [
    "23-girls-night-1-cover.jpg",
    "23-girls-night-2-checklist.png",
    "23-girls-night-3-quote.png",
  ],
  "/journal/how-to-host-a-craft-night": [
    "24-craft-night-1-editorial.jpg",
    "24-craft-night-2-steps.png",
    "24-craft-night-3-checklist.png",
  ],
  "/journal/how-to-start-a-book-club": ["25-book-club-1-cover.jpg", "25-book-club-2-steps.png"],
  "/journal/how-to-host-a-mahjong-night": [
    "26-mahjong-1-editorial.jpg",
    "26-mahjong-2-checklist.png",
  ],
  "/shop/creative-girl": ["36-shop-creative-girl-1-editorial.jpg"],
  "/journal/active-hobbies-for-women-who-dont-love-the-gym": [
    "27-active-no-gym-1-cover.jpg",
    "27-active-no-gym-2-headline.png",
    "27-active-no-gym-3-quote.png",
  ],
  "/journal/how-to-start-playing-tennis-as-an-adult": [
    "28-tennis-1-editorial.jpg",
    "28-tennis-2-quote.png",
  ],
  "/journal/pickleball-for-beginners": [
    "29-pickleball-1-headline.png",
    "29-pickleball-2-checklist.png",
  ],
  "/journal/how-to-get-into-recreational-cycling-as-an-adult": [
    "30-cycling-1-headline.png",
    "30-cycling-2-steps.png",
  ],
  "/shop/sporty-girl": ["37-shop-sporty-girl-1-cover.jpg"],
  "/shop/girls-night-in": ["38-shop-girls-night-in-1-editorial.jpg"],
  "/shop/bookish-girl": ["39-shop-bookish-girl-1-cover.jpg"],
  "/shop/little-adventures": ["40-shop-little-adventures-1-editorial.jpg"],
  "/journal/affordable-hobbies-under-25": [
    "07-affordable-hobbies-1-headline.png",
    "07-affordable-hobbies-2-checklist.png",
    "07-affordable-hobbies-3-headline.png",
  ],
  "/journal/how-to-start-air-dry-clay": [
    "09-air-dry-clay-1-cover.jpg",
    "09-air-dry-clay-2-steps.png",
  ],
  "/journal/watercolor-painting-for-beginners": [
    "10-watercolor-1-editorial.jpg",
    "10-watercolor-2-checklist.png",
    "10-watercolor-3-quote.png",
  ],
  "/journal/how-to-start-embroidery": ["11-embroidery-1-headline.png", "11-embroidery-2-steps.png"],
  "/journal/how-to-start-crocheting": ["12-crochet-1-headline.png", "12-crochet-2-checklist.png"],
  "/tools/hobby-budget": ["33-budget-tool-1-checklist.png"],
  "/journal/how-to-plan-a-solo-saturday": [
    "22-solo-saturday-1-steps.png",
    "22-solo-saturday-2-headline.png",
  ],
  "/tools/tonight": ["34-tonight-tool-1-headline.png"],
};
