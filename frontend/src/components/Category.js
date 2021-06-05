import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Row, Form, ButtonGroup, ToggleButton} from 'react-bootstrap'




const Category = ({history}) => {
    const [category, setCategory] = useState('')
    const [checked, setChecked] = useState(false);

    const checkboxs     = [
        { name : '시계', value : '1'},
        { name : '신발', value : '2'},
        { name : '모형제품', value : '3'},
        { name : '전자제품', value : '4'},
    ]


    
    const onSubmitHandler = (e) => {
        console.log(category)
        e.preventDefault()
        history.push(`/search/${category}`)
        
    }

   

   

    return (
            <>
             <Row>
             <Link className="btn btn-outline-primary my-3"to='/'>
                All
            </Link>
       
            <Form onSubmit={onSubmitHandler}>

                <ButtonGroup toggle className="btn btn-outline-primary my-3">
                    {checkboxs.map((check, idx) =>(
                            <ToggleButton
                            key={idx}
                            type="checkbox"
                            variant="primary"
                            checked={checked === check.value}
                            value={check.value}
                            onChange= { e => setChecked(e.currentTarget.checked)}>
                                {checkboxs.name}
                        </ToggleButton>
                    ))}
                
                </ButtonGroup>

                
               
                <Form.Label
                    className="btn btn-outline-primary my-3"
                    type="submit"
                    value='전자제품'
                    onClick={e => setCategory(e.target.value)}>
                        전자제품
                </Form.Label>        
                    
                <Form.Label 
                    className="btn btn-outline-primary my-3" 
                         type="submit"
                        value='시계'
                     onChange={e => setCategory(e.target.value)}>
                    시계
                </Form.Label>
                    
                <Form.Label className="btn btn-outline-primary my-3" 
                                value='장난감'>
                                장난감
                </Form.Label>

            </Form>
            
            </Row>
   </>
    )
}

export default Category
