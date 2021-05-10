import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'

const Category = ({category}) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
       const fetchProducts = async () => {
            const {data} = await axios.get('/api/products')
       
            setProducts(data)
        }
        fetchProducts()
    }, [])

    return (
        <>
            <Container>

                

                <Row>
                    <Col key={products.category}
                    className = "d-flex justify-content-center" >

                            <Link className="btn btn-outline-primary my-3" to='/'>
                                All
                            </Link>

                            <Link className="btn btn-outline-primary my-3" to='/카메라'>
                                카메라
                            </Link>

                            <Link className="btn btn-outline-primary my-3" to='/헤드폰'>
                                헤드폰
                            </Link>

                            <Link className="btn btn-outline-primary my-3" to='/휴대폰'>
                                휴대폰
                            </Link>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Category
