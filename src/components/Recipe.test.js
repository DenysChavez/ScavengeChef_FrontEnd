import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Recipe from './Results/Recipe'

test("render content", () => {
    const recipe = {
    name: "Chicken Caesar Salad",
      ingredients: [
        "2 chicken breasts, grilled and sliced",
        "1 head romaine lettuce, washed and torn",
        "1/2 cup Caesar dressing",
        "1/2 cup grated Parmesan cheese",
        "1 cup croutons"
      ],
      instructions: [
        "Arrange the lettuce on a large platter.",
        "Place the grilled chicken slices on top of the lettuce.",
        "Drizzle the Caesar dressing over the salad.",
        "Sprinkle the Parmesan cheese and croutons over the top.",
        "Serve immediately."
      ],
      category: "Salad",
      image: "https://www.jessicagavin.com/wp-content/uploads/2022/06/chicken-caesar-salad-24-600x900.jpg",
      like: true
    }

    const { container } = render(<Recipe recipe={recipe} />)

    const div = container.querySelector(".recipe-item")
    expect(div).toHaveTextContent('Chicken Caesar Salad')
})
