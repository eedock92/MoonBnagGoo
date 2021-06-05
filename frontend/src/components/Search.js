import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Search = ({ history }) => {
    const [keyword, setKeyword ] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
               <Form onSubmit={onSubmitHandler} className="form-inline my-2 my-lg-0" inline>
                    <Form.Control 
                       type="text"
                       name='q'
                       onChange={e => setKeyword(e.target.value)} 
                       placeholder="검색하기"
                       className = 'mr-sm-2 ml-sm-5'
                    ></Form.Control>
          
                    <Button className="btn btn-secondary my-2 my-sm-0" type="submit">검색</Button>
                </Form>
     
    )
}

export default Search
