import Head from 'next/head'
import Main from "../../components/Main";

import { useRouter } from "next/router";

export default function Group(){
    const router = useRouter()
    const { groupId } = router.query

    return (
        <div>
            <Head>
                {/* Make the title the same current group's title */}
                <title>InTouch</title>
            </Head>

            <Main group={groupId}/>
        </div>

    )
}