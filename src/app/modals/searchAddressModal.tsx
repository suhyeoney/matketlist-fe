'use client'

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchAddressModalOpen } from '../features/modalControl/modalControlSlice';
import { useEffect } from 'react';
import searchPlace from '../utils/searchPlace';

const SearchAddressModal: React.FC = () => {

	const modalControl = useSelector((state: RootState) => state.modalControl);
	const dispatch = useDispatch();

	const closeModal = () => {
		dispatch(setSearchAddressModalOpen(false));
	};

	useEffect(() => {
		const res = searchPlace({ query: '백소정' });
		console.log(res);
	}, []);

  return (
		<div className="container flex justify-center mx-auto">
				<div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
						<div className=" p-6 bg-white divide-y divide-gray-500 w-[800px] h-[600px]">
								<div className="flex items-center justify-between cursor-pointer" onClick={ closeModal }>
										<h3 className="text-2xl">Model Title</h3>
										<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
												stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
														d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
								</div>
								<div className="mt-4">
									<p className="mb-4 text-sm">

									</p>
									<div className="flex flex-row justify-center gap-[10px]">
										<button className="px-4 py-2 text-white bg-red-600 rounded cursor-pointer" onClick={ closeModal }>닫기</button>
										<button className="px-4 py-2 text-white bg-green-600 rounded cursor-pointer">Save</button>
									</div>
								</div>
						</div>
				</div>
		</div>
	);
};

export default SearchAddressModal;