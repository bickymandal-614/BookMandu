const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./configs");
const userRoutes = require("./routes/user.routes");
const bookRoutes = require("./routes/book.routes");
const orderRoutes = require("./routes/order.routes");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");

//database connection
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;
const allowedOrigins = [process.env.FRONTEND_URL, process.env.DASHBOARD_URL];

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/order",orderRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
