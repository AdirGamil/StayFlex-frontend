export function StayPreview({ stay }) {
  console.log('Rendering stay:', stay) // לוג נוסף כדי לבדוק את הנתונים המתקבלים בקומפוננטה

  return (
    <article className="preview">
      <p>name: {stay.name}</p>
      <p>price: {stay.price ? stay.price : 'Price not available'}</p>{' '}
      <img src={stay.imgUrls} alt="" />
    </article>
  )
}
