var MCrypt = require('mcrypt').MCrypt;


function Crypter(enc,key,iv){
    this.key = key;
	this.iv = iv;
	this.encryption = new MCrypt(enc, 'cfb');
};

Crypter.prototype.encode = function(msg){
	this.encryption.open(key);
	return this.encryption.encrypt(msg);
};