////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> calls <Form onSubmit>
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onSubmit> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
////////////////////////////////////////////////////////////////////////////////

// First go works, 2 improvments
// 1. Input and Form should handle defaultValue
// 2. Add 'form' namespace to contextTypes

///////////////////////////////
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

const ENTER_KEY = 13

// we dont want to save the state of valeus in the App level
// so we save them to Form on any children (Input) change
// so Form always have a copy of all values
// and Form can pass that information onSubmit

class Form extends React.Component {
  static childContextTypes = {
    handleSubmit: PropTypes.func,
    handleInputChange: PropTypes.func,
    handleReset: PropTypes.func,
    values: PropTypes.array
  }
  state = {
    values: []
  }

  // pass these methods down to children and grandchildren...
  getChildContext() {
    const { values } = this.state
    return {
      handleSubmit: values => {
        this.props.onSubmit(this.state.values)
      },
      handleInputChange: args => {
        const [name] = Object.keys(args)
        const [value] = Object.values(args)
        this.setState(
          prevState => {
            // nested object, better to use lodash merge
            const newState = { ...prevState }
            newState.values[name] = value
            return { values: newState.values }
          },
          () => {
            console.log(this.state.values)
          }
        )
      },
      handleReset: () => {
        console.log("form reset")
        this.setState(
          prevState => {
            const newState = { ...prevState }
            for (var props in newState.values) {
              newState.values[props] = ""
            }
            return { values: newState.values }
          },
          () => {
            console.log("after form submission", this.state.values)
          }
        )
        this.props.onReset()
      },
      values: this.state.values
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

class SubmitButton extends React.Component {
  static contextTypes = {
    handleSubmit: PropTypes.func
  }

  render() {
    return (
      <button onClick={this.context.handleSubmit}>
        {this.props.children}
      </button>
    )
  }
}

class ResetButton extends React.Component {
  static contextTypes = {
    handleReset: PropTypes.func
  }
  render() {
    return (
      <button onClick={this.context.handleReset}>
        {this.props.children}
      </button>
    )
  }
}

class TextInput extends React.Component {
  static contextTypes = {
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    values: PropTypes.array
  }
  // we need to pass the defaultValues set back to the form
  // by default, defaultValues = ''
  // The form should save the defaultValues in its object or state
  handleKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      this.context.handleSubmit()
    }
  }
  render() {
    return (
      <input
        onChange={event =>
          this.context.handleInputChange({
            [this.props.name]: event.target.value
          })
        }
        value={this.context.values[this.props.name]}
        onKeyDown={this.handleKeyDown}
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = args => {
    console.log("form values: [firstName: 'f', lastName: 'l']", args)
    alert("YOU WIN!", args)
  }
  handleReset = () => {
    console.log("reset")
  }

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
