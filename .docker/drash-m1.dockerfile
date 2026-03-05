FROM --platform=linux/amd64 debian:bullseye-slim

RUN apt update -y \
  && apt install -y bash curl unzip nodejs npm \
  && npm install -g npm@6.14.6 \
  && apt clean

RUN curl -fsSL -o /tmp/deno.zip https://github.com/denoland/deno/releases/download/v1.5.1/deno-x86_64-unknown-linux-gnu.zip \
  && unzip /tmp/deno.zip -d /usr/local/bin/ \
  && chmod +x /usr/local/bin/deno \
  && rm /tmp/deno.zip
