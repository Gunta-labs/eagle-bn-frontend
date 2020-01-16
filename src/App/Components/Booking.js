import React from 'react';
import AccomImg from '../../Assets/images/acc.jpg';
import Rater from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getDate from '../../helper/date.helper';
import getUser from '../../helper/helper';

class Booking extends React.Component {
	state = {
		rating: 0,
	};

	render() {
		const bk = this.props.booking;
		const isHost = getUser() && (getUser().role === 'TAdmin' || getUser().role === 'host');
		const readOnly = new Date(bk.start) > new Date() || isHost;
		return (
			<div className='col-md-3 mb-4 col-sm-6' key={this.props.booking}>
				<div
					className='card '
					onClick={e => {
						this.props.viewDetails(this.props.booking);
					}}
				>
					<div className='card-body p-0'>
						<img
							src={
								bk.Accommodation.AccommodationImages.length === 0
									? AccomImg
									: bk.Accommodation.AccommodationImages[0].imageurl
							}
							alt='accomodation'
							className='card-img'
						/>
					</div>
					<div className='d-flex flex-column card-footer text-center p-0'>
						<span className='bg-white mt-n3 shadow-sm mx-5'>{bk.Accommodation.name}</span>
						<span className='my-2 text-primary'>Starting date : {getDate(new Date(bk.start))}</span>
						<span className=' text-primary'>Ending date : {getDate(new Date(bk.end))}</span>
						<div className='d-flex justify-content-center card-foot mt-2'>
							<Rater
								fullSymbol={
									<FontAwesomeIcon icon={faStar} className='mx-2' style={{ color: '#ffd700' }} />
								}
								emptySymbol={
									<FontAwesomeIcon icon={faStar} className='mx-2' style={{ color: '#C0C0C0' }} />
								}
								onClick={e => {
									bk.rating = e;
									this.props.handleClick(this.props.booking, e);
								}}
								id='singleBooking'
								initialRating={bk.Rating ? bk.Rating.rating : 0}
								readonly={readOnly}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Booking;
