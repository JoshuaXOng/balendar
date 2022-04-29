FROM gradle:7-jdk17

EXPOSE 8080

WORKDIR /balendar/
COPY ./ ./

WORKDIR /balendar/server/
CMD ["gradle", "bootRun"]