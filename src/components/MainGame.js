
const MainGame = ({ round, combinedWords, handleClick, definition, checkAnswer }) => {

	return (
		<div className="wrapper">
			{
				// user can only see this message whene checkAnser true or false
				checkAnswer === null ? null : ( 
					<>
						{
							checkAnswer === true ? 
							(<div className="answerContainer">
								<p className="answer right">Right</p>
							</div>) : 
							(<div className="answerContainer">
							<p className="answer wrong">Wrong</p>
							</div>)
						}
					</>
				)
			}
			{
				round < 10 ? (
					combinedWords.map((individualWord, index) => {
						return (
							<button
								key={index}
								onClick={(e) => { handleClick(e, individualWord) }}
							>
								{individualWord.word}
							</button>
						)
					})
				) : null
			}
			{
				round < 10 ? (
					<p className="definition">{definition}</p>
				) : null
			}

		</div>
	)
}

export default MainGame