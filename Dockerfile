# FROM openjdk
# FROM timbru31/java-node
FROM gradle:7-jdk17

WORKDIR /balendar/

COPY ./ ./

# WORKDIR /balendar/website/
# RUN yarn install
# RUN yarn build

#  && ls && cp ./dist/ /balendar/server/app/src/main/resources/

# WORKDIR /balendar/server/

EXPOSE 8080

# RUN cd ./server 
# && gradle bootRun
WORKDIR /balendar/server/
CMD ["gradle", "bootRun"]