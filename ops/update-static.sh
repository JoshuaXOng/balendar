cd ./website/
yarn build

mkdir ../server/app/src/main/resources/static/ || (rm -r ../server/app/src/main/resources/static/ && mkdir ../server/app/src/main/resources/static/)
mv ./dist/** ../server/app/src/main/resources/static/