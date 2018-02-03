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
import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

class Form extends React.Component {
  static childContextTypes = {
    handleSubmit: PropTypes.func,
    handleInputChange: PropTypes.func
  }
  state = {
    values: {}
  }
  getChildContext() {
    console.log("onSubmit", this.props.onSubmit)
    return {
      handleSubmit: this.props.onSubmit,
      handleInputChange: args => {
        console.log("name value", args)
      }
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

class TextInput extends React.Component {
  static contextTypes = {
    handleInputChange: PropTypes.func
  }
  render() {
    return (
      <input
        onChange={event =>
          this.context.handleInputChange({
            name: this.props.name,
            value: event.target.value
          })
        }
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert("YOU WIN!")
  }

  render() {
    return (
      <div>
        <h1>
          This isn't even my final <code>&lt;Form/&gt;</code>!
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name" />{" "}
            <TextInput name="lastName" placeholder="Last Name" />
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
