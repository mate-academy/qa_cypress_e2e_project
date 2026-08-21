FROM httpd:2.4

RUN apt update -y \
  && apt install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

COPY .docker/config/apache.conf /usr/local/apache2/conf/demoapache.conf
RUN echo "\nInclude /usr/local/apache2/conf/demoapache.conf" >> /usr/local/apache2/conf/httpd.conf
