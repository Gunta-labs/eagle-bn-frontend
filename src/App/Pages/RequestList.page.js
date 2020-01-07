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
import filterRequest from '../../Redux/Actions/filter.request.action';

const mapStateToProps = state => ({
	payload: state.Request.payload,
	pending: state.Request.pending,
	error: state.Request.error,
	filtered: state.filterRequest.filtered_data,
	filter_error: state.filterRequest.error,
});
const mapDispatchToProps = dispatch => {
	return {
		initialize: () =>
			dispatch({
				type: constants.GETREQUEST_PENDING,
				pending: true,
			}),
		getRequests: async token => dispatch(await getRequests(token)),
		filterRequest: async payload => dispatch(await filterRequest(payload)),
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
		searchModal: false,
		search_error_message: null,
		destination: '',
		origin: '',
		departureTime: '',
		departure: '',
		return: '',
		from: '',
		to: '',
	};
	searchModal = e => {
		e.preventDefault();
		this.setState({
			searchModal: this.state.searchModal ? false : true,
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		const { search_error_message, currentPage, searchModal, ...options } = this.state;
		let params = '';
		Object.keys(options).forEach(key => {
			if (options[`${key}`] !== '') {
				params += `${key}=${options[`${key}`]}&`;
			}
		});
		let searchQuery = params.substring(0, params.length - 1);
		if (searchQuery !== '') {
			this.props.filterRequest(searchQuery);
			this.setState({ searchModal: false, search_error_message: null });
		} else {
			this.setState({ search_error_message: 'All the fields must not be empty' });
		}
	};
	handleClick = e => {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value,
		});
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
		document.title = 'Barefoot || requests';
		let { payload, pending, error, filtered, filter_error } = this.props;
		const data =
			filtered && filter_error === null
				? filtered.data
				: payload && payload.data
				? payload.data
				: [];
		const errorOrEmpty =
			(!pending && filter_error) || (!pending && data.length === 0) || filter_error;
		const current = this.state.currentPage;
		return (
			<>
				<div>
					<Header active_menu={1} showSideNav={true} />
					<div className='row mainContainer'>
						<div className='row w-100'>
							<Link to='/request/create' className='btn btn-primary mr-5 request-button'>
								Create a new request
							</Link>{' '}
							<input
								id='search_modal'
								className='btn btn-primary ml-auto request-button mr-4'
								onClick={this.searchModal}
								type='submit'
								value='Filter Request'
							/>
						</div>
						{this.state.searchModal && (
							<div className='searchModal shadow-sm p-3 rounded'>
								<form className='' onSubmit={this.handleSubmit}>
									{this.state.search_error_message && (
										<span className='text-danger text-center'>
											{this.state.search_error_message}
										</span>
									)}
									<div className='form-group'>
										<label htmlFor='origin'>Origin</label>
										<input
											className='form-control'
											onChange={this.handleClick}
											id='origin'
											name='origin'
											type='text'
											value={this.state.origin}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='destination'>Destinations</label>
										<input
											className='form-control'
											id='destination'
											name='destination'
											type='text'
											onChange={this.handleClick}
											value={this.state.destination}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='status'>Status</label>
										<select
											className='form-control'
											id='status'
											onChange={this.handleClick}
											name='status'
										>
											<option value=''>Select </option>
											<option value={'pending'}> Pending </option>
											<option value={'approved'}> Approved </option>
											<option value={'rejected'}> Rejected </option>
										</select>
									</div>
									<div className='d-flex'>
										<div className='form-group pl-3 pr-3'>
											<label htmlFor='from'>From</label>
											<input
												className='form-control'
												id='from'
												onChange={this.handleClick}
												name='from'
												type='date'
												value={this.state.from}
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='to'>To</label>
											<input
												className='form-control'
												id='to'
												onChange={this.handleClick}
												name='to'
												type='date'
												value={this.state.to}
											/>
										</div>
									</div>
									<div className='d-flex'>
										<div className='form-group pl-3 pr-3'>
											<label htmlFor='departure'>Departure time</label>
											<input
												className='form-control'
												onChange={this.handleClick}
												id='departure'
												name='departureTime'
												type='date'
												value={this.state.departure}
											/>
										</div>
										<div className='form-group'>
											<label htmlFor='return'>return time</label>
											<input
												className='form-control'
												id='return'
												onChange={this.handleClick}
												name='returnTime'
												type='date'
												value={this.state.return}
											/>
										</div>
									</div>
									<input
										type='submit'
										value='Search'
										id='search-btn'
										className='btn  btn-primary mr-auto'
									/>
								</form>
							</div>
						)}
						<div className='row col-12 col-sm-12 col-md-10 col-lg-10 content-wrapper request-list'>
							{(pending || error || data.length < 1 || (filter_error && filter_error.msg)) && (
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
							{!pending && filter_error === null && this.displayRequests(data, current)}
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
									{filter_error === null && this.getPagination(data)}
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
			</>
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
