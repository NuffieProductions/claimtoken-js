// test requirements
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

// what we are testing
var ClaimToken = require('./../lib/claim-token');

describe('ClaimToken', function() {

  var subject = new ClaimToken();

  subject.configure(function(config) {
    config.sharedEncryptionKey = "uFeb25D_z0BAGhgH7WKy8QBSat6kxfDa6PrKw1ox69U=";
    config.digestSecret = "d22b90c9172649eaf49cd185f73bd4a53ec3ff4dc6f7d51f9dbaac62421e6dd297b38efcd431a7f2";
  });

  var tokenData = function() {
    return {
      type: "EncryptedMessage",
      cipher: "aes-256-cbc",
      data: "P/2kgNhGBCu2WaF5lM3foW+tGdaJ3O/5tYSmhqg7rtI=",
      iv: "CksPXjFY5oon22a4k2mjnQ==",
      signature: "fa366a0a3ca6f4dfad954ff5b77eafc083f98c02"
    }
  }
  var decryptedData = function() {
    return {
      foo: "bar",
      expires: "NOW"
    }
  }

  it('decrypt() should return decrypted successfully', function() {
    expect(subject.decrypt(tokenData())).to.eql(decryptedData());
  });

  it('encrypt() should return encrypted successfully', function() {
    sinon
      // Replace the random IV with a known IV
      .stub(subject.encryptor, "generateRandomIV")
      .returns(new Buffer("\nK\x0F^1X\xE6\x8A'\xDBf\xB8\x93i\xA3\x9D", "binary"));
    expect(subject.encrypt(decryptedData())).to.eql(tokenData());
  });

  it('decrypt() should throw on invalid signature', function() {
    var invalidSigTokenData = tokenData();
    invalidSigTokenData["signature"] = "12345";

    expect(
      function() {
        subject.decrypt(invalidSigTokenData)
      }
    ).to.throw('IncorrectSignature');
  });
});
