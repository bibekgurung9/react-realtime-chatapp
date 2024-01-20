import { Client, Databases, Account } from "appwrite";

export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_MESSAGES_ID = import.meta.env.VITE_COLLECTION_MESSAGES_ID;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
