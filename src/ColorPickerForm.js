import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"
import { ChromePicker } from "react-color"
import { withStyles } from "@material-ui/core/styles"

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
  },
}

class ColorPickerForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentColor: "teal",
      newColorName: "",
    }
  }

  componentDidMount() {
    const { colors } = this.props
    const { currentColor } = this.state
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    )
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    )
  }

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = () => {
    const { currentColor, newColorName } = this.state
    const { addNewColor } = this.props
    const newColor = {
      color: currentColor,
      name: newColorName,
    }
    addNewColor(newColor)
    this.setState({ newColorName: "" })
  }

  render() {
    const { paletteIsFull, classes } = this.props
    const { currentColor, newColorName } = this.state
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref="form">
          <TextValidator
            value={newColorName}
            name="newColorName"
            placeholder="Color Name"
            className={classes.colorNameInput}
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already used!",
            ]}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={paletteIsFull}
            className={classes.addColor}
            style={{
              backgroundColor: paletteIsFull ? "grey" : currentColor,
            }}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm)
