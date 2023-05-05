const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8800',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

const teachersRouter = require('./routes/teachers');
const coursesRouter = require('./routes/courses');
const studentRouter = require('./routes/students');
const courseratingRouter = require('./routes/courseratings');

app.use(express.json());

app.use('/teachers', teachersRouter);
app.use('/courses', coursesRouter);
app.use('/students', studentRouter);
app.use('/courserating', courseratingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});