import React from 'react';
import { Link } from 'react-router-dom';
import AccomImg from '../../Assets/images/acc.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

class Accommodations extends React.Component {
	handleDelete(accId) {
		const token = localStorage.getItem('barefoot_token');
		this.props.handleClick(token, accId);
	}
	render() {
		const e = this.props.Accommodation;
		return (
			<div className='col-md-3 mb-4 col-sm-6'>
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
					<div className='d-flex justify-content-between'>
						<Link to={`/accommodations/${e.id}/edit`}>
							<span className='my-2 mx-3 like-card'>
								<FontAwesomeIcon icon={faEdit} className='ml-3 mr-1 text-primary' />
							</span>
						</Link>
						<span className='my-2 mx-3 like-card'>
							<FontAwesomeIcon
								icon={faTrash}
								className='ml-3 mr-1 text-danger'
								id='deleteButton'
								onClick={event => this.handleDelete(e.id, event)}
							/>
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Accommodations;
