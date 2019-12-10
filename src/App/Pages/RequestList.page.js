import React from 'react';
import { connect } from 'react-redux';
import getRequests from '../../Redux/Actions/request.actions';
import PropTypes from 'prop-types';
import '../../Assets/scss/style.scss';
import constants from '../../Redux/constants';
import Request from '../Components/Request';
import Sidebar from '../Components/Sidebar';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
	payload: state.Request.payload,
	pending: state.Request.pending,
	error: state.Request.error,
});
const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.GETREQUEST_PENDING,
				pending: true,
			}),
		getRequests: async token => dispatch(await getRequests(token)),
	};
};
class RequestList extends React.Component {
	componentDidMount() {
		this.props.initialize();
		const token = localStorage.getItem('barefoot_token');
		this.props.getRequests(token);
	}
	render() {
		let { payload, pending, error } = this.props;
		const data = payload ? payload.data : [];
		const listItems = data.map(req => <Request request={req} />);
		return (
			<div>
				<div className='row mainContainer'>
					<div className='row col-12 col-sm-12 col-md-9 col-lg-9 p-4 '>
						{(pending || error) && (
							<div className='d-flex flex-wrap align-content-center justify-content-center col-12'>
								{error && (
									<div>
										<h3 className='text-secondary d-block text-center m-4 error'>
											No request found
										</h3>

										<div className='col text-center'>
											<Link to='/request' className='btn btn-primary px-5 '>
												Create a new request
											</Link>
										</div>
									</div>
								)}
								{pending && (
									<div className='col text-center'>
										<div className='spinner-border text-primary '> </div>
									</div>
								)}
							</div>
						)}
						{!pending && listItems}
					</div>{' '}
				</div>
			</div>
		);
	}
}

RequestList.propTypes = {
	pending: PropTypes.bool,
	payload: PropTypes.object,
	error: PropTypes.object,
	verifyUser: PropTypes.func,
	token: PropTypes.string,
};

const Verify = connect(mapStateToProps, mapDispatchToProps)(RequestList);
export default Verify;
