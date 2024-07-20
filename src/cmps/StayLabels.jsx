import React, { useState, useRef } from 'react'
import FilterModal from '../cmps/FilterModal.jsx'

const labelImageMap = {
  'Amazing views': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063768/amazing_views_vhyqc9.png',
  'Beachfront': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063844/beachfront_uz0otv.png',
  'OMG!': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305531/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6_oqqvwe.png',
  'Ski-in/out': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064109/ski-in-out_ggsokt.png',
  'Trending': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721403580/3726d94b-534a-42b8-bca0-a0304d912260_uroff3.png',
  'Amazing pools': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721305438/3fb523a0-b622-4368-8142-b5e03df7549b_qut8wq.png',
  'Lakefront': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064015/lakefront_ze7yei.png',
  'Castles': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721403848/1b6a8b70-a3b6-48b5-88e1-2243d9172c06_yhxsgi.png ',
  'Cabins': ' https://res.cloudinary.com/doahdwb2g/image/upload/v1721403798/732edad8-3ae0-49a8-a451-29a8010dcc0c_v6hgvy.png',
  'Design': ' https://res.cloudinary.com/doahdwb2g/image/upload/v1721403801/50861fca-582c-4bcc-89d3-857fb7ca6528_mukxv4.png',
  'Islands': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063979/islands_qcbnis.png',
  'Luxe': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064051/luxe_mhbmqv.png',
  'Countryside': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721403880/6ad4bd95-f086-437d-97e3-14d12155ddfe_w5bn5e.png',
  'Treehouses': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404066/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e_igeblt.png',
  'Mansions': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064069/mansions_wjeeml.png',
  'Farms': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063953/farms_kwoc0s.png',
  'Boats': ' https://res.cloudinary.com/doahdwb2g/image/upload/v1721404181/687a8682-68b3-4f21-8d71-3c3aef6c1110_pwwnch.png',
  'Off-the-grid': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404186/9a2ca4df-ee90-4063-b15d-0de7e4ce210a_jbhrvo.png ',
  'Historical homes': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404189/33dd714a-7b4a-4654-aaf0-f58ea887a688_u7abj5.png ',
  'National parks': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404256/c0a24c04-ce1f-490c-833f-987613930eca_gyxpst.png',
  'Top cities': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721404259/ed8b9e47-609b-44c2-9768-33e6a22eccb2_ueyhlr.png ',
  'Vineyards': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064201/vineyards_hvypws.png',
  'Play': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416377/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf_q0mpzw.png',
  'Camping': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063890/camping_jeueuk.png',
  'Domes': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416382/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca_e182yp.png',
  'Earth homes': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063931/earth_homes_ln2zty.png',
  'Tropical': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416382/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca_e182yp.png',
  'Creative spaces': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416482/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622_iubncy.png',
  'Tiny homes': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416545/3271df99-f071-4ecf-9128-eb2d2b1f50f0_imkpcj.png',
  'Grand pianos': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416548/8eccb972-4bd6-43c5-ac83-27822c0d3dcd_fcpdsj.png',
  'A-frames': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416572/1d477273-96d6-4819-9bda-9085f809dad3_qzyqjk.png',
  'Bed & breakfasts': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063869/bed_breakfasts_emhbwj.png',
  'Desert': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063911/desert_asovai.png',
  'Chefs kitchens': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416662/ddd13204-a5ae-4532-898c-2e595b1bb15f_m0llqg.png',
  'Skiing': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064091/skiing_ccby2m.png',
  'New': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416688/c0fa9598-4e37-40f3-b734-4bd0e2377add_ejj1rt.png',
  'Caves': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416719/4221e293-4770-4ea8-a4fa-9972158d4004_uyepcx.png',
  'Damnusi': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721416786/c9157d0a-98fe-4516-af81-44022118fbc7_wqfjgi.png',
  'Barns': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417016/f60700bc-8ab5-424c-912b-6ef17abc479a_yyvh4c.png',
  'Arctic': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417041/8b44f770-7156-4c7b-b4d3-d92549c8652f_rbkzt9.png',
  'Surfing': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717064130/surfing_wrxzh4.png',
  'Rooms': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417476/7630c83f-96a8-4232-9a10-0398661e2e6f_tjubi8.png',
  'Cycladic homes': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417484/e4b12c1b-409b-4cb6-a674-7c1284449f6e_totehq.png',
  'Yurts': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417488/4759a0a7-96a8-4dcd-9490-ed785af6df14_uorulr.png',
  'Houseboats': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417598/c027ff1a-b89c-4331-ae04-f8dee1cdc287_u18wre.png',
  'Golfing': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417481/6b639c8d-cf9b-41fb-91a0-91af9d7677cc_ioipq1.png',
  'Top of the wotld': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417608/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4_syt4p0.png',
  'Windmills': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417612/5cdb8451-8f75-4c5f-a17d-33ee228e3db8_lyzzid.png',
  'containers': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417604/0ff9740e-52a2-4cd5-ae5a-94e1bfb560d6_ck4dqf.png',
  'Casas particulares': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417683/251c0635-cc91-4ef7-bb13-1084d5229446_ft08nq.png',
  'Towers': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417687/d721318f-4752-417d-b4fa-77da3cbc3269_vyopm8.png',
  'Ryokans': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721418043/827c5623-d182-474a-823c-db3894490896_lz5nf2.png',
  'Campers': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721418039/31c1d523-cc46-45b3-957a-da76c30c85f9_vwvxxj.png',
  'Hanoks': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417942/51f5cf64-5821-400c-8033-8a10c7787d69_vgioln.png',
  'Minsus': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417946/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049_w9pioh.png',
  'Shepherds huts': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417823/747b326c-cb8f-41cf-a7f9-809ab646e10c_o411uo.png',
  'Adapted': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417836/e22b0816-f0f3-42a0-a5db-e0f1fa93292b_icgrxy.png',
  'Trulli': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417832/33848f9e-8dd6-4777-b905-ed38342bacb9_ltl8zk.png',
  'Riads': 'https://res.cloudinary.com/doahdwb2g/image/upload/v1721417827/7ff6e4a1-51b4-4671-bc9a-6f523f196c61_vzgf4w.png',
  'Lake': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063997/lake_adozli.png',
  'Beach': 'http://res.cloudinary.com/dqti9icif/image/upload/v1717063824/beach_ugn0q3.png',

}

