import React, { useEffect } from 'react';

import Head from 'next/head'

import Main from '../components/Main'

import { AuthContext } from "../contexts/AuthContext";
import { GroupContext } from "../contexts/GroupContext";

export default function Home() {
  const { setLoading } = React.useContext(AuthContext)
  const { setGroup } = React.useContext(GroupContext)

  useEffect(() => {
    setGroup(null)
    setLoading(false)
  }, [])

  return (
    <div>
      <Head>
        <title>InTouch</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet"/>
      </Head>
      
      <Main/>
    </div>
  )
}
