/* eslint-disable react/no-direct-mutation-state */
import React from 'react';
import { connect } from 'react-redux';
import updateAcc from '../../Redux/Actions/update.accomodation.action';
import constants from '../../Redux/constants';
import Header from '../Components/Header';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faDoorOpen,
	faMoneyBill,
	faMapMarker,
	faDollarSign,
	faHotel,
	faList,
} from '@fortawesome/free-solid-svg-icons';
import { getCurrencies, currencies } from '../../helper/currencies';
import { singleAccomodation } from '../../Redux/Actions/singleAccomodations.action';
import { Multiselect } from 'multiselect-react-dropdown';

export class UpdateAccommodation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: undefined,
			description: '',
			images: {},
			address: '',
			cost: '',
			availableSpace: '',
			services: '',
			amenities: '',
			imageNumber: '',
			currency: '',
			servicesList: [
				{ name: 'sauna', id: 1 },
				{ name: 'theater', id: 2 },
				{ name: 'printer', id: 3 },
				{ name: 'room service', id: 4 },
				{ name: 'photocopy', id: 5 },
				{ name: 'kids paradize club', id: 6 },
				{ name: 'swimming pool', id: 7 },
				{ name: 'fitness', id: 8 },
				{ name: 'tenis', id: 9 },
			],
			amenitiesList: [
				{ name: 'free wifi', id: 1 },
				{ name: 'laundry', id: 2 },
				{ name: 'business center', id: 3 },
				{ name: 'fax', id: 4 },
				{ name: 'concierge desk', id: 5 },
				{ name: 'TV', id: 6 },
			],
			selectedServices: [{}],
			selectedAmenities: [{}],
			error: null,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		if (e.target.id === 'images') {
			this.setState({
				imageNumber: `${e.target.files.length} file(s) selected`,
				images: e.target.files,
			});
		} else {
			this.setState({
				[name]: value,
			});
		}
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		this.props.loading();
		this.props.get(id);
		const accomodation = await singleAccomodation(id);
		this.setState(accomodation.payload);
		this.selectOptions();
		this.onSelect = this.onSelect.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}
	handleSubmit = e => {
		e.preventDefault();
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
		if (!services) this.setState({ error: 'Please select at least one service' });
		else if (!amenities) this.setState({ error: 'Please select at least one amenity' });
		else {
			this.setState({ error: null });
			this.props.initialize();
			update(form, token, id);
		}
	};
	onRemove(listName, removedItem, nameField) {
		const newItems = this.state[listName].filter(item => item.id !== removedItem.id);
		let data = '';
		this.setState({
			[listName]: newItems,
		});
		newItems.forEach(element => {
			if (element.name) data += element.name + '';
		});
		this.setState({ [nameField]: data });
	}
	onSelect(listName, selectedItem, nameField) {
		let data = '';
		const newList = this.state[listName];
		if (!newList.find(item => item.id === selectedItem.id)) newList.push(selectedItem);
		this.setState({
			[listName]: newList,
		});
		newList.forEach(element => {
			if (element.name) data += element.name + ',';
		});
		this.setState({ [nameField]: data });
	}
	selectOptions() {
		const serviceList = this.state.services.split(',');
		const selectedServices = [];
		serviceList.forEach(element => {
			const item = this.state.servicesList.find(e => element.includes(e.name));
			if (item) selectedServices.push(item);
		});
		const amenityList = this.state.amenities.split(',');
		const selectedAmenities = [];
		amenityList.forEach(element => {
			const item = this.state.amenitiesList.find(e => e.name === element);
			if (item) selectedAmenities.push(item);
		});
		this.setState({
			selectedAmenities,
			selectedServices,
		});
	}
	render() {
		document.title = 'Barefoot || update accommodation';
		const { payload, pending, error } = this.props.UpdateAccomodation;
		const currencyList = getCurrencies().map(element => (
			<option value={element}>{currencies[element]}</option>
		));
		return (
			<div className='d-flex'>
				<Header active_menu={1} showSideNav={true} />
				{!pending && this.props.getOneAcc.error && <Redirect to='/notfound' />};}
				<div className='container content-wrapper create-accommodation'>
					<h5 className='text-primary mb-4'> Update accommodation </h5>
					<div className='row'>
						<div className='col-md-12 col-lg-12 bg-sm-white'>
							<form className='row' onSubmit={this.handleSubmit}>
								<div className='col-md-6 col-lg-6'>
									{(error || this.state.error) && (
										<p className='alert alert-warning'>
											{' '}
											{this.state.error || 'you have no permissions'}
										</p>
									)}
									{payload && <p className='alert alert-success'>Update successfully</p>}
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white label-input'>
												<FontAwesomeIcon icon={faHotel} className='mx-2' /> Name
											</span>
										</div>
										<input
											type='text'
											name='name'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Accommodation name'
											value={this.state.name}
											pattern='.{2,}'
											onInvalid='name should have a minimum of 2 characters'
										/>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white label-input'>
												<FontAwesomeIcon icon={faDoorOpen} className='mx-2' /> Rooms number
											</span>
										</div>
										<input
											type='number'
											name='availableSpace'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Available space, ex: 5'
											value={this.state.availableSpace}
										/>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text text-secondary bg-white label-input'>
												<FontAwesomeIcon icon={faMoneyBill} className='mx-2' /> Cost / room
											</span>
										</div>
										<input
											type='number'
											name='cost'
											className='form-control'
											onChange={this.handleInputChange}
											placeholder='Space cost'
											value={this.state.cost}
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
											<span className='input-group-text text-secondary bg-white label-input'>
												<FontAwesomeIcon icon={faMapMarker} className='mx-2' /> Address
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
									<div className='mb-3 d-flex' style={{ display: 'table' }}>
										<div className='input-group-prepend'>
											<span
												className='input-group-text text-secondary bg-white label-input'
												style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
											>
												<FontAwesomeIcon icon={faList} className='mx-2' /> Services
											</span>
										</div>
										<Multiselect
											options={this.state.servicesList}
											selectedValues={this.state.selectedServices}
											onSelect={(o, s) => this.onSelect('selectedServices', s, 'services')}
											onRemove={(o, s) => this.onRemove('selectedServices', s, 'services')}
											displayValue='name'
											placeholder='Select services'
											style={{
												multiselectContainer: {
													backgroundColor: 'white',
													borderTopLeftRadius: 0,
													zIndex: 999999,
												},
												searchBox: {
													borderTopLeftRadius: 0,
													borderBottomLeftRadius: 0,
												},
											}}
											className='flex-grow-1 rounded-0'
										/>
									</div>
									<div className='custom-file'>
										<input
											type='file'
											className='custom-file-input'
											onChange={this.handleInputChange}
											id='images'
											multiple={true}
											name='images'
											required={true}
										/>
										<label className='custom-file-label' for='images'>
											{'Choose files'}
										</label>
									</div>
									{/* images */}
									<div className='row mt-2'>
										{this.state.AccommodationImages &&
											this.state.AccommodationImages.length > 0 &&
											this.state.AccommodationImages.map(img => (
												<div className='col-2'>
													<img className='img-sm' src={img.imageurl} alt='hello' />
												</div>
											))}
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
									<div className=' my-4 d-flex' style={{ display: 'table' }}>
										<div className='input-group-prepend'>
											<span
												className='input-group-text text-secondary bg-white label-input'
												style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
											>
												<FontAwesomeIcon icon={faList} className='mx-2' /> Amenities
											</span>
										</div>
										<Multiselect
											options={this.state.amenitiesList} // Options to display in the dropdown
											selectedValues={this.state.selectedAmenities} // Preselected value to persist in dropdown
											onSelect={(o, s) => this.onSelect('selectedAmenities', s, 'amenities')} // Function will trigger on select event
											onRemove={(o, s) => this.onRemove('selectedAmenities', s, 'amenities')} // Function will trigger on remove event
											displayValue='name' // Property name to display in the dropdown options
											placeholder='Select amenities'
											style={{
												multiselectContainer: {
													backgroundColor: 'white',
													borderTopLeftRadius: 0,
												},
												searchBox: {
													borderTopLeftRadius: 0,
													borderBottomLeftRadius: 0,
												},
											}}
											className='flex-grow-1 rounded-0'
										/>
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
		get: async id => dispatch(await singleAccomodation(id)),
	};
};

const mapStateToProps = ({ UpdateAccomodation, getOneAcc }) => ({
	UpdateAccomodation,
	getOneAcc: getOneAcc,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAccommodation);
