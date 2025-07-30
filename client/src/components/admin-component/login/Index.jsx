import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authContext } from '@/context/context'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const [login ,setLogin] = useState({
        email:"",
        password:''
    })
    const naviagte = useNavigate();
    const {loginUser} = useContext(authContext);

    const handelSubmit = async (e)=>{
        e.preventDefault()
        console.log("login",login)
        try {
            const res = await loginUser(login);
            // console.log(res)
            if(res?.success){
                console.log("login success")
                naviagte("/admin")

            }else{
                console.log("login failed")
            }

            
        } catch (error) {
            console.error("got error in the login component",error)
        }
    }
    
  return (
    <>
    <form action="" onSubmit={handelSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>
                    <h1>Log In</h1>
                </CardTitle>
                <CardDescription>only admin can login</CardDescription>
            </CardHeader>
            <CardContent>
                <Label>Email</Label>
                <Input
                name="email"
                type="email"
                placeholder="you@gmail.com"
                value={login.email}
                onChange={(e)=>setLogin({...login,email:e.target.value})}
                />
                <Label>Password</Label>
                <Input  
                name="password"
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e)=>setLogin({...login,password:e.target.value})}
                 />

                 <Button type='submit'>Login</Button>
            </CardContent>
        </Card>
        
    </form>
    </>
  )
}

export default LoginPage