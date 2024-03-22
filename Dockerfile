# BUILD FOR LOCAL DEVELOPMENT
FROM node:20-alpine as development
WORKDIR /usr/src/app
# USER node

# BUILD FOR PRODUCTION
FROM development As build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
ENV NODE_ENV production
RUN npm run build
# USER node

EXPOSE 3000
# Start the server using the production build
CMD [ "npm", "run", "start" ]
