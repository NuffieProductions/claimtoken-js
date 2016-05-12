var crypto = require('crypto');

function Decryptor(config) {
  this.config = config;
}

Decryptor.prototype.decrypt = function(claimToken) {
  var decipher = crypto.createDecipheriv(
    claimToken["cipher"],
    this.config.sharedEncryptionKey.substr(0, 32),
    new Buffer(claimToken["iv"], "base64")
  );

  var data = claimToken["data"]
  var dec = decipher.update(data, "base64", "utf8");
  dec += decipher.final('utf8');
  return JSON.parse(dec)
}

module.exports = Decryptor;
