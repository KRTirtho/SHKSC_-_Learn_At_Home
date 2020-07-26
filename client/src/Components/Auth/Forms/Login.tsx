import React, { FC } from 'react'
import {useFormik} from "formik"
import { InputWithError, SubmitButton, CommonForm, FormContainer, Brand, TransitionSlideParent } from '../../Static/Forms';
import styled from 'styled-components';
import { Color } from '../../../utils/Assets/CSSProps';
import {useMutation} from "react-apollo"
import { gql } from 'apollo-boost';
import ConditionalModal from "../../Modals/Conditional.modal";
import * as Yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faKey} from "../../../utils/Assets/fontawesome"

const LOGIN_QUERY = gql`
  mutation Login($email:String!, $password: String!){
    login(credentials:{email: $email, password: $password}){
      _id
      role
      first_name
      token
    }

  }
`

const Login:FC<{onClick?: Function}> = ({onClick}) => {
  
  const {values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting} = useFormik<{email: string, password: string}>({
      initialValues: { email: '', password: '' },
      onSubmit: (values, {setSubmitting, resetForm})=>{
        login({
          variables: {
            email: values.email,
            password: values.password,
          }
        }).then(data=>{
          if(data){
            localStorage.setItem("auth_token", data.data.login.token)
            resetForm()
            //! Temporary Solution
            window.location.replace("/")
          }
          setSubmitting(false)
        })
        .catch(e=>{
          setSubmitting(false)
          console.error(e)
        })
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(8, "Minimum 8  chars").required("Required")
      })
  })
  const [login, {error}] = useMutation(LOGIN_QUERY)

  
    return (
        <TransitionSlideParent>
          <ConditionalModal body={error&&error.message.split(":")[1]} msg={error&&error.name} error={error?true:false}/>
        <FormContainer>
          <Brand brand="SHKSC" subTitle="Stay Home|Stay Safe" src="./Assets/TeacherIcon.svg" alt=""/>
            
            <CommonForm onSubmit={handleSubmit}>
              <InputWithError
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                  error={errors.email}
                  touched={touched.email}
                  icon={<FontAwesomeIcon icon={faUser}/>}
                  />
              <InputWithError
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password: min 8 chars"
                  error={errors.password}
                  touched={touched.password}
                  icon={<FontAwesomeIcon icon={faKey}/>}
              />
              <SubmitButton type="submit" disabled={isSubmitting} value="Login"/>
              <FormEndOptionsContainer>
                <FormEndOptions type="button">Forgot Password?</FormEndOptions>
                <FormEndOptions type="button" onClick={()=>onClick&&onClick()}>Sign Up</FormEndOptions>
              </FormEndOptionsContainer>
            </CommonForm>
        </FormContainer>
        </TransitionSlideParent>
    )
}

export default Login


const GreetingsText = styled.div`
  text-align: center;
  h3{
    color: ${Color.primaryBlue};
    margin: 0;
  }
  h4{
    color: ${Color.primaryGreen};
  }
`


const FormEndOptionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const FormEndOptions = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: ${Color.primaryBlue};
  transition: 0.2s all ease;
  &:active{
    transform: scale(0.96);
    filter: brightness(0.9);
  }
`