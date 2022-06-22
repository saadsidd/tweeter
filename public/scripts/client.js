/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


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
      <div>${Math.floor((Date.now() - data.created_at) / 86400000)} days ago</div>
      <div class="icons">
        <i class="fa-solid fa-flag icon"></i>
        <i class="fa-solid fa-retweet icon"></i>
        <i class="fa-solid fa-heart icon"></i>
    </div>
    </footer>
  </article>
  `;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

$('document').ready(() => {
  renderTweets(data);

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    });
  });
});