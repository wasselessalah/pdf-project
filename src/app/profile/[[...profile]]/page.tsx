import { UserProfile } from '@clerk/nextjs'
import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'
import {redirect} from 'next/navigation'



const ProfilePage =async () => {
  const {userId}=auth()
  const isAuth=!!userId
  const user =await currentUser()

  if(!isAuth){
    redirect('/sign-in')
  }


  return (
    <div className=' flex gap-3 mt-5 flex-col items-center'>
      <h1>{user?.username} </h1>
      <UserProfile/>
    </div>
  )
}

export default ProfilePage