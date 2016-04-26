"use strict";

(function(window, document) {

  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();

  function synthesize(text) {
    return fetch('/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text: text.slice(0, 200)})
    }).then(response => response.arrayBuffer())
    .catch(e => console.err(e))
  }

  function speech(buffer) {
    const source = context.createBufferSource();
    context.decodeAudioData(buffer, audioBuffer => {
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.onended = e => {
        console.log('end');
      };
      source.start(0);
    }, error => {
      console.error(error);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {

    const textToSpeech = document.getElementById("text_to_speech");

    document.getElementById("speech_button").addEventListener("click", () => {
      const text = textToSpeech.value;
      synthesize(text).then(speech);
    });

  });

})(window, document);
