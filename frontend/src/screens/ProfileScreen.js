import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders } = orderListMy

   
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !userInfo.name || success){
                dispatch({ type : USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, history, userInfo, success, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if( password !== confirmPassword){
            setMessage('패스워드가 같지 않습니다.')
        }else{
            // DISPATCH UPDATE PROFILE
            console.log(name, email, password)
            dispatch(updateUserProfile({ id : user._id, name, email, password}))
        }
    }

    return (
        <Row>

        <Col md={3}>
        <h2>회원정보</h2>
           
           {message && <Message variant='danger'>{message}</Message>}
           {error && <Message variant='danger'>{error}</Message>}
           {success && <Message variant='success'>회원정보가 변경 되었습니다.</Message>}
           {loading && <Loader />}
           
           <Form onSubmit={submitHandler}>

               <Form.Group controlId='email'>
                   <Form.Label>이름</Form.Label>
                   <Form.Control
                       type='name'
                       placeholder='이름을 입력하세요'
                       value={name}
                       onChange = { e => setName(e.target.value)}
                   ></Form.Control>
               </Form.Group>

               <Form.Group controlId='email'>
                   <Form.Label>이메일</Form.Label>
                   <Form.Control
                       type='email'
                       placeholder='이메일을 입력하세요'
                       value={email}
                       onChange = { e => setEmail(e.target.value)}
                   ></Form.Control>
               </Form.Group>

               <Form.Group controlId='password'>
                   <Form.Label>비밀번호</Form.Label>
                   <Form.Control
                       type='password'
                       placeholder='비밀번호를 입력하세요'
                       value={password}
                       onChange = { e => setPassword(e.target.value)}
                   ></Form.Control>
               </Form.Group>

               <Form.Group controlId='confirmPassword'>
                   <Form.Label>비밀번호 확인</Form.Label>
                   <Form.Control
                       type='password'
                       placeholder='비밀번호를 재입력하세요'
                       value={confirmPassword}
                       onChange = { e => setConfirmPassword(e.target.value)}
                   ></Form.Control>
               </Form.Group>

               <Button type='submit' variant='primary'>
                   수정하기
               </Button>
           </Form>
        </Col>

        <Col md={9}>
            <h2>나의 주문</h2>
            { loadingOrders ? <Loader /> : errorOrders ? 
            <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className = 'table-sm'>
                        <thead>
                            <tr>
                                <th>주문번호</th>
                                <th>날짜</th>
                                <th>최종금액</th>
                                <th>지불금액</th>
                                <th>배송금액</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10) 
                                         ) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10) 
                                         ) : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                        )}
                                    </td>
                                    <td>
                                         <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                상세정보
                                            </Button>
                                        </LinkContainer>  
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )    
            }
        </Col>
    </Row>
    )
}

export default ProfileScreen
