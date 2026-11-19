import type { Article } from "./types";

export const articleHowToGetIntoRecreationalCyclingAsAnAdult: Article = {
  slug: "how-to-get-into-recreational-cycling-as-an-adult",
  title: "How to Get Into Recreational Cycling as an Adult",
  titleItalic: "Recreational Cycling",
  dek: "A gentle plan for getting back on a bike: choosing one, staying safe and visible, planning an easy first ride and building up without feeling like an athlete.",
  category: "movement",
  status: "draft",
  publishedAt: "",
  hero: "hiking",
  searchIntent: "how to start cycling as an adult / recreational cycling for beginners",
  angle:
    "A confidence-first plan: borrow or hire a bike, learn to fit a helmet, practice in a quiet place, take a short first ride, then build routes",
  hobbies: ["hiking", "nature-photography", "birdwatching"],
  productIds: ["daypacks", "water-bottles", "market-totes"],
  related: [
    "active-hobbies-for-women-who-dont-love-the-gym",
    "cheap-weekend-adventures",
    "things-to-do-on-the-weekend",
  ],
  sources: [
    {
      title: "CPSC: which helmet",
      url: "https://www.cpsc.gov/s3fs-public/349-WhichHelmetBrochure_5-13-22_WEB_508_0.pdf",
      note: "Replace within 5 to 10 years (Cowork C4)",
    },
    {
      title: "Bicycle Helmet Safety Institute: replacement",
      url: "https://helmets.org/replace/",
      note: "Most manufacturers recommend about 5 years (Cowork C4)",
    },
    {
      title: "NHTSA bicycle safety sheet",
      url: "https://www.nhtsa.gov/sites/nhtsa.gov/files/811557.pdf",
      note: "Lights: sources differ on all States versus many States; keep check local law (Cowork C4)",
    },
  ],
  coworkChecks: [
    "Confirm that borrowing, renting or bike-share are realistic options in most areas; availability varies by location and no schemes are named.",
    "Confirm that typical costs for a bike, helmet, lights and a lock are described only as approximate ranges, if at all; the piece states no prices.",
    "Confirm that padded shorts or a more comfortable saddle is reasonable, general advice for saddle soreness.",
    "Confirm that shifting to an easier gear before a climb is standard beginner guidance from a cycling-education source.",
    "Confirm that a basic puncture repair kit and pump are standard beginner carry items, and that free workshops exist in some areas (varies by location).",
    "Confirm that sharing paths with walkers (slow down, ring a bell or call out) matches typical shared-path etiquette guidance from a local authority or cycling body.",
    "Safety: confirm helmet-fit guidance (helmet sits level, about two finger-widths above the eyebrows, side straps form a V under the ears, chin strap snug with about one finger of space) against an official safety source such as a national safety council or helmet-safety organization.",
    "Safety: confirm that wearing a helmet is recommended by official safety bodies, and that helmet laws differ by location; the piece says to check local rules.",
    "Safety: Cowork C4 (2026-11-19): replacing a helmet after a crash is not in dispute. Replacement by age conflicts across sources (CPSC suggests 5 to 10 years from purchase; the Bicycle Helmet Safety Institute says most manufacturers now say about 5), so the text states both and defers to the manufacturer.",
    "Safety: confirm lights and visibility guidance (a white front light and a red rear light or reflector when riding in low light, and many places legally require them); mark as 'varies by location, check local law'. Cowork C4: NHTSA sheets disagree (one says required in all States, another says many States), so keep 'check local law'.",
    "Safety: confirm general road-position and hand-signal guidance (ride in the same direction as traffic where required, signal turns, obey signals) matches local traffic laws; laws vary by location, so the piece defers to local rules.",
    "Fit: confirm the standover-clearance and saddle-height guidance (a small gap when standing over the top tube; a slight bend in the knee at the bottom of the pedal stroke) against a bike-fit or retailer source.",
    "Maintenance: confirm the 'ABC quick check' (air, brakes, chain) and tire-pressure advice follows the sidewall marking on the tire.",
  ],
  body: [
    {
      type: "p",
      text: "Say there's a bike at the back of the garage, or one a friend keeps offering to lend, and the last time you rode anything was when you were fourteen. The idea of riding for fun feels nostalgic on a sunny day and slightly terrifying on every other one. Both reactions are normal.",
    },
    {
      type: "p",
      text: "Recreational cycling is the unhurried kind: no special outfit, no speed targets, no clip-in shoes. Just you, a bike and somewhere pleasant to end up, preferably with a coffee. This guide takes you from 'where do I even start' to a calm first ride, with safety woven in from the beginning rather than bolted on at the end.",
    },
    {
      type: "p",
      text: "One note before we go further: cycling rules and laws differ from place to place. Everything below is general guidance. Check your local rules on helmets, lights, where you may ride and how to signal, and follow those over anything written here.",
    },
    { type: "h2", text: "Step 1: Get a bike that fits", id: "bike" },
    {
      type: "p",
      text: "You don't need to buy a bike to start. Borrow one from a friend, rent one for an hour, or look into a local bike-share scheme or community bike library. The point is to find out whether you enjoy it before you spend.",
    },
    {
      type: "list",
      items: [
        "**Comfort over speed.** For casual riding, upright bikes with a relaxed posture are easier on the back and wrists.",
        "**Standover check.** Stand over the bike with both feet flat. You should have a little clearance between you and the top bar or frame.",
        "**Saddle height.** When sitting, with your heel on the pedal at its lowest point, your leg should be nearly straight. With the ball of your foot on the pedal, there should be a slight bend in the knee.",
        "**Reach.** You shouldn't feel stretched out or cramped. A bike shop can adjust it in minutes.",
      ],
    },
    { type: "h2", text: "Step 2: Get a helmet and learn to fit it", id: "helmet" },
    {
      type: "p",
      text: "Safety organizations recommend wearing a helmet, and in some places it's a legal requirement for some riders. A helmet only helps if it fits properly, so take a minute to adjust it.",
    },
    {
      type: "list",
      items: [
        "**Level, not tilted back.** The helmet should sit flat on your head, about two fingers above your eyebrows.",
        "**Side straps in a V** that meets just below your ears.",
        "**Chin strap snug.** You should be able to fit about one finger between the strap and your chin, and it should feel firm when you open your mouth wide.",
        "**No wobble.** Shake your head. If the helmet shifts, tighten the dial or add the supplied pads.",
        "**Replace after a crash.** Beyond that, advice on age varies: the U.S. Consumer Product Safety Commission suggests five to ten years from purchase, while the Bicycle Helmet Safety Institute says most manufacturers now recommend about five. Follow your helmet maker's guidance.",
      ],
    },
    { type: "h2", text: "Step 3: Be seen", id: "visible" },
    {
      type: "list",
      items: [
        "**Bright or light-colored clothes** help you stand out during the day.",
        "**Lights at dusk and after dark.** A white front light and a red rear light are standard, and many places require them by law. Check yours.",
        "**Reflectors and reflective details** add visibility from the side.",
        "**A bell** is polite and legally required in some places.",
      ],
    },
    { type: "h2", text: "Step 4: Do a thirty-second safety check", id: "check" },
    {
      type: "list",
      items: [
        "**Air.** Squeeze the tires and check the pressure range printed on the tire sidewall. Pump up if soft.",
        "**Brakes.** Squeeze both levers. They should engage firmly before reaching the handlebar. Roll the bike and test them.",
        "**Chain.** It should look clean and oiled, not rusty or dry. A little lubricant helps.",
        "**Quick-release parts** should be closed and tight.",
      ],
    },
    {
      type: "whatYoullNeed",
      essentials: [
        "A bike that fits (borrowed, rented or owned)",
        "A properly fitted helmet",
        "Lights and reflectors if you'll ride near dusk",
        "A water bottle and a snack",
        "Phone, ID and a small amount of cash or a card",
        "A lock if you'll stop somewhere",
      ],
      optional: ["A small daypack or basket", "A bell", "A puncture repair kit and pump", "Gloves"],
    },
    { type: "h2", text: "Step 5: Practice somewhere quiet", id: "practice" },
    {
      type: "p",
      text: "Choose an empty car park, a quiet park path or a traffic-free trail. Spend twenty minutes getting comfortable.",
    },
    {
      type: "first30",
      steps: [
        "Do the safety check, put on your helmet and adjust the saddle.",
        "Push off, coast and practice braking gently with both brakes.",
        "Ride in a slow, wide circle. Then try a figure-eight.",
        "Practice looking over your shoulder without wobbling. Then practice signaling with one hand.",
        "Try a few gentle starts and stops. Stop when you feel tired, not when you feel wobbly.",
      ],
    },
    { type: "h2", text: "Step 6: Your first real ride", id: "first-ride" },
    {
      type: "p",
      text: "Choose a flat, traffic-free or very quiet route of about thirty minutes. A paved trail, a canal path or a park loop is perfect. Ride with a friend if you can. Go on a weekday morning or a quiet weekend time to avoid crowds.",
    },
    {
      type: "list",
      items: [
        "**Follow local traffic laws.** Obey signals and signs, and give way as required.",
        "**Ride predictably.** Hold a steady line, signal your turns and look ahead.",
        "**Share paths politely.** Slow down near walkers and pass with a bell or a friendly hello.",
        "**Keep your phone away.** Stop to take photos, not while riding.",
        "**Know your route** and tell someone where you're going if you're heading somewhere remote.",
      ],
    },
    { type: "h2", text: "Step 7: Build up", id: "build" },
    {
      type: "p",
      text: "Add a little at a time: ten more minutes, a slightly hillier route, a café at the far end. A ride with a destination tends to be more motivating than a loop, and a bakery is a perfectly respectable destination. If you'd like company, look for a local beginner or social ride; many areas have one.",
    },
    { type: "h2", text: "Troubleshooting", id: "troubleshooting" },
    { type: "h3", text: "'My seat hurts.'" },
    {
      type: "p",
      text: "Some soreness at first is normal, but check your saddle height and angle. Padded shorts or a more comfortable saddle can help. If pain is sharp or persistent, check with a bike shop or a doctor.",
    },
    { type: "h3", text: "'I'm scared of traffic.'" },
    {
      type: "p",
      text: "Stay off busy roads at first. Plan routes along paths and quiet streets, and build confidence there. You don't have to ride on roads you don't feel good about.",
    },
    { type: "h3", text: "'Hills are awful.'" },
    {
      type: "p",
      text: "Shift to an easier gear before you start climbing, not halfway up. It's perfectly fine to get off and walk.",
    },
    { type: "h3", text: "'I got a flat tire.'" },
    {
      type: "p",
      text: "Walk to the nearest bike shop or call a friend. Later, learn to fix one at home, or take a free workshop if your area has them.",
    },
    {
      type: "saveSplurge",
      save: "Borrow or rent a bike, wear what you already own and ride free paths.",
      splurge:
        "A properly fitted helmet and a decent set of lights, if you ride near dusk. They're the two things worth getting right.",
    },
    {
      type: "shopHobby",
      title: "Small things that help",
      dek: "Optional. Check what you have first.",
      productIds: ["daypacks", "water-bottles", "market-totes"],
    },
    {
      type: "tryThisWeekend",
      text: "Borrow or rent a bike for an hour, fit your helmet and spend twenty minutes wobbling happily in a quiet spot. That's all.",
    },
    {
      type: "makePlan",
      text: "Pick a day, a friend and a flat route on Make Some Plans.",
    },
    { type: "ifYouLoved", hobbies: ["hiking", "birdwatching", "nature-photography"] },
  ],
};
