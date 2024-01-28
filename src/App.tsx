import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import Die from './Die'

export interface DieType {
	value: number
	id: string
	isHeld: boolean
	holdDice?: () => void
}

function App(): JSX.Element {
	const { width, height } = useWindowSize()
	const [tenzies, setTenzies] = useState<boolean>(false)

	const generateNewDie = (): DieType => {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid()
		}
	}

	const getAllNewDice = (): DieType[] => {
		const newDice = []
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie())
		}

		return newDice
	}

	const rollDice = (): void => {
		if (!tenzies) {
			setDice(oldDice =>
				oldDice.map(die => {
					return die.isHeld ? die : generateNewDie()
				})
			)
		} else {
			setTenzies(false)
			setDice(getAllNewDice())
		}
	}

	const holdDice = (id: string): void => {
		setDice(oldDice =>
			oldDice.map(die => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die
			})
		)
	}

	const [dice, setDice] = useState<DieType[]>(getAllNewDice())

	const diceElements = dice.map(die => (
		<Die
			{...die}
			holdDice={() => holdDice(die.id)}
		/>
	))

	useEffect(() => {
		const allHeld = dice.every(die => die.isHeld)
		const firstValue = dice[0].value
		const sameValue = dice.every(die => die.value === firstValue)
		if (allHeld && sameValue) {
			setTenzies(true)
		}
	}, [dice])

	return (
		<>
			{tenzies && <Confetti width={width} height={height} />}
			<main className='bg-[#0B2434] h-[380px] w-[360px] relative '>
				<div className='bg-[#F5F5F5] w-[320px] h-[320px] absolute left-[20px] top-[30px] px-[35px] pt-[22px] pb-[26px] flex  flex-col items-center rounded-md'>
					<h1 className='font-["Karla"] text-[25.6px] font-bold text-[#2B283A]'>
						{tenzies ? 'You won!' : 'Tenzies'}
					</h1>
					<h2 className='font-["Inter"] text-[13.107px] text-[#4A4E74] tracking-[-0.393px] text-center max-w-[232px]'>
						Roll until all dice are the same. Click each die to freeze it at its
						current value between rolls.
					</h2>
					<div className='grid grid-rows-2 grid-cols-5 gap-[18px] mt-[20px] mb-[26px]'>
						{diceElements}
					</div>
					<button
						className='text-center bg-[#5035FF] font-["Karla"] w-[92px] h-9 text-white rounded-md'
						onClick={rollDice}
					>
						{tenzies ? 'New Game' : 'Roll'}
					</button>
				</div>
			</main>
		</>
	)
}

export default App
