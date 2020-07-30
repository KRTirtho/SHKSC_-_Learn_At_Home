import React, { FC, ButtonHTMLAttributes } from "react";
import { TransitionSlideParent } from "../../Static/Forms";
import { SelectionOptions } from "../../Static/Buttons";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Color } from "../../../utils/Assets/CSSProps";
import {faAngleRight} from "../../../utils/Assets/fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postType } from "../../../SchemaTypes/schemaTypes";


/**
 * @description This @component is for selecting which type of post the user wanna Post.
 * Has two roles -> Student & Teacher
 * Allowed Posts
 * Common
        * Activities
 * Student's
        * Questions
 * Teacher's
        * Classes
        * Examination
 * Admin
        * (All above except Questions)
        * Examination
        * Announces
        * Principal
 * Source: __Role__ Retrieved from cache
 * Requires: This gonna a Pop-Up
 * MileStone: Redirect to  Post (An Individual Page)
 * TODO: Add Colorful SVG Icon in Post Options 
 */


const SelectPostType: FC<{ parentPath: string }> = ({ parentPath }) => {
  const history = useHistory();

  function gotoPostUploader(state: postType): void {
    history.push(`${parentPath}/upload`, state);
  }

  return (
    <TransitionSlideParent>
      <SelectPostContainer>

        <h2>Select Type of Post</h2>

      {/* Common */}
      <PostOptions
        onClick={() => gotoPostUploader(postType.activities)}
        bgColor={Color.lavender}
        color={Color.darkLavender}>
        Activities
      </PostOptions>
      {/* Student */}
      {
        <PostOptions
        bgColor={Color.lightcoral}
        color={Color.darkCoral}
        onClick={()=>gotoPostUploader(postType.question)}
        >
         Questions
        </PostOptions>
      }
      {/* Teacher */}
      { <>
        <PostOptions
          bgColor={Color.moccasin}
          color={Color.darkMoccasin}
          onClick={()=>gotoPostUploader(postType.classes)}
          >
         Classes
        </PostOptions>
        <PostOptions
          bgColor={Color.violet}
          color={Color.darkViolet}
          onClick={()=>gotoPostUploader(postType.examination)}
          >
         Examination
        </PostOptions>
        </>
      }

      {/* Admin Options for later */}
    </SelectPostContainer>
    </TransitionSlideParent>
  );
};

export default SelectPostType;

type PostOptionProps = {
  bgColor: string;
  color: string;
}

const PostOptionStyle = styled(SelectionOptions)<PostOptionProps>`
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  svg{
    margin-left: auto;
  }
  `;

const PostOptions:FC<PostOptionProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({bgColor, color, children, ...rest})=>{
  return (
    <PostOptionStyle as="button" bgColor={bgColor} color={color} {...rest}>
      {children}
      <FontAwesomeIcon icon={faAngleRight}/>
    </PostOptionStyle>
  )
}
  
  const SelectPostContainer = styled.div`
  display: flex;
  flex-direction: column;
        h2{
          color: ${Color.primaryBlue};
        }
`