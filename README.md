To DO:
1. ~~Add Webpack 4~~
2. ~~Configure nodemon (to watch only sever files?)~~
3. ~~Separate dev and prod modes~~
4. ~~Add 'proxy' to webpack config to run on top of express~~
5. ~~Add hot reload~~
5. ~~Add requests to API~~
6. ~~Add authentication~~
7. ~~Add registration~~
8. ~~Add logout~~
9. ~~Handle access to api's /blogs~~
10. ~~Handle routing properly~~
11. ~~Add tests configuration~~
12. ~~How to handle sessions? [same question on reddit](https://www.reddit.com/r/node/comments/6cb1u3/authentication_with_express_react/) and [Handling sessions in React with Express.js backend API](https://stackoverflow.com/questions/47956972/handling-sessions-in-react-with-express-js-backend-api) + [fetch API with Cookie](https://stackoverflow.com/questions/34558264/fetch-api-with-cookie)~~
13. ~~Handle SSR routing~~
14. ~~Handle SSR requests to API (difficulties with ImmutableJS and SSR, see [issue on github](https://github.com/reactjs/react-router-redux/issues/441))~~
15. ~~Proxify requests to api on production or should we use cors ?~~
16. ~~Add more tests (at least 1 snapshot and 1 reducer)~~
17. Add styles
18. Deliver files for dev/prod

---

### NB!
1. This repo sends api requests to server from previous node.js
homework ([branch-for-react-ht2](https://github.com/karalkou/node_js_frontcamp/tree/branch-for-react-ht2))
2. Usage of React-Router-Redux has been stopped cause of the problems during SSR (https://github.com/ReactTraining/react-router/issues/4892)
3. We use only localhost:8080 and localhost:8000 because api server allows requests only from this sources.
