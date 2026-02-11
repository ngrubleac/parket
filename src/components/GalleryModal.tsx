import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ui } from '../i18n/ui';

interface GalleryItem {
    id: string;
    title: string;
    beforeImage: string;
    afterImage: string;
}

interface Props {
    item: GalleryItem;
    lang: 'ru' | 'ro';
    onClose: () => void;
}

const GalleryModal: React.FC<Props> = ({ item, lang, onClose }) => {
    const t = (key: string) => (ui[lang] as any)[key] || (ui['ru'] as any)[key];

    // Lock body scroll when modal is open
    React.useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-espresso/95 backdrop-blur-xl overflow-y-auto pt-24 sm:pt-32"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-parchment w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 my-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-cognac text-white p-3 rounded-full transition-colors backdrop-blur-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Before Image */}
                        <div className="relative group">
                            <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover aspect-[4/3]" />
                            <div className="absolute top-6 left-6 bg-espresso/60 backdrop-blur-md text-white px-6 py-2 rounded-2xl font-bold uppercase tracking-widest text-sm border border-white/10">
                                {t('gallery.before')}
                            </div>
                        </div>

                        {/* After Image */}
                        <div className="relative group border-l-4 border-white/5">
                            <img src={item.afterImage} alt="After" className="w-full h-full object-cover aspect-[4/3]" />
                            <div className="absolute top-6 left-6 bg-cognac text-white px-6 py-2 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl">
                                {t('gallery.after')}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-12 text-center bg-white/50 backdrop-blur-md">
                        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-espresso mb-2">
                            {item.title}
                        </h3>
                        <div className="w-20 h-1 bg-cognac mx-auto rounded-full"></div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GalleryModal;
