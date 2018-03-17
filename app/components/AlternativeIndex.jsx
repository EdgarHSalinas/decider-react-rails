import React from "react"
import { Link } from "react-router-dom"
import { contains, sortBy } from "rambda"

import AlternativeIndexState from "AlternativeIndexState"
import ComparisonHeader from "ComparisonHeader"
import NewAlternative from "NewAlternative"

export default AlternativeIndexState.renderWith(render)

function render({
  matchUrl,
  comparison,
  newlyCreatedItems,
  onSubmitNewAlternative
}) {
  return (
    <div className="AlternativeIndex">
      {renderHeader(matchUrl)}
      {renderNewAlternative(onSubmitNewAlternative)}
      <div className="AlternativeIndex_items">
        {renderAlternativeLinks(
          matchUrl,
          sortAlternatives(comparison.alternatives),
          newlyCreatedItems
        )}
      </div>
    </div>
  )
}

function renderHeader(matchUrl) {
  return <ComparisonHeader matchUrl={matchUrl} title="Alternatives" />
}

function renderNewAlternative(onSubmitNewAlternative) {
  return (
    <NewAlternative
      className="AlternativeIndex_new"
      onSubmit={onSubmitNewAlternative}
    />
  )
}

const sortAlternatives = sortBy(alternative => alternative.name.toLowerCase())

function renderAlternativeLinks(matchUrl, alternatives, newlyCreatedItems) {
  const getNewlyCreatedClassName = alternative =>
    contains(alternative, newlyCreatedItems)
      ? "AlternativeIndex_link__isNewlyCreated"
      : ""

  return alternatives.map(alternative =>
    renderAlternativeLink(
      matchUrl,
      alternative,
      getNewlyCreatedClassName(alternative)
    )
  )
}

function renderAlternativeLink(matchUrl, alternative, newlyCreatedClassName) {
  return (
    <Link
      className={`AlternativeIndex_link ${newlyCreatedClassName}`}
      key={alternative.id}
      to={`${matchUrl}/alternative/${alternative.id}`}
    >
      {alternative.name}
    </Link>
  )
}
