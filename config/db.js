import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the app if DB connection fails
    }
};

// Graceful shutdown: Close Prisma connection when the app stops
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    console.log("Database disconnected");
    process.exit(0);
});
