import Head from 'next/head'
import Main from "../../components/Main";

export default function Group(){
    return (
        <div>
            <Head>
                {/* Make the title the same current group's title */}
                <title>InTouch</title>
            </Head>

            <Main/>
        </div>

    )
}