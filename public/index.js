// $('#register-btn').click(() => {
$(document).ready(() => {
  // var audioElement = document.createElement('audio');
  $('#register-btn').click(buttonListener);
  $('.listen-register').click(listenButtonListener);
});
// });

var buttonListener = () => {
  $.post(
    'http://localhost:3000/comments',
    { comment_text: $('#register-input').val() },
    appendData,
  );
};

var appendData = (comment) => {
  $('#list').prepend(`<div class="list-element">${comment.comment_text}</div>`);
};

var listenButtonListener = (text) => {
  retrieveAudio(text);
};

var retrieveAudio = (text) => {
  $.ajax({
    type: 'POST',
    asynchronous: true,
    contentType: 'application/json',
    data: JSON.stringify({ text: `${text}` }),
    accepts: { audio: 'audio/mpeg' },
    url: `https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/764fc03f-d8f1-4f1e-9d68-512e91bbf83d/v1/synthesize`,
    beforeSend: (xhr) => {
      xhr.setRequestHeader(
        'Authorization',
        'Basic ' + btoa(`apikey:8xR06CPrK5zB1ejIrfB1RgcA5SbmQJCMF3Xx8wmJTUxB`),
      );
    },
    success: (data) => {},
  }).done((data) => {
    console.log('yo!');
    var blob = new Blob([data], { type: 'audio/ogg' });
    var blobUrl = URL.createObjectURL(blob);

    $('#source').attr('src', blobUrl);
    $('audio').get(0).load();
    $('audio')
      .get(0)
      .play()
      .then((_) => {})
      .catch(console.log);
    console.log('done!');
  });
};
