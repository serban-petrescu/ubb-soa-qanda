FROM node:10-alpine

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN npm i -g newman

ADD . /work
WORKDIR /work

RUN mkdir build
RUN node transform.js

CMD /wait && newman run qanda.postman_collection.json --environment build/qanda.postman_environment.json --insecure
