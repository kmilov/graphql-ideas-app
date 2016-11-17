import React from "react";
import { connect } from "react-redux";
import { getGraph } from "../actions/actions.js";


class Idea extends React.Component {
  componentDidMount(){
    this.props.dispatch(
      getGraph("{ideas(id:2){id, name,user}}")
    )
  }

  render() {
      let dispatch = this.props.dispatch;
      let fetchInProgress = String(this.props.store.get('fetching'));
      let queryText;
      let idea = this.props.store.get('data').toObject().ideas || {}

      return (
        <div className="Idea">
          <h3 className="Idea-author">{idea.user}</h3>
          <blockquote className="Idea-quote">{idea.name}</blockquote>
        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
}

export const IdeaContainer = connect(
  mapStateToProps
)(Idea)
