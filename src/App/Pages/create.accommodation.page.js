import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createAcc from '../../Redux/Actions/create.accommodation.action';
import constants from '../../Redux/constants';

export class CreateAccommodation extends React.Component {
	state = {
		name: '',
		description: '',
		images: {},
		address: '',
		cost: '',
		availableSpace: '',
		services: '',
		amenities: '',
		imageNumber: '',
	};
	handleInput = e => {
		if (e.target.id === 'images') {
			this.setState({
				imageNumber: `${e.target.files.length} file(s) selected`,
				images: e.target.files,
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value,
			});
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.initialize();
		const { create } = this.props;
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
		} = this.state;
		const data = {
			name,
			description,
			services,
			cost,
			availableSpace,
			amenities,
			address,
		};
		console.log('here', data);
		Object.values(images).forEach(element => {
			form.append('images', element);
		});

		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				form.append(key, data[key]);
			}
		}

		const token = localStorage.getItem('barefoot-token');
		create(form, token);
	};
	getError(error) {
		return error.data
			? error.data.msg
			: 'We could not upload your data. Check if you are connected to a valid network then try again.';
	}
	render() {
		const {
			name,
			description,
			services,
			cost,
			availableSpace,
			amenities,
			address,
			imageNumber,
		} = this.state;
		const { error, payload, pending } = this.props.accommodation;
		const display = (
			<div className='d-flex'>
				<div className='container signup'>
					<div className='row'>
						<div className='col-md-12 col-lg-12 bg-sm-white'>
							<form onSubmit={this.handleSubmit} className='row'>
								<div className='col-md-6 col-lg-6'>
									{error && (
										<p className='alert alert-danger text-center'>{this.getError(error)}</p>
									)}
									{payload && <p className='alert alert-success'>uploaded successfully</p>}
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text'>@</span>
										</div>
										<input
											type='text'
											name='name'
											className='form-control'
											onChange={this.handleInput}
											placeholder='Accommodation name'
											required={true}
											value={name}
											pattern='.{4,}'
											onInvalid='name should have a minimum of 4 characters'
										/>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text'>@</span>
										</div>
										<input
											type='text'
											name='availableSpace'
											className='form-control'
											onChange={this.handleInput}
											placeholder='Available space, ex: 5 rooms'
											required={true}
											value={availableSpace}
											pattern='.{5,}'
										/>
										<div className='input-group-prepend ml-2'>
											<span className='input-group-text'>@</span>
										</div>
										<input
											type='number'
											name='cost'
											className='form-control'
											onChange={this.handleInput}
											placeholder='space cost'
											required={true}
											value={cost}
											pattern='[0-9]{1,}'
										/>
									</div>
									<div className='input-group mb-3'>
										<div className='input-group-prepend'>
											<span className='input-group-text'>@</span>
										</div>
										<input
											type='text'
											name='address'
											className='form-control'
											onChange={this.handleInput}
											placeholder='address'
											required={true}
											value={address}
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
											onChange={this.handleInput}
											value={services}
											required={true}
											pattern='.{5,}'
										></textarea>
									</div>
									<div className='custom-file'>
										<input
											type='file'
											className='custom-file-input'
											onChange={this.handleInput}
											id='images'
											multiple={true}
											name='images'
											required={true}
										/>
										<label className='custom-file-label' for='images'>
											{imageNumber || 'Choose files'}
										</label>
									</div>
								</div>
								<div className='col-md-6 col-lg-6'>
									<div className='form-group'>
										<textarea
											className='form-control'
											placeholder='Descriptions'
											rows='4'
											id='description'
											name='description'
											onChange={this.handleInput}
											value={description}
											required={true}
											pattern='.{5,}'
										></textarea>
									</div>
									<div className='form-group'>
										<textarea
											className='form-control mt-4'
											placeholder='Amenities'
											rows='4'
											id='amenities'
											name='amenities'
											onChange={this.handleInput}
											value={amenities}
											required={true}
											pattern='.{5,}'
										></textarea>
									</div>
									<button
										className='btn btn-primary btn-block my-3 mt-4 submit-btn'
										type='submit'
										disabled={pending}
									>
										{pending && <span className='spinner-grow spinner-grow-sm'></span>}
										Create accommodation
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
		return display;
	}
}

CreateAccommodation.propTypes = {
	accommodation: PropTypes.object.isRequired,
};

export const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.ADD_ACCOMMODATION_PENDING,
				pending: true,
			}),
		create: async (data, token) => dispatch(await createAcc(data, token)),
	};
};

export const mapStateToProps = ({ accommodation }) => ({
	accommodation,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccommodation);
