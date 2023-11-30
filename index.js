const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title:'Upma',
      level: 'Easy Peasy',
      ingredients: ['rava', 'water', 'onions', 'water', 'oil'],
      cuisine: 'some cuisine',
      dishType: 'breakfast',
      duration: 10,
      creator: 'Chef Anil'
     })
  })
  // .then(()=> mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
