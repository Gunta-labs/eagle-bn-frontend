import React from 'react';
import { connect } from 'react-redux';
import getStatistics from '../../Redux/Actions/stats.action';
import constants from '../../Redux/constants';
import { token } from '../../helper/helper';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Statistics extends React.Component {
	componentDidMount() {
		this.props.get(token);
	}

	render() {
		const { payload } = this.props;
		return (
			<div className='row'>
				{payload &&
					Object.entries(payload.data).map((e, i) => {
						return (
							<div className='col-md-3' key={i}>
								<div className='card d-flex flex-row stat-card shadow-sm'>
									<div
										className={
											(e[0][0] === 'w' &&
												'w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-danger') ||
											(e[0][0] === 'm' &&
												'w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-warning') ||
											(e[0][0] === 'd' &&
												'w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-success') ||
											'w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-primary'
										}
									>
										<FontAwesomeIcon icon={faPlane} />
										<span
											className={
												(e[0][0] === 'w' &&
													'badge badge-danger badge-bn position-absolute ml-5 text-capitalize') ||
												(e[0][0] === 'm' &&
													'badge badge-warning badge-bn position-absolute ml-5 text-capitalize') ||
												(e[0][0] === 'd' &&
													'badge badge-success badge-bn position-absolute ml-5 text-capitalize') ||
												'badge badge-primary badge-bn position-absolute ml-5 text-capitalize'
											}
										>
											{e[0][0]}
										</span>
									</div>

									<div className='flex-fill p2 text-center'>
										{e[0] === 'allTrips' ? (
											<b className='font-weight-bold'>All trips</b>
										) : (
											<b className='font-weight-bold'>Last {e[0].replace('s', '')} Trips</b>
										)}
										<h1>{e[1].num_trips}</h1>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.STAT_PENDING,
				pending: true,
			}),
		get: async token => dispatch(await getStatistics(token)),
	};
};

const mapStateToProps = state => {
	return {
		payload: state.getStats.payload,
		pending: state.getStats.pending,
		error: state.getStats.error,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
