import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt, faCamera } from "../../../utils/Assets/fontawesome";
import { SubmitButton, TransitionSlideParent } from "../../Static/Forms";
import ButtonLoader from "../../../ComponentLoaders/ButtonLoader";
import styled from "styled-components";
import { Color } from "../../../utils/Assets/CSSProps";
import { HoverActive } from "../../Static/HoverActive";
import { PrimaryButton } from "../../Static/Buttons";
import { useLocation } from "react-router-dom";

const SetProfilePicture = () => {
  const location = useLocation()
  const [isEditing, setEditing] = useState<boolean>(false);
  const  [image, setImage] = useState('');

  const handleImage = (e:any)=>{
    if(e.target.files[0]){
      setEditing(true)
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <TransitionSlideParent>
      {
        location.state==="{signedUp: true}" &&
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
          <form onSubmit={e=>e.preventDefault()}>
            <input style={{display: "none"}} type="file" onChange={handleImage} name="avatar" id="avatar" />
            <div style={{marginTop: 20, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <SubmitButton type="submit">
              Set Avatar
              <ButtonLoader />
            </SubmitButton>
            <PrimaryButton as="button">Skip</PrimaryButton>
            </div>
          </form>
        </div>
      </AvatarContainer>
      }
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