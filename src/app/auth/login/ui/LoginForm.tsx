"use client";

import { authenticate } from "@/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
	const [state, dispatch] = useFormState(authenticate, undefined);

	useEffect(() => {
	  if(state === 'success'){
		window.location.replace('/')
		return;
	  }
	}, [state])
	

	return (
		<form action={dispatch} className="flex flex-col">
			<label htmlFor="email">Correo electrónico</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				name="email"
				type="email"
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className="px-5 py-2 border bg-gray-200 rounded mb-5"
				name="password"
				type="password"
			/>

			<div
				className="flex h-8 items-end space-x-1"
				aria-live="polite"
				aria-atomic="true"
			>
				{state === 'CredentialsSignin' && (
					<>
						<IoInformationOutline className="h-5 w-5 text-red-500" />
						<p className="text-sm text-red-500">Credenciales no son correctas</p>
					</>
				)}
			</div>

			<LoginButton />

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500"></div>
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500"></div>
			</div>

			<Link href="/auth/new-account" className="btn-secondary text-center">
				Crear una nueva cuenta
			</Link>
		</form>
	);
};

function LoginButton () {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className={clsx({
            'btn-primary': !pending,
            'btn-disabled': pending,
        })}
        disabled={pending}
        >
            Ingresar
        </button>
    )
}
