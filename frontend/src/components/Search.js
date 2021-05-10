import React from 'react'

const Search = ({ searchText }) => {
    // const [text, setText ] = useState('');

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(text)
    //     //searchText(text);
    // }

    return (
        <div>
               <form 
            //    onSubmit={onSubmit} 
               className="form-inline my-2 my-lg-0">
                    <input 
                    // onChange={e => setText(e.target.value)} 
                    className="form-control mr-sm-2" 
                    type="text" placeholder="Search"/>
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">검색</button>
                </form>
        </div>
    )
}

export default Search
