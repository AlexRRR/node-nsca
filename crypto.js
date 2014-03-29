var MCrypt = require('mcrypt').MCrypt;
var XorEncoder = require('./xor');


function Crypter(enc,key,iv){
    this.key = key;
	this.iv = iv;
	if (enc === 'xor') {
		this.encryption = new XorEncoder();
	}
	else {
	this.encryption = new MCrypt(enc, 'cfb');
	}
};

Crypter.prototype.encode = function(msg){
	this.encryption.validateKeySize(false);
	this.encryption.open(this.key, this.iv);
	return this.encryption.encrypt(msg);
};

module.exports = Crypter;

