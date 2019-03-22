FROM node:10.0-alpine

RUN apk update \
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        wget \
        git \
	python \
    && apk add \
        bash

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install 

COPY . /usr/src/app

RUN npm run build

EXPOSE 4166

CMD ["npm", "start"]
