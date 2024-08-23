"use server" 

import users from '@/models/user.model'
import { connect } from '@/db'


export async function  createUser(user:any) {
  try {
    const newUser= await users.create(user);
//TODO create token


    return JSON.parse(JSON.stringify(newUser )) 
  } catch (error) {
    console.log(error)
  }
  
}

