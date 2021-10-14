
const MainGame = ({ round, combinedWords, handleClick, definition, checkAnswer }) => {

	return (
		<div className="wrapper">
			{
				// user can only see this message whene checkAnser true or false
				checkAnswer === null ? null : (
					<>
						{
							checkAnswer === true ? (
								<p className="answer right">Right</p>
							) : (<p className="answer wrong">Wrong</p>)
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
								onClick={(e) => { handleClick(e, individualWord) }}>
								{individualWord.word}
							</button>
						)
					})
				) : null
			}
			{
				round < 10 ? (
					<h2>{definition}</h2>
				) : null
			}

		</div>
	)
}

export default MainGame