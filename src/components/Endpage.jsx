import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Props:
 * visible: boolean
 * lang: "zh" | "en"
 * titleImage?: string
 * contentImage?: string
 * onRestart?: () => void
 * onAutoStep?: (stepIndex:number) => void
 */

const EndPage = ({
    visible,
    lang = "zh",
    titleImage,
    contentImage,
    onRestart,
    onAutoStep,
}) => {
    const scrollRef = useRef(null);
    const [canScroll, setCanScroll] = useState(false);

    useEffect(() => {
        if (!visible) return;

        setCanScroll(false);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }

        // 模擬自動敘事流程（由外部決定要不要接）
        const steps = [0, 1, 2, 3, 4, 5, 6];
        steps.forEach((step, i) => {
            setTimeout(() => {
                onAutoStep?.(step);
            }, i * 4500);
        });

        setTimeout(() => {
            autoScroll();
        }, 800);
    }, [visible]);

    const autoScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        const distance = el.scrollHeight - el.clientHeight;
        const duration = window.innerWidth < 768 ? 28000 : 40000;

        let startTime = null;

        const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            el.scrollTop = distance * progress;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCanScroll(true);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <>
            {!canScroll && visible && (
                <div className="fixed inset-0 z-50 pointer-events-auto" />
            )}

            <AnimatePresence>
                {visible && (
                    <motion.div
                        className={`fixed inset-0 z-40 ${canScroll ? "pointer-events-auto" : "pointer-events-none"
                            }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-full h-full bg-black/60">
                            <div
                                ref={scrollRef}
                                className="w-full h-full overflow-y-scroll hideScroll flex flex-col items-center"
                            >
                                {!canScroll && (
                                    <div className="w-full min-h-[100vh]" />
                                )}

                                <div className="w-[36%] md:w-[80%] mt-[4%]">
                                    {titleImage && (
                                        <img
                                            src={titleImage}
                                            alt="title"
                                            className="w-[28%] mx-auto mb-[12%]"
                                        />
                                    )}

                                    {contentImage && (
                                        <img
                                            src={contentImage}
                                            alt="content"
                                            className="w-full"
                                        />
                                    )}
                                </div>

                                <div className="w-full min-h-[30vh] flex justify-center items-center">
                                    <button
                                        className="relative group px-8 py-4 border border-white text-white text-lg"
                                        onClick={onRestart}
                                    >
                                        {lang === "zh" ? "重新開始" : "Restart"}
                                        <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EndPage;
