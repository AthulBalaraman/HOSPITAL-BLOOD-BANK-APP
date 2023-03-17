const express = require('express')
const app = express()
const PORT = 5000
const hospitalRouter = require('./routes/hospitalRoutes')
const receiverRouter = require('./routes/receiverRoutes')
const db = require('./config/db')

app.use(express.json())
db(()=>{
  try {
      console.log("DataBase Successfully Connected");        
  } catch (error) {
      console.log("Database Not Connected : ", error);        
  }
});

app.use('/hospital',hospitalRouter)
app.use('/receiver',receiverRouter)


app.listen(PORT, ()=>{
  console.log(`Server running at port ${PORT}`)
})