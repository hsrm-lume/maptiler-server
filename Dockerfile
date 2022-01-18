FROM node:14 as font-builder

RUN mkdir -p /output
RUN git clone --single-branch --branch master https://github.com/mapbox/node-fontnik.git
WORKDIR node-fontnik
RUN npm ci
COPY font-builder .
RUN set -ex \
    && node process.js input


FROM maptiler/tileserver-gl

COPY --from=font-builder /output /data/fonts
COPY styles /data/styles
COPY maptiler-config.json /data/config.json
