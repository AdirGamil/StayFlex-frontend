import {
  names,
  types,
  countries,
  cities,
  labels,
  imgUrls,
  maleFirstNames,
  lastNames,
  coordinates,
  amenities,
} from './data.service'

import { userService } from './user'

export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function getRandomAmenities(min = 4) {
  const shuffled = amenities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, getRandomIntInclusive(min, amenities.length));
}

export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function getRandomHostImg() {
  const randomId = Math.floor(Math.random() * 100)
  return `https://randomuser.me/api/portraits/men/${randomId}.jpg`
}

export function getRandomMaleName() {
  const firstName =
    maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  return `${firstName} ${lastName}`
}

export function createStayObject(stay) {
  const reviews = stay.reviews || generateRandomReviews(6)
  const averageRating = calculateAverageRating(reviews)

  const location = stay.loc || getRandomLocation()

  return {
    _id: makeId(),
    name: stay.name || getRandomElement(names),
    type: stay.type || getRandomElement(types),
    imgUrls: stay.imgUrls || getRandomImgUrls(imgUrls),
    price: stay.price || getRandomIntInclusive(150, 1350),
    summary: stay.summary || makeLorem(50),
    capacity: stay.capacity || getRandomIntInclusive(1, 6),
    bedrooms: stay.bedrooms || getRandomIntInclusive(1, 6),
    baths: stay.baths || getRandomIntInclusive(1, 6),
    beds: stay.beds || getRandomIntInclusive(1, 6),
    amenities: stay.amenities || getRandomAmenities(4),
    labels: stay.labels || getRandomLabels(labels),
    loc: location,
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

export function createStayRemote(stay) {
  const reviews = stay.reviews || generateRandomReviews(237)
  const averageRating = calculateAverageRating(reviews)

  const location = stay.loc || getRandomLocation()

  return {
    name: stay.name || getRandomElement(names),
    type: stay.type || getRandomElement(types),
    imgUrls: stay.imgUrls || getRandomImgUrls(imgUrls),
    price: stay.price || getRandomIntInclusive(35, 280),
    summary: stay.summary || makeLorem(50),
    capacity: stay.capacity || getRandomIntInclusive(1, 6),
    bedrooms: stay.bedrooms || getRandomIntInclusive(1, 6),
    baths: stay.baths || getRandomIntInclusive(1, 6),
    beds: stay.beds || getRandomIntInclusive(1, 6),
    amenities: stay.amenities || getRandomAmenities(4),
    labels: stay.labels || getRandomLabels(labels),
    loc: location,
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

  const lat = coordinates[city]
    ? coordinates[city].lat
    : parseFloat((Math.random() * 180 - 90).toFixed(5))
  const lng = coordinates[city]
    ? coordinates[city].lng
    : parseFloat((Math.random() * 360 - 180).toFixed(5))

  return {
    country,
    countryCode: country.substring(0, 2).toUpperCase(),
    city,
    address: getRandomAddress(),
    lat,
    lng,
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

export function getRandomImgUrls() {
  const shuffled = [...imgUrls].sort(() => 0.5 - Math.random())
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
  return (sum / reviews.length).toFixed(2)
}

export function generateRandomReviews(numReviews) {
  const reviewTexts = [
      'Staying at this house was a dream! The host was super accommodating, the location was perfect, and the view from the balcony was breathtaking. Would love to come back again!',
      'Angel was warm and welcoming and has a beautiful apartment. Id recommend his place to anyone visiting downtown Montreal!',
      'Had a fantastic stay here. The house was clean, cozy, and had all the amenities we needed. The host was friendly and gave us great local tips. Highly recommend!',
      'This house exceeded our expectations! The decor was stylish, the beds were comfortable, and the kitchen was well-equipped. Perfect for a family vacation. We had an amazing time!',
      'The place was clean and well-maintained.',
      'Our stay was nothing short of perfect! The host was attentive, the location was convenient, and the house was spotless. We felt right at home!',
      'Highly recommend this place! The host went above and beyond to make our stay enjoyable. The neighborhood was quiet and safe.',
      'The accommodation was excellent. The house was beautifully decorated and very comfortable. The host provided everything we needed.',
      'An outstanding experience! The host was incredibly kind, and the house was just as described. We will definitely be back.',
      'We had a wonderful time staying here. The house was spacious, clean, and had a lovely garden. The host was very hospitable.',
      'Fantastic location and superb hospitality. The house was equipped with all modern conveniences. We enjoyed our stay immensely.',
      'The perfect getaway! The house was charming and cozy, with everything we needed for a relaxing vacation. The host was very welcoming.',
      'Couldn’t have asked for a better place to stay. The host was friendly and the house was pristine. We’ll be recommending this to our friends.',
      'The host was incredibly helpful and the house was stunning. We loved the stylish interiors and comfortable beds.',
      'An amazing place to stay! The house was beautifully maintained and the host provided excellent recommendations for local attractions.',
      'This place is a gem! The house was lovely and the host made sure we had everything we needed for a perfect stay.',
      'Absolutely wonderful stay! The house was clean, the host was friendly, and the location was ideal for exploring the area.',
      'We had an unforgettable stay here. The house was spacious, the host was gracious, and the amenities were top-notch.',
      'A true home away from home. The host was delightful, and the house had everything we could have wanted. Highly recommend!',
      'The best vacation rental we’ve ever stayed at. The host was attentive, the house was beautifully decorated, and the location was perfect.',
      'Such a delightful stay! The house was spotless, the beds were comfortable, and the host was incredibly welcoming.',
      'We thoroughly enjoyed our stay. The house was cozy, the host was kind, and the surrounding area was beautiful.',
      'An excellent experience! The house was well-kept, the host was friendly, and the location was convenient for all our activities.',
      'A fantastic place to stay! The house was charming, the host was wonderful, and the local area had plenty to offer.',
      'We loved every moment of our stay. The house was pristine, the host was helpful, and the location was perfect for our needs.',
      'A wonderful retreat. The house was lovely, the host was gracious, and we felt very much at home during our stay.',
      'Perfect in every way! The house was clean, the host was accommodating, and the location was excellent.',
      'Highly recommend this property. The house was stylish and comfortable, and the host made us feel very welcome.',
      'An amazing experience from start to finish. The house was beautiful, the host was attentive, and the location was fantastic.',
      'Couldn’t have asked for a better stay. The house was immaculate, the host was delightful, and the area was perfect for our vacation.',
      'We had a lovely stay. The house was well-appointed, the host was friendly, and the surroundings were peaceful.',
      'A truly exceptional stay. The house was gorgeous, the host was gracious, and we had everything we needed for a perfect vacation.',
      'An unforgettable experience. The house was cozy, the host was accommodating, and the location was ideal.',
      'We felt right at home. The house was beautiful, the host was welcoming, and the amenities were fantastic.',
      'A perfect vacation spot. The house was charming, the host was wonderful, and the local area was full of great attractions.',
      'Couldn’t recommend this place more. The house was spotless, the host was friendly, and the location was convenient.',
      'An outstanding stay. The house was beautiful, the host was attentive, and we had a fantastic time.',
      'A truly wonderful place to stay. The house was well-maintained, the host was friendly, and the surroundings were lovely.',
      'We had a fantastic stay. The house was comfortable, the host was gracious, and the area was perfect for our holiday.',
      'A perfect stay from beginning to end. The house was beautiful, the host was accommodating, and the location was ideal.',
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
    const randomRate = getRandomIntInclusive(5, 5) // Generates a random rate between 1 and 5
    const randomUser = userNames[Math.floor(Math.random() * userNames.length)]
    const randomImgUrl = `https://randomuser.me/api/portraits/med/${Math.random() < 0.5 ? 'men' : 'women'
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
  const start = new Intl.DateTimeFormat('en-US', options).format(
    new Date(startDate)
  )
  const end = new Intl.DateTimeFormat('en-US', options).format(
    new Date(endDate)
  )
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
    isContinent: false,
  },
  {
    name: 'Europe',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1722264608/7b5cf816-6c16-49f8-99e5-cbc4adfd97e2_csadpd.webp',
    isContinent: true,
  },
  {
    name: 'Italy',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464643/ea5598d7-2b07-4ed7-84da-d1eabd9f2714_sxwylp.webp',
    isContinent: false,
  },
  {
    name: 'United States',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464653/4e762891-75a3-4fe1-b73a-cd7e673ba915_h8770b.webp',
    isContinent: false,
  },
  {
    name: 'Greece',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464646/09be1400-6a42-4a4f-90f6-897e50110031_o1bcd5.webp',
    isContinent: false,
  },
  {
    name: 'South America',
    map: 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721464650/06a30699-aead-492e-ad08-33ec0b383399_gqqwty.webp',
    isContinent: true,
  },
]

export const amenityIcons = {
  'Wifi': 'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721722908/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_2_ttkoym.svg',
  'Hair dryer':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721722141/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_1_gbrmgx.svg',
  'star': 'https://res.cloudinary.com/dhweqnxgd/image/upload/v1721294785/star_us9ozb.png',
  'heart':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471955/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_rtstwz.svg',
  'share':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721471943/svg_xml_base64_PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBmaWxsOiBub25_lbzdem.svg',
  'Dryer':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723058/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_3_ragj7v.svg',
  'Wineglasses':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723188/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_4_kygktq.svg',
  'Cooking basics':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723388/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_5_v24dsh.svg',
  'Ev charger':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723478/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_6_svffx5.svg',
  'Carbon monoxide alarm':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721723578/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_7_isgcfs.svg',
  'Extra pillows and blankets':
    'https://res.cloudinary.com/dyhmjlymk/image/upload/v1721725228/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_8_lsbqpc.svg',
  'TV':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721908788/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDI0_g0kyfy.svg',
  'Garden view':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1721908837/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_1_kdwdla.svg',
  'Resort access':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722105013/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_13_c0msda.svg ',
  'Iron':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104922/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_6_s859kn.svg ',
  'Shampoo':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104922/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_7_rlc1cr.svg',
  'Crib':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104921/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_8_vvlc5p.svg ',
  'Air conditioning':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104921/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_5_nflgco.svg ',
  'Heating':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104921/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_9_idfq5z.svg',
  'Smoke alarm':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104921/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_10_uwy6cf.svg ',
  'Pet allowed':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104919/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_3_qbskeg.svg ',
  'Dedicated workspace':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104919/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_4_nm06ml.svg ',
  'First aid kit':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104920/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_12_b39x8o.svg ',
  'Fire extinguisher':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104919/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_11_orbsrk.svg ',
  'Bay view':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722104919/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6_2_zfvfoz.svg ',
  Essentials:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722105824/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_15_bvtevs.svg ',
  'Hot water':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722105825/svg_xml_base64_PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDI0_e3sluj.svg',
  'Dishes and silverware':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722105824/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_17_fwwxd3.svg ',
  Stove:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722105823/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_18_g2y6mn.svg',
  Refrigerator:
    ' https://res.cloudinary.com/doahdwb2g/image/upload/v1722105824/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_16_yrd9kt.svg',
  'Bed linens':
    ' https://res.cloudinary.com/doahdwb2g/image/upload/v1722106676/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_20_af7d3m.svg',
  'Board games':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722106673/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_22_flhrf6.svg ',
  'Laundromat nearby':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722106672/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_24_lrf2r3.svg ',
  'Outdoor furniture':
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722106671/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_25_pjrurz.svg ',
  Coffee:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722106673/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_23_ewtrye.svg ',
  Hangers:
    'https://res.cloudinary.com/doahdwb2g/image/upload/v1722106671/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_19_wz46z1.svg',
  ' ': ' ',
}
