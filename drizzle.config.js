/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://AI-Course-Generator_owner:npg_tFZDP2opi8eK@ep-wispy-field-a5gno2ij.us-east-2.aws.neon.tech/AI-Course-Generator?sslmode=require',
    }
};