FROM node:12-alpine

# Fix problems with not finding the alpine repositories
RUN echo -e "http://nl.alpinelinux.org/alpine/v3.5/main\nhttp://nl.alpinelinux.org/alpine/v3.5/community" > /etc/apk/repositories

# Install ffmpeg
# RUN apk update && apk add ffmpeg && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

#COPY package*.json ./

COPY . .

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    ffmpeg \
    && npm install --force \
    && apk del build-dependencies

# RUN npm install

EXPOSE 8001

CMD [ "node", "src/server.js" ]
