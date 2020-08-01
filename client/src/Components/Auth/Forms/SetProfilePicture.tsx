import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faCamera } from "../../../utils/Assets/fontawesome";
import { SubmitButton, TransitionSlideParent } from "../../Static/Forms";
import ButtonLoader from "../../../ComponentLoaders/ButtonLoader";
import styled from "styled-components";
import { Color } from "../../../utils/Assets/CSSProps";
import { HoverActive } from "../../Static/HoverActive";
import { PrimaryButton } from "../../Static/Buttons";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SET_AVATAR } from "../../../schema/mutation/SetAvatar";

const SetProfilePicture = () => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const  [image, setImage] = useState('');
  const [uploadImage, setUploadImage] = useState('')

  const handleImage = (e:any)=>{
    const file = e.target.files[0]
    
    if(file && (
      file.type==="image/png" 
      || file.type==="image/jpg"
      || file.type==="image/svg"
      || file.type==="image/svg"
    )){
      setEditing(true)
      setImage(URL.createObjectURL(file))
      setUploadImage(file)
    }
  }

  // Uploading file to backend
  const [setAvatar] = useMutation(SET_AVATAR)

  const handleSubmit = (e:any):void=>{
    e.preventDefault()
    if(uploadImage){
      setAvatar({variables: {
        file: uploadImage
      }})
    }
  }
  
  return (
    <TransitionSlideParent>
      <AvatarContainer>
        {/* Header Text */}
        <h2>Set an Avatar</h2>
        {/* Body */}
        <div>
            <ImageContainer isEditing={isEditing} image={image}>
                <img src={isEditing && image ? image: undefined} alt="" />
                <FontAwesomeIcon icon={faUserAlt}/>
                <LabelForFile as="label" htmlFor="avatar">
                  <FontAwesomeIcon icon={faCamera} />
                </LabelForFile>
            </ImageContainer>
          <form onSubmit={handleSubmit}>
            <input style={{display: "none"}} type="file" onChange={handleImage} name="avatar" id="avatar" accept="image/png, image/jpeg, image/gif, image/svg+xml"/>
            <div style={{marginTop: 20, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <SubmitButton disabled={!uploadImage} type="submit">
              Set Avatar
              <ButtonLoader />
            </SubmitButton>
            <Link to="/welcome"><PrimaryButton as="button">Skip</PrimaryButton></Link>
            </div>
          </form>
        </div>
      </AvatarContainer>
    </TransitionSlideParent>
  );
};

export default SetProfilePicture;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    color: ${Color.primaryBlue};
  }
`;

const ImageContainer = styled.div<{isEditing?:boolean, image?: any}>`
    position: relative;
    width: 5rem;
    margin: auto;
    svg{
        display: ${({isEditing, image})=>isEditing&&image?"none":"block"};
        font-size: 5rem;
        border-radius: 50%;
    }
    img{
        width: 100%;
        height: auto;
        border-radius: 50%;
    }
  `

const LabelForFile = styled(HoverActive)`
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      position: absolute;
      right: 0;
      bottom: 5%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${Color.secondaryBackground};
      svg{
        display: block;
        font-size: 1rem;
      }

`