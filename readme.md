# PWMetrics on AWS Lambda

This package allows you to run [PWMetrics][pwmetrics] on AWS Lambda (Node
6.10.3), using a binary compiled specifically for that platform (from the
[Serverless Chrome][serverless-chrome] project).

## Usage

```sh
npm install --save pwmetrics-lambda
```

This package exports a function that wraps PWMetrics—see that package’s
[documentation][pwmetrics] for details on parameters and options. Like
PWMetrics, it returns a `Promise` for the results of the the test(s).

## Example Lambda function

This function accepts a URL to test and PWMetrics options from the Lambda event
payload.

```js
const lambdaPWMetrics = require('pwmetrics-lambda');

exports.handler = (event, context, callback) => {
	const { options, url } = event;

	lambdaPWMetrics(url, options).then(results => {
		// Do something with results.
		callback(null, results.runs);
	}).catch(callback);
};
```

**Important considerations:**

- Increase the timeout to at least 15 seconds. Adjust as needed.

- Increase the allotted memory to at least 768 MB. Adjust as needed. Resource-
  intensive pages may require considerably more memory.

- Implement a `catch` method that calls the Lambda callback in case of a problem
  with the test.

- The Chrome binary is quite large (~100 MB)—too big to upload directly to
  Lambda. You will need to sideload your function via S3. Most frameworks (e.g.,
  Serverless, Claudia) support this either automatically or via options.

## Testing locally

Because PWMetrics uses [Lighthouse][lighthouse] to launch Chrome, you can run it
locally and Lighthouse should find and use a local copy of Chrome.


[pwmetrics]: https://github.com/paulirish/pwmetrics
[serverless-chrome]: https://github.com/adieuadieu/serverless-chrome
[lighthouse]: https://developers.google.com/web/tools/lighthouse/
