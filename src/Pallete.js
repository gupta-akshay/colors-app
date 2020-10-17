import React, { Component } from "react"
import Navbar from './Navbar'
import ColorBox from "./ColorBox"
import "./Palette.css"

class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = { level: 500 }
  }

  changeLevel = (level) => {
    this.setState({ level })
  }

  render() {
    const { level } = this.state
    const { palette } = this.props
    const { colors } = palette
    const colorBoxes = colors[level].map((color) => (
      <ColorBox background={color.hex} name={color.name} />
    ))
    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* footer goes here */}
      </div>
    )
  }
}

export default Palette
