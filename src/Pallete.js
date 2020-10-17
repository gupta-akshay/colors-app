import React, { Component } from "react"
import Navbar from "./Navbar"
import ColorBox from "./ColorBox"
import PaletteFooter from './PaletteFooter'
import "./Palette.css"

class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = { level: 500, format: "hex" }
  }

  changeLevel = (level) => {
    this.setState({ level })
  }

  changeFormat = (format) => {
    this.setState({ format })
  }

  render() {
    const { level, format } = this.state
    const { palette } = this.props
    const { id, colors, paletteName, emoji } = palette
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        moreUrl={`/palette/${id}/${color.id}`}
        showLink
      />
    ))
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showingAllColors
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default Palette
