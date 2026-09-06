"use client"
import * as React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface TextRevealScrollProps {
    text: string;
    progress: MotionValue<number>;
    range: [number, number]; // [startProgress, endProgress]
    className?: string;
}

export default function TextRevealScroll({
    text,
    progress,
    range,
    className = ""
}: TextRevealScrollProps) {
    
    // We split the text into words
    const words = text.split(/(\s+)/).filter(w => w.length > 0);
    
    return (
        <p className={className}>
            {words.map((word, i) => {
                // For each word, we calculate a specific sub-range within the provided range
                const step = (range[1] - range[0]) / words.length;
                const wordStart = range[0] + step * i;
                const wordEnd = wordStart + step;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(progress, [wordStart, wordEnd], [0.1, 1]);
                
                return (
                    <motion.span key={i} style={{ opacity }}>
                        {word}
                    </motion.span>
                );
            })}
        </p>
    );
}
