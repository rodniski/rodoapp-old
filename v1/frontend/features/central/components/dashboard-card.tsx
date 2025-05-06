"use client";
import {useState} from "react";
import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";
import type {Card} from "&/lib";
import {Badge} from "ui";
import {GlowingEffect} from "components/aceternity";
import {CardIcon} from ".";

interface DashboardCardProps {
    card: Card;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

const linkVariants = {hidden: {opacity: 0, x: 10}, visible: {opacity: 1, x: 0}};
const descVariants = {hidden: {opacity: 0, x: -20}, visible: {opacity: 1, x: 0}};

export default function DashboardCard({card, isActive, onMouseEnter, onMouseLeave}: DashboardCardProps) {
    const [activeSubLink, setActiveSubLink] = useState<string | null>(null);
    const hasSubLinks = card.subLinks && card.subLinks.length > 0;

    const handleCardClick = () => {
        if (!hasSubLinks && card.url) {
            window.open(card.url, card.external ? "_blank" : "_self");
        }
    };

    return (
        <div
            className="w-[315px] fhd:w-[400px] flex flex-col items-stretch transition-all duration-300 cursor-pointer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleCardClick}
        >
            <div
                className="relative flex flex-col flex-grow p-2 border border-muted-foreground/40 rounded-xl shadow-lg">
                <GlowingEffect borderWidth={2} spread={40} glow={isActive} disabled={false} proximity={64}
                               inactiveZone={0.01}/>
                <div
                    className="relative flex flex-col flex-grow p-3 fhd:p-5 overflow-hidden border border-muted-foreground/40 bg-card rounded-lg shadow-lg">
                    <div className="flex flex-col items-start justify-start gap-3 w-full">

                        <div className="flex items-center justify-between w-full">
                            <div className={"flex gap-3"}>
                                <CardIcon icon={card.icon}/>
                                <h3 className="mt-2 text-base font-semibold fhd:text-xl">{card.title}</h3>
                            </div>
                            {card.external && (
                                <ExternalLink
                                    className="ml-2 h-3 w-3 sm:h-3.5 md:h-4 sm:w-3.5 md:w-4 text-muted-foreground"/>
                            )}
                        </div>
                        {hasSubLinks && (
                            <motion.div
                                variants={linkVariants}
                                initial="hidden"
                                animate={isActive ? "visible" : "hidden"}
                                transition={{duration: 0.2}}
                                className="flex justify-center gap-1"
                            >
                                {card.subLinks?.map((subLink) => (
                                    <Badge
                                        key={subLink.id}
                                        variant="secondary"
                                        className="flex justify-end fhd:text-base text-end shadow hover:border-muted-foreground"
                                        onMouseEnter={() => setActiveSubLink(subLink.id)}
                                        onMouseLeave={() => setActiveSubLink(null)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(subLink.url, "_self");
                                        }}
                                    >
                                        {subLink.title}
                                    </Badge>
                                ))}
                            </motion.div>
                        )}
                    </div>
                    <motion.div
                        variants={descVariants}
                        initial="hidden"
                        animate={isActive ? "visible" : "hidden"}
                        transition={{duration: 0.2}}
                        className="mt-auto pt-2 sm:pt-3"
                    >
                        <p className="text-xs fhd:text-base text-muted-foreground">
                            {activeSubLink
                                ? card.subLinks?.find((sl) => sl.id === activeSubLink)?.description
                                : card.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}