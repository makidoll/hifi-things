FROM alpine

WORKDIR /root

ADD . /root/.

RUN \
apk add nodejs npm yarn ffmpeg && \
cd /root/video-sync && yarn && \
cd .. && yarn

ENTRYPOINT yarn start