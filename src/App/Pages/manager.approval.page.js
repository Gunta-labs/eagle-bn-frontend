import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
	managerPreview,
	requestPreviewOne,
	requestPreviewOneStop,
	changeFilter,
	requestPreviewPending,
	changePager,
	changeReqStatus,
	changeaRStatus,
} from '../../Redux/Actions/manager.approval.action';
import Header from '../Components/Header';
import checkToken, { token } from '../../helper/helper';
import getUserProfile from '../../helper/user.helper';
import getSingleRequest from '../../helper/request.helper';
import Request from '../Components/request.approval';
import previewTrip from '../Components/preview.trip';
import previewPending from '../Components/preview.pending';
import previewARModel from '../Components/approve.reject';

class ManagerApproval extends React.Component {
	constructor(props) {
		super(props);
		this.loadRequest = this.loadRequest.bind(this);
		this.showModal = this.showModal.bind(this);
		this.changePropFilter = this.changePropFilter.bind(this);
		this.closeModel = this.closeModel.bind(this);
		this.showFilter = this.showFilter.bind(this);
		this.showPagers = this.showPagers.bind(this);
		this.changePaging = this.changePaging.bind(this);
		this.apprOrRej = this.apprOrRej.bind(this);
		this.showARModel = this.showARModel.bind(this);
		this.props.managerPreview(checkToken().userId, token);
	}

	async loadRequest(index) {
		const { approvalRequests } = this.props;
		const { UserId } = approvalRequests.filter(element => element.id === parseInt(index))[0];
		this.props.requestPreviewPending();
		const user = await getUserProfile(UserId);
		const request = await getSingleRequest(index, token);
		return { user, request };
	}
	showMessage() {
		const { previewStatus, approvalRequests, filter, pager } = this.props;
		if (previewStatus === 'success') {
			return approvalRequests
				.filter(element => element.status === filter)
				.filter((element, index) => index < pager * 6 && index >= (pager - 1) * 6)
				.map((element, index) => (
					<Request
						request={element}
						index={element.id}
						showModel={this.showModal}
						showARModel={this.showARModel}
					/>
				));
		}
		return;
	}
	changePropFilter(event) {
		event.preventDefault();
		this.props.changeFilter(event.target.value);
	}
	closeModel(event) {
		event.preventDefault();
		this.props.requestPreviewOneStop();
		this.props.changeaRStatus({ status: 'not_started' });
	}
	showFilter() {
		const { filter } = this.props;
		return (
			<select className='form-control w-25 preview-selector' onChange={this.changePropFilter}>
				{['pending', 'approved', 'rejected'].map(element =>
					element === filter ? <option selected> {element} </option> : <option> {element} </option>,
				)}
			</select>
		);
	}
	async showModal(event) {
		event.preventDefault();
		const { id } = event.target;
		this.props.requestPreviewOne(await this.loadRequest(id.replace('view-', '')));
	}
	changePaging(event) {
		event.preventDefault();
		this.props.changePager(event.target[0].innerHTML);
	}
	showARModel(type, index) {
		const { changeaRStatus } = this.props;
		changeaRStatus({ status: 'started', type, index });
	}
	apprOrRej(type, index) {
		const { changeReqStatus } = this.props;
		changeReqStatus(index, type, token);
	}
	showPagers() {
		const { approvalRequests, pager, filter, changePager } = this.props;
		return new Array(
			Math.ceil(approvalRequests.filter(element => element.status === filter).length / 6),
		)
			.fill()
			.map((element, index) => index + 1)
			.map(element => (
				<li
					className='page-item'
					onClick={e => {
						e.preventDefault();
						changePager(element);
					}}
				>
					<span className={element === pager ? 'bg-primary page-link text-white' : 'page-link'}>
						{element}
					</span>
				</li>
			));
	}
	render() {
		document.title = 'Barefoot || approvals';
		const {
			previewedRequest,
			PreviewedHTML,
			changePager,
			pager,
			filter,
			approvalRequests,
			aRStatus,
		} = this.props;
		return (
			<div>
				<Header active_menu={1} showSideNav={true} />
				<div className='request-container mb-3 container'>
					{this.showFilter()} <br />
					<div className={this.props.messageClass}> {this.props.message} </div>
					<div className='row'>{this.showMessage()}</div>
					<div className='col-12 mt-3 ml-3'>
						<nav aria-label='Page navigation pagination mx-auto'>
							<ul className='pagination'>
								<li className='page-item'>
									<p
										className='page-link'
										aria-label='Previous'
										id='previous-nav'
										onClick={e => changePager(pager > 1 ? pager - 1 : pager)}
									>
										<span aria-hidden='true'>&laquo;</span>
										<span className='sr-only'>Previous</span>
									</p>
								</li>
								{this.showPagers()}
								<li className='page-item'>
									<p
										className='page-link'
										aria-label='Next'
										id='next-nav'
										onClick={e =>
											changePager(
												pager <
													Math.ceil(
														approvalRequests.filter(element => element.status === filter).length /
															6,
													)
													? pager + 1
													: pager,
											)
										}
									>
										<span aria-hidden='true'>&raquo;</span>
										<span className='sr-only'>Next</span>
									</p>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				{aRStatus.status === 'success' && (window.location = '/manager')}
				{aRStatus.status === 'started' || aRStatus.status === 'pending'
					? previewARModel(aRStatus, this.closeModel, this.apprOrRej)
					: ''}
				{previewedRequest === 'pending' ? previewPending(this.closeModel) : ''}
				{previewedRequest === 'started' ? previewTrip(PreviewedHTML, this.closeModel) : ''}
			</div>
		);
	}
}

ManagerApproval.propTypes = {
	previewStatus: propTypes.string,
	previewedRequest: propTypes.any,
	approvalRequests: propTypes.array,
	PreviewedHTML: propTypes.any,
	filter: propTypes.string,
	pager: propTypes.number,
	message: propTypes.string,
	messageClass: propTypes.string,
	aRStatus: propTypes.string,
};

const mapStateToProps = ({ ManagerApprovalReducer }) => ({
	previewStatus: ManagerApprovalReducer.previewStatus,
	previewedRequest: ManagerApprovalReducer.previewedRequest,
	approvalRequests: ManagerApprovalReducer.approvalRequests,
	PreviewedHTML: ManagerApprovalReducer.PreviewedHTML,
	filter: ManagerApprovalReducer.filter,
	message: ManagerApprovalReducer.message,
	messageClass: ManagerApprovalReducer.messageClass,
	pager: ManagerApprovalReducer.pager,
	aRStatus: ManagerApprovalReducer.aRStatus,
});

export default connect(mapStateToProps, {
	managerPreview,
	requestPreviewOne,
	requestPreviewOneStop,
	changeFilter,
	requestPreviewPending,
	changePager,
	changeaRStatus,
	changeReqStatus,
})(ManagerApproval);
