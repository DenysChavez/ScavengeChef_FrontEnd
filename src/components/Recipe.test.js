import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Recipe from './Results/Recipe'
import userEvent from '@testing-library/user-event'

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

    render(<Recipe recipe={recipe} />)

    const element = screen.getByText('Chicken Caesar Salad')

    screen.debug(element)
    expect(element).toBeDefined()
})

test("clicking the buttons calls event handler once", async () => {
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
    
    const monckHandler = jest.fn()
    render(<Recipe recipe={recipe} showDetails={monckHandler} />)
    
    const user = userEvent.setup()
    const button = screen.getByText("Get Recipe")
    await user.click(button)

    expect(monckHandler.mock.calls).toHaveLength(1)
})