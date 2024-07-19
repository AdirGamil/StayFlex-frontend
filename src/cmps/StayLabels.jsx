import React from 'react'

const labelImageMap = {
    'Top of the world': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305502/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c_atgbiv.png',
    'Trending': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305438/3fb523a0-b622-4368-8142-b5e03df7549b_qut8wq.png',
    'Play': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305554/78ba8486-6ba6-4a43-a56d-f556189193da_mbwgnf.png',
    'Tropical': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305531/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6_oqqvwe.png',
    'Beach': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063824/beach_ugn0q3.png',
    'Beachfront': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063844/beachfront_uz0otv.png',
    'Vineyards': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064201/vineyards_hvypws.png',
    'Mansions': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064069/mansions_wjeeml.png',
    'Lake': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063997/lake_adozli.png',
    'Treehouses': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064168/treehouses_u9cnaf.png',
    'Farms': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063953/farms_kwoc0s.png',
    'Skiing': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064091/skiing_ccby2m.png',
    'Amazing pools': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063507/amazing_pools_dpylvq.png',
    'Earth homes': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063931/earth_homes_ln2zty.png',
    'Amazing views': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063768/amazing_views_vhyqc9.png',
    'Desert': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063911/desert_asovai.png',
    'Lakefront': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064015/lakefront_ze7yei.png',
    'Islands': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063979/islands_qcbnis.png',
    'Camping': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063890/camping_jeueuk.png',
    'Surfing': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064130/surfing_wrxzh4.png',
    'Bed & breakfasts': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063869/bed_breakfasts_emhbwj.png',
    'Luxe': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064051/luxe_mhbmqv.png',
    'Ski-in/out': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064109/ski-in-out_ggsokt.png'
  }
  
export function StayLabels({ onLabelClick }) {
  return (
    <div className="filters">
      {Object.keys(labelImageMap).map(label => (
        <img
          key={label}
          src={labelImageMap[label]}
          alt={label}
          onClick={() => onLabelClick(label)}
          style={{ cursor: 'pointer', margin: '5px', maxHeight: '50px', maxWidth: '50px'}}
        />
      ))}
    </div>
  )
}
