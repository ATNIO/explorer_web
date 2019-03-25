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
# RUN apk update && apk upgrade \
# && apk add --no-cache bash git openssh
# RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install
COPY . /usr/src/app
RUN npm run build

EXPOSE 4067

CMD ["npm", "start"]
