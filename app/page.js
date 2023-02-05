'use client';

import { useState } from 'react';
import {
	BsFillSuitClubFill,
	BsFillSuitDiamondFill,
	BsFillSuitHeartFill,
	BsFillSuitSpadeFill,
} from 'react-icons/bs';

export default function Home() {
	const cards = [
		{ card: 'A', suit: 'hearts', value: 0 },
		{ card: '2', suit: 'hearts', value: 1 },
		{ card: '3', suit: 'hearts', value: 2 },
		{ card: '4', suit: 'hearts', value: 3 },
		{ card: '5', suit: 'hearts', value: 4 },
		{ card: '6', suit: 'hearts', value: 5 },
		{ card: '7', suit: 'hearts', value: 6 },
		{ card: '8', suit: 'hearts', value: 7 },
		{ card: '9', suit: 'hearts', value: 8 },
		{ card: '10', suit: 'hearts', value: 9 },
		{ card: 'Q', suit: 'hearts', value: 10 },
		{ card: 'J', suit: 'hearts', value: 11 },
		{ card: 'K', suit: 'hearts', value: 12 },
		{ card: 'A', suit: 'diamonds', value: 13 },
		{ card: '2', suit: 'diamonds', value: 14 },
		{ card: '3', suit: 'diamonds', value: 15 },
		{ card: '4', suit: 'diamonds', value: 16 },
		{ card: '5', suit: 'diamonds', value: 17 },
		{ card: '6', suit: 'diamonds', value: 18 },
		{ card: '7', suit: 'diamonds', value: 19 },
		{ card: '8', suit: 'diamonds', value: 20 },
		{ card: '9', suit: 'diamonds', value: 21 },
		{ card: '10', suit: 'diamonds', value: 22 },
		{ card: 'Q', suit: 'diamonds', value: 23 },
		{ card: 'J', suit: 'diamonds', value: 24 },
		{ card: 'K', suit: 'diamonds', value: 25 },
		{ card: 'A', suit: 'spades', value: 26 },
		{ card: '2', suit: 'spades', value: 27 },
		{ card: '3', suit: 'spades', value: 28 },
		{ card: '4', suit: 'spades', value: 29 },
		{ card: '5', suit: 'spades', value: 30 },
		{ card: '6', suit: 'spades', value: 31 },
		{ card: '7', suit: 'spades', value: 32 },
		{ card: '8', suit: 'spades', value: 33 },
		{ card: '9', suit: 'spades', value: 34 },
		{ card: '10', suit: 'spades', value: 35 },
		{ card: 'Q', suit: 'spades', value: 36 },
		{ card: 'J', suit: 'spades', value: 37 },
		{ card: 'K', suit: 'spades', value: 38 },
		{ card: 'A', suit: 'clubs', value: 39 },
		{ card: '2', suit: 'clubs', value: 40 },
		{ card: '3', suit: 'clubs', value: 41 },
		{ card: '4', suit: 'clubs', value: 42 },
		{ card: '5', suit: 'clubs', value: 43 },
		{ card: '6', suit: 'clubs', value: 44 },
		{ card: '7', suit: 'clubs', value: 45 },
		{ card: '8', suit: 'clubs', value: 46 },
		{ card: '9', suit: 'clubs', value: 47 },
		{ card: '10', suit: 'clubs', value: 48 },
		{ card: 'Q', suit: 'clubs', value: 49 },
		{ card: 'J', suit: 'clubs', value: 50 },
		{ card: 'K', suit: 'clubs', value: 51 },
	];

	const [cardDeck, setCardDeck] = useState([...cards]);
	let swapDeck = [...cardDeck];
	const [selected, setSelected] = useState([]);

	const getSelected = (index, number) => {
		if (selected.length == 0) {
			setSelected([index]);
		} else {
			let isIn = false;
			selected.map((e) => {
				if (e == index || selected.length == number) {
					isIn = true;
				}
			});
			if (!isIn) {
				setSelected([...selected, index]);
			} else {
				let newArray = [];
				selected.map((e) => {
					if (e != index) {
						newArray.push(e);
					}
				});
				setSelected([...newArray]);
			}
		}
	};

	const swapCards = (card1, card2) => {
		let newArray = [];
		let cardOne = null;
		let cardTwo = null;

		console.log(`${card1} and ${card2} will swap...`);
		if (card1 != card2) {
			swapDeck.map((e, cardIndex) => {
				if (cardIndex != card1 && cardIndex != card2) {
					newArray.push(e);
				} else if (cardOne == null) {
					cardOne = { value: e, index: cardIndex };
				} else cardTwo = { value: e, index: cardIndex };
			});
			console.log(cardTwo.index);
			console.log(cardOne.index);

			newArray.splice(cardTwo.index - 1, 0, cardOne.value);
			newArray.splice(cardOne.index, 0, cardTwo.value);
			swapDeck = [...newArray];
		} else {
			console.log(`${card1} and ${card2} can't swap they are the same`);
		}
		setSelected([]);
	};

	const splitCards = () => {
		if (selected.length == 2) {
			let newArray = [];
			let splitArray = [];
			let cardOne = null;
			let cardTwo = null;

			if (selected[0] > selected[1]) {
				cardOne = selected[1];
				cardTwo = selected[0];
			} else {
				cardOne = selected[0];
				cardTwo = selected[1];
			}

			cardDeck.map((e, cardIndex) => {
				if (cardIndex < cardOne || cardIndex > cardTwo) {
					newArray.push(e);
				} else {
					splitArray.push(e);
				}
			});
			setCardDeck([...newArray, ...splitArray]);
			setSelected([]);
		}
	};

	const sinWave = (e, index) => {
		return Math.round(
			-Math.sin((Math.abs(e.value - cardDeck[(index + 1) % 52].value) + 12) / 8.276) * 10 + 10
		);
	};

	const getScore = () => {
		let totalScore = 0;

		cardDeck.map((e, index) => {
			totalScore += sinWave(e, index);
		});

		return totalScore;
	};

	return (
		<main className='text-white min-h-screen flex flex-col justify-center items-center gap-x-[10vw] mb-8'>
			<div className='text-sm sm:text-base text-center p-4'>
				<h2>
					<span className='text-blue-500'>Swap cards</span>: Select two cards to swap places.
				</h2>
				<h2>
					<span className='text-blue-500'>Move to bottom</span>: Select a pile of cards to put in the bottom
					of the deck.
				</h2>
				<h2>
					<span className='text-blue-500'>Shuffle deck</span>: Shuffle the deck randomly.
				</h2>
				<h2>
					<span className='text-blue-500'>Reset deck</span>: Reset the position of the deck.
				</h2>
			</div>
			<div className='fixed left-6 top-[50%] -translate-y-[50%] flex flex-col gap-4'>
				<h2
					className='bg-black/60 border border-white p-2 cursor-pointer w-[80px] text-center'
					onClick={() => {
						if (selected.length == 2) {
							swapCards(selected[0], selected[1]);
							setCardDeck([...swapDeck]);
						}
					}}>
					Swap cards
				</h2>
				<h2
					className='bg-black/60 border border-white p-2 cursor-pointer w-[80px] text-center'
					onClick={() => {
						splitCards();
					}}>
					Move to bottom
				</h2>
				<div className='flex flex-col gap-4'>
					<div>
						<h2>Selected:</h2>
						<div>
							{selected.map((e) => {
								let suit = null;

								switch (cardDeck[e].suit) {
									case 'hearts':
										suit = <BsFillSuitHeartFill className='relative bottom-[-0.35rem]' />;
										break;

									case 'diamonds':
										suit = <BsFillSuitDiamondFill className='relative bottom-[-0.35rem]' />;
										break;

									case 'spades':
										suit = <BsFillSuitSpadeFill className='relative bottom-[-0.35rem]' />;
										break;

									case 'clubs':
										suit = <BsFillSuitClubFill className='relative bottom-[-0.35rem]' />;
										break;
								}

								return (
									<div key={e} className='flex gap-2'>
										<h2 className=''>{cardDeck[e].card}</h2>
										{suit}
									</div>
								);
							})}
						</div>
					</div>
					<h2
						className='bg-black/60 border border-white p-2 cursor-pointer w-[80px] text-center'
						onClick={() => {
							cardDeck.map((e, index) => {
								swapCards(index, Math.round(index + Math.random() * 52) % 52);
							});
							setCardDeck([...swapDeck]);
						}}>
						Shuffle deck
					</h2>
					<h2
						className='bg-black/60 border border-white p-2 cursor-pointer w-[80px] text-center'
						onClick={() => {
							setSelected([]);
							setCardDeck([...cards]);
						}}>
						Reset deck
					</h2>
					<h3>{`Shuffle score: ${getScore()}`}</h3>
				</div>
			</div>
			<div className=''>
				{cardDeck.map((e, index) => {
					let suit = null;

					switch (e.suit) {
						case 'hearts':
							suit = <BsFillSuitHeartFill className='relative bottom-[-0.1rem]' />;
							break;

						case 'diamonds':
							suit = <BsFillSuitDiamondFill className='relative bottom-[-0.1rem]' />;
							break;

						case 'spades':
							suit = <BsFillSuitSpadeFill className='relative bottom-[-0.1rem]' />;
							break;

						case 'clubs':
							suit = <BsFillSuitClubFill className='relative bottom-[-0.1rem]' />;
							break;
					}

					return (
						<div
							key={index}
							className={`${
								e.suit == 'hearts'
									? 'text-red-500'
									: e.suit == 'diamonds'
									? 'text-red-500'
									: e.suit == 'spades'
									? 'text-blue-500'
									: e.suit == 'clubs'
									? 'text-blue-500'
									: ''
							} cursor-pointer flex text-xs justify-center items-center gap-2 bg-black/60 border border-white p-2 m-2 w-16 h-[0.5rem] ${
								selected[0] == index || selected[1] == index
									? 'bg-black/60 shadow-lg scale-110 shadow-white/25'
									: (index < selected[0] && index > selected[1]) ||
									  (index > selected[0] && index < selected[1])
									? 'scale-105'
									: ''
							}`}
							onClick={() => {
								getSelected(index, 2);
							}}>
							<h2>{e.card}</h2>
							{suit}
						</div>
					);
				})}
			</div>
		</main>
	);
}
