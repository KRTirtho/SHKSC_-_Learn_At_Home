import React, { FC, useEffect } from "react";
import styled from "styled-components";
import { Color } from "../../utils/Assets/CSSProps";
import Carousel from "react-multi-carousel";
import { responsive } from "./PostFiles";
import { CSSTransition } from "react-transition-group";
import { CircularButton } from "../Static/Buttons";

/**
 * @description This Component is used for viewing the Post Images in full-screen like Facebook's
 * TODO: Can be viewed inside & user can give review from inside. But for commenting after clicking   comment button they will be redirected to PostView Component.
 * TODO: Image should seamlessly fit inside
 */

const ImageView: FC<{ show: boolean, close: any, files?: Array<{url: string}> }> = ({show, files, close}) => {
  useEffect(()=>{
    if(show){
      document.body.style.overflowY = "hidden"
    }
    else {
      document.body.style.overflowY = "scroll"
    }
  }, [show])
  
  return (
    <CSSTransition
        in={show}
        classNames="scale"
        unmountOnExit
        timeout={300}
    >
      <Wrapper>
      <CrossButton onClick={()=>close()}>&times;</CrossButton>
      <ViewContainer>
        <Carousel
          containerClass="carousel-container"
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5 ease"
          transitionDuration={200}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="slide-dot">
              {files&&files.map((file, index)=>{
                return(
                  <ViewAssetsContainer key={index}>
                   <p>{index+1}/{files.length}</p>
                   <img src={file.url} alt=""/>
              </ViewAssetsContainer>
              )
            })}
          </Carousel>
        </ViewContainer>
      </Wrapper>
    </CSSTransition>
  );
};

export default ImageView;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${Color.primaryBackground};
  z-index: 501;
`

const ViewContainer = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    p {
      opacity: 1;
    }
    .react-multiple-carousel__arrow {
      opacity: 0.7;
      z-index: 5;
    }
  }
  .slide-dot button {
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
  }
  .slide-dot .react-multi-carousel-dot--active button {
    background-color: ${Color.primaryBlue};
  }
  .react-multiple-carousel__arrow {
    opacity: 0;
  }
  z-index: 502;
`;

const ViewAssetsContainer = styled.div`
  width: 100%;
  p{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  img {
    -webkit-user-drag: none;
    width: 100%;
    max-height: 100vh;
  }
`;

const CrossButton = styled(CircularButton)`
  position: fixed;
  top: 0;
  left: 0;
  margin: 10px 0 0 10px;
  z-index:502; 
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .8;
  z-index: 503;
`