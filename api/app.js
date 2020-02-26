const express = require('express');
const app = express();
const listsRouter = require('./routes/lists'); 
const usersRouter = require('./routes/users');
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods" , "GET,POST,OPTIONS,DELETE,PUT,PATCH");
  next();
});
app.use('/users', usersRouter);
app.use('/lists', listsRouter);


app.get('/', (req, res) => {
    res.send('Hello world');
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening at ${port}`));