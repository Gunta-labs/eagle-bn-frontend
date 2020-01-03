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
			hide: false,
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
			this.setState({ hide: true, inputType: 'text' });
			this.props.getAccomodationsByFilter(value);
		} else {
			this.setState({
				inputType: 'text',
				hide: false,
				filter: value,
				filterText: `Enter the ${value}`,
			});
		}
		this.componentDidMount();
	}
	handleText(event) {
		event.preventDefault();
		const { value } = event.target;
		this.setState({ filterValue: value });
	}
	render() {
		const { data } = this.props.accomodation;
		const { inputType, filterText, hide } = this.state;
		return (
			<div>
				<Header />
				<div className='my-search shadow-lg border-0'>
					<div className='container d-flex justify-content-center align-items-center'>
						<form>
							<div className='input-group mb-3' style={{ marginTop: '30%', height: '35px' }}>
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
										<option value='isAvailable=true'>availables</option>
										<option value='isAvailable=false'>unavailables</option>
										<option value='address'>address</option>
										<option value='costGreaterOr'>cost is greater than</option>
										<option value='costLessOr'>cost is less than</option>
										<option value='services'>services</option>
									</select>
								</div>
								<input
									id='filterVal'
									hidden={hide}
									type={inputType}
									className='form-control bg-transparent border border-top-0 border-right-0 border-left-0 text-white'
									style={{ height: '50px', width: '300px', marginLeft: '10px' }}
									placeholder={filterText}
									onChange={this.handleText}
								/>
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
