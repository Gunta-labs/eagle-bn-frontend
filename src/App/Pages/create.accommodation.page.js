import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authentication from '../../Redux/Actions/login.actions';

export class CreateAccommodation extends React.Component {
	state = {
		email: '',
		password: '',
		images: '',
	};

	handleInput = e => {
		if (e.target.id === 'customFile')
			this.setState({ images: `${e.target.files.length} file(s) selected` });
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { authentication } = this.props;
		const { email, password } = this.state;
		const data = {
			email,
			password,
		};
		authentication(data);
	};

	render() {
		const { password, email, images } = this.state;
		const { error, isLoggedIn } = this.props.user;
		const display = (
			<div className='d-flex'>
				<div className='container signup'>
					<div className='row'>
						<div className='col-md-12 col-lg-12 bg-sm-white'>
							{error && <p className='alert alert-danger'>{error}</p>}
							<form onSubmit={this.handleSubmit} className='row'>
								<div className='col-md-6 col-lg-6'>
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
											value={password}
										/>
									</div>
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
											value={password}
										/>
										<div className='input-group-prepend ml-2'>
											<span className='input-group-text'>@</span>
										</div>
										<input
											type='text'
											name='name'
											className='form-control'
											onChange={this.handleInput}
											placeholder='Accommodation name'
											required={true}
											value={password}
										/>
									</div>
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
											value={password}
										/>
									</div>
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
											value={password}
										/>
									</div>
									<div className='form-group'>
										<textarea
											className='form-control'
											placeholder='Services'
											rows='2'
											id='comment'
										></textarea>
									</div>
									<div className='custom-file'>
										<input
											type='file'
											className='custom-file-input'
											onChange={this.handleInput}
											id='customFile'
											multiple={true}
										/>
										<label className='custom-file-label' for='customFile'>
											{images || 'Choose files'}
										</label>
									</div>
								</div>
								<div className='col-md-6 col-lg-6'>
									<div className='form-group'>
										<textarea
											className='form-control'
											placeholder='Descriptions'
											rows='4'
											id='comment'
										></textarea>
									</div>
									<div className='form-group'>
										<textarea
											className='form-control mt-4'
											placeholder='Amenities'
											rows='4'
											id='comment'
										></textarea>
									</div>
									<button className='btn btn-primary btn-block my-3 mt-5' type='submit'>
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
	user: PropTypes.object.isRequired,
};

export const mapDispatchToProps = dispatch => {
	return {
		authentication: async data => dispatch(await authentication(data)),
	};
};

export const mapStateToProps = ({ loginProp }) => ({
	user: loginProp,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccommodation);
