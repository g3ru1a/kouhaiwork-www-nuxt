import Vue from "vue";
import { createClient } from "redis";

const red = async (context) => {
    if(process.server){
        const client = createClient(process.env.DATABASE_URL);
		client.on("ready", () => {
			console.log("Connected to redis", client);
		});
		client.on("error", err => console.log("[My Plugin] Redis Client Error", err, "url: "+process.env.DATABASE_URL));

		await client.connect();
		context.$redis = client;
    }
}

export default red;

