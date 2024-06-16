FROM node:latest
COPY server.js .
EXPOSE 8082
CMD node server.js
