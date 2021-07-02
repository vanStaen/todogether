require("dotenv/config");
const path = require("path");
const PORT = process.env.PORT || 5012;
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const db = require("./models");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");


// Init Express
const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross origin request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message)
      const message = error.message || "Something went wrong with GraphQL!";
      const code = error.statusCode || 500;
      return { message: message, status: code };
    }
  })
);

// Start DB
db.sequelize.sync();

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Create all Table for the models
// await sequelize.sync({force: true})
 
