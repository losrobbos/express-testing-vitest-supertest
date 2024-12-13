import express from 'express';

export const app = express();

// error create function
const createError = (error, status) => ({ error, status })

// MIDDLEWARE for BODY PARSING
app.use(express.json()) // parse incoming body and store RESULT data in req.body

// Home route => oft HTML => Beschreibung der API
app.get('/', (req, res) => {
  res.send('Hello from jörgPI');
});

// 99% der Routes liefern JSON zurück
app.get("/movies", (req, res) => {
  res.json([
    { _id: "m1", title: "Seeeeeeeeeeed", rating: 1.3 },
    { _id: "m2", title: "Irgendeine Soap", rating: 5.3 },
    { _id: "m3", title: "Irgendein Thriller", rating: 7.2 },
    { _id: "m4", title: "Die Raketenwürmer", rating: 4.2 },
  ])
})

app.post("/movies", (req, res, next) => {

  // validation
  if(!req.body.title) {
    return next(createError("Fuck off und so weiter", 400));
  }

  // grab data from database and return
  res.json({ ...req.body, _id: Date.now().toString() })
})


// CENTRAL error handler
app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: err.error || "Something went wrong"
  })
})


const PORT = 3000
app.listen(PORT, () => {
  console.log("Started API on http://localhost:" + PORT)
})