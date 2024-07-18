const STORAGE_KEY = 'stayDB'

var gStays

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
        _id: utilService.makeId(),
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














const stay = {
    _id: 's101',
    name: 'Ribeira Charming Duplex',
    type: 'House',
    imgUrls: ['https://e26e9b.jpg', 'otherImg.jpg'],
    price: 80.0,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
        _id: 'u101',
        fullname: 'Davit Pok',
        imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Lisbon',
        address: '17 Kombo st',
        lat: -8.61308,
        lng: 41.1413,
    },
    reviews: [
        {
            id: 'madeId',
            txt: 'Very helpful hosts. Cooked traditional...',
            rate: 4,
            by: {
                _id: 'u102',
                fullname: 'user2',
                imgUrl: '/img/img2.jpg',
            },
        },
    ],
    likedByUsers: ['mini-user'],
}