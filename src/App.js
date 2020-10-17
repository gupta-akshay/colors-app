/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import Palette from "./Pallete"
import seedColors from "./seedColors"
import { generatePalette } from './colorHelpers'

function App() {
  console.log('--log--', generatePalette(seedColors[4]))
  return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
  )
}

export default App
