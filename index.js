const express = require("express");
const { connectMongoose } = require("./connection");
const URL = require("./model/url");
const path = require("path");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user")
const cookieParser = require("cookie-parser");
const {restrictTOloggedinUserOnly, checkAuth} = require("./middleware/Auth")
const app = express();
const PORT = 3001;
// const { logReqRes } = require("./middleware/index");


//connection


app.set("view engine", "ejs");
connectMongoose("mongodb://127.0.0.1:27017/todoDB");
app.set("views", path.resolve("./view"))


//middleware-pluggin
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
// app.use(logReqRes("log.txt"));

//route
app.use("/url", restrictTOloggedinUserOnly ,urlRouter);
app.use("/user",userRouter)
app.use("/",checkAuth, staticRouter);



app.get("/url/:shortId",async(req,res)=>{
  {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
  };
})

app.listen(PORT, () => {
  console.log(`server is started at port no ${PORT}`);
});
