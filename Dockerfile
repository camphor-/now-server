FROM node:11.15.0-slim

COPY . /app/
WORKDIR /app

RUN yarn install --production

ENV NODE_ENV production

EXPOSE 3000
CMD ["npm", "start"]
