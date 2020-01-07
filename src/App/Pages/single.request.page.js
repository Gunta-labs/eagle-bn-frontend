import React, { Component } from 'react';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import singleRequest from '../../Redux/Actions/single.request.action';
import constants from '../../Redux/constants/index';
import RequestDetails from '../Components/request.details.component';
import RequestComment from '../Components/request.comments.component';

export class SingleRequest extends Component {
	componentDidMount() {
		const { singleRequest, match, loading } = this.props;
		const { id } = match.params;
		loading();
		singleRequest(id);
	}

	render() {
		document.title = 'Barefoot || single request';
		const { details, pending, error } = this.props;
		const data = !pending && details && !details.data ? details : null;
		return (
			<>
				<Header active_menu={1} showSideNav={true} />
				<div className='breadcomb text-primary shadow-sm pb-3'>
					<span>
						<strong>Trip requests </strong>/<strong> Single Trip request</strong>
					</span>
				</div>
				<div className=' request row col-sm-12 col-md-8 col-lg-9 mt-3 '>
					{!pending && data !== null && (
						<React.Fragment>
							<div className='col-md-6 card mt-3 mb-3'>{<RequestDetails data={data} />}</div>
							<div className='col-md-6 mt-3 mb-3 card'>
								<RequestComment props={this.props} />
							</div>
						</React.Fragment>
					)}
					{pending && (
						<div className='col text-center' style={{ marginTop: '20%' }}>
							<div className='spinner-border text-primary '> </div>
						</div>
					)}
					{!pending && error && (
						<div className='col text-center ml-auto mr-auto' style={{ marginTop: '20%' }}>
							<h2 className='text-primary '> {error} </h2>
						</div>
					)}
				</div>
			</>
		);
	}
}

export const mapDispatchToProps = dispatch => {
	return {
		singleRequest: async requesId => dispatch(await singleRequest(requesId)),
		loading: () =>
			dispatch({
				type: constants.GETREQUEST_PENDING,
				payload: null,
				error: null,
			}),
	};
};

export const mapStateToProps = ({ Request, replyComment }) => ({
	pending: Request.pending,
	details: Request.payload,
	error: Request.error,
	reply_success: replyComment.reply,
	reply_error: replyComment.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRequest);
