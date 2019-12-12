import React from 'react';
import { Link } from 'react-router-dom';
import AccomImg from '../../Assets/images/acc.jpg';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Accomodations({ data }) {
	return data.map((e, i) => {
		return (
			<div className='col-md-3 mb-4 col-sm-6' key={i}>
				<div className='card '>
					<Link to={`accomodations/${e.id}`}>
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
							<div className='d-flex justify-content-between card-foot'>
								<span className='text-secondary my-2 mx-3' style={{ width: '100%' }}>
									<FontAwesomeIcon icon={faHeart} /> 512
								</span>
								<span className='text-primary my-2 mx-3'>
									<FontAwesomeIcon icon={faBookmark} />
								</span>
							</div>
						</div>
					</Link>
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
						<div className='d-flex justify-content-between card-foot'>
							<span className='text-secondary my-2 mx-3' style={{ width: '100%' }}>
								<FontAwesomeIcon icon={faHeart} /> 512
							</span>
							<span className='text-primary my-2 mx-3'>
								<FontAwesomeIcon icon={faBookmark} />
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	});
}

export default Accomodations;
