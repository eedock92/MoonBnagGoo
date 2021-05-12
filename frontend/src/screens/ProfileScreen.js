import React, {useState, useEffect} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'


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

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }else{
            if(!userInfo.name){
                dispatch(getUserDetails('profile'))
            }else{
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()

        if( password !== confirmPassword){
            setMessage('패스워드가 같지 않습니다.')
        }else{
            // DISPATCH UPDATE PROFILE
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
        </Col>
    </Row>
    )
}

export default ProfileScreen
