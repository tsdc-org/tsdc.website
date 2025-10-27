FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack use pnpm@10.19.0

FROM base AS prod
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

FROM base
WORKDIR /app
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/.output /app/.output
CMD ["node", ".output/server/index.mjs"]