import React from "react"
import { Link } from "react-router-dom"

function Alternative({ match, alternatives, criteria, comparisonMatchUrl }) {
  const { params: { id: stringId }, url: matchUrl } = match
  const id = parseInt(stringId)
  const alternative = alternatives.find(item => item.id === id)

  const render = () => (
    <div>
      {renderHeader()}
      {alternative.estimates.length ? renderEstimates() : renderNoEstimates()}
      {renderCriteriaLink()}
    </div>
  )

  const renderHeader = () => (
    <h3>
      <Link to={matchUrl}>{alternative.name}</Link>{" "}
      {alternative.url && (
        <a href={alternative.url} target="_blank">
          (external link)
        </a>
      )}
    </h3>
  )

  const renderEstimates = () => (
    <ul>{alternative.estimates.map(estimate => renderEstimate(estimate))}</ul>
  )

  const renderEstimate = estimate => {
    const criterion = criteria.find(item => item.id === estimate.criterion_id)
    return (
      <li key={estimate.id}>
        {criterion.name}: {estimate.estimate}
      </li>
    )
  }

  const renderNoEstimates = () => <p>No estimates yet</p>

  const renderCriteriaLink = () => (
    <h3>
      <Link to={`${comparisonMatchUrl}/criteria`}>Criteria</Link>
    </h3>
  )

  return render()
}

export default Alternative