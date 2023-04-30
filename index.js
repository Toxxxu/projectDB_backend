const express = require('express');

const app = express();

const teachersRouter = require('./routes/teachers');
const coursesRouter = require('./routes/courses');

app.use(express.json());

app.use('/teachers', teachersRouter);
app.use('/courses', coursesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});