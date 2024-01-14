import { Client, Databases, Account } from "appwrite";

export const DATABASE_ID = '65a2ae44739e894c8efc';
export const COLLECTION_MESSAGES_ID = '65a2ae52e098c7a82459';
export const PROJECT_ID = '65a2909c2560a27a915f';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65a2909c2560a27a915f')

export const account = new Account(client);
export const databases = new Databases(client);


export default client;