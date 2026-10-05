FROM node:20-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl unzip \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://github.com/denoland/deno/releases/download/v1.5.1/deno-x86_64-unknown-linux-gnu.zip -o /tmp/deno.zip \
  && unzip /tmp/deno.zip -d /usr/local/bin \
  && chmod +x /usr/local/bin/deno \
  && rm /tmp/deno.zip
ENV NODE_OPTIONS=--openssl-legacy-provider
