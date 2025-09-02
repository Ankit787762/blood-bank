import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// ✅ Load environment variables
dotenv.config({ path: "./.env" });

// ✅ Start application only after DB connection
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`✅ Blood Bank Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed !!!");
    console.error("Error details:", err);
    process.exit(1); // server band ho jaye if db not connected
  });
