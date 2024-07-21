export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export function getRandomLabels(labels) {
  const numLabels = Math.floor(Math.random() * labels.length) + 1
  const shuffled = labels.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, numLabels)
}

export function getRandomImgUrls(imgUrls) {
  const shuffled = imgUrls.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 5)
}

export function getRandomKilometersAway() {
  return Math.floor(Math.random() * 100) + 1
}

export function getDateRange() {
  const getRandomDate = (start, end) => {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
    return date
  }

  const start = new Date()
  const end = new Date()
  end.setFullYear(start.getFullYear() + 1)

  const startDate = getRandomDate(start, end)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1) // Random end date within 1-5 days from start date

  const options = { month: 'short', day: 'numeric' }
  const startFormatted = new Intl.DateTimeFormat('en-US', options).format(
    startDate
  )
  const endFormatted = new Intl.DateTimeFormat('en-US', options).format(endDate)

  return `${startFormatted} - ${endFormatted}`
}

export function generateRandomReviews(numReviews) {
  const reviewTexts = [
    'Very helpful hosts. Cooked traditional...',
    'Amazing stay! Highly recommend.',
    'It was a pleasant experience.',
    'Could be better, but overall not bad.',
    'I did not enjoy my stay here.',
    'The host was very helpful and friendly.',
    'The place was clean and well-maintained.'
  ];

  const userNames = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis', 'Dana Evans'];

  const reviews = [];

  for (let i = 0; i < numReviews; i++) {
    const randomText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const randomRate = Math.floor(Math.random() * 5) + 1; // Generates a random rate between 1 and 5
    const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
    const randomImgUrl = `https://randomuser.me/api/portraits/med/${Math.random() < 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;

    reviews.push({
      id: makeId(),
      txt: randomText,
      rate: randomRate,
      by: {
        _id: makeId(),
        fullname: randomUser,
        imgUrl: randomImgUrl
      }
    });
  }

  return reviews;
}