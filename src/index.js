import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    ingredients: [
      "400g spaghetti",
      "2 tbsp olive oil",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "400g ground beef",
      "2 cans (400g each) crushed tomatoes",
      "1 tsp salt",
      "1 tsp black pepper",
      "1 tsp dried basil",
      "1 tsp dried oregano",
    ],
    instructions: [
      "Cook the spaghetti according to package instructions, then drain and set aside.",
      "Meanwhile, heat the oil in a large pan over medium heat. Add the onion and garlic, and sauté until soft and fragrant.",
      "Add the ground beef to the pan and cook until browned. Drain any excess fat.",
      "Stir in the crushed tomatoes, salt, pepper, basil, and oregano. Simmer for 20-30 minutes, stirring occasionally.",
      "Serve the sauce over the cooked spaghetti, garnish with extra basil or parmesan if desired.",
    ],
    category: "Pasta",
    image: "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/8fc00a45259a49d49d9100a34f2087eb/BFV44742_PantryPasta_FB_Final.jpg",
    like: false,
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    ingredients: [
      "2 chicken breasts, grilled and sliced",
      "1 head romaine lettuce, washed and torn",
      "1/2 cup Caesar dressing",
      "1/2 cup grated Parmesan cheese",
      "1 cup croutons",
    ],
    instructions: [
      "Arrange the lettuce on a large platter.",
      "Place the grilled chicken slices on top of the lettuce.",
      "Drizzle the Caesar dressing over the salad.",
      "Sprinkle the Parmesan cheese and croutons over the top.",
      "Serve immediately.",
    ],
    category: "Salad",
    image: "https://www.jessicagavin.com/wp-content/uploads/2022/06/chicken-caesar-salad-24-600x900.jpg",
    like: true,
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies",
    ingredients: [
      "1 cup unsalted butter, softened",
      "1 cup white sugar",
      "1 cup packed brown sugar",
      "2 eggs",
      "2 tsp vanilla extract",
      "3 cups all-purpose flour",
      "1 tsp baking soda",
      "2 tsp hot water",
      "1/2 tsp salt",
      "2 cups semisweet chocolate chips",
    ],
    instructions: [
      "Preheat your oven to 350°F (175°C).",
      "In a large bowl, cream together the butter, white sugar, and brown sugar until smooth. Beat in the eggs one at a time, then stir in the vanilla.",
      "Dissolve baking soda in hot water and add to the batter along with salt.",
      "Stir in flour, then fold in the chocolate chips.",
      "Drop by large spoonfuls onto ungreased baking sheets.",
      "Bake for about 10 minutes, or until edges are nicely browned.",
    ],
    category: "Dessert",
    image: "https://handletheheat.com/wp-content/uploads/2020/10/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9-637x637-1.jpg",
    like: false,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <App recipes={recipes} />
);
