node-nsca
=========

A node module for sending nagios nsca checks

currently supports clear text only and XOR modes only. 
Encryption coming soon!

````javascript
var n = new Notifier(HOST, PORT, SECRET, ENCRYPTION);
n.send("localhost", "centos check",0,"Looks Good!");
````
