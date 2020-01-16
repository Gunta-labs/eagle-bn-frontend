import React from 'react';
import { connect } from 'react-redux';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getAccomodations from '../../Redux/Actions/getAllAccomodations.action.js';
import getAllAccomodationsByFilter from '../../Redux/Actions/getAccommodationByFilter.action.js';
import Accomodations from '../Components/Accomodations';
import Header from '../Components/Header';

export class GetAllAccomodations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: 'all',
			inputType: 'text',
			filterText: '',
			hide: true,
		};
		this.handleSelect = this.handleSelect.bind(this);
		this.handleText = this.handleText.bind(this);
		this.searchData = this.searchData.bind(this);
	}
	componentDidMount() {
		this.props.getAccomodations();
	}

	searchData(event) {
		const { filter, filterValue } = this.state;
		event.preventDefault();
		this.props.getAccomodationsByFilter(`${filter}=${filterValue}`);
	}

	handleSelect(event) {
		event.preventDefault();
		const { value } = event.target;
		if (value === 'costLessOr' || value === 'costGreaterOr') {
			this.setState({
				inputType: 'number',
				filter: value,
				hide: false,
				filterText: 'Enter the cost',
			});
		} else if (value === 'isAvailable=true' || value === 'isAvailable=false' || value === 'all') {
			this.setState({ hide: true, inputType: 'text', filter: value });
			this.props.getAccomodationsByFilter(value);
		} else {
			this.setState({
				inputType: 'text',
				hide: false,
				filter: value,
				filterText: `Enter the ${value}`,
			});
		}
	}
	handleText(event) {
		event.preventDefault();
		const { value } = event.target;
		this.setState({ filterValue: value });
	}
	render() {
		document.title = 'Barefoot || accommodations';
		const { data } = this.props.accomodation;
		const { inputType, filterText, hide, filter } = this.state;
		return (
			<div>
				<Header />
				<div className='my-search shadow-lg border-0'>
					<div className='container d-flex justify-content-center align-items-center'>
						<form onSubmit={this.searchData} style={{ marginTop: '100px' }}>
							<div className='input-group mb-3'>
								<div
									className='input-group-append bg-transparent border'
									style={{ borderRadius: '10px' }}
								>
									<div className='bg-transparent text-light pt-3 pl-2 pr-2'>
										<FontAwesomeIcon icon={faFilter} />
									</div>
									<select
										type='select'
										className='bg-transparent text-light border-0'
										id='filter'
										onChange={this.handleSelect}
									>
										<option defaultValue='all'>all</option>
										<option value='name'>name</option>
										<option value='isAvailable=true'>available</option>
										<option value='isAvailable=false'>unavailable</option>
										<option value='address'>address</option>
										<option value='amenitie'>amenities</option>
										<option value='services'>services</option>
									</select>
								</div>
								{filter !== 'services' && filter !== 'amenitie' && (
									<input
										id='filterVal'
										hidden={hide}
										type={inputType}
										className='form-control bg-transparent border border-top-0 border-right-0 border-left-0 text-white'
										style={{ height: '50px', width: '300px', marginLeft: '10px' }}
										placeholder={filterText}
										onChange={this.handleText}
									/>
								)}
								{filter === 'services' && (
									<select
										type='select'
										hidden={hide}
										className='form-control bg-transparent border border-top-0 border-right-0 border-left-0 text-white ml-2'
										id='service'
										onChange={this.handleText}
									>
										<option defaultValue=' '>select services</option>
										<option value='sauna'>sauna</option>
										<option value='theater'>theater</option>
										<option value='room'>room services</option>
										<option value='photocopy'>photocopy</option>
										<option value='kids'>kids paradise club</option>
										<option value='swimming pool'>swimming pool</option>
										<option value='tenis'>tenis</option>
										<option value='volley ball'>volley ball</option>
									</select>
								)}
								{filter === 'amenitie' && (
									<select
										type='select'
										hidden={hide}
										className='form-control bg-transparent border border-top-0 border-right-0 border-left-0 text-white ml-2'
										id='amenitie'
										onChange={this.handleText}
									>
										<option defaultValue=' '>select amenities</option>
										<option value='wifi'>wifi</option>
										<option value='tv'>tv</option>
										<option value='laundry'>laundry</option>
										<option value='fax'>fax</option>
										<option value='bussness'>center</option>
										<option value='concierge'>concierge desk</option>
									</select>
								)}
								<div hidden={hide}>
									<button
										id='search'
										type='button'
										className=' bg-transparent border-0 text-light mt-3 ml-4'
										onClick={this.searchData}
									>
										<span>
											<FontAwesomeIcon icon={faSearch} />
										</span>
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className='p-3 px-5 mb-5'>
					<h5 className='title mb-3 text-primary'> Accomodations </h5>
					<span className='draw draw-dark'></span>
					<h1>
						<span className='title mb-3 text-secondary d-flex justify-content-center align-items-center'>
							{!data && 'No accommodation(s) found'}
						</span>
					</h1>
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
		getAccomodationsByFilter: async filter => dispatch(await getAllAccomodationsByFilter(filter)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GetAllAccomodations);
