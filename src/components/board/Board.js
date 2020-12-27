import React, { useRef, useEffect } from 'react';
import Grid from 'react-css-grid';
import styled from 'styled-components';
import ArrowKeysReact from 'arrow-keys-react';
import mario from '../assets/mario.png';
import sprite from '../assets/sprite.png';
import './board.css';

const GameBoard = styled.div`
	height: ${(props) => (props.height ? props.height : 'auto')};
	width: ${(props) => (props.width ? props.width : 'auto')};
	padding: 1rem;
`;
const Character = styled.img`
	height: 40px;
	width: 40px;
	display: block;
	margin: auto;
`;

const Mario = styled.img`
	height: 50px;
	width: 50px;
	display: block;
	margin: 0;
`;

function Board(height, width) {

	const heightPX = `${10 * 50}px`;
	const widthPX = `${10 * 50}px`;
	let marioPosition = { y: Math.floor(10 / 2), x: Math.floor(10 / 2) };
	let moves = 0;
	const marioRef = useRef();

	const getRandomBlocks = (height, width) => {
		let array = [];
		for (let i = 0; i < 1; i++) {
			let x = Math.floor(Math.random() * Math.floor(width - 1));
			let y = Math.floor(Math.random() * Math.floor(height - 1));
			// array.push({ x, y });
			array = [...array, {x: x,y: y}];
		}
		return array;
	};
	const randomBlocksArray = [{x: 6, y: 6, display: true}, {x: 5, y: 5, display: true}];

	// const randomBlocksArrayRef = useRef({
	// 	randomBlocksArray: getRandomBlocks(10,10)
	// })

	ArrowKeysReact.config({
		left: () => {
			// console.log(marioRef.current.style.marginLeft.split('p')[0]);
			if (marioPosition.x > 1) {
				console.log(marioRef)
				marioRef.current.style.marginLeft = `${parseInt(marioRef.current.style.marginLeft.split('p')[0]) -
					50}px`;
				marioPosition.x -= 1;
				for (let i=0; i<randomBlocksArray.length; i++){
					if (marioPosition.x - 1 === randomBlocksArray[i].x && marioPosition.y - 1 === randomBlocksArray[i].y){
						randomBlocksArray[i].display = 'none';
						console.log('match found', randomBlocksArray);
					}
				}
				console.log(marioPosition);
				moves++;
			}
		},
		right: () => {
			// console.log(marioRef.current.style.marginLeft.split('p')[0]);
			if (marioPosition.x < 10) {
				marioRef.current.style.marginLeft = `${parseInt(marioRef.current.style.marginLeft.split('p')[0]) +
					50}px`;
				marioPosition.x += 1;
				console.log(marioPosition);
				moves++;
			}
		},
		up: () => {
			// console.log(marioRef.current.style.marginTop.split('p')[0]);
			if (marioPosition.y > 1) {
				marioRef.current.style.marginTop = `${parseInt(marioRef.current.style.marginTop.split('p')[0]) - 54}px`;
				marioPosition.y -= 1;
				console.log(marioPosition);
				moves++;
			}
		},
		down: () => {
			// console.log(marioRef.current.style.marginTop.split('p')[0]);
			if (marioPosition.y < 10) {
				marioRef.current.style.marginTop = `${parseInt(marioRef.current.style.marginTop.split('p')[0]) + 54}px`;
				marioPosition.y += 1;
				console.log(marioPosition);
				moves++;
			}
		}
	});

	const createBoard = (height, width) => {
		// const randomBlocksArray = getRandomBlocks(10, 10);
		// const randomBlocksArray = randomBlocksArrayRef.current.randomBlocksArray;
		let board = [];
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				if (x === marioPosition.x - 1 && y === marioPosition.y - 1) {
					board.push(
						<div className="square">
							<Mario
								src={mario}
								alt="mario"
								style={{ marginLeft: '0px', marginTop: '0px' }}
								ref={marioRef}
							/>
						</div>
					);
				} else {
					//if condition remains false, that means no sprite found at this block
					let condition = false;
					//for loop to check if sprite exists as this block
					for (let i = 0; i < randomBlocksArray.length; i++) {
						if ((x === randomBlocksArray[i].x) && (y === randomBlocksArray[i].y)) {
							console.log('sprite', x, y);
							board.push(
								<div className="square">
									<Character src={sprite} alt="sprite" style={{display: 'true'}}/>
								</div>
							);
							condition = true;
							break;
						}
					}
					if (condition === false) {
						board.push(
							<div className="square">
								<p>
									x:{x} y:{y}
								</p>
							</div>
						);
					}
				}
			}
		}
		return board;
	};
	return (
		<div {...ArrowKeysReact.events} tabIndex="1">
			<GameBoard height={heightPX} width={widthPX}>
				<Grid width={50} gap={0}>
					{createBoard(10, 10)}
				</Grid>
			</GameBoard>
		</div>
	);
}

export default Board;
