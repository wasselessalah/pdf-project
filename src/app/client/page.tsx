'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Client  = () => {
  const {isLoaded , isSignedIn,user}=useUser();
   if (!isLoaded||!isSignedIn){
    return null
   }
  return (
    <div>
      hello 
    </div>
  )
}

export default Client 