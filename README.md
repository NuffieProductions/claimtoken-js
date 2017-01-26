# claimtoken-js [![CircleCI](https://circleci.com/gh/NuffieProductions/claimtoken-js.svg?style=svg)](https://circleci.com/gh/NuffieProductions/claimtoken-js)

ClaimToken encrypts and signs tokens to be used in a claim-based authentication system. Will encrypt JSON providing a signature, IV and encrypted message(`{"data": "blah"}`). The returned objects IV and data is base64 encoded.

You can store the encrypted message in a cookie for use when authenticating with your other microservices.

Info about [Claim Based Authentication](https://en.wikipedia.org/wiki/Claims-based_identity)

See our [Ruby library](https://github.com/NuffieProductions/ClaimToken) for implementing in rails, sinatra etc.

## Installation

Add this line to your application's Gemfile:

    npm install claimtoken

## Usage
```js
  ClaimToken = require('claimtoken');
  crypto = require('crypto');

  CT = new ClaimToken();

  // dont commit your keys into source control!
  CT.configure(function(config) {
    config.sharedEncryptionKey = crypto.randomBytes(32); // must be 32 bytes/char in length, change this to your own private key
    config.digestSecret = crypto.randomBytes(81); // change this to your own secret digest
    config.cypherType = "aes-256-cbc"; // optional and default
  });

  encrypted = CT.encrypt({foo: "bar"});
  <!-- // returns
    {
      type: "EncryptedMessage",
      cipher: "aes-256-cbc",
      data: "P/2kgNhGBCu2WaF5lM3foW+tGdaJ3O/5tYSmhqg7rtI=",
      iv: "CksPXjFY5oon22a4k2mjnQ==",
      signature: "fa366a0a3ca6f4dfad954ff5b77eafc083f98c02"
    }
   -->

  CT.decrypt(encrypted);
  <!-- // returns
    Object#{foo: "bar"}
   -->

```

## Tests
`npm test`
`mocha test --recursive --watch --debug`
