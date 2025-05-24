import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("682ffe8400340dc2bd67"); // Replace with your project ID

const databases = new Databases(client);

export { client, databases };
