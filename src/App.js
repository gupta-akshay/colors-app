/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import PaletteList from "./PaletteList"
import Palette from "./Pallete"
import SingleColorPalette from "./SingleColorPalette"
import NewPaletteForm from "./NewPaletteForm"
import seedColors from "./seedColors"
import { generatePalette } from "./colorHelpers"
import Page from "./Page"

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

  deletePalette = (id) => {
    this.setState(
      (st) => ({
        palettes: st.palettes.filter((palette) => palette.id !== id),
      }),
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <Page className="page">
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routeProps) => (
                    <Page className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <Page className="page">
                      <PaletteList
                        palettes={palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <Page className="page">
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    )
  }
}

export default App
