import React, { useState, FC, useEffect } from 'react'
import { useFormik } from 'formik'
import { useLocation, useHistory,  } from 'react-router-dom'
import { BackButton, SubmitButton, InputWithError, TransitionSlideParent, FormContainer, ResponsiveTextArea, InputFileButton } from '../../Static/Forms'
import * as Yup from "yup"
import { toFirstLetterUppercase } from '../../../utils/Helpers/functions'
import ButtonLoader from '../../../ComponentLoaders/ButtonLoader'
import { PrimaryButton } from '../../Static/Buttons'
import styled from 'styled-components'
import { PostFilePreview } from '../AssetPreviews/PostFilePreview'
import { useMutation } from '@apollo/client'
import { POST_UPLOAD } from '../../../schema/mutation/Post'
import { Post, PostVariables, group, postType } from '../../../SchemaTypes/schemaTypes'

/**
 * @description This component is an individual Page which is the main entry Point to write down
    & combine all the Subfields of Post which are Role Based.
 * TODO: Have to combine Role Based SubComponent of Fields
 * Sources: Gonna Get role option via Location State
 * Resources: Formik for forms & Yup for validation
 * Common Fields: 
                * post_type (Automatically determined via state & Location State)
                * title
                * description
                * files
 * Secondary Common: 
                    * class
                    * subject
                    * group
 * Classes: 
            * chapter
 * Examination 
            * null 
 * Questions 
            * section (From User Id Generated)
            * class (From User Id Generated)
            * group (From User Id Generated)
            * class_roll (From User Id generated)
 * ! class is reserved instead use _class
 * * But use class on mutation variables
  */

 const MainForm:FC<{setBarTitle: Function}> = ({setBarTitle}) => {
     const post_type: postType|any = useLocation().state // ! Weak Type 
     const history = useHistory()
     const [files, setFiles] = useState<any>('');

     const handleFiles = (e:any):void=>{
         const fileStore = []
         for(const i in e.target.files){
             if(typeof e.target.files[i]==="object"){
                 fileStore.push(e.target.files[i])
             }
         }
         setFiles(fileStore)
    }
     // Type of _class , class_roll are numbers
     const initialValues = {title: '', description: '', _class: '', 
     chapter: '', group: group.Science, teacher: '', subject: '', section: '', class_roll: ''}
     
    const conditionalSchema = ()=>{
         if(post_type===postType.examination){
             return {
                 _class: Yup.number().min(1, "No negative Values").max(10, "At most Class 10").required("Required"),
                 group: Yup.string().required("Required"),
                 subject: Yup.string().required("Required"),
            }
        }
        else if(post_type===postType.classes){
            return {
                chapter: Yup.string().required("Required"),
                _class: Yup.number().min(1, "No negative Values").max(10, "At most Class 10").required("Required"),
                group: Yup.string().required("Required"),
                subject: Yup.string().required("Required"),
            }
        }
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
        ...conditionalSchema()
    })
    const {values, handleSubmit, handleChange, isSubmitting, errors, touched, handleBlur} = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, {resetForm, setSubmitting})=>{
            // Mutation by apollo
            const {title, description} = values;
            const conditionalVars = ()=>{
                let commonVars =  {
                 class: typeof values._class==="number"?values._class:0,
                 group: values.group,
                 subject: values.subject
                 }
                if(post_type===postType.classes){
                    return{...commonVars, chapter: values.chapter}
                }
                return commonVars
            }

            const postVars = {
                post_type,
                title,
                description,
                ...conditionalVars()
            }
            
            post({variables:{
                post: postVars,
            }}).then(({data})=>{
                console.log(data)
                setSubmitting(false)
                resetForm()
            })
            .catch(err=>{
                console.error("POST ERROR: ", err)
                setSubmitting(false)
            })
        },
    })

    const [post] = useMutation<Post, PostVariables>(POST_UPLOAD)

    const Post_Type = toFirstLetterUppercase(post_type)

    useEffect(()=>{
        setBarTitle(`Post: ${Post_Type}`)
    }, [Post_Type, setBarTitle])

       
    return (
        <TransitionSlideParent noVerticalCenter={true} style={{margin:"4rem 0", height: "unset"}}>
            {/* design other */}


            {/* Forms */}
            <PostFormContainer>
            <form onSubmit={handleSubmit}>
                {/* Elements Coming from common subfields */}
            <InputWithError onBlur={handleBlur} touched={touched.title} error={errors.title} type="text" name="title" value={values.title} onChange={handleChange} placeholder="Title of the post"/>
            
            <ResponsiveTextArea name="description" value={values.description} onChange={handleChange} placeholder="Give a brief description"/>
                {/* Common Between Classes, Examination, Questions */}
            {
            (post_type===postType.classes||post_type===postType.examination)&&
            <>
            <InputWithError onBlur={handleBlur} touched={touched._class} error={typeof errors?._class==="string"?errors?._class: ''} type="number" name="_class" value={values._class} onChange={handleChange} placeholder="The class for which you are posting"/>

            <InputWithError onBlur={handleBlur} touched={touched.subject} error={errors?.subject} type="text" name="subject" value={values.subject} onChange={handleChange} placeholder="Subject name of today's Class/Examination"/>
            </>
            }

            {
            post_type===postType.classes&&
            <InputWithError error={errors.chapter} touched={touched.chapter} onBlur={handleBlur} type="text" name="chapter" value={values.chapter} onChange={handleChange} placeholder="Chapter of today's class"/>
            }

            <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            {
            (post_type==="classes"||post_type==="examination")&&
            <PrimaryButton style={{margin: "5px 0"}} as="select" name="group" value={values.group} onChange={handleChange}>
                <option value={group.Science}>Science</option>
                <option value={group.Business_Studies}>Business Studies</option>
                <option value={group.Arts}>Arts</option>
            </PrimaryButton>
            }
                {/* Submit Button */}
            <InputFileButton multiple body="Files" name="files" onChange={handleFiles}/>
            </div>

            {/* File preview Component */}
            {files.length>0&&<PostFilePreview files={files} />}
            
            <SubmitButton style={{marginLeft: 0}} type="submit" disabled={isSubmitting}>Post{<ButtonLoader show={isSubmitting}/>}</SubmitButton>
            </form>
            </PostFormContainer>
        </TransitionSlideParent>
    )
}

export default MainForm


const PostFormContainer = styled(FormContainer)`
    align-items: unset;
    margin: 0 5px;
`