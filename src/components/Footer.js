import ProgressBar from "./ProgressBar";

// renders footer credits and progress bar


const Footer = ({progress}) => {
  return (
    <footer>
      <ProgressBar progress={progress} />
      
      <p>Made at <a href="https://junocollege.com/">Juno College</a>, 2021. Data courtesy of <a href="https://www.datamuse.com/api/"> Datamuse API</a>.</p>
    </footer>
  )
}

export default Footer;