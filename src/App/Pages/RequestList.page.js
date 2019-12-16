import React from 'react';
import { connect } from 'react-redux';
import getRequests from '../../Redux/Actions/request.actions';
import PropTypes from 'prop-types';
import '../../Assets/scss/style.scss';
import constants from '../../Redux/constants';
import Request from '../Components/Request';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import { Array } from 'es6-shim';

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
export class RequestList extends React.Component {
	componentDidMount() {
		this.props.initialize();
		const token = localStorage.getItem('barefoot_token');
		this.props.getRequests(token);
	}
	state = {
		currentPage: 1,
	};
	displayRequests(data, page) {
		const start = (page - 1) * 6;
		return data.slice(start, page * 6).map(req => <Request request={req} />);
	}
	setPage(current, data) {
		this.setState({ currentPage: current });
		this.getPagination(data);
	}
	getPagination(data) {
		const Npage = Math.ceil(data.length / 6);
		const pages = Array(Npage)
			.fill()
			.map((x, i) => i);
		return pages.map(p => (
			<li
				className={`page-item ${this.state.currentPage - 1 === p ? 'active' : ''}`}
				onClick={e => this.setPage(p + 1, data, e)}
			>
				<p className='page-link'>{p + 1}</p>
			</li>
		));
	}
	navigatePagination(add, substract, data) {
		const Npage = Math.ceil(data.length / 6);
		const { currentPage } = this.state;
		const nextPage = currentPage + add - substract;
		if (!(nextPage === Npage + 1 || nextPage < 1)) {
			this.setPage(nextPage, data);
		}
	}
	render() {
		let { payload, pending, error } = this.props;
		const data = payload && payload.data ? payload.data : [];
		const errorOrEmpty = (!pending && data.length === 0) || error;
		const current = this.state.currentPage;
		return (
			<div>
				<Header active_menu={1} showSideNav={true} />
				<div className='row mainContainer'>
					<Link to='/request/create' className='btn btn-primary px-5 request-button'>
						Create a new request
					</Link>
					<div className='row col-12 col-sm-12 col-md-10 col-lg-10 content-wrapper request-list'>
						{(pending || error || data.length < 1) && (
							<div className='d-flex flex-wrap align-content-center justify-content-center col-12'>
								{errorOrEmpty && (
									<div>
										<h3 className='text-secondary d-block text-center m-4 error'>
											No request found
										</h3>
										<div className='col text-center'></div>
									</div>
								)}
								{pending && (
									<div className='col text-center'>
										<div className='spinner-border text-primary '> </div>
									</div>
								)}
							</div>
						)}
						{!pending && this.displayRequests(data, current)}
					</div>{' '}
					<div className='d-flex flex-wrap align-content-center justify-content-center col-12 mt-3'>
						<nav aria-label='Page navigation pagination mx-auto'>
							<ul className='pagination'>
								<li className='page-item'>
									<p
										className='page-link'
										aria-label='Previous'
										id='previous-nav'
										onClick={e => this.navigatePagination(0, 1, data, e)}
									>
										<span aria-hidden='true'>&laquo;</span>
										<span className='sr-only'>Previous</span>
									</p>
								</li>
								{this.getPagination(data)}
								<p
									className='page-link'
									aria-label='Next'
									id='next-nav'
									onClick={e => this.navigatePagination(1, 0, data, e)}
								>
									<span aria-hidden='true'>&raquo;</span>
									<span className='sr-only'>Next</span>
								</p>
							</ul>
						</nav>
					</div>
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

export const Requests = connect(mapStateToProps, mapDispatchToProps)(RequestList);
//export default { Requests, RequestList };
