'use client'

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import clsx from "clsx";
import { registerUser } from "@/actions/auth/register";
import { login } from "@/actions/auth/login";

interface InputsValues {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<InputsValues>();
    const [errorState, setErrorState] = useState({
        ok: false,
        message: ''
    });

    const onSubmit: SubmitHandler<InputsValues> = async (data) => {
        const { name, email, password } = data;
        const user = await registerUser({name, email, password});
        setErrorState(user)

        if(user.ok){
            const log_in = await login({email, password});
            console.log(log_in)
            if(log_in.ok)
                window.location.replace('/');
        }
    }

	return (
		<form onSubmit={ handleSubmit(onSubmit)} className="flex flex-col">

            {
                errorState.message && (
                    <div className={
                        clsx("p-3 rounded mb-5 text-center", {
                            "text-red-600": !errorState.ok,
                            "text-green-600": errorState.ok
                        })
                    }
                    >
                        {errorState.message}
                    </div>
                )
            }

			<label htmlFor="email">Nombre Completo</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
                    "border-red-500 focus:outline-none focus:border-red-500": errors.name
                })}
				type="text"
                {...register("name", { required: true })}
			/>

			<label htmlFor="email">Correo electrónico</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
                    "border-red-500 focus:outline-none focus:border-red-500": errors.email
                })}
				type="email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
                    "border-red-500 focus:outline-none focus:border-red-500": errors.password
                })}
				type="password"
                {...register("password", { required: true, minLength: 6 })}
			/>

			<button className="btn-primary">Registrar</button>

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/login" className="btn-secondary text-center">
				Ingresar
			</Link>
		</form>
	);
};
