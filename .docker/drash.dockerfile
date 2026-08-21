FROM debian:oldstable-20230612-slim

RUN apt update -y \
  && apt clean \
  && apt install -y --no-install-recommends bash curl unzip nodejs npm \
  && npm install -g npm@6.14.6 \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh -s v1.5.1

ENV DENO_INSTALL=/usr/local
ENV PATH="/usr/local/bin:${PATH}"

WORKDIR /var/www/src

# Install and compile during image creation so the container becomes ready
# as soon as the Deno process starts. This removes the npm/webpack startup race.
COPY src/package*.json ./
RUN npm install

COPY src/ ./
RUN npm run webpack-build

CMD ["deno", "run", "--allow-net", "--allow-read", "--unstable", "app.ts"]
