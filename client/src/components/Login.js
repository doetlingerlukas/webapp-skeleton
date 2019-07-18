import React, { Component } from 'react'
import { Container, Button, Avatar, Typography, TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: "",
      password: "",
      errors: {}
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    return (
      <Container maxWidth='xs'>
        <div>
          <Avatar>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    )
  }
}

export default Login