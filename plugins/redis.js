import Vue from "vue";
import { createClient } from "redis";

const redis = async (context) => {
    if(process.server){
        let client = createClient({
			url: process.env.redisURL
		});
		client.on("ready", () => {
			console.log("Connected to redis");
		});
		client.on("error", err => console.log("Redis Client Error", err));

		await client.connect();
		context.$redis = client;
    }
}

export default redis;

