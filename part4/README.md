```
bloglist/
├── controllers/                # Contains route controllers
│   ├── blogs.js
│   ├── users.js
│   └── login.js
├── dist/                       # Contains compiled frontend code
│   └── ...
├── models/                     # Defines data models and database schemas
│   ├── blog.js
│   └── user.js
├── utils/                      # Utility/helper functions and middleware
│   ├── config.js
│   ├── logger.js
│   ├── middleware.js
│   └── list_helper.js
├── tests/                      # Test files
│   ├── list_helper.test.js
│   ├── blog_api.test.js
│   └── test_helper.js
├── app.js                      # Main Express application setup
├── index.js                    # Entry point - starts the server and connects to DB
├── package-lock.json
├── package.json
```