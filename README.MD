NOTE: This project is not meant to be viewed on MOBILE

This is a vanilla JS (ES6) web application to find various recipe details.

1. Run npm install before proceeding further.


Ways to run the App 

1. npm run dev 
   This will do bundling and save on disk and wont minify files.
2. npm run build 
   This will do bundling and save on disk and will minify the files for deployment on Production.
3. npm run start
   This is the easiest way to view the app. It will open the development server automatically. When running development server Webpack will bundle the modules together but will not write it to a file on disk. It will automatically inject the bundle.js to the html. It is more or less streaming the files.
   
This app uses a configured webpack. 
It uses babel and HtmlWebpackPlugin to bundle the files and inject the bundle.js/js file into the dist folder.
Follows a MVC - Model View Controller architecture and separates the presentation logic from the application logic with a controller in bewtween to control the entire app. Implemented with es6 modules
