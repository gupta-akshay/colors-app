/* eslint-disable react/jsx-props-no-spreading */
import React from "react"
import Palette from "./Pallete"
import seedColors from "./seedColors"

function App() {
  return (
    <div>
      <Palette {...seedColors[4]} />
    </div>
  )
}

export default App
