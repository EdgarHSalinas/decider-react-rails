import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NewComparison from "./NewComparison"

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      comparisonStubs: []
    }
    this.load()
  }

  async load() {
    const response = await axios.get("/comparisons");
    this.setState({
      ...this.state,
      isLoading: false,
      comparisonStubs: response.data
    })
  }

  async handleNewComparisonSubmit(comparison) {
    console.log("Posting new comparison", comparison)
    const response = await axios.post("/comparisons", comparison);
    this.setState({
      ...this.state,
      comparisonStubs: this.state.comparisonStubs.concat(
        response.data)
    })
  }

  render() {
    return (this.state.isLoading ?
      this.renderLoading() :
      this.renderLoaded())
  }

  renderLoading() {
    return (
      <h2>Loading...</h2>
    )
  }

  renderLoaded() {
    return (
      <div>
        <h2>Comparisons</h2>
        <ul>
          {this.state.comparisonStubs.map(comparisonStub =>
            <li key={comparisonStub.id}>
              <ComparisonStub
                id={comparisonStub.id}
                name={comparisonStub.name}
              />
            </li>)}
          <li>
            <NewComparison
              onSubmit={comparison => this.handleNewComparisonSubmit(comparison)}
            />
          </li>
        </ul>
      </div>
    )
  }
}

function ComparisonStub({ id, name }) {
  return (
    <Link to={`/comparison/${id}`}>{name}</Link>
  )
}

export default Dashboard
