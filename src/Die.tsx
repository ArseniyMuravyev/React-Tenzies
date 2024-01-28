import { DieType } from './App'

const Die: React.FC<DieType> = ({ value, isHeld, holdDice }) => {
	return (
		<div
			className={`w-10 h-10 flex justify-center items-center rounded-[4px] shadow-[0_2px_2px_0_rgba(0,0,0,0.15)] cursor-pointer ${
				isHeld ? 'bg-[#59E391]' : 'bg-white'
			}`}
			onClick={holdDice}
		>
			<h3 className='font-["Karla"] text-[21px] font-bold text-[#2B283A]'>
				{value}
			</h3>
		</div>
	)
}

export default Die
