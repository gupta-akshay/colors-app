/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import PaletteList from "./PaletteList"
import Palette from "./Pallete"
import SingleColorPalette from "./SingleColorPalette"
import NewPaletteForm from "./NewPaletteForm"
import seedColors from "./seedColors"
import { generatePalette } from "./colorHelpers"

class App extends Component {
  constructor(props) {
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"))
    this.state = { palettes: savedPalettes || seedColors }
  }

  findPalette = (id) => {
    const { palettes } = this.state
    return palettes.find((palette) => palette.id === id)
  }

  savePalette = (newPalette) => {
    const { palettes } = this.state
    this.setState(
      { palettes: [...palettes, newPalette] },
      this.syncLocalStorage
    )
  }

  syncLocalStorage = () => {
    const { palettes } = this.state
    window.localStorage.setItem("palettes", JSON.stringify(palettes))
  }

  render() {
    const { palettes } = this.state
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    )
  }
}

export default App
