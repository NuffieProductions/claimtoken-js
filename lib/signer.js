var crypto = require('crypto');

function Signer(config) {
  this.config = config;
}

Signer.prototype.sign = function(data) {
  var hmac = crypto.createHmac('sha1', this.config.digestSecret);
  hmac.setEncoding('hex');
  hmac.write(data);
  hmac.end();

  return hmac.read();
}

Signer.prototype.checkSignature = function(token) {
  var signature = token["signature"];
  var realSignature = this.sign(token["data"]);

  if ( signature != realSignature) throw new Error('IncorrectSignature');

  return true
}

module.exports = Signer;
