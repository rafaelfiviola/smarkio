$(document).ready(() => {
  $('#register-btn').click(buttonListener);
  $('.listen-register').click(listenButtonListener);
});
var buttonListener = () => {
  $.post(
    'http://localhost:3000/comments',
    { comment_text: $('#register-input').val() },
    appendData,
  );
};

var appendData = (comment) => {
  $('#list').prepend(`
    <div class="list-element" id="list-element-{{this.id}}">
    ${comment.comment_text}
    <div class="btn btn-primary" id="register-btn-{{this.id}}"
    onclick="listenButtonListener('${comment.comment_text}')">Ouvir
    </div>
    </div>`);
};

var listenButtonListener = (text) => {
  retrieveAudio(text);
};

var retrieveAudio = (text) => {
  var audio = document.createElement('audio');
  var xhr = new XMLHttpRequest();
  xhr.open(
    'POST',
    encodeURI(
      `https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/764fc03f-d8f1-4f1e-9d68-512e91bbf83d/v1/synthesize`,
    ),
    true,
  );
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'audio/mpeg');
  xhr.setRequestHeader(
    'Authorization',
    'Basic ' + btoa(`apikey:8xR06CPrK5zB1ejIrfB1RgcA5SbmQJCMF3Xx8wmJTUxB`),
  );
  xhr.responseType = 'blob';
  xhr.onload = (evt) => {
    var blob = new Blob([xhr.response], { type: 'audio/mpeg' });
    var objectUrl = URL.createObjectURL(blob);
    audio.src = objectUrl;
    audio.onload = (evt) => {
      URL.revokeObjectURL(objectUrl);
    };
    audio.play().then();
  };
  var data = JSON.stringify({ text });
  xhr.send(data);
};
