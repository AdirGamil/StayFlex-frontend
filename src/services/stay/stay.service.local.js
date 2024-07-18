import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { userService } from '../user'


const STORAGE_KEY = 'stayDB'
var gStays
_createStays()

export const stayService = {
    query,
    getById,
    save,
    remove,
    // addStayMsg
}
window.cs = stayService

async function query(filterBy = { txt: ''}) {
    var stays = await storageService.query(STORAGE_KEY)
    const { txt } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
    }
    stays = stays.map(({ _id, name }) => ({ _id, name }))
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
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,       }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            name: stay.name,
            // Later, owner is set by the backend
            // owner: userService.getLoggedinUser(),
            // msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

// async function addStayMsg(stayId, txt) {
//     // Later, this is all done by the backend
//     const stay = await getById(stayId)

//     const msg = {
//         id: makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     stay.msgs.push(msg)
//     await storageService.put(STORAGE_KEY, stay)

//     return msg
// }

function _createStays() {
    gStays = loadFromStorage(STORAGE_KEY)
    if (gStays && gStays.length) return

    // If no stays in storage - generate demo data
    gStays = []
    gStays.push(_createStay('puki'))
    gStays.push(_createStay('muki'))
    gStays.push(_createStay('bobo'))
    gStays.push(_createStay('popo'))
    gStays.push(_createStay('lala'))
    gStays.push(_createStay('dolev'))
    _saveStaysToStorage()
}

function _saveStaysToStorage() {
    saveToStorage(STORAGE_KEY, gStays)
}

function _createStay(name) {
    return {
        _id: makeId(),
        name,
    };
}

// function _createStay() {
//     return {
//         _id: utilService.makeId(),
//         name: 'Ribeira Charming Duplex',
//         type: 'House',
//         imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
//         price: 80.0,
//         summary: 'Fantastic duplex apartment...',
//         capacity: 8,
//         amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
//         labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
//         host: {
//             _id: utilService.makeId(),
//             fullname: 'Davit Pok',
//             imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
//         },
//         loc: {
//             country: 'Portugal',
//             countryCode: 'PT',
//             city: 'Lisbon',
//             address: '17 Kombo st',
//             lat: -8.61308,
//             lng: 41.1413,
//         },
//         reviews: [
//             {
//                 id: utilService.makeId(),
//                 txt: 'Very helpful hosts. Cooked traditional...',
//                 rate: 4,
//                 by: {
//                     _id: utilService.makeId(),
//                     fullname: 'user2',
//                     imgUrl: '/img/img2.jpg',
//                 },
//             },
//         ],
//         likedByUsers: ['mini-user'],
//     };
// }