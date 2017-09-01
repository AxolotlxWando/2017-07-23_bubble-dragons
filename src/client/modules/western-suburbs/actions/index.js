// Redux reducer to manage client side state
import 'isomorphic-fetch';

// Redux Actions
export function increaseCounter (value) {
  return {
    type: 'INCREASE_COUNTER',
    value
  }
}

// Actions Async
export const UPLOAD_DOCUMENT_START = 'UPLOAD_DOCUMENT_START';
function uploadDocumentStart(files) {
  console.log('uploadDocumentStart action triggered!');
  return {
    type: UPLOAD_DOCUMENT_START,
    files
  }
}

export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
function uploadDocumentSuccess(fileReferences) {
  console.log('uploadDocumentSuccess action triggered!');
  console.log('payload: ' + JSON.stringify(fileReferences))
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    fileReferences
  }
}

export const UPLOAD_DOCUMENT_FAIL = 'UPLOAD_DOCUMENT_FAIL';
function uploadDocumentFail(error) {
  console.log('uploadDocumentFail action triggered!');
  console.log('error.message: ' + error.message);
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    error,
  }
}

export const UPLOAD_DOCUMENT_ASYNC = 'UPLOAD_DOCUMENT_ASYNC';
export function uploadDocumentAsync (files) {
  return function (dispatch) {
    console.log('uploadDocumentAsync action triggered!');
    dispatch(uploadDocumentStart(files))

    console.log('filelist on request: ' + files.length + ' ' + files);
    let formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      console.log('files[' + i + ']: ' + files[i].name);
      formData.append('files', files[i], files[i].name);
    }
    // formData.append('files', new Blob([content], { type: "text/xml"}));
    // files.push(new Blob([content], { type: "text/xml"}));
    // files.push(new Blob([content], { type: "text/xml"}));
    // files.push(new Blob([content], { type: "text/xml"}));
    // formData.append('files', new Blob([content], { type: "text/xml"}));
    // formData.append('files', new Blob([content], { type: "text/xml"}));
    // formData.append('files', new Blob([content], { type: "text/xml"}));
    // formData.append('file[]', files);
    return fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(
        (response) => { return response.json() },
        (error) => { throw new Error('Failed to send HTTP POST request (while sending)!') }
      ).then(
        (json) => {
          console.log(json.message);
          if (json.fileReferences === undefined) {
            throw new Error('Server\'s response is corrupted for upload request')
          } else if (json.fileReferences.length <= 0) {
            throw new Error('Server responded with zero length reference object')
          }
          dispatch(uploadDocumentSuccess(json.fileReferences))
        },
        (error) => { throw new Error('HTTP POST request failed!') }
      ).catch(
        (error) => { dispatch(uploadDocumentFail(error)) }
      )
  }
}
