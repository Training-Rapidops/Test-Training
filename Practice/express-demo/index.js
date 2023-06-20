const express = require("express");
const app = express();
// Joi method class
const Joi = require("joi");

// Adding a middlware to read request body in JSON formet And Other Builtin middleware
app.use(express.json());
// app.use(express.urlencoded({extend:true}));
// app.use(express.static("<Folder_Name>"));

// // Third Party Middleware
// const helmet = require('helmet');//First install helmet
// const morgan = require('morgan');//install morgan first

// app.use(helmet());//helps secure your app by setting various header
// app.m=use(morgan("tiny"));//logs http request in terminal

//Environment variables (set it via cmd using export PORT = 5000)
const port = process.env.PORT || 3000;

const courses = [
  { id: 1, name: "Javascript" },
  { id: 2, name: "Node Js" },
  { id: 3, name: "HTML/CSS" },
];

// Get requests
app.get("/", (req, res) => {
  // look AT expressjs.com for more methods of express
  console.log(arguments);
  res.send("Hello world application\n ");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
  // res.send([8,2,4,5,7,3,9,1,2,6].sort().reverse().map(String).join(" "));
});
app.get("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Requested Course Not Found");
  res.send(course);
});
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params); //goto "api/courses/2023/3"
  res.send(req.query); //goto "api/courses/2023/3?sortBy=name"
});

// Post Requests
app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name Must Contain atleast 3  charcters");
  }
  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(courses);
});

// // Post using Joi
// app.post('/api/courses', (req, res) => {

//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     const result = Joi.validate(req.body, schema);

//     if (result.error) {
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }
//     let course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(courses);
// });

// Put requests
app.put("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Requested Course Not Found");
  }

  if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name Must Contain atleast 3  charcters");
  }
  course.name = req.body.name;
  res.send(courses);
});

// Delete Requests
app.delete("/api/courses/:id", (req, res) => {
  let course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("Requested Course Not Found");
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

app.listen(port, () => {
  console.log("Listening on port" + port);
});
