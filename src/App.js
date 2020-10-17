/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import Palette from "./Pallete"
import seedColors from "./seedColors"
import { generatePalette } from './colorHelpers'

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[0])} />
    </div>
  )
}

export default App
