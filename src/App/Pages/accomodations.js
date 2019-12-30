import React from 'react';
import { connect } from 'react-redux';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getAccomodations from '../../Redux/Actions/getAllAccomodations.action.js';
import Accomodations from '../Components/Accomodations';
import Header from '../Components/Header';

export class GetAllAccomodations extends React.Component {
	componentDidMount() {
		this.props.getAccomodations();
	}
	render() {
		const { data } = this.props.accomodation;
		return (
			<div>
				<Header />
				<div className='my-search shadow-lg border-0'>
					<div className='container d-flex justify-content-center align-items-center'>
						<form>
							<div className='input-group mb-3' style={{ marginTop: '30%', height: '35px' }}>
								<div className='input-group-prepend bg-transparent'>
									<span className='input-group-text bg-transparent border border-top-0 border-right-0 border-left-0 text-light'>
										<FontAwesomeIcon icon={faSearch} />
									</span>
								</div>
								<input
									type='text'
									className='form-control bg-transparent border border-top-0 border-right-0 border-left-0'
									style={{ height: '50px', width: '300px' }}
									placeholder='Search Accomodations'
								/>
								<div className='input-group-append bg-transparent'>
									<span
										className='input-group-text border bg-transparent text-light'
										style={{ borderRadius: '20px' }}
									>
										<FontAwesomeIcon icon={faFilter} /> More option
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className='p-3 px-5 mb-5'>
					<h5 className='title mb-3 text-primary'> Accomodations </h5>
					<span className='draw draw-dark'></span>
					<div className='row mt-4'>{data && <Accomodations data={data} />}</div>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = ({ accomodation }) => ({
	accomodation,
});

export const mapDispatchToProps = dispatch => {
	return {
		getAccomodations: async () => dispatch(await getAccomodations()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GetAllAccomodations);
