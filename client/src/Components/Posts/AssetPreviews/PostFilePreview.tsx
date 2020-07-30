import React, { FC } from "react";
import styled from "styled-components";
import { Color } from "../../../utils/Assets/CSSProps";
import { faEyeSlash } from "../../../utils/Assets/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PostFilePreviewProps = {
  files: any[];
};

export const PostFilePreview: FC<PostFilePreviewProps> = ({ files }) => {
  return (
    <FileMainContainer>
      {
      files.map((file, index) => {
        const fileType = file.type.split("/")[0];

        return fileType === "image" ? 
              <div key={index}>
                  <img src={URL.createObjectURL(file)} alt="" />
                  <p>{file.name}</p>
              </div>
             : fileType === "video" ? 
                <div key={index}>
                    <video src={URL.createObjectURL(file)} autoPlay={false} />
                    <p>{file.name}</p>
                </div>
             : 
            <div key={index}>
                <FontAwesomeIcon icon={faEyeSlash}/>
                {file.name}
            </div>
        })
       }
    </FileMainContainer>
  )
};

const FileMainContainer = styled.div`
    margin: 5px 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    div{
        position: relative;
        flex-grow: 0;
        width: 23.33%;
        height: 23.33%;
        margin: 1px;
        color: ${Color.placeholder};
        img, video{
            height: 100%;
            width: 100%;
        }
        p{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            font-size: 0.7rem;
            text-align: justify;
            color: blanchedalmond;
        }
        svg{
            margin-right: 5px;
        }
    }
`