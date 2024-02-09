import "dotenv/config";
import app from "./app"
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log('Mongoose connectd');
        app.listen(port, () => {
            console.log("server is running" + port);
        })
    })

// mongoose.connect(process.env.MONGO_CONNECTION_STRING!, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// } as any)
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//     });


const port = process.env.PORT || 5000;



