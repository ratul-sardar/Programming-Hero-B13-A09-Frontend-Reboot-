import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
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

	plugins: [jwt()],
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 7 * 24 * 60 * 60,
			strategy: "jwt", // or "jwt" or "jwe"
		},
	},

	baseURL: process.env.BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
});
