import React from 'react';
import { Link } from 'react-router-dom';
import AccomImg from '../../Assets/images/acc.jpg';
import LikeAndBookMark from './like.accommodation';

function Accomodations({ data }) {
	return data.map((e, i) => {
		return (
			<div className='col-md-3 mb-4 col-sm-6' key={i}>
				<div className='card '>
					<Link to={`/accommodations/${e.id}`}>
						<div className='card-body p-0'>
							<img
								src={
									e.AccommodationImages.length === 0 ? AccomImg : e.AccommodationImages[0].imageurl
								}
								alt='accomodation'
								className='card-img'
							/>
						</div>
						<div className='d-flex flex-column card-footer text-center p-0'>
							<span className='bg-white mt-n3 shadow-sm mx-5'>{e.name}</span>
							<span className='my-2'>{e.address}</span>
						</div>
					</Link>
					<LikeAndBookMark id={e.id} />
				</div>
			</div>
		);
	});
}

export default Accomodations;
