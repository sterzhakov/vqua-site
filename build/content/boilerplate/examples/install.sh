git clone git@github.com:sterzhakov/vqua.git
cp -R ./vqua/packages/vqua-boilerplate-ssr/ ./vqua-boilerplate-ssr
cd vqua-boilerplate-ssr/
npm i
npm i -g nodemon
nodemon server
