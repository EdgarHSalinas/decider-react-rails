import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NewComparison from "NewComparison"
import Header from "Header"
import Loading from "Loading"

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      comparisonStubs: []
    }
    this.load()
  }

  get matchUrl() {
    return this.props.match.url
  }

  get history() {
    return this.props.history
  }

  get isLoading() {
    return this.state.isLoading
  }

  get comparisonStubs() {
    return this.state.comparisonStubs
  }

  async load() {
    console.log("Getting comparisons")
    const response = await axios.get("/comparisons")
    this.setState({
      ...this.state,
      isLoading: false,
      comparisonStubs: response.data
    })
  }

  async handleSubmitNewComparison(comparison) {
    console.log("Posting new comparison", comparison)
    const response = await axios.post("/comparisons", comparison)
    this.setState({
      ...this.state,
      comparisonStubs: this.comparisonStubs.concat(response.data)
    })
    this.history.push(`/comparison/${response.data.id}`)
  }

  render() {
    return (
      <div className="Dashboard">
        <Header className="Header__dashboardMode">
          <h1 className="Header_title">
            <Link to={this.matchUrl}>Dashboard</Link>
          </h1>
        </Header>
        {this.isLoading ? this.renderLoading() : this.renderLoaded()}
      </div>
    )
  }

  renderLoading() {
    return <Loading />
  }

  renderLoaded() {
    return (
      <React.Fragment>
        <NewComparison
          className="Dashboard_item"
          onSubmit={comparison => this.handleSubmitNewComparison(comparison)}
        />
        {this.comparisonStubs.map(comparisonStub => (
          <ComparisonStub
            key={comparisonStub.id}
            id={comparisonStub.id}
            name={comparisonStub.name}
            size={comparisonStub.alternatives_size}
          />
        ))}
      </React.Fragment>
    )
  }
}

function ComparisonStub({ id, name, size }) {
  return (
    <Link className="Dashboard_item" to={`/comparison/${id}`}>
      <h2 className="Dashboard_itemHeader">{name}</h2>
      <h3 className="Dashboard_itemSubHeader">{size} alternatives</h3>
    </Link>
  )
}

export default Dashboard
