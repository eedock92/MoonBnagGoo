import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    //  const addDecimals = (num) => {return (Math.round(num * 100) / 100).toFixed(2)}

    // 주문 총액 계산하기
    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty, 0
    )
    
    //배송비 정의
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 2500
    cart.taxPrice = Number((0.15 * cart.itemsPrice))
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate 

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
      
        
        dispatch(createOrder({
            orderItems : cart.cartItems,
            shippingAddress : cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice : cart.itemsPrice,
            shippingPrice : cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
        console.log("주문하기")
        return
    }


    return (
        <>
           <CheckoutSteps step1 step2 step3 step4/> 
           <Row>
               <Col md={8}>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>배송지</h2>
                           <p>
                               <strong>주소 : </strong>
                               {cart.shippingAddress.address},
                               {cart.shippingAddress.city},
                               {cart.shippingAddress.postalCode},{' '}
                               {cart.shippingAddress.country}
                           </p>
                       </ListGroup.Item>

                       <ListGroup.Item>
                            <h2>결제 방법</h2>
                            <strong>지불 선택 :</strong>
                            {cart.paymentMethod}
                       </ListGroup.Item>

                       <ListGroup.Item>
                            <h2>주문 상품</h2>
                            {cart.cartItems.length <= 0 ? 
                                <Message>카트가 비었습니다</Message> : (
                                    <ListGroup varaiant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name}
                                                        fluid rounded/>
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                          {item.price}원 X {item.qty}개 = {item.qty * item.price}원
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>

               <Col md={4}>
                   <Card>
                       <ListGroup variant='flush'>
                           <ListGroup.Item>
                               <h2>주문 요약</h2>                     
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>주문 상품</Col>
                                   <Col>{cart.itemsPrice}원</Col>
                               </Row>
                           </ListGroup.Item>
                            
                           <ListGroup.Item>
                                <Row>
                                    <Col>배송비</Col>
                                    <Col>{cart.shippingPrice}원</Col>
                                </Row>                  
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>관세 및 부과세 </Col>
                                   <Col>{cart.taxPrice}원</Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>주문 총액</Col>
                                   <Col>{cart.totalPrice}원</Col>
                               </Row>
                           </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                           <ListGroup.Item>
                               <Button type='button' className='btn-block' 
                                disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                    주문하기
                                </Button>
                           </ListGroup.Item>

                       </ListGroup>
                   </Card>
               </Col>
           </Row>
        </>
    )
}

export default PlaceOrderScreen
