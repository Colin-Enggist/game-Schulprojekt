const cors = require('cors');
const express = require('express');
const app = express();

const port = 3000;




app.use(express.static('src'), cors());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});