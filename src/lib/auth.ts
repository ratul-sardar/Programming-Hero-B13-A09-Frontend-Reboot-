import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) throw new Error("MONGODB_URI is not defined");

const client = new MongoClient(mongodbUri);
const db = client.db("drive-fleet");

export const auth = betterAuth({
	database: mongodbAdapter(db, {
		// Optional: if you don't provide a client, database transactions won't be enabled.
		client,
	}),

	emailAndPassword: {
		enabled: true,
	},
});
