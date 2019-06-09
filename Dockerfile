# Frontend Install Stage
FROM node:11-alpine AS frontend-builder

WORKDIR /srv
COPY web .

RUN npm config set unsafe-perm true
RUN npm install -g yarn
RUN yarn && yarn build

# Backend Install Stage
FROM python:3.7.3-alpine3.8

ENV FLASK_APP=core
WORKDIR /srv
COPY core/. core/.
RUN apk add --no-cache gcc musl-dev
RUN pip install -r ./core/requirements.txt

RUN mkdir -p core/static

RUN ls -a .
RUN ls -a core/
COPY --from=frontend-builder /srv/build/static/. core/static/.
COPY --from=frontend-builder /srv/build/*.js /srv/build/index.html /srv/build/manifest.json /srv/build/favicon.ico core/static/

ENTRYPOINT ["waitress-serve", "--call", "core:create_app"]