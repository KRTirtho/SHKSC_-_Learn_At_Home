import React, { FC, useState } from 'react'
import {useFormik} from "formik"
import { FormContainer, CommonForm, InputWithLabels, HorizontalContainer, SubmitButton, BackButton, TransitionSlideParent} from "../../Static/Forms"
import * as Yup from "yup"
import { PrimaryButton } from '../../Static/Buttons'
import { useMutation } from 'react-apollo'
import styled from 'styled-components'
import ButtonLoader from '../../../ComponentLoaders/ButtonLoader'
import { useHistory, useLocation } from 'react-router-dom'
import ConditionalModal from '../../Modals/Conditional.modal'
import { SIGN_UP } from '../../../schema/mutation/Signup'
import { SignUp, SignUpVariables, roleValue, shiftValue } from '../../../SchemaTypes/schemaTypes'

/**
 * @description Tow dimensional Menu will appear
 * Avatar & Environment Setup & Tutorial about Functions ............
  */

const SignUpForm:FC = ()=>{
    const history = useHistory();
    const location = useLocation()
    const role:roleValue = location.state==="teacher"? roleValue.teacher : roleValue.student

    // extra field based validation schema
    const conditionalSchema = ()=>{
        if(role==="student"){
            return{
                class_roll: Yup.number().min(1, "Roll between 1-1000").max(1000, "Roll between 1-1000").required("Required"),
                class: Yup.number().min(1, "Class between 1-10").max(10, "Class between 1-10").required("Required"),
                section: Yup.string().max(1, "Section between A-M").matches(/[A-M]/g, "Section between A-M").required(),
                }
            }
            else if(role==="teacher") {
                return {
                    teacher_roll: Yup.number().min(1, "Only positive value")
                }
            }
        }
        
        const {values, handleChange, handleBlur, touched, errors, handleSubmit, isSubmitting} = useFormik({
            initialValues: {
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                shift: "Day",
                class_roll: '',
                class: '',
                section: "",
                teacher_roll: ''
        },
        validationSchema: Yup.object().shape({
            first_name: Yup.string().required("Required"),
            last_name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid Email").required("Required"),
            password: Yup.string().min(8, "Minimum 8 chars").max(16, "Maximum 16 chars").required("Required"),
            shift: Yup.string(),
            ...conditionalSchema()
        }),
        onSubmit: (values, {resetForm, setSubmitting})=>{
            signUp({
                variables: {
                    user:{
                        role: role,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        password: values.password,
                        shift: values.shift==="Day"?shiftValue.Day:shiftValue.Morning,
                        teacher_roll: typeof values.teacher_roll==="number" ? values.teacher_roll: null,
                        class_roll: typeof values.class_roll==="number" ? values.class_roll:null,
                        class: typeof values.class==="number"? values.class: null,
                        section: values.section,
                    }
                }
            }).then(({data})=>{
                if(data?.signUp?.token && data?.signUp?.token?.length>0){
                    localStorage.setItem("auth_token", JSON.stringify(data?.signUp?.token))
                    resetForm()
                    setSubmitting(false)
                    history.push("/set-avatar")
                    client?.writeData({data: {signedUp: true}})
                }
                setSubmitting(false)
            })
            .catch(e=>{
                console.log(e)
                setSubmitting(false)
            })
        }
    })

    const [signUp, {error, client}] = useMutation<SignUp, SignUpVariables>(SIGN_UP)
    
    return(
    <TransitionSlideParent noVerticalCenter={true} minHeight={800}>
        <ConditionalModal error={error?true:false} msg={error?.name} body={error?.message.split(":")[1]}/>
    <FormContainer>
        <div style={{width: "100%", display: "flex", justifyContent: "flex-start"}}>
        <BackButton onClick={()=>history.goBack()}/>
        </div>
        <FormRoleAvatar src={role==="teacher"?"./Assets/TeacherIcon.svg":"./Assets/StudentIcon.svg"} alt=""/>
        
        {/* Header Text */}
        <CommonForm onSubmit={handleSubmit}>
            {/* Common Ones */}
            <HorizontalContainer>
                <InputWithLabels
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.first_name}
                    touched={touched.first_name}
                    label={"First Name"}
                    type="text"
                    name="first_name"
                    placeholder="Your First Name"
                    value={values.first_name}
                    />
                <InputWithLabels
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.last_name}
                    touched={touched.last_name}
                    label={"Last Name"}
                    type="text"
                    name="last_name"
                    placeholder="Your Last Name"
                    value={values.last_name}
                    />
            </HorizontalContainer>
            <HorizontalContainer>
                <InputWithLabels
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    label={"Email"}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    />
                <InputWithLabels
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    label={"Password"}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    />
            </HorizontalContainer>

            {/* Student Part */}
            {
                role==="student"?
                <>
                <InputWithLabels
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.class}
                    touched={touched.class}
                    label={"Class"}
                    type="number"
                    name="class"
                    placeholder="Class"
                    value={values.class}
                    />
                <HorizontalContainer>
                    <InputWithLabels
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.class_roll}
                        touched={touched.class_roll}
                        label={"Class Roll"}
                        type="number"
                        name="class_roll"
                        placeholder="Class Roll"
                        value={values.class_roll}
                        />
                    <InputWithLabels
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.section}
                        touched={touched.section}
                        label={"Section"}
                        type="text"
                        name="section"
                        placeholder="Section"
                        value={values.section}
                        />
                </HorizontalContainer>
                </> 
                : role==="teacher"&&
                <>
                <InputWithLabels
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.teacher_roll}
                    touched={touched.teacher_roll}
                    label={"Teacher Roll (optional)"}
                    type="number"
                    name="teacher_roll"
                    placeholder="Teacher Roll"
                    value={values.teacher_roll}
                    />
                </>
            }
            
            {/* Select Shift Last Element */}
            <HorizontalContainer>
                {/* Submit BTN */}
                <PrimaryButton as="select" name="shift" onChange={handleChange} value={values.shift}>
                    <option value="Day">Day</option>
                    <option value="Morning">Morning</option>
                </PrimaryButton>
                <SubmitButton type="submit" disabled={isSubmitting}>Sign Up<ButtonLoader show={isSubmitting}/></SubmitButton> 
            </HorizontalContainer>
        </CommonForm>
    </FormContainer>
    </TransitionSlideParent>
    )
}

const FormRoleAvatar = styled.img`
    height: auto;
    width: 7rem;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 10px;
`

export default SignUpForm