import {Button, FormControl, FormLabel, Input, Text, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {authUser} from "../redux/reducers/authSlice";
import {useDispatch} from "react-redux";
import Timer from "./Timer";

export default function AuthForm() {
    const {register,
        setValue ,
        setFocus ,
        watch,
        handleSubmit,
        formState: {errors}} = useForm()

    const dispatch = useDispatch()
    const [firstEnter , setFirstEnter] = useState(false);
    const [isAuth , setIsAuth] = useState(false)
    const authUserFunc = (data)=> {
        dispatch(authUser({user:data , params:'login'}))
        console.log(data)
        let user =JSON.parse(localStorage.getItem('user'))
        console.log(user)
        user.userlogin === data.userlogin && user.userpass === data.userpass ? setFirstEnter(true) : setFirstEnter(false)
        console.log(firstEnter)
        if (firstEnter) {
            localStorage.setItem('user' , JSON.stringify(data))
        }
        if(user.confirmPassword) {
            setIsAuth(true)
            sessionStorage.setItem('isAuth' , true)
        }

    }
    const err =  localStorage.getItem('error');
    useEffect(() => {
        setValue('userpass' , '');
        setValue('userlogin' , '');
        setFocus("userlogin")
    }, [err]);

    useEffect(() => {
            setValue('userpass' , '');
            setFocus("userpass")
    }, [setFocus ,setValue , firstEnter]);



    return (
        <>
            <form onSubmit={handleSubmit(authUserFunc)}>
                <VStack width='300px' spacing='20px'>
                    <FormControl>
                        <FormLabel>Имя пользователя</FormLabel>
                        <Input {...register('userlogin' , { required: {
                                message:'Обязательное поле',
                                value:true
                            }})} type='text' placeholder='Имя пользователя' size='lg'/>
                        <Text>{errors?.userlogin?.message}</Text>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Пароль</FormLabel>
                        <Input  {...register('userpass' , { required: {
                                message:'Обязательное поле',
                                value:true
                            }})} type='password' size='lg'/>
                        <Text>{errors?.userpass?.message}</Text>
                    </FormControl>
                    {
                        firstEnter ?
                            <FormControl>
                                <FormLabel>Пароль</FormLabel>
                                <Input {...register("confirmPassword", {
                                    required: true,
                                    validate: (val)=> {
                                        if (watch('userpass') != val) {
                                            return "Пароль не совпадает";
                                        }
                                    },
                                })} type='password' size='lg'/>
                                <Text>{errors?.confirmPassword?.message}</Text>
                            </FormControl> :
                            ''
                    }
                    <Button width='100%' colorScheme='#e4e9eb' size='lg' variant='outline' type='submit' >Войти</Button>
                </VStack>
                <Timer/>
            </form>

        </>

    )
}