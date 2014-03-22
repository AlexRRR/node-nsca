node-nsca
=========

A node module for sending nagios nsca checks

currently supports clear text only. encryption support in development

````javascript
var n = new Notifier(HOST, PORT);
n.send("alex-vm", "demobuffer not working for me", 2, "100% outage");
````
