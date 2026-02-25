FROM --platform=linux/amd64 node:14-bullseye

RUN apt-get update \
  && apt-get install -y --no-install-recommends bash curl unzip python3 make g++ ca-certificates \
  && ln -sf /usr/bin/python3 /usr/bin/python \
  && npm i -g npm@6.14.6 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh -s v1.5.1


ENV DENO_INSTALL="/usr/local"
ENV PATH="$DENO_INSTALL/bin:$PATH"


