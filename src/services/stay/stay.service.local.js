
// import { storageService } from '../async-storage.service'
// import { makeId } from '../util.service'
// import { userService } from '../user'

// const STORAGE_KEY = 'stay'

// export const stayService = {
//     query,
//     getById,
//     save,
//     remove,
//     addStayMsg
// }
// window.cs = stayService


// async function query(filterBy = { txt: '' }) {
//     var stays = await storageService.query(STORAGE_KEY)
//     const { txt } = filterBy

//     if (txt) {
//         const regex = new RegExp(filterBy.txt, 'i')
//         stays = stays.filter(stay => regex.test(stay.name) || regex.test(stay.description))
//     }
    
//     stays = stays.map(({ _id, name, owner }) => ({ _id, name, owner }))
//     return stays
// }

// function getById(stayId) {
//     return storageService.get(STORAGE_KEY, stayId)
// }

// async function remove(stayId) {
//     // throw new Error('Nope')
//     await storageService.remove(STORAGE_KEY, stayId)
// }

// async function save(stay) {
//     var savedStay
//     if (stay._id) {
//         const stayToSave = {
//             _id: stay._id,       }
//         savedStay = await storageService.put(STORAGE_KEY, stayToSave)
//     } else {
//         const stayToSave = {
//             name: stay.name,
//             // Later, owner is set by the backend
//             owner: userService.getLoggedinUser(),
//             msgs: []
//         }
//         savedStay = await storageService.post(STORAGE_KEY, stayToSave)
//     }
//     return savedStay
// }

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
import { makeId } from '../util.service'
import { storageService } from '../async-storage.service'


const STORAGE_KEY = 'stay'


const gStays 
_createStays()


function saveStays() {
    saveToStorage('Stays', gStays)
}

function _createStays() {
    gStays = loadFromStorage('stays')
    if (gStays && gStays.length !== 0) return
    gStays = [
        _createStay('Harry Potter'),
        _createStay('Oliver Twist'),
        _createStay('The Cat In The Hat')
    ]
    saveBooks()
}

function _createStay(name) {
    return {
        id: makeId(6),
        name,
    }
}