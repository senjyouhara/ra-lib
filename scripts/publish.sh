acp

npm run build
npm run publish --yes

sleep 5s

cd ./packages/admin || exit

yarn add @ra-lib/ajax @ra-lib/babel-plugin-attribute-wrapper @ra-lib/components @ra-lib/config-loader @ra-lib/hoc @ra-lib/hooks @ra-lib/model @ra-lib/util

cd - || exit

acp

npm run publish --yes
