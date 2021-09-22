import Vue from "vue";
import { createClient } from "redis";



const red = async (context) => {
    if(process.server){

		let client = createClient();

		client.on("ready", () => {
			console.log("Connected to redis");
		});
		client.on("error", err => console.log("[My Plugin] Redis Client Error", err));

		await client.connect();

		context.$redis = client;

    }
}

export default red;

