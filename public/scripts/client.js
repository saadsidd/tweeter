/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Creates identical new tweet from following string template
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

    <div class="tweet-content">${data.content.text}</div>

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

// Loops through tweets from database and renders them all on page
const renderTweets = function(tweets) {
  for (let i = tweets.length - 1; i >= 0; i--) {
    const $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
};

$('document').ready(() => {

  // Render tweets whenever page is loaded/refreshed
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (data) => {
        renderTweets(data);
      }
    });
  };
  loadTweets();

  // For attaching newly submitted tweet to #tweets-container
  const prependSubmittedTweet = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (data) => {
        console.log(data[data.length - 1]);
        $('#tweets-container').prepend(createTweetElement(data[data.length - 1]));
      }
    });
  };

  // Form submit event listener
  // Error if empty tweet and tweet too long
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const $tweetTextArea = $('#tweet-text-area');
    if ($tweetTextArea.val() === '') {
      alert('Tweet cannot be empty!');

    } else if ($tweetTextArea.val().length > 140) {
      alert('Tweet is too long!');

    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: () => {
          prependSubmittedTweet();
        }
      });

      $tweetTextArea.val('');
    }
  });
});