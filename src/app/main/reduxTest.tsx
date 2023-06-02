'use client'

import type { RootState } from '../store/store'; 
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../features/counter/counterSlice'; 

const ReduxTest: React.FC = () => {

	const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

	return (
		<div className="flex flex-col gap-[10px] justify-center">
      <button onClick={ () => dispatch(increment()) }>DO INCREMENT</button>
      <button onClick={ () => dispatch(decrement()) }>DO DECREMENT</button>
      <button onClick={ () => dispatch(incrementByAmount(2)) }>DO INCREMENT BY 2</button>
      <span>{ count }</span>
		</div>
	);
};

export default ReduxTest;