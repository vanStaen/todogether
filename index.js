import path from 'path';
import cors from 'cors';
import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';


import db from './models/index.js';
import graphqlSchema from './graphql/schema.js';
import graphqlResolver from './graphql/resolvers.js';
import isAuth from './middleware/isAuth.js';
import cookieSession from './middleware/cookieSession.js';
import redirectTraffic from './middleware/redirectTraffic.js';

require("dotenv/config");

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const PORT = process.env.PORT || 5012;

// Init Express
const app = express();

// Redirect www trafic to root
app.set("trust proxy", true);
app.use(redirectTraffic);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Cookie Middleware
app.use(cookieSession);

// Authorization Middleware
app.use(isAuth);


// Allow cross origin request
app.use(function (req, res, next) {
  let corsOptions = {};
  if ((req.get('host') === 'localhost:5012')) {
    corsOptions = {
      origin: 'http://localhost:8086',
      optionsSuccessStatus: 200
    }
  } else {
    corsOptions = {
      origin: [
        'https://www.todogether.com',
        'https://todogether.com',
        'http://todogether-cvs.herokuapp.com',
        'https://todogether-cvs.herokuapp.com',
      ],
      credentials: true,
      optionsSuccessStatus: 200
    }
  }
  cors(corsOptions)(req, res, next);
})


// Router to API endpoints
app.use("/auth", require("./api/controller/authController"));
app.use('/user', require('./api/controller/userController'))
app.use('/mail', require('./api/controller/mailController'))


// Start DB & use GraphQL
db.sequelize.sync().then((req) => {
  app.use(
    "/graphql",
    createHandler({
      schema: graphqlSchema,
      rootValue: graphqlResolver,
      graphiql: true,
      customFormatErrorFn(err) {
        if (!err.originalError) {
          return err
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occured with GraphQl';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data }
      }
    })
  );
});

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));