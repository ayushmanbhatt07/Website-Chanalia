"use client"
import * as React from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
    text: string | string[];
    as?: React.ElementType;
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorChar?: string;
    cursorClassName?: string;
    cursorBlinkDuration?: number;
    textColors?: string[];
    startOnVisible?: boolean;
    style?: React.CSSProperties;
}

export default function TypewriterText({
    text,
    as: As = "div",
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = "",
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorChar = "|",
    cursorClassName = "",
    cursorBlinkDuration = 0.5,
    textColors = [],
    startOnVisible = true,
    style,
    ...rest
}: TypewriterTextProps) {
    const textArray = React.useMemo(() => (Array.isArray(text) ? text : [text ?? ""]), [text]);
    
    const [displayedText, setDisplayedText] = React.useState("");
    const [currentCharIndex, setCurrentCharIndex] = React.useState(0);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [currentTextIndex, setCurrentTextIndex] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(!startOnVisible);

    const containerRef = React.useRef<HTMLElement>(null);

    const getCurrentTextColor = React.useCallback(() => {
        if (!textColors || textColors.length === 0) return undefined;
        return textColors[currentTextIndex % textColors.length];
    }, [textColors, currentTextIndex]);

    React.useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;
        const el = containerRef.current;
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setIsVisible(true);
                });
            },
            { threshold: 0.1 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [startOnVisible]);

    React.useEffect(() => {
        if (!isVisible) return;
        let timeout: NodeJS.Timeout;
        const currentText = textArray[currentTextIndex] ?? "";
        
        const run = () => {
            if (isDeleting) {
                if (displayedText.length === 0) {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) return;
                    setCurrentTextIndex((i) => (i + 1) % textArray.length);
                    setCurrentCharIndex(0);
                    timeout = setTimeout(() => {}, pauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev + currentText[currentCharIndex]);
                        setCurrentCharIndex((i) => i + 1);
                    }, typingSpeed);
                } else {
                    if (textArray.length > 1 && (loop || currentTextIndex < textArray.length - 1)) {
                        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
                    }
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
            timeout = setTimeout(run, initialDelay);
        } else {
            run();
        }
        return () => timeout && clearTimeout(timeout);
    }, [
        isVisible,
        textArray,
        currentTextIndex,
        loop,
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        initialDelay,
    ]);

    const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < (textArray[currentTextIndex] ?? "").length || isDeleting);

    return (
        <As ref={containerRef} className={className} style={{ ...style, color: getCurrentTextColor() }} {...rest}>
            <span>{displayedText}</span>
            {showCursor && !shouldHideCursor && (
                <motion.span
                    className={`ml-[2px] inline-block ${cursorClassName}`}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: cursorBlinkDuration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                >
                    {cursorChar}
                </motion.span>
            )}
        </As>
    );
}
