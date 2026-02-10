import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
    const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    try {
        const body = await request.json();
        let message = '';

        if (body.type === 'contact_request') {
            message = `📞 *Новая заявка*\n\n👤 Имя: ${body.data.name}\n📱 Телефон: ${body.data.phone}\n📍 Источник: ${body.data.source}`;
        } else if (body.type === 'calculator_lead') {
            const c = body.data.calculation;
            message = `🧮 *Расчет на сайте*\n\n👤 Имя: ${body.data.name}\n📱 Телефон: ${body.data.phone}\n\n📝 *Детали:*\n📐 Площадь: ${c.area} м²\n🔨 Состояние: ${c.condition}\n🔧 Услуга: ${c.service}\n➕ Доп: ${Object.keys(c.extras).filter(k => c.extras[k]).join(', ')}\n\n💰 *Итого: ${c.total_price}*`;
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

        if (response.ok) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Telegram API error' }), { status: 500 });
        }

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
