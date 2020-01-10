import React from 'react';
import bg from '../../Assets/images/bg.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import destinations, { accomodations } from '../../Redux/Actions/destination.actions';
import DestCard from '../Components/DestinCard';
import AccomodationCard from '../Components/TripCard';
import Header from '../Components/Header';

import constants from '../../Redux/constants';
export class Landing extends React.Component {
	componentDidMount() {
		this.props.pending();
		this.props.loading();
		this.props.statsData();
		this.props.accomodations();
	}

	render() {
		document.title = 'Barefoot || home';
		const { payload, pending } = this.props.stats;
		return (
			<div>
				<Header />
				<div className='vh-50'>
					<div className='hero vh-50 px-5'>
						<img className='bg' src={bg} alt='banner' />
						<div className='d-flex flex-row-reverse'>
							<div className='card col-md-4 py-3 bg-primary'>
								<p className='mb-5 text-white font-weight-bolder'>
									Make company global travel and accommodation easy and convenient for the strong
									workforce of savvy members of staff, by leveraging the modern web.
								</p>
								<Link className='btn btn-sm btn-primary btn-req w-100' to='/dashboard'>
									Manage your account
								</Link>
							</div>
						</div>
					</div>
					<div className='bg-primary p-3 px-5'>
						<h5 className='title mb-3 text-white'>Popular Destinations</h5>
						<span className='draw draw-light'></span>
						<div className='row mt-5'>
							{pending && (
								<div className='col text-center'>
									<div className='spinner-border text-white '> </div>
								</div>
							)}
							{!payload ? null : payload && <DestCard data={payload.data} />}
						</div>
					</div>
					<div className='p-3 px-5 mb-5'>
						<div className='d-flex'>
							<h5 className='title mb-3 text-primary'>Recent Accomodations</h5>
							<a
								href='/accommodations'
								className='ml-auto btn btn-sm btn-primary mt-3 position-absolute more'
							>
								view more
							</a>
						</div>
						<span className='draw draw-dark'></span>
						<div className='row mt-5'>
							{!this.props.accs
								? null
								: this.props.accs.payload && (
										<AccomodationCard data={this.props.accs.payload.data} />
								  )}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	stats: state.destSats,
	accs: state.accomodations,
});
const mapDispatchToProps = dispatch => {
	return {
		pending: () =>
			dispatch({
				type: constants.STATS_PENDING,
				pending: true,
			}),
		loading: () =>
			dispatch({
				type: constants.ACCOMODATION_PENDING,
				pending: true,
			}),
		statsData: async () => dispatch(await destinations()),
		accomodations: async () => dispatch(await accomodations()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
