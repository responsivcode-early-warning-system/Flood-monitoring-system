const mqtt = require('mqtt');

var options = {
username: process.env.HIVE_USERNAME,
password: process.env.HIVE_PASSWORD,
rejectUnauthorized: true
}
const url = `tls://${process.env.HIVE_CLUSTER_URL}:8883`;
const client = mqtt.connect(url, options);

function init() {
    client.on('connect', () => {
      console.log('MQTT connection established');
      client.subscribe('#', (err) => {
        if (err) {
          console.error('Error subscribing to topic:', err);
        } else {
          console.log('Subscribed');
        }
      });
    });
}

client.on('message',(topic, message) => {
    console.log(`Received message on topic:${topic}: message: ${message}`);
    });
    
client.on('disconnect', () => {
    console.log('Disconnected from MQTT server');
});

client.on('error', (err) => {
console.error('MQTT connection error:', err);
});

module.exports= {init};