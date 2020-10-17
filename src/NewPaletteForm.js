import React, { Component } from "react"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Button from "@material-ui/core/Button"
import { arrayMove } from "react-sortable-hoc"
import PaletteFormNav from "./PaletteFormNav"
import ColorPickerForm from "./ColorPickerForm"
import DraggableColorList from "./DraggableColorList"
import styles from "./styles/NewPaletteFormStyles"

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors,
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  addNewColor = (newColor) => {
    const { colors } = this.state
    this.setState({ colors: [...colors, newColor], newColorName: "" })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  clearColors = () => {
    this.setState({ colors: [] })
  }

  addRandomColor = () => {
    const { palettes } = this.props
    const { colors } = this.state
    const allColors = palettes.map((p) => p.colors).flat()
    const rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    this.setState({ colors: [...colors, randomColor] })
  }

  handleSubmit = (newPalette) => {
    const { colors } = this.state
    const { history, savePalette } = this.props
    newPalette.id = newPalette.paletteName.toLowerCase.replace(/ /g, "-")
    newPalette.colors = colors
    savePalette(newPalette)
    history.push("/")
  }

  removeColor = (colorName) => {
    const { colors } = this.state
    this.setState({
      colors: colors.filter((color) => color.name !== colorName),
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }

  render() {
    const { classes, maxColors, palettes } = this.props
    const { open, colors } = this.state
    const paletteIsFull = colors.length >= maxColors

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          classes={classes}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={this.addNewColor}
            colors={colors}
          />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </main>
      </div>
    )
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm)
