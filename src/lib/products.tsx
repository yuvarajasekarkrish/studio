
import * as React from 'react';
import { Rocket, Sparkles, Star, Zap, Pencil, Gift, CloudDrizzle, ToyBrick, Droplets, Crosshair, Flame } from "lucide-react";

export const PACKAGING_COST = 200;

export const productData = [
  {
    category: "One Sound Crackers",
    icon: <Rocket />,
    items: [
      { title: "2 3/4\" Kuruvi / குருவி Crackers", actualPrice: "75", offerPrice: "15", stock: 100 },
      { title: "3 1/2\" Lakshmi / லட்சுமி Crackers", actualPrice: "120", offerPrice: "24", stock: 100 },
      { title: "4\" Lakshmi special / லட்சுமி ஸ்பெஷல் Crackers", actualPrice: "150", offerPrice: "30", stock: 100 },
      { title: "4\" Lakshmi Deluxe / லட்சுமி டீலக்ஸ் Crackers", actualPrice: "195", offerPrice: "39", stock: 100 },
      { title: "4\"Gold Lakshmi / கோல்ட் லட்சுமி Crackers", actualPrice: "220", offerPrice: "44", stock: 100 },
      { title: "2 Sound / 2 சத்தம் Crackers", actualPrice: "215", offerPrice: "43", stock: 100 },
      { title: "3 Sound / 3 சத்தம் Crackers", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Lion Gun / லயன் கன்", actualPrice: "475", offerPrice: "95", stock: 100 },
    ],
  },
  {
    category: "Chakkar",
    icon: <Sparkles />,
    items: [
      { title: "Chakkaram Big / சக்கரம் பெரியது", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Chakkaram Special / சக்கரம் ஸ்பெஷல்", actualPrice: "590", offerPrice: "118", stock: 100 },
      { title: "Chakkaram Deluxe / சக்கரம் டீலக்ஸ்", actualPrice: "1000", offerPrice: "200", stock: 100 },
      { title: "Hot Wheel / ஹாட் வீல்", actualPrice: "450", offerPrice: "90", stock: 100 },
      { title: "Spin Master Mini / ஸ்பின் மாஸ்டர் மினி", actualPrice: "540", offerPrice: "108", stock: 100 },
    ],
  },
  {
    category: "Flower Pots",
    icon: <Star />,
    items: [
      { title: "Flower Pots Bomb / பூந்தொட்டி பாம்", actualPrice: "500", offerPrice: "100", stock: 100 },
      { title: "Flower Pots Big / பூந்தொட்டி பெரியது", actualPrice: "600", offerPrice: "120", stock: 100 },
      { title: "Flower Pots Special / பூந்தொட்டி ஸ்பெஷல்", actualPrice: "875", offerPrice: "175", stock: 100 },
      { title: "Flower Pots Giant / பூந்தொட்டி ஜெயண்ட்", actualPrice: "1315", offerPrice: "263", stock: 100 },
      { title: "Flower Pots Super (5 pcs) / பூந்தொட்டி சூப்பர் (5 பீஸ்)", actualPrice: "1570", offerPrice: "314", stock: 100 },
      { title: "Colour Koti Special / கலர் கோட்டி ஸ்பெஷல்", actualPrice: "1115", offerPrice: "223", stock: 100 },
      { title: "Colour Koti / கலர் கோட்டி", actualPrice: "1970", offerPrice: "394", stock: 100 },
      { title: "Colour Koti Deluxe / கலர் கோட்டி டீலக்ஸ்", actualPrice: "2920", offerPrice: "584", stock: 100 },
      { title: "Flower Pots Asoka / பூந்தொட்டி அசோகா", actualPrice: "860", offerPrice: "172", stock: 100 },
    ],
  },
  {
    category: "Bomb",
    icon: <Zap />,
    items: [
      { title: "Bullet Bomb / புல்லட் பாம்", actualPrice: "155", offerPrice: "31", stock: 100 },
      { title: "Atom Bomb / ஆட்டம் பாம்", actualPrice: "295", offerPrice: "59", stock: 100 },
      { title: "Hydro Bomb / ஹைட்ரோ பாம்", actualPrice: "395", offerPrice: "79", stock: 100 },
      { title: "King Bomb / கிங் பாம்", actualPrice: "490", offerPrice: "98", stock: 100 },
      { title: "Classic Bomb / கிளாசிக் பாம்", actualPrice: "735", offerPrice: "147", stock: 100 },
      { title: "Paper Bomb 1/4 kg Small / பேப்பர் பாம் 1/4 கிலோ சிறியது", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Paper Bomb 1/2 kg (Big) / பேப்பர் பாம் 1/2 கிலோ (பெரியது)", actualPrice: "600", offerPrice: "120", stock: 100 },
      { title: "Paper Bomb 1Kg (Big) / பேப்பர் பாம் 1 கிலோ (பெரியது)", actualPrice: "1200", offerPrice: "240", stock: 100 },
      { title: "Digital Bomb / டிஜிட்டல் பாம்", actualPrice: "1300", offerPrice: "260", stock: 100 },
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
      { title: "4\" Twinkling Star / 4\" மினுமினுக்கும் நட்சத்திரம்", actualPrice: "470", offerPrice: "94", stock: 100 },
    ],
  },
  {
    category: "Rocket",
    icon: <Rocket />,
    items: [
      { title: "Baby Rocket / பேபி ராக்கெட்", actualPrice: "245", offerPrice: "49", stock: 100 },
      { title: "Rocket Bomb / ராக்கெட் பாம்", actualPrice: "435", offerPrice: "87", stock: 100 },
      { title: "2 Sound Rocket / 2 சத்தம் ராக்கெட்", actualPrice: "900", offerPrice: "180", stock: 100 },
      { title: "Lunick Rocket / லூனிக் ராக்கெட்", actualPrice: "850", offerPrice: "170", stock: 100 },
    ],
  },
  {
    category: "Fancy",
    icon: <Gift />,
    items: [
      { title: "Tri Colour / மூவர்ணம்", actualPrice: "1800", offerPrice: "360", stock: 100 },
      { title: "Peacock Small / மயில் சிறியது", actualPrice: "900", offerPrice: "180", stock: 100 },
      { title: "Peacock Bada / மயில் படா", actualPrice: "3000", offerPrice: "600", stock: 100 },
      { title: "Peacock Feather / மயில் இறகு", actualPrice: "525", offerPrice: "105", stock: 100 },
      { title: "Chotta 5 in 1 / சோட்டா 5 இன் 1", actualPrice: "2175", offerPrice: "435", stock: 100 },
      { title: "2\" Single / 2\" சிங்கிள்", actualPrice: "990", offerPrice: "198", stock: 100 },
      { title: "2 1/2\" Single / 2 1/2\" சிங்கிள்", actualPrice: "1750", offerPrice: "350", stock: 100 },
      { title: "3\" Seven Wonders / 3\" ஏழு அதிசயங்கள்", actualPrice: "2350", offerPrice: "470", stock: 100 },
      { title: "3\" Single / 3\" சிங்கிள்", actualPrice: "2540", offerPrice: "508", stock: 100 },
      { title: "3 1/2\" Single / 3 1/2\" சிங்கிள்", actualPrice: "7500", offerPrice: "1500", stock: 100 },
      { title: "Double Ball Mix / டபுள் பால் மிக்ஸ்", actualPrice: "9075", offerPrice: "1815", stock: 100 },
      { title: "Chotta Single / சோட்டா சிங்கிள்", actualPrice: "300", offerPrice: "60", stock: 100 },
    ],
  },
  {
    category: "Shower",
    icon: <CloudDrizzle />,
    items: [
      { title: "Cocktail / காக்டெய்ல்", actualPrice: "785", offerPrice: "157", stock: 100 },
      { title: "Chotta Bheem (5pcs) / சோட்டா பீம் (5 பீஸ்)", actualPrice: "920", offerPrice: "184", stock: 100 },
      { title: "Ashrafi Shower (5pcs) / அஷ்ரஃபி ஷவர் (5 பீஸ்)", actualPrice: "525", offerPrice: "105", stock: 100 },
    ],
  },
  {
    category: "Fancy Novelties",
    icon: <ToyBrick />,
    items: [
      { title: "Helicopter / ஹெலிகாப்டர்", actualPrice: "575", offerPrice: "115", stock: 100 },
      { title: "Drone / ட்ரோன்", actualPrice: "1160", offerPrice: "232", stock: 100 },
      { title: "Butterfly / பட்டாம்பூச்சி", actualPrice: "425", offerPrice: "85", stock: 100 },
      { title: "Bambaram & Googly Red / பம்பரம் & கூக்ளி சிவப்பு", actualPrice: "680", offerPrice: "136", stock: 100 },
      { title: "Photo Flash / போட்டோ ஃபிளாஷ்", actualPrice: "770", offerPrice: "154", stock: 100 },
      { title: "Photo Flash Red / போட்டோ ஃபிளாஷ் சிவப்பு", actualPrice: "825", offerPrice: "165", stock: 100 },
      { title: "Photo Flash Silver / போட்டோ ஃபிளாஷ் வெள்ளி", actualPrice: "300", offerPrice: "60", stock: 100 },
      { title: "Siren Mega (2 Pcs) / சைரன் மெகா (2 பீஸ்)", actualPrice: "1330", offerPrice: "266", stock: 100 },
      { title: "Smoke / புகை", actualPrice: "1155", offerPrice: "231", stock: 100 },
      { title: "Money In The Bank / மணி இன் தி பேங்க்", actualPrice: "1150", offerPrice: "230", stock: 100 },
      { title: "4\" Emoji / 4\" ஈமோஜி", actualPrice: "1075", offerPrice: "215", stock: 100 },
      { title: "Live Show / லைவ் ஷோ", actualPrice: "1075", offerPrice: "215", stock: 100 },
      { title: "Tin / டின்", actualPrice: "900", offerPrice: "180", stock: 100 },
    ],
  },
  {
    category: "Fountain",
    icon: <Droplets />,
    items: [
      { title: "Four Square / ஃபோர் ஸ்கொயர்", actualPrice: "2020", offerPrice: "404", stock: 100 },
      { title: "20x20 King Of Hitler / 20x20 கிங் ஆஃப் ஹிட்லர்", actualPrice: "750", offerPrice: "150", stock: 100 },
    ],
  },
  {
    category: "Shot",
    icon: <Crosshair />,
    items: [
      { title: "7 Shot / 7 ஷாட்", actualPrice: "600", offerPrice: "120", stock: 100 },
      { title: "15 Shot / 15 ஷாட்", actualPrice: "1625", offerPrice: "325", stock: 100 },
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
      { title: "Matches - Laptop / தீப்பெட்டி - லேப்டாப்", actualPrice: "1300", offerPrice: "260", stock: 100 },
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
