import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],  
    vite: { plugins: [ tailwindcss() ], server: { allowedHosts: ['.ngrok-free.app'] } },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'The Software Development Company',
            meta: [
                { property: 'business:contact_data:locality', content: 'Lipetsk' },
                { property: 'business:contact_data:region', content: 'Lipetsk region' },
                { property: 'business:contact_data:postal_code', content: '398005' },
                { property: 'business:contact_data:country_name', content: 'Russian Federation' },
                { name: 'description', content: 'Команда профессионалов, создающих элегантные и эффективные программные решения для бизнеса и не только' },
                { name: 'author', content: 'The Software Development Company' },
                { name: 'copyright', content: `The Software Development Company @ ${new Date().getFullYear()}` },
            ],
            link: [
                { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }
            ]
        },
    },
    icon: {
        mode: 'css',
        cssLayer: 'base'
    },
    modules: ['yandex-metrika-module-nuxt3', '@nuxt/content', '@nuxt/fonts', '@nuxtjs/seo', '@nuxt/icon'],
    content: {
        experimental: { sqliteConnector: 'native' },
        database: {
            type: 'postgres',
            url: process.env.DATABASE_URL!,
        },
        preview: {
            dev: true,
            api: 'https://api.nuxt.studio',
        },
        build: {
            markdown: {
                highlight: {
                    theme: 'github-dark-high-contrast'
                }
            }
        }
    },
    runtimeConfig: {
        mode: process.env.MODE || 'development',
        db_url: process.env.DATABASE_URL,
        tg_token: process.env.TG_TOKEN,
        tg_user: process.env.TG_USER
    },
    yandexMetrika: {
        id: 104858603,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    },
    nitro: {
        experimental: {
            websocket: true
        }
    },
})