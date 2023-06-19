/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { Input, Button, Form, notification } from 'antd'
import { history } from 'index'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import UserApi from 'services/api/user'
import style from '../style.module.scss'

const ValidatePassword = password => {
  if (password?.length < 8) {
    return false
  }
  if (password?.length > 40) {
    return false
  }
  return true
}

const ResetPassword = () => {
  const { token } = useParams()
  const onFinish = values => {
    if (!ValidatePassword(values.password)) {
      notification.error({
        message: 'Password must be between 8 and 40 characters',
      })
      return
    }
    if (values.password !== values.confirmPassword) {
      notification.error({
        message: 'Password and confirm password do not match',
      })
      return
    }
    if (!token) {
      notification.error({
        message: 'Error',
        description: 'Not found',
      })
      history.push('/auth/login')
    } else
      UserApi.resetPasswordFinish(token, {
        password: values.newPassword,
      })
        .then(response => {
          if (response) {
            notification.success({
              message: 'Password reset successfully',
            })
            history.push('/auth/login')
          } else {
            notification.error({
              message: 'Something went wrong',
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
  }

  return (
    <div>
      <div className={`card ${style.container}`}>
        <img src="/resources/images/logo.svg" alt="Logo EVN" />

        <div className="text-dark font-size-24 mb-4 text-center  mt-5">
          <strong>Enter New Password</strong>
        </div>
        <Form
          layout="vertical"
          hideRequiredMark
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          className="mb-4"
        >
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: 'new password is required',
              },
              {
                validator: (_, value) =>
                  !value || ValidatePassword(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('Password must be between 8 and 40 characters long'),
                      ),
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="againNewPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  )
                },
              }),
              {
                validator: (_, value) =>
                  !value || ValidatePassword(value)
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error('Password must be between 8 and 40 characters long'),
                      ),
              },
            ]}
          >
            <Input.Password size="large" placeholder="Confirm your password" />
          </Form.Item>

          <Button
            type="primary"
            // loading={isLoading}
            htmlType="submit"
            size="large"
            className="text-center w-100"
          >
            <strong>Submit</strong>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword
