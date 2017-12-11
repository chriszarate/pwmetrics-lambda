const getOptions = require('../src/get-options');
const { chromeFlags, chromePath } = require('../src/lambda-config');

exports.getOptions = test => {
  const testCases = [
    undefined,
    {},
    { flags: {} },
    { flags: { chromeFlags: [] } },
    { flags: { chromeFlags: ['--my-flag'] } },
    { flags: { chromePath: null } },
    { flags: { chromePath: '/bin/true' } },
  ];

  const isMissingFlags = flags => chromeFlags.some(flag => !flags.includes(flag));

  testCases.forEach(testCase => {
    const options = getOptions(testCase);

    test.equal(chromePath, options.flags.chromePath);
    test.equal(false, isMissingFlags(options.flags.chromeFlags));
  });

  test.done();
};
