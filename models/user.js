const mongoose = require("mongoose");
const DB =
  "mongodb+srv://sagardussa8004:Sagar&1996@clustermean.v8q0fqu.mongodb.net/meanDatabase?retryWrites=true&w=majority";
// mongoose.connect(DB,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,});
mongoose.connect(DB);

mongoose.connection.on("error", (err) => {
  console.log("connection failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("connected with database....");
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // email: {type: String},
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match:
      /[a-z0-9!#$%&amp;'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
