import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.DB_URI);
const db = client.db("doc-appointment");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

   emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache:{
      enabled: true,
      strategy: "jwt", // অথবা "database" যদি আপনি সেশন ডাটাবেসে সংরক্ষণ করতে চান
      maxAge:7 * 24 * 60 * 60, // 7 দিন

    }
    
  },
  plugins: [
        jwt(), 
    ],
});



