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
		console.log(payload);

		return (
			<div className='row'>
				<div class='col-md-3'>
					<div class='card d-flex flex-row stat-card shadow-sm'>
						<div class='w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-primary'>
							<FontAwesomeIcon icon={faPlane} />
							<span class='badge badge-primary badge-bn position-absolute ml-5 text-capitalize'>
								A
							</span>
						</div>
						<div class='flex-fill p2 text-center'>
							<b class='font-weight-bold'>Last day Trips</b>
							<h1>{payload && payload.data.allTrips}</h1>
						</div>
					</div>
				</div>
				<div class='col-md-3'>
					<div class='card d-flex flex-row stat-card shadow-sm'>
						<div class='w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-success'>
							<FontAwesomeIcon icon={faPlane} />
							<span class='badge badge-success badge-bn position-absolute ml-5 text-capitalize'>
								d
							</span>
						</div>
						<div class='flex-fill p2 text-center'>
							<b class='font-weight-bold'>Last day Trips</b>
							<h1>{payload && payload.data.days.num_trips}</h1>
						</div>
					</div>
				</div>
				<div class='col-md-3'>
					<div class='card d-flex flex-row stat-card shadow-sm'>
						<div class='w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-danger'>
							<FontAwesomeIcon icon={faPlane} />
							<span class='badge badge-danger badge-bn position-absolute ml-5 text-capitalize'>
								W
							</span>
						</div>
						<div class='flex-fill p2 text-center'>
							<b class='font-weight-bold'>Last Week Trips</b>
							<h1>{payload && payload.data.weeks.num_trips}</h1>
						</div>
					</div>
				</div>
				<div class='col-md-3'>
					<div class='card d-flex flex-row stat-card shadow-sm'>
						<div class='w-25 p-3 border-right card-left d-flex align-content-center align-items-center text-center text-warning'>
							<FontAwesomeIcon icon={faPlane} />
							<span class='badge badge-warning badge-bn position-absolute ml-5 text-capitalize'>
								M
							</span>
						</div>
						<div class='flex-fill p2 text-center'>
							<b class='font-weight-bold'>Last month Trips</b>
							<h1>{payload && payload.data.months.num_trips}</h1>
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
