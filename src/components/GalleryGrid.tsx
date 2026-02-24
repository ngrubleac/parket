import * as React from 'react';
import GalleryModal from './GalleryModal';
import { ui } from '../i18n/ui';

interface GalleryItem {
    id: string;
    title: string;
    description?: string;
    beforeImage: string;
    afterImage: string;
}

interface Props {
    items: GalleryItem[];
    lang: 'ru' | 'ro';
}

const GalleryGrid: React.FC<Props> = ({ items, lang }) => {
    const t = (key: string) => (ui[lang] as any)[key] || (ui['ru'] as any)[key];
    const [selectedItem, setSelectedItem] = React.useState<GalleryItem | null>(null);

    if (!items || items.length === 0) {
        return (
            <div className="text-center py-20 bg-walnut/20 rounded-[2rem] border-2 border-dashed border-cognac/30">
                <p className="text-stone-400 text-lg italic">{t('gallery.empty')}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-stone-100 flex flex-col"
                    onClick={() => setSelectedItem(item)}
                >
                    <div className="grid grid-cols-2 gap-0.5 aspect-[4/3] overflow-hidden relative">
                        {/* Before */}
                        <div className="relative overflow-hidden h-full">
                            <img
                                src={item.beforeImage}
                                alt={t('gallery.before')}
                                loading={index === 0 ? 'eager' : 'lazy'}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                decoding="async"
                            />
                            <div className="absolute top-3 left-3 bg-espresso/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                {t('gallery.before')}
                            </div>
                        </div>
                        {/* After */}
                        <div className="relative overflow-hidden h-full">
                            <img
                                src={item.afterImage}
                                alt={t('gallery.after')}
                                loading="lazy"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                decoding="async"
                            />
                            <div className="absolute top-3 right-3 bg-cognac text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                {t('gallery.after')}
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                            <h3 className="text-white font-serif font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                </div>
            ))}

            {selectedItem && (
                <GalleryModal
                    item={selectedItem}
                    lang={lang}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
};

export default GalleryGrid;
