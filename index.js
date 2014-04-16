var net = require('net');
var crc32 = require('buffer-crc32');
var Crypter = require('./crypto');
var HOST = 'localhost';
var PORT = 8667;


function Notifier(host, port, secret) {
    this.host = host;
    this.port = port;
    this.secret = secret;
};


Notifier.prototype.send = function(hostName, serviceDesc, returnCode, pluginOutput, encryption) {

    var PACKET_VERSION = 3;
    var MSG_LENGTH = 720;


    var client = new net.Socket();

    client.connect(this.port, this.host, function() {
        console.log("Connected to :" + HOST + ":" + PORT);
    });

    client.on('data', function(data) {
        console.log('DATA' + data.length);
        var encoding = 'binary'
        var inBuffer = new Buffer(data);
        var iv = inBuffer.toString(encoding,0,128);
        var timestamp = inBuffer.readInt32BE(128);
        
        //header//
        var outBuffer = new Buffer(MSG_LENGTH);
        outBuffer.fill(0);
        outBuffer.writeInt16BE(PACKET_VERSION, 0); //packet version 
        outBuffer.fill("h", 2, 3); //filling
        outBuffer.writeUInt32BE(0, 4); // initial 0 for CRC32 value
        outBuffer.writeUInt32BE(timestamp, 8); //timestamp
        outBuffer.writeInt16BE(returnCode, 12); //returncode
        outBuffer.write(hostName, 14, 77, encoding); // 64
        outBuffer.write(serviceDesc, 78, 206, encoding); //128 
        outBuffer.write(pluginOutput, 206, 720, encoding);
        outBuffer.writeUInt32BE(crc32.unsigned(outBuffer), 4);

        if (encryption) {
            var encrypter = new Crypter(encryption, this.secret, iv);
            outBuffer = encrypter.encode(outBuffer);
        }


        client.write(outBuffer, function(a) {
            client.destroy();
            console.log(client.bytesWritten);
        });


    }.bind(this));

    client.on('close', function() {
        console.log('Connection closed');
    });

}



module.exports = Notifier;
