import React, { FC } from 'react'
import Common from '../Components/Cards/Common'
import Classes from '../Components/Cards/Classes'
import { PageContainer } from '../Components/Static/Containers'
import Questions from '../Components/Cards/Questions'
import Examination from '../Components/Cards/Examination'

const Home:FC = () => {
    return (
        <PageContainer>
            <Common
                post_type={"announces"}
                avatar_url={"./favicon.ico"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos?"}
                title={"Something new Lorem"}
                files={[{url: "./favicon.ico"}, {url: "./favicon.ico"}, {url: "./favicon.ico"}]}
            />

            <Common
                post_type={"principal"}
                avatar_url={"./favicon.ico"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos?"}
                title={"Something new Lorem"}
                files={[{url: "./favicon.ico"}, {url: "./favicon.ico"}, {url: "./favicon.ico"}]}
            />

            <Common
                post_type={"activities"}
                posted_by={"KR. Tirtho"}
                avatar_url={"./favicon.ico"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos?"}
                title={"Something new Lorem"}
                files={[{url: "./favicon.ico"}, {url: "./favicon.ico"}, {url: "./favicon.ico"}]}
            />
            {/* Classes Test */}
            <Classes 
                _class={10}
                avatar_url={"./favicon.ico"}
                chapter={"third"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos?"}
                post_type={"classes"}
                posted_by={"Someone"}
                subject={"biology"}
                title={"Todays class"}
                files={[{url: "./favicon.ico"}, {url: "./favicon.ico"}]}
                group={"Science"}
            />

            <Classes 
                _class={10}
                post_type={"classes"}
                posted_by={"admin"}
                teacher_name={"ABU Sayed"}
                avatar_url={"./favicon.ico"}
                chapter={"third"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos?"}
                subject={"biology"}
                title={"Todays class"}
                files={[{url: "./favicon.ico"}, {url: "./favicon.ico"}]}
                group={"Science"}
            />

            <Questions 
                _class={10}
                avatar_url={"./favicon.ico"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos?"}
                post_type={"questions"}
                posted_by={"Someone"}
                subject={"biology"}
                title={"Todays Qustion"}
                class_roll={43}
                section={"A"}
                student_name={"Some Name"}
            />

            <Examination 
                _class={10}
                avatar_url={"./favicon.ico"}
                date={Date.now()}
                description={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio praesentium tenetur labore aperiam delectus tempore quaerat fugiat iusto reprehenderit? Nesciunt cupiditate adipisci facilis velit esse! Assumenda magnam ab iure nisi provident minus sed suscipit doloremque qui ipsam, tempore animi velit alias adipisci dolor! Soluta aspernatur hic, rerum tempora numquam dignissimos"}
                post_type={"examination"}
                subject={"Bangla 2nd Paper"}
                title={"BAASH"}
                files={[{url: "./favicon.ico"}]}
                group={"Science"}
                teacher_name={"ABU Sayed"}
            />
        </PageContainer>
    )
}

export default Home
