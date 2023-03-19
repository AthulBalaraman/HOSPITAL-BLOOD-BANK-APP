const express = require('express')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const PORT = 5000
const hospitalRouter = require('./routes/hospitalRoutes')
const receiverRouter = require('./routes/receiverRoutes')
const publicRouter = require('./routes/publicRoutes')
const db = require('./config/db')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cookieParser())
app.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge:60000 },
  resave: false 
}));
app.use(function (req, res, next) {
  res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

db(()=>{
  try {
      console.log("DataBase Successfully Connected");        
  } catch (error) {
      console.log("Database Not Connected : ", error);        
  }
});

app.use('/',publicRouter)
app.use('/hospital',hospitalRouter)
app.use('/receiver',receiverRouter)



app.listen(PORT, ()=>{
  console.log(`Server running at port ${PORT}`)
})