const app             = require("./app");
const dotenv          = require("dotenv");
const connectDatabase = require("./config/database");

// Handling UnCaught Exception
process.on("uncaughtException", (error)=>{
    console.log(`Error: ${error.message}`);
    console.log(`Shutting Down The Server`);
    process.exit(1);
});

dotenv.config({path:"backend/config/config.env"});

connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is Working On : http://localhost:${process.env.PORT}`);
}); 

// Unhandled Promise Rejection
process.on("unhandledRejection", error=>{
    console.log(`Error: ${error.message}`);
    console.log(`Shutting Down The Server`);
    server.close(()=>{
        process.exit(1);
    });
});