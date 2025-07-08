import { Sparkles } from "lucide-react";

const MarqueeItem = () => (
    <div className="mx-8 flex-shrink-0 flex items-center text-sm md:text-base">
        <span>80% Discount Offer</span>
        <Sparkles className="w-5 h-5 mx-3 text-yellow-300" />
        <span>Minimum Order For Tamilnadu Rs.2,500/-</span>
        <Sparkles className="w-5 h-5 mx-3 text-yellow-300" />
        <span>other States Rs.6,000</span>
    </div>
);


const Marquee = () => {
    const items = Array(5).fill(null);
    return (
        <div className="bg-gradient-to-r from-primary via-red-500 to-yellow-500 text-primary-foreground py-2 font-headline relative flex overflow-x-hidden">
            <div className="py-1 animate-marquee whitespace-nowrap flex items-center">
                {items.map((_, i) => <MarqueeItem key={`p1-${i}`} />)}
            </div>
            <div className="absolute top-0 py-1 animate-marquee2 whitespace-nowrap flex items-center">
                {items.map((_, i) => <MarqueeItem key={`p2-${i}`} />)}
            </div>
        </div>
    );
};

export default Marquee;
