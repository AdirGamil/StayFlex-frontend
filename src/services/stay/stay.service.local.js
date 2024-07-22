import { storageService } from '../async-storage.service'
import { userService } from '../user'

import {
  makeId,
  makeLorem,
  getRandomLabels,
  getRandomImgUrls,
  getRandomKilometersAway,
  getDateRange,
  loadFromStorage,
  saveToStorage,
  generateRandomReviews,
  getRandomElement,
  getRandomLocation,
  createStayObject,
} from '../util.service'
import {
  names,
  types,
  countries,
  cities,
  labels,
  imgUrls,
} from '../data.service'

const STORAGE_KEY = 'stayDB'
var gStays
_createStays(18)

export const stayService = {
  query,
  getById,
  save,
  remove,
}
window.cs = stayService

async function query(
  filterBy = {
    txt: '',
    label: '',
    startDate: '',
    endDate: '',
    minPrice: 10,
    maxPrice: 570,
  }
) {
  var stays = await storageService.query(STORAGE_KEY)
  const { txt, label, startDate, endDate } = filterBy

  if (txt) {
    const regex = new RegExp(txt, 'i')
    stays = stays.filter(
      (stay) => regex.test(stay.loc.city) || regex.test(stay.loc.country)
    )
  }

  if (label) {
    stays = stays.filter((stay) => stay.labels.includes(label))
  }

  if (startDate && endDate) {
    const filterStartDate = new Date(startDate)
    const filterEndDate = new Date(endDate)

    stays = stays.filter((stay) => {
      const [startStr, endStr] = stay.dateRange.split(' - ')
      const stayStartDate = new Date(`${startStr} ${new Date().getFullYear()}`)
      const stayEndDate = new Date(`${endStr} ${new Date().getFullYear()}`)

      return (
        (stayStartDate >= filterStartDate && stayStartDate <= filterEndDate) ||
        (stayEndDate >= filterStartDate && stayEndDate <= filterEndDate) ||
        (stayStartDate <= filterStartDate && stayEndDate >= filterEndDate)
      )
    })

    if (minPrice !== undefined && maxPrice !== undefined) {
      stays = stays.filter(
        (stay) => stay.price >= minPrice && stay.price <= maxPrice
      )
    }
  }

  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}


async function save(stay) {
  let savedStay;
  if (stay._id) {
    const existingStay = await storageService.get(STORAGE_KEY, stay._id);
    if (existingStay) {
      savedStay = await storageService.put(STORAGE_KEY, {
        ...existingStay,
        ...stay,
      });
    } else {
      throw new Error(`Update failed, cannot find entity with id: ${stay._id} in: ${STORAGE_KEY}`);
    }
  } else {
    const stayToSave = createStayObject(stay);
    savedStay = await storageService.post(STORAGE_KEY, stayToSave);
  }
  return savedStay;
}

function _createStays(num = 20) {
  gStays = loadFromStorage(STORAGE_KEY)
  if (gStays && gStays.length) return

  gStays = []
  for (let i = 0; i < num; i++) {
    gStays.push(_createStay())
  }
  _saveStaysToStorage()
}

function _saveStaysToStorage() {
  saveToStorage(STORAGE_KEY, gStays)
}

function _createStay() {
  // הכנת נתונים ליצירת stay חדש
  const newStayData = {
    name: getRandomElement(names),
    type: getRandomElement(types),
    loc: getRandomLocation(),
    imgUrls: getRandomImgUrls(imgUrls),
    price: Math.floor(Math.random() * 1200) + 100,
    summary: makeLorem(40),
    capacity: Math.floor(Math.random() * 10) + 1,
    beds: Math.floor(Math.random() * 6) + 1,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: getRandomLabels(labels),
    reviews: generateRandomReviews(5),
    kilometersAway: getRandomKilometersAway(),
    dateRange: getDateRange(),
    likedByUsers: ['mini-user'],
    host: {
      _id: makeId(),
      fullname: 'Denis Libin',
      imgUrl: 'https://robohash.org/denis',
    }
  };

  // שימוש בפונקציה createStayObject ליצירת אובייקט stay מלא
  return createStayObject(newStayData);
}
