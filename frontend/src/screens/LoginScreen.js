import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector( state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return <FormContainer>
            <h1>로그인</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

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

                <Button type='submit' variant='primary'>
                    로그인
                </Button>

                <Button type='submit' variant='danger'>
                <i className="fab fa-google left"></i> 구글 계정으로 로그인
                </Button>
            </Form>

            <Row className = 'py-3'>
                <Col>
                    처음 오셨나요? <Link to = {redirect ? `/register?redirect=${redirect}` : '/register'}>회원가입</Link>
                </Col>
            </Row>

        </FormContainer>
    
}

export default LoginScreen
