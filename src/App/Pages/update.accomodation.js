/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import { connect } from 'react-redux';
import updateAcc from '../../Redux/Actions/update.accomodation.action';
import constants from '../../Redux/constants';
import Header from '../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDoorOpen,
	faMoneyBill,
	faMapMarker,
	faDollarSign,
	faHotel,
} from '@fortawesome/free-solid-svg-icons';
import { getCurrencies, currencies } from '../../helper/currencies';
import { singleAccomodation } from '../../Redux/Actions/singleAccomodations.action';

export class UpdateAccommodation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			images: {},
			address: '',
			cost: '',
			availableSpace: '',
			services: '',
			amenities: '',
			imageNumber: '',
			currency: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		this.props.loading();
		const accomodation = await singleAccomodation(id);
		console.log(accomodation);
		this.setState(accomodation.payload);
		this.props.get(id);
	}
	handleSubmit = e => {
		e.preventDefault();
		this.props.initialize();
		const { update } = this.props;
		const form = new FormData();
		const {
			name,
			description,
			services,
			images,
			cost,
			availableSpace,
			amenities,
			address,
			currency,
		} = this.state;
		const data_ = {
			name,
			description,
			services,
			cost,
			availableSpace,
			amenities,
			address,
			currency,
		};
		Object.values(images).forEach(element => {
			form.append('images', element);
		});

		for (let key in data_) {
			if (data_.hasOwnProperty(key)) {
				form.append(key, data_[key]);
			}
		}
		const token = localStorage.getItem('barefoot_token');
		const { id } = this.props.match.params;
		this.props.initialize();
		update(form, token, id);
	};

	render() {
		const { payload, pending } = this.props.UpdateAccomodation;
		const currencyList = getCurrencies().map(element => (
			<option value={element}>{currencies[element]}</option>
		));
		return (
			<div className='d-flex'>
				<Header active_menu={1} showSideNav={true} />
				<div className='container content-wrapper create-accommodation'>
					<h5 className='text-primary mb-4'> Update accommodation </h5>
					<div className='row'>
						<div className='col-md-12 col-lg-12 bg-sm-white'>
							<form className='row' onSubmit={this.handleSubmit}>
								<div className='col-md-6 col-lg-6'>
									{payload && <p className='alert alert-success'>Update successfully</p>}
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faHotel} />
											</span>
										</div>
										<input
											type='text'
											name='name'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Accommodation name'
											value={this.state.name}
											pattern='.{4,}'
											onInvalid='name should have a minimum of 4 characters'
										/>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faDoorOpen} />
											</span>
										</div>
										<input
											type='text'
											name='availableSpace'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Available space, ex: 5 rooms'
											value={this.state.availableSpace}
											pattern='.{5,}'
										/>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faMoneyBill} />
											</span>
										</div>
										<input
											type='number'
											name='cost'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Space cost'
											value={this.state.cost}
											pattern='[0-9]{1,}'
										/>
										<div className='input-group-prepend ml-2'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faDollarSign} />
											</span>
										</div>
										<input
											list='currencyData'
											type='text'
											name='currency'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Currency'
											required={true}
											value={this.state.currency}
										/>
										<datalist id='currencyData'>{currencyList}</datalist>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white'>
												<FontAwesomeIcon icon={faMapMarker} />
											</span>
										</div>
										<input
											type='text'
											name='address'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Address'
											value={this.state.address}
											pattern='.{5,}'
										/>
									</div>

									<div className='form-group'>
										<textarea
											className='form-control'
											placeholder='Services'
											rows='3'
											id='comment'
											name='services'
											onChange={this.handleInputChange}
											value={this.state.services}
											pattern='.{5,}'
										></textarea>
									</div>
									<div className='custom-file'>
										<input
											type='file'
											className='custom-file-input'
											onChange={this.handleInputChange}
											id='images'
											multiple={true}
											name='images'
										/>
										<label className='custom-file-label' for='images'></label>
									</div>
									{/* images */}
									<div className='row mt-2'>
										{/* {console.log('======>', this.state.AccommodationImages.length > 0)} */}
										{/* {this.state.AccommodationImages.length &&
											this.state.AccommodationImages.length > 0 &&
											this.state.AccommodationImages.map(img => (
												<div className='col-2'>
													<div className='card p-5 bg-secondary'>
														<img src={img.link} alt='hello' />
													</div>
												</div>
											))} */}
									</div>
								</div>
								<div className='col-md-6 col-lg-6'>
									<div className='form-group'>
										<textarea
											className='form-control'
											placeholder='Description'
											rows='5'
											id='description'
											name='description'
											onChange={this.handleInputChange}
											value={this.state.description}
											pattern='.{5,}'
										></textarea>
									</div>
									<div className='form-group'>
										<textarea
											className='form-control mt-4'
											placeholder='Amenities'
											rows='5'
											id='amenities'
											name='amenities'
											onChange={this.handleInputChange}
											value={this.state.amenities}
											pattern='.{5,}'
										></textarea>
									</div>
									<button
										className='btn btn-primary btn-block my-3 mt-4'
										type='submit'
										disabled={pending}
									>
										{pending ? 'updating . . . .' : 'Update'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.UPDATE_ACCOMMODATION_PENDING,
				pending: true,
			}),
		loading: () =>
			dispatch({
				type: constants.SINGLE_ACCOMODATION_SUCCESS,
				pending: true,
			}),
		update: async (data, token, id) => dispatch(await updateAcc(data, token, id)),
	};
};

const mapStateToProps = ({ UpdateAccomodation, getOneAcc }) => ({
	UpdateAccomodation,
	getOneAcc: getOneAcc,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccommodation);
