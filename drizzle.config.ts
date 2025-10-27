import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'postgresql',
    schema: './server/db/schema/*',
    out: './server/db/drizzle',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        ssl: false
    },
})
