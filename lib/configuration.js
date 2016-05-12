function Configuration() {
  this.DEFAULT_CIPHER_TYPE = "aes-256-cbc";

  this.digestSecret = undefined;
  this.sharedEncryptionKey = undefined;
  this.cipherType = this.DEFAULT_CIPHER_TYPE;
}

module.exports = Configuration;
