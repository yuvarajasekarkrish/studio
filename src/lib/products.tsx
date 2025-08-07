
import * as React from 'react';
import { Rocket, Sparkles, Star, Zap, Pencil, Gift, CloudDrizzle, ToyBrick, Droplets, Crosshair, Flame } from "lucide-react";

export const PACKAGING_COST = 200;

export const productData = [
  {
    category: "One Sound Crackers",
    icon: <Rocket />,
    items: [
      { title: "2 3/4\" Kuruvi Crackers / 2 3/4 குருவி கிராக்கர்ஸ்", actualPrice: "65", offerPrice: "13", stock: 100 },
      { title: "3 1/2\" Lakshmi Crackers / 3 1/2 லட்சுமி கிராக்கர்ஸ்", actualPrice: "85", offerPrice: "17", stock: 100 },
      { title: "4\" Lakshmi special Crackers / 4\" லட்சுமி ஸ்பெஷல்", actualPrice: "130", offerPrice: "26", stock: 100 },
      { title: "4\" Lakshmi Deluxe Crackers / 4\" லட்சுமி டீலக்ஸ்", actualPrice: "155", offerPrice: "31", stock: 100 },
      { title: "4\"Gold Lakshmi Crackers / 4\" கோல்டு லட்சுமி", actualPrice: "200", offerPrice: "40", stock: 100 },
      { title: "5\"Deluxe Crackers / 5\" டீலக்ஸ் கிராக்கர்ஸ்", actualPrice: "160", offerPrice: "32", stock: 100 },
      { title: "6\"Deluxe Crackers / 6\" டீலக்ஸ் கிராக்கர்ஸ்", actualPrice: "210", offerPrice: "42", stock: 100 },
      { title: "Lion Gun / லயன் கன்", actualPrice: "475", offerPrice: "95", stock: 100 },
    ],
  },
  {
    category: "Chakkar",
    icon: <Sparkles />,
    items: [
      { title: "Chakkaram Big / தரைச்சக்கரம் பெரியது", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Chakkaram Special / தரைச்சக்கரம் ஸ்பெசல்", actualPrice: "450", offerPrice: "90", stock: 100 },
      { title: "Chakkaram Deluxe / தரைச்சக்கரம் டீலக்ஸ்", actualPrice: "800", offerPrice: "160", stock: 100 },
      { title: "Hot Wheel / ஹாட் வீல்", actualPrice: "450", offerPrice: "90", stock: 100 },
      { title: "Dancing wheel / டான்சிங் வீல்", actualPrice: "500", offerPrice: "100", stock: 100 },
      { title: "Spin Master Mini / ஸ்பின் மாஸ்டர் மினி", actualPrice: "540", offerPrice: "108", stock: 100 },
      { title: "4 x 4 Wheel (Spl Wheel) / 4x4 வீல்", actualPrice: "700", offerPrice: "140", stock: 100 },
      { title: "Lotus Wheel / லோட்டஸ் வீல்", actualPrice: "810", offerPrice: "162", stock: 100 },
    ],
  },
  {
    category: "Flower Pots",
    icon: <Star />,
    items: [
      { title: "Flower Pots Bomb / பூச்சட்டி பாம்", actualPrice: "500", offerPrice: "100", stock: 100 },
      { title: "Flower Pots Big / பூச்சட்டி பெரியது", actualPrice: "460", offerPrice: "92", stock: 100 },
      { title: "Flower Pots Special / பூச்சட்டி ஸ்பெஷல்", actualPrice: "620", offerPrice: "124", stock: 100 },
      { title: "Flower Pots Giant / பூச்சட்டி ஜெயிண்ட்", actualPrice: "1175", offerPrice: "235", stock: 100 },
      { title: "Flower Pots Super (5 pcs) / பூச்சட்டி சூப்பர் (5 பீஸ்)", actualPrice: "1220", offerPrice: "244", stock: 100 },
      { title: "Colour Koti Special / கலர் கோட்டி ஸ்பெஷல்", actualPrice: "1030", offerPrice: "206", stock: 100 },
      { title: "Colour Koti / கலர் கோட்டி", actualPrice: "1330", offerPrice: "266", stock: 100 },
      { title: "Colour Koti Deluxe / கலர் கோட்டி டீலக்ஸ்", actualPrice: "2920", offerPrice: "584", stock: 100 },
      { title: "Flower Pots Asoka / பூச்சட்டி அசோகா", actualPrice: "900", offerPrice: "180", stock: 100 },
    ],
  },
  {
    category: "Bomb",
    icon: <Zap />,
    items: [
      { title: "Bullet Bomb / புல்லட் பாம்", actualPrice: "160", offerPrice: "32", stock: 100 },
      { title: "Atom Bomb / ஆட்டம் பாம்", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Hydro Bomb / ஹைட்ரோ பாம்", actualPrice: "400", offerPrice: "80", stock: 100 },
      { title: "King Bomb / கிங் பாம்", actualPrice: "490", offerPrice: "98", stock: 100 },
      { title: "Classic Bomb / கிளாசிக் பாம்", actualPrice: "700", offerPrice: "140", stock: 100 },
      { title: "Paper Bomb 1/4 kg Small / பேப்பர் பாம் 1/4 கிலோ சிறியது", actualPrice: "230", offerPrice: "46", stock: 100 },
      { title: "Paper Bomb 1/2 kg (Big) / பேப்பர் பாம் 1/2 கிலோ (பெரியது)", actualPrice: "460", offerPrice: "92", stock: 100 },
      { title: "Paper Bomb 1Kg (Big) / பேப்பர் பாம் 1 கிலோ (பெரியது)", actualPrice: "920", offerPrice: "184", stock: 100 },
      { title: "Digital Bomb / டிஜிட்டல் பாம்", actualPrice: "1150", offerPrice: "230", stock: 100 },
      { title: "Avathar Bomb (10Pcs) / அவதார் (10 pcs)", actualPrice: "1500", offerPrice: "300", stock: 100 },
    ],
  },
  {
    category: "Pencil",
    icon: <Pencil />,
    items: [
      { title: "Ultra pencil / அல்ட்ரா பென்சில்", actualPrice: "460", offerPrice: "92", stock: 100 },
      { title: "Selfie Stick (Enjoy) / செல்ஃபி ஸ்டிக் (என்ஜாய்)", actualPrice: "260", offerPrice: "52", stock: 100 },
    ],
  },
  {
    category: "Twinkling Star",
    icon: <Sparkles />,
    items: [
      { title: "1 1/2\" Twinkling Star / 1 1/2\" மினுமினுக்கும் நட்சத்திரம்", actualPrice: "175", offerPrice: "35", stock: 100 },
      { title: "4\" Twinkling Star / 4\" மினுமினுக்கும் நட்சத்திரம்", actualPrice: "375", offerPrice: "75", stock: 100 },
    ],
  },
  {
    category: "Rocket",
    icon: <Rocket />,
    items: [
      { title: "Baby Rocket / பேபி ராக்கெட்", actualPrice: "250", offerPrice: "50", stock: 100 },
      { title: "Rocket Bomb / ராக்கெட் பாம்", actualPrice: "350", offerPrice: "70", stock: 100 },
      { title: "2 Sound Rocket / 2 சத்தம் ராக்கெட்", actualPrice: "900", offerPrice: "180", stock: 100 },
      { title: "Lunick Rocket / லூனிக் ராக்கெட்", actualPrice: "700", offerPrice: "140", stock: 100 },
    ],
  },
  {
    category: "Shower",
    icon: <CloudDrizzle />,
    items: [
      { title: "Cocktail / காக்டெய்ல்", actualPrice: "785", offerPrice: "157", stock: 100 },
      { title: "Ashrafi Shower (5pcs) / அஷ்ரஃபி ஷவர் (5 பீஸ்)", actualPrice: "960", offerPrice: "192", stock: 100 },
      { title: "Coco Loco / கோகோ லாகோ", actualPrice: "800", offerPrice: "160", stock: 100 },
      { title: "Oreo / ஓரியோ", actualPrice: "785", offerPrice: "157", stock: 100 },
      { title: "3\" Shower (5 IN 1) / 3\" ஷவர் (5 in 1)", actualPrice: "600", offerPrice: "120", stock: 100 },
      { title: "Fly BEE (Spl Fountain) / ஃப்ளை பீ (SPL fountain)", actualPrice: "1110", offerPrice: "222", stock: 100 },
      { title: "Super Hero / சூப்பர் ஹீரோ", actualPrice: "1110", offerPrice: "222", stock: 100 },
      { title: "Mad angle / மேட் ஆங்கிள்", actualPrice: "1350", offerPrice: "270", stock: 100 },
      { title: "Popcorn / பாப்கார்ன்", actualPrice: "1520", offerPrice: "304", stock: 100 },
      { title: "What's App Mimes / வாட்சப் மைன்ஸ்", actualPrice: "1400", offerPrice: "280", stock: 100 },
    ],
  },
  {
    category: "Fancy Novelties",
    icon: <ToyBrick />,
    items: [
      { title: "Cricket Bat / கிரிக்கெட் பேட்", actualPrice: "650", offerPrice: "130", stock: 100 },
      { title: "Helicopter / ஹெலிகாப்டர்", actualPrice: "400", offerPrice: "80", stock: 100 },
      { title: "Drone / ட்ரோன்", actualPrice: "600", offerPrice: "120", stock: 100 },
      { title: "Butterfly / பட்டாம்பூச்சி", actualPrice: "430", offerPrice: "86", stock: 100 },
      { title: "Bambaram & Googly Red / பம்பரம் & கூக்ளி சிவப்பு", actualPrice: "570", offerPrice: "114", stock: 100 },
      { title: "Photo Flash / போட்டோ ஃபிளாஷ்", actualPrice: "750", offerPrice: "150", stock: 100 },
      { title: "Photo Flash Red / போட்டோ ஃபிளாஷ் சிவப்பு", actualPrice: "750", offerPrice: "150", stock: 100 },
      { title: "Photo Flash Silver / போட்டோ ஃபிளாஷ் வெள்ளி", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Siren Mega (2 Pcs) / சைரன் மெகா (2 பீஸ்)", actualPrice: "1250", offerPrice: "250", stock: 100 },
      { title: "Smoke / புகை", actualPrice: "700", offerPrice: "140", stock: 100 },
      { title: "Money In The Bank / மணி இன் தி பேங்க்", actualPrice: "1100", offerPrice: "220", stock: 100 },
      { title: "4\" Emoji / 4\" ஈமோஜி", actualPrice: "1075", offerPrice: "215", stock: 100 },
      { title: "Live Show / லைவ் ஷோ", actualPrice: "1075", offerPrice: "215", stock: 100 },
    ],
  },
  {
    category: "Fountain",
    icon: <Droplets />,
    items: [
      { title: "Four Square / ஃபோர் ஸ்கொயர்", actualPrice: "1750", offerPrice: "350", stock: 100 },
      { title: "Mumbo Jumbo / மும்போ ஜம்போ", actualPrice: "1520", offerPrice: "304", stock: 100 },
    ],
  },
  {
    category: "Fancy",
    icon: <Gift />,
    items: [
        { title: "2\" Single (3Pcs) / 2\" சிங்கிள் (3 pcs)", actualPrice: "1250", offerPrice: "250", stock: 100 },
        { title: "2\" Single / 2\" சிங்கிள்", actualPrice: "1010", offerPrice: "202", stock: 100 },
        { title: "2 1/2\" Single / 2 1/2\" சிங்கிள்", actualPrice: "1750", offerPrice: "350", stock: 100 },
        { title: "3\" Single / 3\" சிங்கிள்", actualPrice: "2540", offerPrice: "508", stock: 100 },
        { title: "3 1/2\" Single (2 Pcs) / 3 1/2 சிங்கிள் (2 Pcs)", actualPrice: "7500", offerPrice: "1500", stock: 100 },
        { title: "Double Ball Mix (2 Pcs) / டபுள் பால் மிக்ஸ் (2 Pcs)", actualPrice: "9075", offerPrice: "1815", stock: 100 },
        { title: "Chotta Single / சோட்டா சிங்கிள்", actualPrice: "200", offerPrice: "40", stock: 100 },
    ]
  },
  {
    category: "Shot",
    icon: <Crosshair />,
    items: [
      { title: "7 Shot / 7 ஷாட்", actualPrice: "450", offerPrice: "90", stock: 100 },
      { title: "15 Shot / 15 ஷாட்", actualPrice: "1750", offerPrice: "350", stock: 100 },
      { title: "30 Shot / 30 ஷாட்", actualPrice: "2400", offerPrice: "480", stock: 100 },
      { title: "60 Shot / 60 ஷாட்", actualPrice: "4800", offerPrice: "960", stock: 100 },
      { title: "120 Shot / 120 ஷாட்", actualPrice: "9750", offerPrice: "1950", stock: 100 },
      { title: "240 Shot / 240 ஷாட்", actualPrice: "19250", offerPrice: "3850", stock: 100 },
    ]
  },
  {
    category: "Matches",
    icon: <Flame />,
    items: [
      { title: "Dora Dora / டோரா டோரா", actualPrice: "175", offerPrice: "35", stock: 100 },
      { title: "Matches - Laptop / தீப்பெட்டி - லேப்டாப்", actualPrice: "1050", offerPrice: "210", stock: 100 },
      { title: "Matches Single (10 box) / தீப்பெட்டி சிங்கிள் (10 பெட்டி)", actualPrice: "350", offerPrice: "70", stock: 100 },
      { title: "Smoke Stick / புகை குச்சி", actualPrice: "125", offerPrice: "25", stock: 100 },
    ]
  },
  {
    category: "Sparklers",
    icon: <Sparkles />,
    items: [
      { title: "12 cm Electric Sparklers / 12 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "160", offerPrice: "32", stock: 100 },
      { title: "12 cm Colour Sparklers / 12 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "170", offerPrice: "34", stock: 100 },
      { title: "15 cm Electric Sparklers / 15 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "285", offerPrice: "57", stock: 100 },
      { title: "15 cm Colour Sparklers / 15 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "310", offerPrice: "62", stock: 100 },
      { title: "15 cm Green Sparklers / 15 செ.மீ பச்சை ஸ்பார்க்லர்ஸ்", actualPrice: "330", offerPrice: "66", stock: 100 },
      { title: "15 cm Red Sparklers / 15 செ.மீ சிவப்பு ஸ்பார்க்லர்ஸ்", actualPrice: "400", offerPrice: "80", stock: 100 },
      { title: "15 cm Silver Drop Sparklers / 15 செ.மீ சில்வர் டிராப் ஸ்பார்க்லர்ஸ்", actualPrice: "340", offerPrice: "68", stock: 100 },
      { title: "30 cm Electric Sparklers / 30 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "285", offerPrice: "57", stock: 100 },
      { title: "30 cm Colour Sparklers / 30 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "310", offerPrice: "62", stock: 100 },
      { title: "30 cm Green Sparklers / 30 செ.மீ பச்சை ஸ்பார்க்லர்ஸ்", actualPrice: "330", offerPrice: "66", stock: 100 },
      { title: "30 cm Red Sparklers / 30 செ.மீ சிவப்பு ஸ்பார்க்லர்ஸ்", actualPrice: "405", offerPrice: "81", stock: 100 },
      { title: "30cm Silver Drop Sparklers / 30 செ.மீ சில்வர் டிராப் ஸ்பார்க்லர்ஸ்", actualPrice: "340", offerPrice: "68", stock: 100 },
      { title: "50 cm Electric Sparklers / 50 செ.மீ எலக்ட்ரிக் ஸ்பார்க்லர்ஸ்", actualPrice: "850", offerPrice: "170", stock: 100 },
      { title: "50 cm Colour Sparklers / 50 செ.மீ கலர் ஸ்பார்க்லர்ஸ்", actualPrice: "950", offerPrice: "190", stock: 100 },
      { title: "50 cm Royal Mix Sparklers / 50 செ.மீ ராயல் மிக்ஸ் ஸ்பார்க்லர்ஸ்", actualPrice: "1200", offerPrice: "240", stock: 100 },
    ]
  },
  {
    category: "Chorsa",
    icon: <Flame />,
    items: [
      { title: "Red Bijli (100 pcs) / சிவப்பு பிஜிலி (100 பீஸ்)", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Stripped Bijli (100 pcs) / ஸ்டிரிப்ட் பிஜிலி (100 பீஸ்)", actualPrice: "325", offerPrice: "65", stock: 100 },
      { title: "Red Bijli (50 pcs) / சிவப்பு பிஜிலி (50 பீஸ்)", actualPrice: "210", offerPrice: "42", stock: 100 },
    ]
  },
  {
    category: "2024 New Varieties",
    icon: <Gift />,
    items: [
      { title: "90 Walts / 90 வால்ட்ஸ்", actualPrice: "750", offerPrice: "150", stock: 100 },
      { title: "Shin Chan / ஷின் சான்", actualPrice: "475", offerPrice: "95", stock: 100 },
      { title: "Top Gun / டாப் கன்", actualPrice: "900", offerPrice: "180", stock: 100 },
      { title: "12 Shot Rider (Long) / 12 ஷாட் ரைடர் (நீண்ட)", actualPrice: "700", offerPrice: "140", stock: 100 },
      { title: "25 Shot Rider / 25 ஷாட் ரைடர்", actualPrice: "1100", offerPrice: "220", stock: 100 },
      { title: "50 Shot Rider / 50 ஷாட் ரைடர்", actualPrice: "2200", offerPrice: "440", stock: 100 },
      { title: "1 3/4\" Pipe (3 in One) / 1 3/4\" பைப் (3 இன் ஒன்)", actualPrice: "1350", offerPrice: "270", stock: 100 },
      { title: "Snake Tablet (10 box) / பாம்பு மாத்திரை (10 பெட்டி)", actualPrice: "150", offerPrice: "30", stock: 100 },
      { title: "Assorted Cartoon / அசார்டட் கார்ட்டூன்", actualPrice: "350", offerPrice: "70", stock: 100 },
      { title: "Sky Shot Green crackling(10 pcs) / ஸ்கை ஷாட் பச்சை கிராக்லிங் (10 பீஸ்)", actualPrice: "1000", offerPrice: "200", stock: 100 },
      { title: "Water Falls Pencil / வாட்டர் ஃபால்ஸ் பென்சில்", actualPrice: "1250", offerPrice: "250", stock: 100 },
    ]
  }
];
