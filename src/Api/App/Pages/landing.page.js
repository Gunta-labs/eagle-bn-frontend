import React from 'react';
import AccomImg from '../../Assets/images/acc.jpg';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg from '../../Assets/images/bg.svg';

function Landing() {
	return (
		<div className='vw-100 vh-50'>
			<div className='hero  vh-50 px-5'>
				<img className='bg' src={bg} alt='banner' />
				<div className='d-flex flex-row-reverse'>
					<div className='card col-md-4 py-3 bg-primary'>
						<div className='d-flex'>
							<input type='email' className='form-control w-100' placeholder='Enter email' />
							<input type='email' className='form-control w-100 ml-2' placeholder='Enter email' />
						</div>
						<div className='d-flex my-2'>
							<input type='email' className='form-control w-100' placeholder='Enter email' />
							<input type='email' className='form-control w-100 ml-2' placeholder='Enter email' />
						</div>
						<input type='email' className='form-control w-100' placeholder='Enter email' />
						<p className='ml-auto my-2'>add more destinations</p>
						<button type='submit' className='btn btn-sm btn-primary btn-req w-100'>
							Request Trip
						</button>
					</div>
				</div>
			</div>
			<div className='bg-primary p-3 px-5'>
				<h5 className='title mb-3 text-white'>Popular Destinations</h5>
				<span className='draw draw-light'></span>
				<div className='row mt-5'>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='p-3 px-5 mb-5'>
				<h5 className='title mb-3 text-primary'>Popular Destinations</h5>
				<span className='draw draw-dark'></span>
				<div className='row mt-4'>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<div className='card '>
							<div className='card-body p-0'>
								<img src={AccomImg} alt='accomodation' />
							</div>
							<div className='d-flex flex-column card-footer text-center p-0'>
								<span className='bg-white mt-n3 shadow-sm mx-5'>Serena Hotel</span>
								<span className='my-2'>Kigali, Rwanda</span>
								<div className='d-flex justify-content-between card-foot'>
									<span className='text-secondary my-2 mx-3'>
										<FontAwesomeIcon icon={faHeart} /> 512
									</span>
									<span className='text-primary my-2 mx-3'>
										<FontAwesomeIcon icon={faBookmark} />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Landing;
