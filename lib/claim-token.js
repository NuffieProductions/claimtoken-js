var crypto = require('crypto');
var URLSafeBase64 = require('urlsafe-base64');
var Signer = require('./signer');
var Configuration = require('./configuration');
var Decryptor = require('./decryptor');
var Encryptor = require('./encryptor');

// Class
function ClaimToken() {
  this.config = new Configuration();
  this.signer = new Signer(this.config);
  this.decryptor = new Decryptor(this.config);
  this.encryptor = new Encryptor(this.config, this.signer);
}

// Instance Methods
configure = function(callback) {
  callback.apply(this, [this.config]);
  return true
}

decrypt = function(claimToken) {
  this.signer.checkSignature(claimToken);
  return this.decryptor.decrypt(claimToken);
}

encrypt = function(data) {
  return this.encryptor.encrypt(data);
}

// Interface
ClaimToken.prototype.configure = configure;
ClaimToken.prototype.decrypt = decrypt;
ClaimToken.prototype.encrypt = encrypt;

module.exports = ClaimToken;
