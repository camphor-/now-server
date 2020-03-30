FROM node:13.12.0-slim

COPY . /app/
WORKDIR /app

RUN yarn install --production

ENV NODE_ENV production

EXPOSE 3000
CMD ["npm", "start"]
