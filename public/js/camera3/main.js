/*
*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/

'use strict';

var videoElement = document.querySelector('video');
// var audioInputSelect = document.querySelector('select#audioSource');
// var audioOutputSelect = document.querySelector('select#audioOutput');
var videoSelect = document.querySelector('select#videoSource');
var selectors = [videoSelect];
//var selectors = [audioInputSelect, audioOutputSelect, videoSelect];


function gotDevices(deviceInfos) {
  // Handles being called several times to update labels. Preserve values.
  var values = selectors.map(function(select) {
    return select.value;
  });
  selectors.forEach(function(select) {
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    // if (deviceInfo.kind === 'audioinput') {
    //   option.text = deviceInfo.label ||
    //       'microphone ' + (audioInputSelect.length + 1);
    //   audioInputSelect.appendChild(option);
    // } else if (deviceInfo.kind === 'audiooutput') {
    //   option.text = deviceInfo.label || 'speaker ' +
    //       (audioOutputSelect.length + 1);
    //   audioOutputSelect.appendChild(option);
    // } else
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
      console.log('video info: ', deviceInfo)
    } else {
      //console.log('Some other kind of source/device: ', deviceInfo);
    }
  }
  selectors.forEach(function(select, selectorIndex) {
    if (Array.prototype.slice.call(select.childNodes).some(function(n) {
      return n.value === values[selectorIndex];
    })) {
      select.value = values[selectorIndex];
    }
  });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);

// Attach audio output device to video element using device/sink ID.
function attachSinkId(element, sinkId) {
  if (typeof element.sinkId !== 'undefined') {
    element.setSinkId(sinkId)
    .then(function() {
      console.log('Success, audio output device attached: ' + sinkId);
    })
    .catch(function(error) {
      var errorMessage = error;
      if (error.name === 'SecurityError') {
        errorMessage = 'You need to use HTTPS for selecting audio output ' +
            'device: ' + error;
      }
      console.error(errorMessage);
      // Jump back to first output device in the list as it's the default.
      //audioOutputSelect.selectedIndex = 0;
    });
  } else {
    console.warn('Browser does not support output device selection.');
  }
}

// function changeAudioDestination() {
//   var audioDestination = audioOutputSelect.value;
//   attachSinkId(videoElement, audioDestination);
// }

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoElement.srcObject = stream;
  // Refresh button list in case labels have become available
  return navigator.mediaDevices.enumerateDevices();
}

function start() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }
  //var audioSource = audioInputSelect.value;
  var videoSource = videoSelect.value;
  console.log("videoSource : ", videoSource)
  var constraints = {
  //  audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(handleError);
}

//audioInputSelect.onchange = start;
//audioOutputSelect.onchange = changeAudioDestination;
videoSelect.onchange = start;

console.log("start : ", start)
start();

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

var canvas = document.getElementById('canvas');
// console.log( "js - canvas : ", canvas )
var context = canvas.getContext('2d');
console.log( "context : ", context )

var video = document.getElementById('video');
// console.log( "js - video : ", video )

document.getElementById("snap").addEventListener("click", function() {
console.log("context:", video.videoHeight)
console.log("context:", video.videoWidth)
  // $(canvas).width( video.videoWidth /4)
  // $(canvas).height( video.videoHeight /4)
  context.drawImage(video, 0, 0, video.videoWidth /4 *1.3  , video.videoHeight /4 *1.3 );

});

document.getElementById("video").addEventListener("click", function() {
	context.drawImage(video, 0, 0, video.videoWidth /4 *1.3, video.videoHeight /4 *1.3);
  console.log("context:", context)
});


//video와 snap은 scan div로 묶여 있음
$(document).ready(function(){
  $("#video").click(function(){
    $("#scan").hide();
    $("#view").show();
  });
});

$(document).ready(function(){
  $("#snap").click(function(){
    $("#scan").hide();
    $("#view").show();
  });
});


$(document).ready(function(){
  $("#canvas").click(function(){
    $("#view").hide();
    $("#scan").show();
  });
});


$(document).ready(function(){
  $("#backToScan").click(function(){
    $("#view").hide();
    $("#scan").show();
  });
});

$(document).ready(function(){
  $("#setButton").click(function(){
    $("#setButton").hide();
    $("#scan").hide();
    $("#set").show();
    $("#scanButton").show();
    $("#view").hide();

  });
});


$(document).ready(function(){
  $("#scanButton").click(function(){
    $("#scanButton").hide();
    $("#set").hide();
    $("#setButton").show();
    $("#scan").show();
    $("#view").hide();
  });
});



//시작하면서 숨길 요쇼들 - 1.스캔화면, 2.스캔버튼, 이후 세팅버튼 누르면 스캔버튼 생기고,세팅화면은 스대로 남아있고, 세팅버튼 사라짐, 이후 스캔버튼 누르면, 세팅화면 사라지고 스캔화면으로 변하고, 스캔버튼 사라짐
window.onload = function(){
$("#setButton").hide();
$("#view").hide();
$("#scan").hide();

};


document.getElementById("audioSource").style.display = 'none';
document.getElementById("audioOutput").style.display = 'none';
