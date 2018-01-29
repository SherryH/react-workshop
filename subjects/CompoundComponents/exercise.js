////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// - Implement an `onChange` prop that communicates the <RadioGroup>'s state
//   back to the parent so it can use it to render.
// - Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
//   the <RadioOption>s so the keyboard will work)
//   - Enter and space bar should select the option
//   - Arrow right, arrow down should select the next option
//   - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

const ENTER_KEY = 13
const SPACE_KEY = 32
const ARROW_RIGHT = 39
const ARROW_LEFT = 37

class RadioGroup extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string
  }
  state = { selectedIndex: 0 }

  render() {
    //pass the state to children as props
    //child has onClick handler that set the selectedIndex state
    const children = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          isSelected: index === this.state.selectedIndex,
          handleClick: () => {
            this.setState({ selectedIndex: index })
          },
          handleKeyDown: event => {
            const KeyDownFuncMap = {
              13: () => this.setState({ selectedIndex: index }),
              32: () => this.setState({ selectedIndex: index }),
              39: () => {
                if (this.state.selectedIndex < 3) {
                  this.setState(prevState => {
                    return {
                      selectedIndex: prevState.selectedIndex + 1
                    }
                  })
                }
              },
              37: () => {
                if (this.state.selectedIndex > 0) {
                  this.setState(prevState => {
                    return {
                      selectedIndex: prevState.selectedIndex - 1
                    }
                  })
                }
              }
            }
            if (KeyDownFuncMap[event.keyCode]) {
              KeyDownFuncMap[event.keyCode]()
            }
          }
        })
      }
    )
    return <div>{children}</div>
  }
}

class RadioOption extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    isSelected: PropTypes.bool,
    handleClick: PropTypes.func,
    handleKeyDown: PropTypes.func
  }
  //how do i know which index i am?
  //it is passed from RadioGroup

  render() {
    return (
      <div
        tabIndex="0"
        onClick={() => {
          this.props.handleClick()
        }}
        onKeyDown={this.props.handleKeyDown}
      >
        <RadioIcon isSelected={this.props.isSelected} />{" "}
        {this.props.children}
      </div>
    )
  }
}

class RadioIcon extends React.Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div
        style={{
          borderColor: "#ccc",
          borderWidth: 3,
          borderStyle: this.props.isSelected ? "inset" : "outset",
          height: 16,
          width: 16,
          display: "inline-block",
          cursor: "pointer",
          background: this.props.isSelected ? "rgba(0, 0, 0, 0.05)" : ""
        }}
      />
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <RadioGroup defaultValue="fm">
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
