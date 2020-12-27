import './App.css';
import Board from './components/board';

function App() {
	let height, width;
	let condition = 0;
	const setDimensions = () => {
		height = prompt('Please Enter Board Height');
		width = prompt('Please Enter Board Width');
		condition = 1;
		console.log(height, width);
	};

	return (
		<div >
      <Board/>
			{/* {setDimensions()}
			{height > 0 &&
			width > 0 &&
			condition === 1 && (
				<div>
					<h2>Hello</h2>
					<Board />
				</div>
			)} */}
		</div>
	);
}

export default App;
