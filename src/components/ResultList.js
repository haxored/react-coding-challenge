import React from "react";
import { connect } from "react-redux";
import { fetchResults } from "./ResultActions";

class ResultList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchResults());
  }

  render() {
    const { error, loading, results } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {results.map(result => (
          <li key={result.Year}>{result.Title}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results.items,
  loading: state.results.loading,
  error: state.results.error
});

export default connect(mapStateToProps)(ResultList);
//export default ResultList;
