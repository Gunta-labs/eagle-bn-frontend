import React from 'react';
import { Link } from 'react-router-dom';
import AccomImg from '../../Assets/images/acc.jpg';
import LikeAndBookMark from './like.accommodation';

function Card({ data }) {
	const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	const places = sorted.slice(0, 4);
	return places.map((e, i) => {
		return (
			<div className='col-md-3 col-sm-6' key={i}>
				<div className='card shadow-sm bg-white'>
					<Link to={`/accommodations/${e.id}`}>
						<div className='card-body p-0 card-img'>
							<img
								src={
									e.AccommodationImages && e.AccommodationImages.length > 0
										? e.AccommodationImages[0].imageurl
										: AccomImg
								}
								alt='accomodation'
							/>
						</div>
						<div className='d-flex flex-column card-footer text-center p-0 bg-transparent'>
							<span className='bg-white mt-n3 shadow-sm mx-5 text-primary'>{e.name}</span>
							<span className='my-2'>{e.address}</span>
						</div>
					</Link>
					<LikeAndBookMark id={e.id} />
				</div>
			</div>
		);
	});
}

export default Card;
