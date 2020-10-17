/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/styles"
import Navbar from "./Navbar"
import PaletteFooter from "./PaletteFooter"
import ColorBox from "./ColorBox"
import styles from "./styles/PaletteStyles"

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
    const { palette, classes } = this.props
    const { paletteName, emoji, id } = palette
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ))
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette)
