
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
];
