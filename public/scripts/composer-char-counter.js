$(document).ready(function() {
  $('#tweet-text-area').on('input', function() {

    const $counter = $('.counter[for="tweet-text-area"]');

    $($counter).val(140 - $(this).val().length);

    if (Number($counter.val()) < 0) {
      $counter.css('color', '#FF0000');
    } else {
      $counter.css('color', '#000000');
    }

  });
});