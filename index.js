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
    return Recipe.create({
      title:'Classic_Upma',
      level: 'Amateur Chef',
      ingredients: ['2 tbsp oil', '¾ tsp mustard', '1 tsp cumin', '1 tsp urad dal', '1 tsp chana dal'
      , '1 dried red chilli', 'few curry leaves', '½ onion, finely chopped', '1 inch ginger, finely chopped', 
      '2 chilli, finely chopped', '½ tsp salt', '3 cup water', '1 tsp sugar', '1 cup rava / semolina', '1 tsp ghee',
      '½ lemon juice', '2 tbsp coriander, finely chopped'],
      cuisine: 'some cuisine',
      dishType: 'breakfast',
      duration: 10,
      creator: 'HEBBARS KITCHEN'
     })
  })
  .then((recipe)=> console.log(`first Recipe title - ${recipe.title}`) )
  .then(()=> Recipe.insertMany(data))
  .then((data) =>
    data.forEach(recipe => console.log(`Recipe title: ${recipe.title}`)))
  .then(() => 
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration:100}, {new: true})
  )
  .then((updatedRecipe) =>  
    console.log(`updated Recipe: ${updatedRecipe}`)
  )
  .then(() =>
    Recipe.deleteOne( {title: 'Carrot Cake'})
  )
  .then(()=> console.log("data deleted"))
  .then(()=> mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
