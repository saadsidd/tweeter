// EventListeners for button to scroll to top, show/hide tweet form
// and tweet character counter
$(document).ready(function() {

  const $writeANewTweet = $('#write-a-new-tweet-container');
  const $tweetForm = $('#tweet-form');
  const $tweetTextArea = $('#tweet-text-area');
  const $counter = $('.counter[for="tweet-text-area"]');
  const $toTopButton = $('#to-top-button');

  // Fade in to-top button if user scrolls down enough
  $toTopButton.hide();
  $(document).on('scroll', () => {
    if ($(document).scrollTop() > 200) {
      $toTopButton.fadeIn(100);
      $writeANewTweet.fadeOut(100);
    } else {
      $toTopButton.fadeOut(100);
      $writeANewTweet.fadeIn(100);
    }
  });
  // Animate scrolling all the way up if to-top button is clicked
  // and open/focus on tweet form
  $toTopButton.on('click', () => {
    $('html,body').animate({scrollTop: 0});
    if ($tweetForm.first().is(":hidden")) {
      $writeANewTweet.click();
    } else {
      $tweetTextArea.focus();
    }
  });


  // Hide/show the tweet form upon 'Write a new tweet' click
  $tweetForm.hide();
  $writeANewTweet.on('click', () => {
    if ($tweetForm.first().is(":hidden")) {
      $tweetForm.slideDown();
      $tweetTextArea.focus();
    } else {
      $tweetForm.slideUp();
    }
  });


  // Update character counter as user types a new tweet
  $tweetTextArea.on('input', function() {

    $counter.val(140 - $(this).val().length);

    if (Number($counter.val()) < 0) {
      $counter.css('color', '#FF0000');
    } else {
      $counter.css('color', '#545149');
    }
  });

});