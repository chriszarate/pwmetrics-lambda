module.exports = {
  chromeFlags: [
  	'--disable-gpu',
  	'--headless',
  	'--no-zygote',
  	'--no-sandbox',
  	'--single-process',
  ],
  chromePath: './node_modules/@serverless-chrome/lambda/dist/headless-chromium',
};
