import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
//import DaumPostcode from 'react-daum-postcode'


const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress ] = useState(shippingAddress.address)
    const [city, setCity ] = useState(shippingAddress.city)
    const [postalCode, setPostalCode ] = useState(shippingAddress.postalCode)
    const [country, setCountry ] = useState(shippingAddress.country)

    //다음 우편주소 API 사용
    // const [isAddress, setIsAddress] = useState("")
    // const [isZoneCode, setIsZoneCode] = useState()

    // const handleComplete = (data) => {
    //     let fullAddress = data.address;
    //     let extraAddress = "";
    
    
    //     if (data.addressType === "R") {
    //       if (data.bname !== "") {
    //         extraAddress += data.bname;
    //       }
    //       if (data.buildingName !== "") {
    //         extraAddress +=
    //           extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    //       }
    //       fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    //     }
    //     setIsZoneCode(data.zonecode);
    //     setIsAddress(fullAddress);
    //     setIsPostOpen(false);
    //   };
    //--------------------------------------

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return <FormContainer>
        <CheckoutSteps step1 step2/>
            <h1>배송지 선택</h1>
            <Form onSubmit={submitHandler}>


                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type = 'text'
                        placeholder = '주소를 입력하세요'
                        value = {address || ''}
                        required
                        onChange= {(e) => setAddress(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type = 'text'
                        placeholder = '도시를 입력하세요'
                        value = {city || ''}
                        required
                        onChange= {(e) => setCity(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>우편주소</Form.Label>
                    <Form.Control
                        type = 'text'
                        placeholder = '우편주소를 입력하세요'
                        value = {postalCode || ''}
                        required
                        onChange= {(e) => setPostalCode(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>배송지</Form.Label>
                    <Form.Control
                        type = 'text'
                        placeholder = '배송지를 입력하세요'
                        value = {country || ''}
                        required
                        onChange= {(e) => setCountry(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    계속
                </Button>
            </Form>
           </FormContainer>
    
}

export default ShippingScreen
