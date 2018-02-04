import axios from 'axios';
import {store} from '../index.js';
console.log("------------------- START store -------------------");
console.log(store);
console.log("-------------------- END store --------------------");


// Remove a study
export const REMOVE_STUDY = 'REMOVE_STUDY';
export const removeStudy = (moduleIdx, studyIdx) => {
  return {
    type: REMOVE_STUDY,
    data: {moduleIdx, studyIdx},
  };
};

// Add a study
export const ADD_STUDY = 'ADD_STUDY';
export const addStudy = (moduleIdx, studyIdx) => {
  return {
    type: ADD_STUDY,
    data: {moduleIdx, studyIdx},
  };
};

// update module's output location
export const UPDATE_LOC = 'UPDATE_LOC';
export const updateLoc = (moduleIdx, updatedLoc) => {
  return {
    type: UPDATE_LOC,
    data: {
      moduleIdx,
      updatedLoc
    }
  }
}

// ---------------------------------------------------------
// Functions to get Ocpu computations 
// 2018-02-02 11:05
// ---------------------------------------------------------

const computeOcpuAndGetImg = async (rootUrl, data) => { 
    // Sends request and waits for it

    let postR = await axios({
      method: 'post',
      url: rootUrl,
      data: {
        json: JSON.stringify(data)
      }
    });

    console.log('------------------- START postR.data -------------------');
    console.log(postR.data);
    console.log('-------------------- END postR.data --------------------');

    // Ocpu returns indented list of URLS; we split it here
    let resultArr = postR.data.split('\n');
    let graphicalOutput = resultArr.filter(url => url.match(/graphics/g));
   console.log( `https://cloud.opencpu.org${graphicalOutput}/png`);
    return `https://cloud.opencpu.org${graphicalOutput}/png`;
}

export const UPDATE_SINGLE_STUDY = 'UPDATE_SINGLE_STUDY';
export const updateSingleStudy = (moduleIdx, studyIdx, updateType) => {
  return async dispatch => {
    // dispatch study status modification action
    dispatch(
      updateType
        ? addStudy(moduleIdx, studyIdx)
        : removeStudy(moduleIdx, studyIdx),
    );

    console.log("moduleIdx: ", moduleIdx);
    
    
    let moduleContent = store.getState().project.blocks[moduleIdx].content;
    let rootUrl = `http://johnrpb.ocpu.io/openCPU_test/R/${ moduleContent.name }`;

    // make request to Ocpu and fetch img url
    let imgUrl;
    try {
       imgUrl = await computeOcpuAndGetImg(rootUrl, moduleContent.studies);
    } catch(e) {
      console.log("Error with Ocpu request" + e);
    }

    dispatch(updateLoc(moduleIdx, imgUrl));
  };
};
