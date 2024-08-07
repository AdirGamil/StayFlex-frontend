import { httpService } from '../http.service'
import { createStayRemote } from '../util.service'

export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
  createDemoData,
}

async function query(filterBy = {}) {
  console.log('filterBy:',filterBy);
  return httpService.get(`stay`, filterBy)
}

function getById(stayId) {
  return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
  return httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await httpService.put(`stay/${stay._id}`, stay)
  } else {
    savedStay = await httpService.post('stay', stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
  return savedMsg
}

async function createDemoData(num) {
  const demoStays = []
  for (let i = 0; i < num; i++) {
    const newStay = createStayRemote({})
    demoStays.push(await save(newStay))
  }
  return demoStays
}

// createDemoData(150)
//   .then((stays) => {
//     console.log('Demo data created:', stays)
//   })
//   .catch((err) => {
//     console.error('Error creating demo data:', err)
//   })
