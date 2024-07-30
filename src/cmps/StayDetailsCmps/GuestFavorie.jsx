// import React from 'react';
// // import './GuestFavorite.scss';

// export function GuestFavorite ({ rating, reviewCount }){
//   return (
//     <div className="guest-favorite">
//       <div className="favorite-label">
//         <span className="label-text">Guest favorite</span>
//         <span className="trophy">🏆</span>
//       </div>
//       <div className="description">
//         One of the most loved homes on Airbnb, according to guests
//       </div>
//       <div className="rating-section">
//         <div className="rating">
//           <span className="rating-value">{rating}</span>
//           <div className="stars">★★★★★</div>
//         </div>
//         <div className="reviews">
//           <span className="review-count">{reviewCount}</span>
//           <span className="review-text">Reviews</span>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
// import './GuestFavorite.scss';

export function GuestFavorite({ rating, reviewCount }) {
    return (
        <div className="guest-favorite">
            <div className="favorite-label">
                <img
                    src="https://res.cloudinary.com/doahdwb2g/image/upload/v1722269863/ic-system-gf-gold-left-laurel-32-3x.d074c7557225d2a0f3f1289a3dde7a7d_hvjouj.png"
                    alt="Left Laurel"
                    className="laurel left-laurel"
                />
                <span className="label-text">Guest<br />favorite</span>
                <img
                    src="https://res.cloudinary.com/doahdwb2g/image/upload/v1722269867/ic-system-gf-gold-right-laurel-32-3x.f972b95c999d29e144d9ef970585906d_slvdds.png"
                    alt="Right Laurel"
                    className="laurel right-laurel"
                />
            </div>
            <div className="description">
                One of the most loved homes on Airbnb, according to guests
            </div>
            <div className="rating-section">
                <div className="rating">
                    <span className="rating-value">{rating}</span>
                    <div className="stars">
                        {[...Array(5)].map((_, index) => (
                            <img key={index} src={'https://res.cloudinary.com/doahdwb2g/image/upload/v1722320153/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9InByZXNlbnRhdGlvbiIgZm9jdXNhYmxlPSJmYWxzZSIgc3R5bGU9ImRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ_26_xvmqxr.svg'} alt="Star" className="star-svg" />
                        ))}
                    </div>
                </div>
                <div className="divider"></div>
                <div className="reviews">
                    <span className="review-count">{reviewCount}</span>
                    <span className="review-text">Reviews</span>
                </div>
            </div>
        </div >
    );
};
