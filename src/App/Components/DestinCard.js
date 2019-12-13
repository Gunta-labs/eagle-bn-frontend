import React from 'react';
import AccomImg from '../../Assets/images/acc.jpg';

function Card({ data }) {
	const places = data.slice(0, 4);
	return places.map((e, i) => {
		return (
			<div className='col-md-3 col-md-3 col-sm-6' key={i}>
				<div className='card shadow-sm'>
					<div className='card-body p-0 card-img'>
						<img src={AccomImg} alt='accomodation' />
					</div>
					<div className='card-footer text-center p-0'>
						<span className='my-2'>
							{e.city},{e.country}
						</span>
					</div>
				</div>
			</div>
		);
	});
}
export default Card;
