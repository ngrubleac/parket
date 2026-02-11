import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('Telegram API Error: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env');
        return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    try {
        const body = await request.json();
        console.log('Received Telegram request:', body.type);

        let message = '';

        if (body.type === 'contact_request') {
            message = `📞 *Новая заявка*\n\n👤 Имя: ${body.data.name}\n📱 Телефон: ${body.data.phone}\n📍 Источник: ${body.data.source || 'Не указан'}`;
        } else if (body.type === 'calculator_lead') {
            const c = body.data.calculation;
            const extrasStr = Object.keys(c.extras || {}).filter(k => c.extras[k]).join(', ') || 'Нет';

            message = [
                `🧮 *Расчет на сайте*`,
                ``,
                `👤 *Имя:* ${body.data.name}`,
                `📱 *Телефон:* ${body.data.phone}`,
                ``,
                `📝 *Детали:*`,
                `📐 Площадь: ${c.area} м²`,
                c.condition ? `🔨 Состояние: ${c.condition}` : null,
                c.service ? `🔧 Услуга: ${c.service}` : null,
                `➕ Доп: ${extrasStr}`,
                ``,
                `💰 *Итого: ${c.total_price}*`
            ].filter(Boolean).join('\n');
        }

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const telegramResult = await response.json();

        if (response.ok) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            console.error('Telegram API responded with error:', telegramResult);
            return new Response(JSON.stringify({ error: 'Telegram API error', details: telegramResult }), { status: 500 });
        }

    } catch (error) {
        console.error('Internal server error in Telegram API:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
