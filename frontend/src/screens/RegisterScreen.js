import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector( state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH REGISTER

        if(password !== confirmPassword) {
            setMessage('패스워드가 같지 않습니다.')
        }else{
            dispatch(register(name, email, password))
        }

    }

    return <FormContainer>
            <h1>회원가입</h1>
           
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    회원가입
                </Button>
            </Form>

            <Row className = 'py-3'>
                <Col>
                    이미 계정이 있으신가요? {' '}
                    <Link to = {redirect ? `/login?redirect=${redirect}` : '/login'}>
                        회원가입
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    
}

export default RegisterScreen
