import { storageService } from '../async-storage.service'
import { userService } from '../user'

import {
  loadFromStorage,
  saveToStorage,
  createStayObject,
} from '../util.service'

const STORAGE_KEY = 'stayDB'
var gStays
_createStays(50)

export const stayService = {
  query,
  getById,
  save,
  remove,
}
window.cs = stayService


async function query(filterBy = getDefaultFilter()) {
  var stays = await storageService.query(STORAGE_KEY);
  const { txt, label, startDate, endDate, minPrice, maxPrice, guests = {}, continent, country } = filterBy;

  if (txt) {
    const regex = new RegExp(txt, 'i');
    stays = stays.filter(
      (stay) => regex.test(stay.loc.city) || regex.test(stay.loc.country) || regex.test(stay.loc.continent)
    );
  }

  if (label) {
    stays = stays.filter((stay) => stay.labels.includes(label));
  }

  if (continent) {
    stays = stays.filter((stay) => stay.loc.continent === continent);
  }

  if (country) {
    stays = stays.filter((stay) => stay.loc.country === country);
  }

  if (startDate && endDate) {
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);

    stays = stays.filter((stay) => {
      const [startStr, endStr] = stay.dateRange.split(' - ');
      const stayStartDate = new Date(`${startStr} ${new Date().getFullYear()}`);
      const stayEndDate = new Date(`${endStr} ${new Date().getFullYear()}`);

      return (
        (stayStartDate >= filterStartDate && stayStartDate <= filterEndDate) ||
        (stayEndDate >= filterStartDate && stayEndDate <= filterEndDate) ||
        (stayStartDate <= filterStartDate && stayEndDate >= filterEndDate)
      );
    });
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    stays = stays.filter(
      (stay) => stay.price >= minPrice && stay.price <= maxPrice
    );
  }

  // Ensure guests filter is applied correctly
  const { adults = 0, children = 0 } = guests;
  stays = stays.filter((stay) => stay.capacity >= (adults + children));

  return stays;
}



function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  let savedStay
  if (stay._id) {
    const existingStay = await storageService.get(STORAGE_KEY, stay._id)
    if (existingStay) {
      savedStay = await storageService.put(STORAGE_KEY, {
        ...existingStay,
        ...stay,
      })
    } else {
      throw new Error(
        `Update failed, cannot find entity with id: ${stay._id} in: ${STORAGE_KEY}`
      )
    }
  } else {
    const stayToSave = createStayObject(stay)
    savedStay = await storageService.post(STORAGE_KEY, stayToSave)
  }
  return savedStay
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
  const newStayData = {}
  return createStayObject(newStayData)
}
