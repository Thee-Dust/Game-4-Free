import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import './Signup.css'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const { signup } = useAuth()
  const [ error, setError ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const history = useHistory()


  async function handleSubmit(e) {
    e.preventDefault()
    if(passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push('/')
    } catch (error) {
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <div className='auth'>
      <Card>
        <Card.Body>
          <h2>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className='card-form'>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmationRef} required/>
            </Form.Group>
            <Button type='submit' disabled={loading}>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='switch-auth'>
        Already have an account? <Link to='/login'>Login</Link>
      </div>
    </div>
  )
}
