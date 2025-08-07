
import * as React from 'react';
import { Rocket, Sparkles, Star, Zap, Pencil, Gift, CloudDrizzle, ToyBrick, Droplets, Crosshair, Flame } from "lucide-react";

export const PACKAGING_COST = 200;

export const getProducts = () => [
    {
        category: "One Sound Crackers / ஒற்றை வெடிபொருட்கள்",
        icon: <Flame />,
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
        category: "Chakkar / சக்கரம்",
        icon: <Crosshair />,
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
        category: "Flower Pots / பூச்சட்டி",
        icon: <Sparkles />,
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
        category: "Bomb / பாம்",
        icon: <Flame />,
        items: [
            { title: "Bullet Bomb / புல்லட் பாம்", actualPrice: "160", offerPrice: "32", stock: 100 },
            { title: "Atom Bomb / ஆட்டம் பாம்", actualPrice: "300", offerPrice: "60", stock: 100 },
            { title: "Hydro Bomb / ஹைட்ரோ பாம்", actualPrice: "400", offerPrice: "80", stock: 100 },
            { title: "King Bomb / கிங் பாம்", actualPrice: "490", offerPrice: "98", stock: 100 },
            { title: "Classic Bomb / கிளாசிக் பாம்", actualPrice: "700", offerPrice: "140", stock: 100 },
            { title: "Paper Bomb 1/4 kg Small / பேப்பர் பாம் 1/4 kg சிறியது", actualPrice: "230", offerPrice: "46", stock: 100 },
            { title: "Paper Bomb 1/2 kg (Big) / பேப்பர் பாம் 1/2 kg பெரியது", actualPrice: "460", offerPrice: "92", stock: 100 },
            { title: "Paper Bomb 1Kg (Big) / பேப்பர் பாம் 1 kg பெரியது", actualPrice: "920", offerPrice: "184", stock: 100 },
            { title: "Digital Bomb / டிஜிட்டல் பாம்", actualPrice: "1150", offerPrice: "230", stock: 100 },
            { title: "Avathar Bomb (10Pcs) / அவதார் (10 pcs)", actualPrice: "1500", offerPrice: "300", stock: 100 },
        ]
    },
    {
        category: "Pencil / பென்சில்",
        icon: <Pencil />,
        items: [
            { title: "Ultra pencil / அல்ட்ரா பென்சில்", actualPrice: "460", offerPrice: "92", stock: 100 },
            { title: "Selfi Stick (Enjoy) / செல்ஃபி ஸ்டிக் (enjoy)", actualPrice: "260", offerPrice: "52", stock: 100 },
        ]
    },
    {
        category: "Twinkling Star / சாட்டை",
        icon: <Star />,
        items: [
            { title: "1 1/2\" Twinkling Star / 1 1/2\" சாட்டை", actualPrice: "175", offerPrice: "35", stock: 100 },
            { title: "4\" Twinkling Star / 4\" சாட்டை", actualPrice: "375", offerPrice: "75", stock: 100 },
        ]
    },
    {
        category: "Rocket / ராக்கெட்",
        icon: <Rocket />,
        items: [
            { title: "Baby Rocket / பேபி ராக்கெட்", actualPrice: "250", offerPrice: "50", stock: 100 },
            { title: "Rocket Bomb / ராக்கெட் பாம்", actualPrice: "350", offerPrice: "70", stock: 100 },
            { title: "2 Sound Rocket / 2 சவுண்டு ராக்கெட்", actualPrice: "900", offerPrice: "180", stock: 100 },
            { title: "Lunick Rocket / லூனிக் ராக்கெட்", actualPrice: "700", offerPrice: "140", stock: 100 },
        ]
    },
    {
        category: "Fancy / பேன்சி",
        icon: <Gift />,
        items: [
            { title: "Tri Colour / ட்ரை கலர்", actualPrice: "1600", offerPrice: "320", stock: 100 },
            { title: "Peacock Small / பீக்காக் சிறியது", actualPrice: "750", offerPrice: "150", stock: 100 },
            { title: "Peacock Bada / பீக்காக் படா", actualPrice: "2200", offerPrice: "440", stock: 100 },
            { title: "Peacock Feather / பீக்காக் பெதர்", actualPrice: "525", offerPrice: "105", stock: 100 },
        ]
    },
    {
        category: "Shower / ஷவர்",
        icon: <CloudDrizzle />,
        items: [
            { title: "Cocktail / காக்டெய்ல்", actualPrice: "785", offerPrice: "157", stock: 100 },
            { title: "Ashrafi Shower (5pcs) / அஸ்ரபி ஷவர்", actualPrice: "960", offerPrice: "192", stock: 100 },
            { title: "Coco Loco / கோகோ லாகோ", actualPrice: "800", offerPrice: "160", stock: 100 },
            { title: "Oreo / ஓரியோ", actualPrice: "785", offerPrice: "157", stock: 100 },
            { title: "3\" Shower (5 IN 1) / 3\" ஷவர் (5 in 1)", actualPrice: "600", offerPrice: "120", stock: 100 },
            { title: "Fly BEE (Spl Fountain) / ஃப்ளை பீ (SPL fountain)", actualPrice: "1110", offerPrice: "222", stock: 100 },
            { title: "Super Hero / சூப்பர் ஹீரோ", actualPrice: "1110", offerPrice: "222", stock: 100 },
            { title: "Mad angle / மேட் ஆங்கிள்", actualPrice: "1350", offerPrice: "270", stock: 100 },
            { title: "Popcorn / பாப்கார்ன்", actualPrice: "1520", offerPrice: "304", stock: 100 },
            { title: "What's App Mimes / வாட்சப் மைன்ஸ்", actualPrice: "1400", offerPrice: "280", stock: 100 },
        ]
    }
];
