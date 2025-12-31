const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require("./routes/authRoutes");
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://usermanage.fwitech.com'],
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use("/auth", authRoutes);
app.use("/admin", adminRouter);
app.use("/user",userRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
