FROM node:12.16.1
WORKDIR /var/app/

ADD package-lock.json /var/app/
ADD package.json /var/app/

RUN npm ci

ADD . /var/app/

RUN npm run build

EXPOSE 4000
EXPOSE 4000/ws
CMD ["npm", "start"]