export function StayLabels({ onLabelClick }) {
  const [showAll, setShowAll] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="filters-container" ref={containerRef} style={{
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '10px 0',
        gap: '24px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {Object.entries(labelImageMap).slice(0, showAll ? undefined : 15).map(([label, iconPath]) => (
          <div
            key={label}
            onClick={() => onLabelClick(label)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: 'fit-content',
            }}
          >
            <img
              src={iconPath}
              alt={label}
              style={{
                width: '24px',
                height: '24px',
                marginBottom: '8px',
                opacity: label === 'OMG!' ? 1 : 0.6,
              }}
            />
            <span style={{
              fontSize: '12px',
              color: label === 'OMG!' ? '#000' : '#717171',
              fontWeight: label === 'OMG!' ? 'bold' : 'normal',
            }}>
              {label}
            </span>
            {label === 'OMG!' && (
              <div style={{
                height: '2px',
                width: '100%',
                backgroundColor: 'black',
                marginTop: '10px'
              }} />
            )}
          </div>
        ))}
        <button
          onClick={scrollRight}
          style={{
            background: 'white',
            border: '1px solid #DDDDDD',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 2.25L8.25 6L4.5 9.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            marginLeft: '16px',
            padding: '8px 16px',
            border: '1px solid #DDDDDD',
            borderRadius: '12px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '8px' }}>Filters</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 8H11M2.5 4H13.5M7.5 12H8.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}