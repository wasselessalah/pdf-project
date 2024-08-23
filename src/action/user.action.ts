"use server" 

import user from '@/models/user.model'
import { connect } from '@/db'


export async function  createUser(users:any) {
  try {
    await connect()
    const newUser= await user.create(users);
//TODO create token


    return JSON.parse(JSON.stringify(newUser )) 
  } catch (error) {
    console.log(error)
  }
  
}

