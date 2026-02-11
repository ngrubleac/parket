import * as React from 'react';
import { ui } from '../i18n/ui';

interface CalculatorProps {
    lang: 'ru' | 'ro';
}

export default function Calculator({ lang }: CalculatorProps) {
    const t = (key: string) => (ui[lang] as any)[key] || (ui['ru'] as any)[key];

    const [area, setArea] = React.useState(20);
    const [extras, setExtras] = React.useState({
        gapFilling: false,
        skirting: false
    });

    const [showContact, setShowContact] = React.useState(false);
    const [contactForm, setContactForm] = React.useState({ name: '', phone: '' });
    const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    // Logic
    const calculatePrice = () => {
        const RATES = {
            sanding_only: 100,
            sanding_varnish: 150,
            turnkey: 200
        };

        let baseRate = 300;

        let serviceCost = baseRate * area;

        return Math.round(serviceCost);
    };

    const price = calculatePrice();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        console.log('Sending payload:', {
            name: contactForm.name,
            phone: contactForm.phone,
            area,
            price
        });

        try {
            const payload = {
                type: 'calculator_lead',
                data: {
                    name: contactForm.name,
                    phone: contactForm.phone,
                    calculation: {
                        area,
                        extras,
                        total_price: `${price} MDL`
                    }
                }
            };

            const res = await fetch('/api/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            console.log('Response status:', res.status);

            if (res.ok) {
                setStatus('success');
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error('Server error details:', errorData);
                setStatus('error');
            }
        } catch (err) {
            console.error('Network or fetch error:', err);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-stone-100 max-w-2xl mx-auto text-left" id="calculator">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 text-center">{t('calc.title')} <span className="text-cognac">{t('calc.title_accent')}</span></h2>

            {/* Area */}
            <div className="mb-8">
                <label className="block text-sm font-medium text-stone-600 mb-3 uppercase tracking-wider">
                    {t('calc.area')}: <span className="font-bold text-cognac text-xl ml-2">{area}</span>
                </label>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-cognac"
                />
            </div>

            {/* Extras - Informational */}
            <div className="mb-10 space-y-4">
                <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider">{t('calc.extras')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start p-4 rounded-2xl bg-stone-50 border border-stone-100">
                        <div className="mt-1 text-cognac mr-3">💡</div>
                        <p className="mt-1 text-sm font-medium text-stone-700">
                            {t('calc.extra.gap')}
                        </p>
                    </div>
                    <div className="flex items-start p-4 rounded-2xl bg-stone-50 border border-stone-100">
                        <div className="mt-1 text-cognac mr-3">💡</div>
                        <p className="mt-1 text-sm font-medium text-stone-700">
                            {t('calc.extra.skirt')}
                        </p>
                    </div>
                </div>
                <p className="text-xs text-stone-400 italic mt-2 text-center">* {lang === 'ru' ? 'Вышеуказанные работы рассчитываются индивидуально при замере' : 'Lucrările menționate se calculează individual în timpul măsurătorilor'}</p>
            </div>

            {/* Price Display */}
            <div className="bg-stone-50 p-8 rounded-[2rem] mb-8 text-center shadow-inner relative overflow-hidden group border border-stone-100">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
                <div className="relative z-10">
                    <div className="text-xs text-stone-500 mb-2 uppercase tracking-[0.2em] font-bold">{t('calc.total')}</div>
                    <div className="text-5xl font-extrabold text-cognac group-hover:scale-105 transition-transform duration-500">
                        {price} <span className="text-2xl ml-1 font-light opacity-80 text-stone-400">MDL</span>
                    </div>
                </div>
            </div>

            {!showContact ? (
                <button
                    onClick={() => setShowContact(true)}
                    className="w-full bg-cognac text-white py-5 rounded-2xl font-bold hover:brightness-110 transition shadow-xl transform active:scale-[0.98]"
                >
                    {t('calc.save_cta')}
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5 animate-fadeIn">
                    <div>
                        <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider mb-2">{t('calc.name')}</label>
                        <input
                            type="text"
                            required
                            placeholder="Alexandru"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="block w-full border-stone-200 rounded-2xl shadow-sm focus:ring-cognac focus:border-cognac py-4 px-5 bg-stone-50/30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-stone-600 uppercase tracking-wider mb-2">{t('calc.phone')}</label>
                        <input
                            type="tel"
                            required
                            placeholder="+373 6X XX XX XX"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="block w-full border-stone-200 rounded-2xl shadow-sm focus:ring-cognac focus:border-cognac py-4 px-5 bg-stone-50/30"
                        />
                    </div>

                    {status === 'sending' && <p className="text-stone-500 text-center animate-pulse">...</p>}
                    {status === 'error' && <p className="text-red-500 text-center text-sm">{t('calc.error')}</p>}

                    {status === 'success' ? (
                        <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center border border-green-100 font-medium">
                            {t('calc.success')}
                        </div>
                    ) : (
                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="w-full bg-green-600 text-white py-5 rounded-2xl font-bold hover:bg-green-700 transition shadow-xl transform active:scale-[0.98]"
                        >
                            {t('calc.submit')}
                        </button>
                    )}
                </form>
            )}
        </div>
    );
}
