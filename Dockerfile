FROM node:latest
COPY . /opt/office-queue
WORKDIR /opt/office-queue
RUN cd client; npm install; cd ..
RUN cd server; npm install; cd ..
CMD CI=true npm start --prefix ./client & npm start --prefix ./server
