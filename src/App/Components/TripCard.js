import React from 'react';
import { Link } from 'react-router-dom';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccomImg from '../../Assets/images/acc.jpg';

function Card({ data }) {
	const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	const places = sorted.slice(0, 4);

	return places.map((e, i) => {
		return (
			<div className='col-md-3 col-sm-6' key={i}>
				<Link to={`/accomodations/${e.id}`}>
					<div className='card shadow-sm bg-white'>
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
							<div className='d-flex justify-content-between card-foot'>
								<span className='text-secondary my-2 mx-3'>
									<FontAwesomeIcon icon={faHeart} /> 512
								</span>
								<span className='text-primary my-2 mx-3'>
									<FontAwesomeIcon icon={faBookmark} />
								</span>
							</div>
						</div>
					</div>
				</Link>
			</div>
		);
	});
}

export default Card;
