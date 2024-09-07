var express = require('express');

const router= express.Router();

var options = {
username: process.env.HIVE_USERNAME,
password: process.env.HIVE_PASSWORD,
rejectUnauthorized: true
}
const url = `tls://${process.env.HIVE_CLUSTER_URL}:8883`;
const client = mqtt.connect(url, options);

client.on('connect', () => {
    console.log('MQTT connection established');
    client.subscribe('#', (err)=> {
        if (err){
            console.error("Error subscribing to topic:", err);
        } else {
            console.log("Subscribed")      
        }
    })
});
client.on('disconnect', () => {
    console.log('Disconnected from MQTT server');
});

client.on('error', (err) => {
console.error('MQTT connection error:', err);
});

const mqttRoute = router;
module.exports = mqttRoute;