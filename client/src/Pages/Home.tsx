import React, { FC } from 'react'
import Common from '../Components/Cards/Common'
import Classes from '../Components/Cards/Classes'
import { PageContainer } from '../Components/Static/Containers'
import Questions from '../Components/Cards/Questions'
import Examination from '../Components/Cards/Examination'
import { useQuery } from '@apollo/client'
import { ALL_POST } from '../schema/query/AllPosts'
import {AllPost, postType} from "../SchemaTypes/schemaTypes"
import withTopBar from '../Components/HighlyDynamic/withTopBar'
import withNavbar from '../Components/HighlyDynamic/withNavbar'
import { title } from 'process'

/**
 * @description This is the most contentful Component of the whole app.
 * TODO: Implementation of InfiniteScroll Component   
 * TODO: LazyLoader For Post
 * TODO: Pagination
 */

const Home:FC = () => {
    const {data, loading, error} = useQuery<AllPost>(ALL_POST)

    
    return (
        <PageContainer>

            {
                data?.allPost.map((post, index)=>{
                    return (
                        <article key={index}>
                        {post.post_type===postType.announcement
                        || post.post_type===postType.principal
                        || post.post_type===postType.activities?
                        <Common
                            {...post}
                            avatar_url={post.avatar_url??"./favicon.ico"}
                            />
                         : post.post_type===postType.classes?
                         <Classes 
                            {...post}
                            group={post.group??undefined}
                            subject={post.subject??''}
                            _class={post.class??0}
                            chapter={post.chapter??''}
                            avatar_url={post.avatar_url??"./favicon.ico"}
                            section={post.section??''}
                            />
                            : post.post_type===postType.question?
                         <Questions 
                            {...post}
                            avatar_url={post.avatar_url??"./favicon.ico"}
                            _class={post.class??0}
                            class_roll={post.class_roll??0}
                            section={post.section??''}
                            subject={post.subject??''}
                            group={post.group??undefined}
                            />
                            : post.post_type===postType.examination&&
                         <Examination 
                            {...post}
                            avatar_url={post.avatar_url??"./favicon.ico"}
                            _class={post.class??0}
                            subject={post.subject??''}
                            group={post.group??undefined}
                            section={post.section??''}
                            />}
                        </article>
                    )
                })            
            }
        </PageContainer>
    )
}

export default withNavbar(withTopBar(Home))
