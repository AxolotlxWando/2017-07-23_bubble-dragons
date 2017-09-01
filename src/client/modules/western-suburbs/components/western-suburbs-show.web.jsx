/* Western Suburbs - View */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Button } from 'reactstrap';
import PageLayout from '../../../app/page_layout';

import styled from 'styled-components';


const context = require.context("../../../../../public/assets", false, /.jpg/);
let photosModules = [];
// require.context("../../../../../assets/thumbnails", false, /.jpg/);

context.keys().forEach((filename)=>{
  photosModules.push({filename: filename, content: context(filename)});
});
photosModules.sort((a, b) => {
  return a.filename.localeCompare(b.filename);
})
for (let i = 0; i < photosModules.length; i++){
  let photo = photosModules[i];
}

const Image2 = styled.div`
  width: 100%;
  height: 768px;
  background-image: url(${props => props.url});
`

const Image = (props) => {
  return <img src={props.url} style={{width:"100%", height: "100%"}} />
}

const WesternSuburbsShow = (props) => {
  const renderMetaData = () => (
    <Helmet
      title="Impressions - Western Suburbs"
      meta={[{
        name: 'description',
        content: 'Impressions - Western Suburbs'
      }]} />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      <div className="text-center mt-4 mb-4">
        <p>
          Counter: {props.counter}
        </p>
        <p>
          <Button id="redux-button" color="primary" onClick={() => props.handleIncreaseCounter(1)}>
            Click to increase counter
          </Button>
        </p>
        <p>
          Hello western suburbs!
        </p>
        <p>
          <input type="file" multiple onChange={(e) => {
            e.preventDefault();
            console.log('files: ' + e.target.files);
            console.log('files.length: ' + e.target.files.length);
            // const files = [];
            props.handleUploadDocument(e.target.files);
          }} />
        </p>
      </div>
      <p>
        {'Uploads: ' + props.uploadedFiles.length + ' photos'}<br />
        {JSON.stringify(props.uploadedFiles[0])}
      </p>
      {props.uploadedFiles.map((file, index) => {
        return (
          <Image key={index} url={'uploads/' + file.fsFilename} />
        );
      })}
      <p>
        {'Hoppers crossing into city through the westgate bridge: ' + photosModules.length + ' photos'}
      </p>
      {photosModules.map((photosModule, index) => {
        return (
          <Image key={index} url={photosModule.content} />
        );
      })}
    </PageLayout>
  );
};

WesternSuburbsShow.propTypes = {
  counter: PropTypes.number.isRequired,
  uploadedFiles: PropTypes.arrayOf(React.PropTypes.shape({
    originalFilename: PropTypes.string.isRequired,
    fsFilename: PropTypes.string.isRequired,
  })).isRequired,

  handleIncreaseCounter: PropTypes.func.isRequired,
  handleUploadDocument: PropTypes.func.isRequired,
};

export default WesternSuburbsShow;
