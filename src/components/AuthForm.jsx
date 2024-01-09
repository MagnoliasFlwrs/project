import {Button, FormControl, FormLabel, Input, Text, VStack} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {authUser} from "../redux/reducers/authSlice";
import {useDispatch} from "react-redux";
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from 'zod'

const formSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: 'Имя пользователя слишком короткое' })
            .max(20, 'Имя пользователя слишком длинное')
            .transform((v) => v.toLowerCase().replace(/\s+/g, '_')),
        password: z.string().min(6, 'Пароль слишком короткий'),
        confirmPassword: z.string().min(6, 'Повторите пароль'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Введенные пароли не совпадают',
    })

export default function AuthForm() {
    const {register,setError, handleSubmit, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const [firstEnter , setFirstEnter] = useState(false);
    const [confirmPass , setConfirmPass] = useState(false)
    const authUserFunc = (data)=> {
        dispatch(authUser({user:data , params:'login'}))
        console.log(data)
        data.userpass===data.confirmPassword ? setConfirmPass(true) : setConfirmPass(false)
        let user =JSON.parse(localStorage.getItem('user'))
        console.log(user)
        user.userlogin === data.userlogin && user.userpass === data.userpass ? setFirstEnter(true) : setFirstEnter(false)
        console.log(firstEnter)
    }
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
                                <Input {...register('confirmPassword' , { required: {
                                        message:'Обязательное поле',
                                        value:true
                                    }})} type='password' size='lg'/>
                                <Text>{errors?.confirmPassword?.message}</Text>
                            </FormControl> :
                            ''
                    }

                    <Button width='100%' colorScheme='#e4e9eb' size='lg' variant='outline' type='submit' >Войти</Button>
                </VStack>
            </form>
        </>

    )
}