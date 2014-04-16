node-nsca
=========

A node module for sending nagios nsca checks

currently supports clear text only and XOR modes only. 
Encryption coming soon!

````javascript
var n = new Notifier(HOST, PORT);
n.send("alex-vm", "demobuffer not working for me", 2, "100% outage");
````
