/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from "react"
import Navbar from "./Navbar"
import PaletteFooter from "./PaletteFooter"
import ColorBox from "./ColorBox"

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.state = { format: "hex" }
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
  }

  gatherShades = (palette, colorToFilterBy) => {
    let shades = []
    const allColors = palette.colors
    for (const key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      )
    }
    return shades.slice(1)
  }

  changeFormat = (format) => {
    this.setState({ format })
  }

  render() {
    const { format } = this.state
    const { palette } = this.props
    const { paletteName, emoji } = palette
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color[format]}
        showLink={false}
      />
    ))
    return (
      <div className="Palette">
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default SingleColorPalette
