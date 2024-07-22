import {
  names,
  types,
  countries,
  cities,
  labels,
  imgUrls,
  maleFirstNames,
  lastNames,
} from './data.service'

export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomHostImg() {
  const randomId = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/men/${randomId}.jpg`;
}

export function getRandomMaleName() {
  const firstName = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

export function createStayObject(stay) {
  const reviews = stay.reviews || generateRandomReviews(5)
  const averageRating = calculateAverageRating(reviews)

  return {
    _id: makeId(),
    name: stay.name || getRandomElement(names),
    type: stay.type || getRandomElement(types),
    imgUrls: stay.imgUrls || getRandomImgUrls(imgUrls),
    price: stay.price || getRandomIntInclusive(150, 1350),
    summary: stay.summary || 'Fantastic duplex apartment...',
    capacity: stay.capacity || getRandomIntInclusive(1, 6),
    bedrooms : stay.bedrooms  || getRandomIntInclusive(1, 6),
    baths: stay.baths || getRandomIntInclusive(1, 6),
    beds: stay.beds || getRandomIntInclusive(1, 6),
    amenities: stay.amenities || [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: stay.labels || getRandomLabels(labels),
    loc: stay.loc || getRandomLocation(),
    reviews: reviews,
    kilometersAway: stay.kilometersAway || getRandomKilometersAway(),
    dateRange: stay.dateRange || getDateRange(),
    likedByUsers: stay.likedByUsers || ['mini-user'],
    owner: userService.getLoggedinUser(),
    host: stay.host || {
      _id: makeId(),
      fullname: getRandomMaleName(),
      imgUrl: getRandomHostImg(),
    },
    averageRating: averageRating,
  }
}

export function getRandomAddress() {
  const streetNames = [
    'Main',
    'Broad',
    'Market',
    'Elm',
    'Maple',
    'Oak',
    'Pine',
    'Cedar',
    'Birch',
    'Spruce',
    'Willow',
  ]
  return `${Math.floor(Math.random() * 100)} ${getRandomElement(
    streetNames
  )} st`
}

export function getRandomLocation() {
  const countryObj = getRandomElement(countries)
  const country = countryObj.name
  const continent = countryObj.continent
  const city = cities[country]
    ? getRandomElement(cities[country])
    : 'Unknown city'

  return {
    country,
    countryCode: country.substring(0, 2).toUpperCase(),
    city,
    address: getRandomAddress(),
    lat: parseFloat((Math.random() * 180 - 90).toFixed(5)),
    lng: parseFloat((Math.random() * 360 - 180).toFixed(5)),
    continent,
  }
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

export function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) {
    return 'New'
  }
  const sum = reviews.reduce((acc, review) => acc + review.rate, 0)
  return (sum / reviews.length).toFixed(1)
}

export function generateRandomReviews(numReviews) {
  const reviewTexts = [
    'Very helpful hosts. Cooked traditional...',
    'Amazing stay! Highly recommend.',
    'It was a pleasant experience.',
    'Could be better, but overall not bad.',
    'I did not enjoy my stay here.',
    'The host was very helpful and friendly.',
    'The place was clean and well-maintained.',
  ]

  const userNames = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Charlie Davis',
    'Dana Evans',
  ]

  const reviews = []

  for (let i = 0; i < numReviews; i++) {
    const randomText =
      reviewTexts[Math.floor(Math.random() * reviewTexts.length)]
    const randomRate = getRandomIntInclusive(4, 5) // Generates a random rate between 1 and 5
    const randomUser = userNames[Math.floor(Math.random() * userNames.length)]
    const randomImgUrl = `https://randomuser.me/api/portraits/med/${
      Math.random() < 0.5 ? 'men' : 'women'
    }/${Math.floor(Math.random() * 100)}.jpg`

    reviews.push({
      by: {
        fullname: randomUser,
        imgUrl: randomImgUrl,
        _id: makeId(),
      },
      id: makeId(),
      rate: randomRate,
      txt: randomText,
    })
  }

  return reviews
}

export function formatDateRange(startDate, endDate) {
  const options = { day: '2-digit', month: 'short' }
  const start = new Intl.DateTimeFormat('en-US', options).format(new Date(startDate))
  const end = new Intl.DateTimeFormat('en-US', options).format(new Date(endDate))
  return `${start} - ${end}`
}

export function pluralize(count, singular, plural = null) {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${plural || singular + 's'}`
}

