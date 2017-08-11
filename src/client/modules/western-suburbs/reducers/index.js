// Redux reducer to manage client side state

import { UPLOAD_DOCUMENT_ASYNC
       , UPLOAD_DOCUMENT_START
       , UPLOAD_DOCUMENT_SUCCESS
       , UPLOAD_DOCUMENT_FAIL
       } from '../actions'
// function uploadDocumentRequest({ file, name}) {
//   let data = new FormData();
//   data.append('file', document);
//   data.append('name', name);
//
//   return (dispatch) => {
//     axios.post('/files', data)
//       .then(response => dispatch(uploadSuccess(response))
//       .catch(error => dispatch(uploadFail(error));
//   };
// }

const defaultState = {
  counter: 1,
  isUploading: false,
  uploadedFiles: [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case 'INCREASE_COUNTER':
      return {
        ...state,
        counter: state.counter += action.value
      };
    case UPLOAD_DOCUMENT_START:
      console.log('  in UPLOAD_DOCUMENT_START reducer');
      return Object.assign({}, state, { isUploading: true });
    case UPLOAD_DOCUMENT_SUCCESS:
      console.log('  in UPLOAD_DOCUMENT_SUCCESS reducer');
      var uploadedFilesNext = [];
      for (var i = 0; i < state.uploadedFiles.length; i++) {
        uploadedFilesNext.push(Object.assign({}, state.uploadedFiles[i]))
      }
      action.fileReferences.map((fileReference) => {
        uploadedFilesNext.push(fileReference);
      })
      console.log(' in reducer, fsFilename: ' + uploadedFilesNext[0].fsFilename);
      return Object.assign({}, state, { isUploading: false, uploadedFiles: uploadedFilesNext});
    case UPLOAD_DOCUMENT_FAIL:
      console.log('  in UPLOAD_DOCUMENT_FAIL reducer');
      return Object.assign({}, state, { isUploading: false });
    case UPLOAD_DOCUMENT_ASYNC:
      console.log('  in UPLOAD_DOCUMENT_ASYNC reducer');
      const files = action.files;
      for (var i = 0; i < files.length; i++) {
        console.log("file[" + i + "]:" + files[i].name)
      }
      return Object.assign({}, state, { isUploading: false });
    default:
      return state;
  }
}
