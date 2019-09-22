# WeatherBytez React client

Views directory is the UI for WeatherBytez.

- REACT install - Select folder to install React and type npx create-react-app views

* By using 'views' as your 'app' name, a folder in the MVC pattern gets created

## Production Build

- When building a Prod build for React (npm run build), we can copy the contents of the build into the public folder if we want Express to be our 'web server' also. This way you don't have standup a 'Web' web app server and a 'NodeJS' web app server. The NodeJS web app server is enough for serving smaller apps.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
