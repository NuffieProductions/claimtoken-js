var crypto = require('crypto');

function Encryptor(config, signer) {
  this.config = config;
  this.signer = signer;
}

Encryptor.prototype.generateRandomIV = function() {
  return crypto.randomBytes(16);
}

Encryptor.prototype.encrypt = function(data) {
  var iv = this.generateRandomIV();
  var cipher = crypto.createCipheriv(
    this.config.cipherType,
    this.config.sharedEncryptionKey.substr(0, 32),
    iv
  )

  var enciphered = cipher.update(JSON.stringify(data), "utf-8", "binary");
  enciphered += cipher.final('binary');
  enciphered = new Buffer(enciphered, 'binary');
  var encodedEncryptedData = enciphered.toString("base64");

  var signature = this.signer.sign(encodedEncryptedData);

  return {
    type: "EncryptedMessage",
    cipher: this.config.cipherType,
    data: encodedEncryptedData,
    iv: iv.toString("base64"),
    signature: signature
  }
}

module.exports = Encryptor;
