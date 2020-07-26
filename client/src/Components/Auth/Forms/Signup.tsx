import React, { FC, useState } from 'react'
import {useFormik} from "formik"
import { FormContainer, CommonForm, InputWithLabels, HorizontalContainer, SubmitButton, TransitionWrapper, BackButton, TransitionSlideParent} from "../../Static/Forms"
import { CSSTransition } from 'react-transition-group'
import * as Yup from "yup"
import { PrimaryButton } from '../../Static/Buttons'
import RoleSelection from './RoleSelection'
import { useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import styled from 'styled-components'

/**
 * @description Tow dimensional Menu will appear
 * 1. Im' a Teacher 2. I'm a Student 
 * --> Teacher:  * first_name
                 * last_name
                 * email
                 * password
                 * teacher_roll?
                 * shift
 *______________________________________________________
 *______________________________________________________
 * --> Student * first_name
               * last_name
               * email
               * password
               * class_roll
               * shift
               * class
               * section
 * Avatar & Environment Setup & Tutorial about Functions ............
  */

const Signup:FC<{onClick?: Function}> = ({onClick}) => {
    const [role, setRole] = useState<"student"|"teacher">("student");
    
    const [page, setPage] = useState<"select-role"|"sign-up">("select-role")
    
    return (
        <TransitionSlideParent>
        <TransitionWrapper>
            {/* Role Selection Page */}
            <CSSTransition 
                in={page==="select-role"}
                unmountOnExit
                classNames="slide"
                timeout={500}
            >
            <RoleSelection gotoStudent={()=>{
                setRole("student")
                setPage("sign-up")
                }}
                gotoTeacher={()=>{
                    setRole("teacher")
                    setPage("sign-up")
                }}
                onClick={()=>onClick&&onClick()}
            />
            </CSSTransition>

             
            <CSSTransition 
                in={page==="sign-up"}
                unmountOnExit
                classNames="slide-second"
                timeout={500}
            >
                {/* If role==="" */}
                <SignUpForm goBack={()=>setPage("select-role")} role={role}/>
            </CSSTransition>

        </TransitionWrapper>
        </TransitionSlideParent>
    )
}

export default Signup;

type SigUpFormProps = {
    role: "student"|"teacher",
    goBack: Function
}

const SIGN_UP = gql`
    mutation SignUp (
        $role: String!,
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $password: String!,
        $class_roll: Int,
        $class: Int,
        $section: String,
        $teacher_roll: Int,
        $shift: String!,
    ){
        signUp(user:{
                role: $role,
                first_name: $first_name,
                last_name: $last_name,
                email: $email,
                password: $password,
                class_roll: $class_roll,
                class: $class,
                section: $section,
                teacher_roll: $teacher_roll,
                shift: $shift
              }){
                  _id
              }
    }
`

const SignUpForm:FC<SigUpFormProps> = ({role, goBack})=>{
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
                class_roll: "",
                class: "",
                section: "",
                teacher_roll: ""
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
            const variables = ()=>{
                if(role==="teacher"){
                    return {teacher_roll: values.teacher_roll}
                }
                else if(role==="student")return {
                    class_roll: values.class_roll,
                    class: values.class,
                    section: values.section
                }
            }
            
            signUp({
                variables: {
                    role: role,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    email: values.email,
                    password: values.password,
                    shift: values.shift,
                    ...variables()
                }
            }).then(data=>{
                console.log(data)
                setSubmitting(false)
            })
            .catch(e=>{
                console.log(e)
                setSubmitting(false)
            })
        }
    })

    const [signUp, {data, loading, error}] = useMutation(SIGN_UP)
    
    console.log(errors, values)

    return(
    <TransitionSlideParent noVerticalCenter={true} minHeight={800}>
    <FormContainer>
        <BackButton onClick={()=>goBack()}/>
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
                <SubmitButton type="submit" value="Submit" disabled={isSubmitting}/> 
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