export function getRandomDateWithinRange(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
  return date
}
export const labelImageMap = {
  'Amazing views':
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063768/amazing_views_vhyqc9.png',
  Beachfront:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063844/beachfront_uz0otv.png',
  'OMG!':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305531/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6_oqqvwe.png',
  'Ski-in/out':
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717064109/ski-in-out_ggsokt.png',
  Trending:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721403580/3726d94b-534a-42b8-bca0-a0304d912260_uroff3.png',
  'Amazing pools':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305438/3fb523a0-b622-4368-8142-b5e03df7549b_qut8wq.png',
  Lakefront:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717064015/lakefront_ze7yei.png',
  Castles:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721403848/1b6a8b70-a3b6-48b5-88e1-2243d9172c06_yhxsgi.png ',
  Cabins:
    ' https://res.cloudinary.com/doahdwb2g/image/upload/v1721403798/732edad8-3ae0-49a8-a451-29a8010dcc0c_v6hgvy.png',
  Design:
    ' https://res.cloudinary.com/doahdwb2g/image/upload/v1721403801/50861fca-582c-4bcc-89d3-857fb7ca6528_mukxv4.png',
  Islands:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063979/islands_qcbnis.png',
  Luxe: 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064051/luxe_mhbmqv.png',
  Countryside:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721403880/6ad4bd95-f086-437d-97e3-14d12155ddfe_w5bn5e.png',
  Treehouses:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404066/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e_igeblt.png',
  Mansions:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717064069/mansions_wjeeml.png',
  Farms:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063953/farms_kwoc0s.png',
  Boats:
    ' https://res.cloudinary.com/doahdwb2g/image/upload/v1721404181/687a8682-68b3-4f21-8d71-3c3aef6c1110_pwwnch.png',
  'Off-the-grid':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404186/9a2ca4df-ee90-4063-b15d-0de7e4ce210a_jbhrvo.png ',
  'Historical homes':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404189/33dd714a-7b4a-4654-aaf0-f58ea887a688_u7abj5.png ',
  'National parks':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404256/c0a24c04-ce1f-490c-833f-987613930eca_gyxpst.png',
  'Top cities':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404259/ed8b9e47-609b-44c2-9768-33e6a22eccb2_ueyhlr.png ',
  Vineyards:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717064201/vineyards_hvypws.png',
  Play: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416377/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf_q0mpzw.png',
  Camping:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063890/camping_jeueuk.png',
  Domes:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416382/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca_e182yp.png',
  'Earth homes':
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063931/earth_homes_ln2zty.png',
  Tropical:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416382/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca_e182yp.png',
  'Creative spaces':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416482/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622_iubncy.png',
  'Tiny homes':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416545/3271df99-f071-4ecf-9128-eb2d2b1f50f0_imkpcj.png',
  'Grand pianos':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416548/8eccb972-4bd6-43c5-ac83-27822c0d3dcd_fcpdsj.png',
  'A-frames':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416572/1d477273-96d6-4819-9bda-9085f809dad3_qzyqjk.png',
  'Bed & breakfasts':
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063869/bed_breakfasts_emhbwj.png',
  Desert:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063911/desert_asovai.png',
  'Chefs kitchens':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416662/ddd13204-a5ae-4532-898c-2e595b1bb15f_m0llqg.png',
  Skiing:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717064091/skiing_ccby2m.png',
  New: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416688/c0fa9598-4e37-40f3-b734-4bd0e2377add_ejj1rt.png',
  Caves:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416719/4221e293-4770-4ea8-a4fa-9972158d4004_uyepcx.png',
  Damnusi:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416786/c9157d0a-98fe-4516-af81-44022118fbc7_wqfjgi.png',
  Barns:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417016/f60700bc-8ab5-424c-912b-6ef17abc479a_yyvh4c.png',
  Arctic:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417041/8b44f770-7156-4c7b-b4d3-d92549c8652f_rbkzt9.png',
  Surfing:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717064130/surfing_wrxzh4.png',
  Rooms:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417476/7630c83f-96a8-4232-9a10-0398661e2e6f_tjubi8.png',
  'Cycladic homes':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417484/e4b12c1b-409b-4cb6-a674-7c1284449f6e_totehq.png',
  Yurts:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417488/4759a0a7-96a8-4dcd-9490-ed785af6df14_uorulr.png',
  Houseboats:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417598/c027ff1a-b89c-4331-ae04-f8dee1cdc287_u18wre.png',
  Golfing:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417481/6b639c8d-cf9b-41fb-91a0-91af9d7677cc_ioipq1.png',
  'Top of the wotld':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417608/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4_syt4p0.png',
  Windmills:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417612/5cdb8451-8f75-4c5f-a17d-33ee228e3db8_lyzzid.png',
  containers:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417604/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6_ck4dqf.png',
  'Casas particulares':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417683/251c0635-cc91-4ef7-bb13-1084d5229446_ft08nq.png',
  Towers:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417687/d721318f-4752-417d-b4fa-77da3cbc3269_vyopm8.png',
  Ryokans:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721418043/827c5623-d182-474a-823c-db3894490896_lz5nf2.png',
  Campers:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721418039/31c1d523-cc46-45b3-957a-da76c30c85f9_vwvxxj.png',
  Hanoks:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417942/51f5cf64-5821-400c-8033-8a10c7787d69_vgioln.png',
  Minsus:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417946/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049_w9pioh.png',
  'Shepherds huts':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417823/747b326c-cb8f-41cf-a7f9-809ab646e10c_o411uo.png',
  Adapted:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417836/e22b0816-f0f3-42a0-a5db-e0f1fa93292b_icgrxy.png',
  Trulli:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417832/33848f9e-8dd6-4777-b905-ed38342bacb9_ltl8zk.png',
  Riads:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417827/7ff6e4a1-51b4-4671-bc9a-6f523f196c61_vzgf4w.png',
  Lake: 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063997/lake_adozli.png',
  Beach:
    'http://res.cloudinary.com/dqti9icif/image/upload/v1717063824/beach_ugn0q3.png',
}

export const regions = [
  {
    name: "I'm flexible",
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464561/f9ec8a23-ed44-420b-83e5-10ff1f071a13_cecbse.jpg',
  },
  { name: 'Europe', map: 'https://via.placeholder.com/100x100?text=Europe' },
  {
    name: 'Italy',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464643/ea5598d7-2b07-4ed7-84da-d1eabd9f2714_sxwylp.webp',
  },
  {
    name: 'United States',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464653/4e762891-75a3-4fe1-b73a-cd7e673ba915_h8770b.webp',
  },
  {
    name: 'Greece',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464646/09be1400-6a42-4a4f-90f6-897e50110031_o1bcd5.webp',
  },
  {
    name: 'South America',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464650/06a30699-aead-492e-ad08-33ec0b383399_gqqwty.webp',
  },
]
