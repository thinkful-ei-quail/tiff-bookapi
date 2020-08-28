const {v4: uuid} = require('uuid');

const bookmarks = [
  {
    id: uuid(),
    title: 'Facebook',
    url: 'https://www.facebook.com',
    description: 'Connect with friends, family and other people you know.',
    rating: 3
  },
  {
    id: uuid(),
    title: 'Youtube',
    url: 'https://www.youtube.com',
    description: 'Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.',
    rating: 4
  },
  {
    id: uuid(),
    title: 'Instagram',
    url: 'https://www.instagram.com',
    description: 'A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.',
    rating: 5
  },
  {
    id: uuid(),
    title: 'Github',
    url: 'https://www.github.com',
    description: 'File-sharing with other developers.',
    rating: 4
  }
];

module.exports ={ bookmarks };