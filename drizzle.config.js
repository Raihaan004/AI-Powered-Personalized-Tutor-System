/** @type {import("drizzle-kit").Config} */
export default {
    dialect: 'postgresql', // Ensure the dialect is specified at the top level
    dbCredentials: {
        url: 'postgresql://default_owner:default_password@default_host/default_db?sslmode=require' // Default credentials
    },
    databases: [
        {
            name: "ai-interview-mocker",
            schema: "./utils/schema.js",
            dbCredentials: {
                url: 'postgresql://ai-interview-mocker_owner:npg_cYIrU6G7gnQE@ep-proud-frost-a5xmya28.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require'
            }
        },
        {
            name: "AI-Course-Generator",
            schema: "./configs/schema.jsx",
            dbCredentials: {
                url: 'postgresql://AI-Course-Generator_owner:npg_tFZDP2opi8eK@ep-wispy-field-a5gno2ij.us-east-2.aws.neon.tech/AI-Course-Generator?sslmode=require'
            }
        }
    ]
};
