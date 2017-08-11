// Container
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Apollo
import { graphql, compose } from 'react-apollo';

// Components
import WesternSuburbsShow from '../components/western-suburbs-show';

// Redux Action
import { increaseCounter, uploadDocumentAsync } from '../actions/';

class WesternSuburbs extends React.Component {
  constructor (props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload (event) {
    event.preventDefault();
    let file = event.target.files[0];
    dispatch(uploadDocument(file));
    console.log("?????")
  }

  render () {
    return (
      <WesternSuburbsShow
        counter={this.props.counter}
        uploadedFiles={this.props.uploadedFiles}
        handleIncreaseCounter={this.props.increaseCounter}
        handleUploadDocument={this.props.uploadDocument}
      >
        {'  in container: ' + this.props.uploadedFiles.length}
      </WesternSuburbsShow>
    );
  }
}

WesternSuburbs.propTypes = {
  counter: PropTypes.number.isRequired,
  uploadedFiles: PropTypes.arrayOf(React.PropTypes.shape({
    originalFilename: PropTypes.string.isRequired,
    fsFilename: PropTypes.string.isRequired,
  })).isRequired,

  increaseCounter: PropTypes.func.isRequired,
  uploadDocument: PropTypes.func.isRequired,
};

const WesternSuburbsWithApollo = compose()(WesternSuburbs);

const mapDispatchToProps = (dispatch) => {
  return {
    uploadDocument: (files) => { dispatch(uploadDocumentAsync(files)) },
    increaseCounter: (value) => { dispatch(increaseCounter(value)) }
  }
}

export default connect(
  (state) => ({ counter: state.westernSuburbs.counter, uploadedFiles: state.westernSuburbs.uploadedFiles }),
  mapDispatchToProps,
)(WesternSuburbsWithApollo);
