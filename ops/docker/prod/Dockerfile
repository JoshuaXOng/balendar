FROM node:16.14.0

WORKDIR /balendar/
COPY ./ ./

WORKDIR /balendar/website/
RUN yarn install
RUN yarn build
RUN mv /balendar/website/dist/ /balendar/website/static/

FROM gradle:7-jdk17

EXPOSE 8080

WORKDIR /balendar/
COPY ./ ./

RUN mkdir /balendar/server/app/src/main/resources/static/
COPY --from=0 /balendar/website/static/ /balendar/server/app/src/main/resources/static/

WORKDIR /balendar/server/
CMD ["gradle", "bootRun"]