import { Client, Databases, Account } from "appwrite";

export const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
export const COLLECTION_MESSAGES_ID = process.env.REACT_APP_COLLECTION_MESSAGES_ID;
export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

const client = new Client()
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
    .setProject(process.env.REACT_APP_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
