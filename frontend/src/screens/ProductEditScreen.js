import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history}) => {
    const productId = match.params.id

    const [name, setName ] = useState('')
    const [price, setPrice ] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { 
        loading : loadingUpdate, 
        error:errorUpdate, 
        success:successUpdate
        } = productUpdate

    useEffect(() => {

        if(successUpdate){

            dispatch({type : PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')

        }else{

            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                
            }

        }
       
   
    }, [product, history ,productId , successUpdate , dispatch])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            console.log(formData)
            const config = { 
                headers : {
                    'Content-Type' : 'multipart/form-data'
                },
            }
            
            console.log("uploadFile_axios") 
            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)

        }catch(error){
            
            console.error(error)
            setUploading(false)
        
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
       // UPDATE PRODUCT
       dispatch(updateProduct({
           _id: productId,
           name,
           price,
           image,
           brand,
           category,
           description,
           countInStock
       }))
    }



    return ( 
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
            <h1>상품 수정</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? 
            (
                <Loader />
            ) : error ? 
            ( 
                <Message variant='danger'>{error}</Message>
            ) : 
            (
                
        <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='제품명을 입력하세요'
                        value={name || ''}
                        onChange = { e => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                    <Form.Label>가격</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='가격을 입력하세요'
                        value={price || ''}
                        onChange = { e => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>이미지</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='이미지 첨부'
                        value={image || ''}
                        onChange = { e => setImage(e.target.value)}>    
                    </Form.Control>
                    <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}>
                    </Form.File>
                    {uploading && <Loader/>}
                </Form.Group>

                <Form.Group controlId='brand'>
                    <Form.Label>브랜드</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='브랜드를 입력하세요'
                        value={brand || ''}
                        onChange = { e => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

            <Form.Group controlId='countInStock'>
                <Form.Label>재고</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='재고를 입력하세요'
                    value={countInStock || ''}
                    onChange = { e => setCountInStock(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
                <Form.Label>카테고리</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='카테고리를 입력하세요'
                    value={category || ''}
                    onChange = { e => setCategory(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
                <Form.Label>설명</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='상세설명을 입력하세요'
                    value={description || ''}
                    onChange = { e => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                수정하기
            </Button>
        </Form>
        )}
            
        </FormContainer>
        </>
       
    )
}

export default ProductEditScreen
