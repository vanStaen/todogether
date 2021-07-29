# GoldenBot

## Backlog:

- [ ] MobX with AuthStore
- [x] Login Form
- [x] Login Endpoint

- [x] ~SQL "Prepare"-statement to avoid sql injection : https://node-postgres.com/features/queries~ Using Sequelize
- [x] MVC, model, view, controller (+ service) : Separation of concerns


- KILL ALL Local storage/cookie in FRONTEND
- BACKEND set cookie token (expiration like refreshtoken)
- BACKEND set refreshToken
- Keep me sign in : if token expired, then use refreshtoken to get new token
- Not keep me signed in : In FRONTEND, everytime I do a request, the BACKEND set a new TOKEN. after 15 min without

- if not "keep me signed in clicked" --> do not generate RT

## Completed ✓