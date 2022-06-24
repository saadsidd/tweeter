// Returns string template below filled in with new tweet data
const createTweetElement = function(data) {
  return `
  <article class="tweet">
    <header>
      <div class="avatar-and-name">
        <img src=${data.user.avatars}>
        <div>${data.user.name}</div>
      </div>
      <div>${data.user.handle}</div>
    </header>

    <div class="tweet-content">${esc(data.content.text)}</div>

    <footer>
      <div>${timeago.format(data.created_at)}</div>
      <div class="icons">
        <i class="fa-solid fa-flag icon"></i>
        <i class="fa-solid fa-retweet icon"></i>
        <i class="fa-solid fa-heart icon"></i>
    </div>
    </footer>
  </article>
  `;
};

// Convert tweet body content using createTextNode to avoid XSS
const esc = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Loops through tweets from database and renders them all on page
const renderTweets = function(tweets) {
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
};

// AJAX/EventListener for only when DOM is fully loaded
$('document').ready(() => {

  const loadTweets = function(successCallback) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (data) => {
        successCallback(data);
      }
    });
  };
  // Render tweets whenever page is loaded/refreshed
  loadTweets(renderTweets);

  // Event listener for form submission
  // Shows error if empty tweet or tweet too long
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const $tweetTextArea = $('#tweet-text-area');
    // Remove whitepace from both ends of tweet
    $tweetTextArea.val($tweetTextArea.val().trim());

    const $errorLabel = $('#tweet-button-error-and-limit label');
    // Initially hide error message on every form submit
    $errorLabel.slideUp(100);

    if ($tweetTextArea.val() === '') {
      $errorLabel.html('<i class="fa-solid fa-triangle-exclamation"></i> Tweet cannot be empty!');
      $errorLabel.slideDown(100);
      $tweetTextArea.focus();
      // Setting counter to 140 here in case trimming whitespace resulted in empty tweet
      $('.counter[for="tweet-text-area"]').val(140);

    } else if ($tweetTextArea.val().length > 140) {
      $errorLabel.html('<i class="fa-solid fa-triangle-exclamation"></i> Tweet is too long!');
      $errorLabel.slideDown(100);
      $tweetTextArea.focus();

    } else {
      // Handling valid non-empty/below-140 tweet POST request by prepending new
      // tweet to #tweets-container, emptying textarea, and setting counter back to 140
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: () => {
          loadTweets((data) => {
            $('#tweets-container').prepend(createTweetElement(data[data.length - 1]));
          });
          $tweetTextArea.val('');
          $('.counter[for="tweet-text-area"]').val(140);
        }
      });
    }
  });
  
});