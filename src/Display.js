// import axios from 'axios';
// import { useEffect } from 'react';

// const Display = ({ data }) => {

//     useEffect(() => {
//         console.log(data.word);
//         // console.log(data.defs);
//         axios({
//             url: 'https://api.datamuse.com/words',
//             method: 'GET',
//             dataResponse: 'json',
//             params: {
//                 md: "d",
//                 rel_hom: data.word
//             }
//         }).then(res => {
//             console.log(res.data);

//         });

//     })
//     return (
//         <div>
//             <h2>asdasd</h2>
//         </div>
//     )
// }

// export default Display;