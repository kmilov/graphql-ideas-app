import React from "react";
import { connect } from "react-redux";
import { getGraph } from "../actions/actions.js";


class QueryInput extends React.Component {

  buildIdeaQuery(id) {
    return `{ideas(id:${id}){id, name,user}}`
  }

  render() {
    let dispatch = this.props.dispatch;
    let queryText;

    return (
      <div className="QueryInput">
        <input placeholder="1, 2 or 3" ref={node => {queryText = node}}></input>
        <button onClick={() => { dispatch(getGraph(this.buildIdeaQuery(queryText.value))) } }>query by id</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
}

export const QueryInputContainer = connect(
  mapStateToProps
)(QueryInput)
