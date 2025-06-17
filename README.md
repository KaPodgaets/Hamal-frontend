# Hamal-frontend

## Initial description of application
this is a description of frontend of small callcenter application
the goal of this application to create a crm-like system or google-forms like system for small callcenter. 
More details of user's work flow in application.
First page that has to be opened - login page. only 2 input field (username, password) and button 'login'
User (Operator or Admin) can login.
after login page - transfer to 'get-next-form' page. It has to contain only button 'get next form'. By click on this button - transer to page of 'form' and get the information about one of citizen, after changing info use "update" the form. Updated citizen should be marked as updated and never pop up for next callcenter operator, also should be status 'in progress' for citizen that already pop uped but not updated, they also should never pop up for another operator.
also admin have options to create or delete user, upload or csv file with data about citizens, export current data to csv, delete all existing data about citizens in system.
the features:
Admin
- Create / Update / Delete User (call center operator)
- Get All users
- upload csv file to update citizens database
- export current data from database to csv file
- clear the citizen table in database
User
- get next citizen data
- update citizen data
System 
- login (jwt token based authentication and authorization)

The application should use react-ts, axios, rtk-query, tailwind css

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
