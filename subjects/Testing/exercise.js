////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Fill in the test stubs to make the tests pass
////////////////////////////////////////////////////////////////////////////////
import "./mocha-setup"

import React from "react"
import ReactDOM from "react-dom"
import { Simulate } from "react-addons-test-utils"
import expect from "expect"

import Tabs from "./components/Tabs"

describe("when <Tabs> is rendered", () => {
  let node, tabs, panel, borderFixture

  const FixtureData = [
    {
      label: "USA",
      content: "Land of the Free, Home of the brave"
    },
    { label: "Brazil", content: "Sunshine, beaches, and Carnival" },
    { label: "Russia", content: "World Cup 2018!" }
  ]

  beforeEach(done => {
    node = document.createElement("div")
    document.body.appendChild(node)

    ReactDOM.render(<Tabs data={FixtureData} />, node, () => {
      tabs = node.querySelectorAll(".Tab")
      panel = node.querySelector(".TabPanel")

      borderFixture = document.createElement("div")
      borderFixture.setAttribute("style", "border-bottom-color: #000")

      done()
    })
  })

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node)
    document.body.removeChild(node)
  })

  it("renders the USA tab", () => {
    expect(tabs[0].innerText).toEqual(
      FixtureData[0].label,
      "USA tab was not rendered"
    )
  })

  it("renders the Brazil tab", () => {
    expect(tabs[1].innerText).toEqual(
      FixtureData[1].label,
      "Brazil tas was not rendered"
    )
  })

  it("renders the Russia tab", () => {
    expect(tabs[2].innerText).toEqual(
      FixtureData[2].label,
      "Russia tab was not rendered"
    )
  })

  // you may want to use the `borderFixture` variable
  it("activates the first tab", () => {
    // the activeTab has the same style as borderFixture
    // console.log("attributes in tab", tabs[0])
    expect(tabs[0].style.borderBottomColor).toEqual(
      borderFixture.style.borderBottomColor,
      "First tab not activated"
    )
  })

  it("does not activate the second tab", () => {
    expect(tabs[1].style.borderBottomColor).toNotEqual(
      borderFixture.style.borderBottomColor,
      "Second tab should not be activated"
    )
  })

  describe("after clicking the second tab", () => {
    beforeEach(done => {
      // TODO: simulate a click on the second tab
      Simulate.click(tabs[1])
      done()
    })

    it("activates the second tab", () => {
      expect(tabs[1].style.borderBottomColor).toEqual(
        borderFixture.style.borderBottomColor,
        "Second tab not activated"
      )
    })

    it("deactivates the first tab", () => {
      expect(tabs[0].style.borderBottomColor).toNotEqual(
        borderFixture.style.borderBottomColor,
        "First tab should not be activated"
      )
    })

    it("puts the correct content in the panel", () => {
      expect(panel.innerText).toEqual(
        FixtureData[1].content,
        "Second Tab content is not displayed on panel"
      )
    })
  })
})
