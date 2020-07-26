import React, { FC } from 'react'

import Carousel from "react-multi-carousel";
import {ResponsiveType} from "react-multi-carousel/lib/types"
import "react-multi-carousel/lib/styles.css";
import styled, { css } from 'styled-components';
import { Color } from '../../utils/Assets/CSSProps';
const responsive: ResponsiveType = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

type PostFilesProps = {
    files?: {url: string}[]
}
const PostFiles: FC<PostFilesProps> = ({files}) => {
    return (
        <MainContainer>
            {files && <Carousel
             swipeable={true}
             draggable={true}
             showDots={true}
             responsive={responsive}
             ssr={true} // means to render carousel on server-side.
             infinite={false}
             autoPlaySpeed={1000}
             keyBoardControl={true}
             customTransition="all .5"
             transitionDuration={200}
             removeArrowOnDeviceType={["tablet", "mobile"]}
             dotListClass="slide-dot"
            >
                {
                    files?.map((file, index)=>{
                       return ( <FileContainer key={index}>
                           <p>{index+1}\{files.length}</p>
                            <img src={file.url} alt=""/>
                        </FileContainer>)
                    })
                }
            </Carousel>}
        </MainContainer>
    )
}

export default PostFiles



const MainContainer = styled.div`
    margin-bottom: 10px;
    div div p{
        opacity: 0;
        position: absolute;
        top: -5%;
        left: 50%;
        transform: translateX(-50%);
        color: #333;
        transition: 0.1s all ease; 
    }
    &:hover{
        p{
            opacity: 1;
        }
        .react-multiple-carousel__arrow{
            opacity: 0.7;
            z-index: 5;
        }    
    } 
    ${
        css`
        .slide-dot button{
            background-color: rgba(255,255, 255, 0.4);
            border: none;
        }
        .slide-dot .react-multi-carousel-dot--active
        button{
            background-color: ${Color.primaryBlue};
        } 
        .react-multiple-carousel__arrow{
            opacity: 0;
        }   
        `
    }
`  

const FileContainer = styled.div`
    width: 100%;
    height: 30vh;
    user-select: none;
    img, video{
        -webkit-user-drag: none;
        height:100%;
        width: 100%;
    }
`