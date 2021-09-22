import Vue from "vue";
// import { createClient } from "redis";
const redis = require('redis');

const red = async (context) => {
    if(process.server){
        let client = redis.createClient(process.env.redisURL);
		client.on("ready", () => {
			console.log("Connected to redis");
		});
		client.on("error", err => console.log("[My Plugin] Redis Client Error", err, "url: "+process.env.redisURL, "rawURl: "+process.env.REDIS_URL));

		await client.connect();
		context.$redis = client;
    }
}

export default red;

