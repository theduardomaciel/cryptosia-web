"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { MultisectionsSectionWrapper } from "../subcomponents/Wrapper";

// Subsections
import type { WasmFunctions } from "@/lib/@types";
import Subsection1 from "./Subsection1";
import Subsection2 from "./Subsection2";
import Subsection3 from "./Subsection3";

// Utils

interface FormValues {
	p: number;
	q: number;
	exponent: number;
}

export interface Data extends FormValues {
	publicKey: string;
	privateKey: string;
}

interface AdditionalErrors {
	general: string;
}

type FormErrors = Partial<
	Record<keyof (FormValues & AdditionalErrors), string | undefined>
>;

export interface ErrorsProps {
	errors: FormErrors;
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

const EXPONENTS_AMOUNT = 10; // quantidade de expoentes a serem gerados

export default function Section1() {
	const [errors, setErrors] = useState<FormErrors>({});
	const [exponents, setExponents] = useState<number[]>([]);
	const [data, setData] = useState<Record<keyof Data, string>>(
		{} as Record<keyof Data, string>
	);

	const router = useRouter();
	const WASM = useRef<WasmFunctions | null>(null);

	useEffect(() => {
		console.log("Verificando WASM...");
		if (
			typeof (window as any).CRYPTOSIA === "function" &&
			WASM.current === null
		) {
			console.log("Carregando WASM...");
			(window as any).CRYPTOSIA().then((wasm: WasmFunctions) => {
				console.log("WASM carregou!");
				WASM.current = wasm;
				// ...
			});
		}
	}, []);

	const section1OnVerify = () => {
		if (!WASM.current) return false;

		const p = parseInt(
			document
				.getElementById("public-key-section")
				?.querySelector<HTMLInputElement>('[name="p"]')?.value || ""
		);

		const q = parseInt(
			document
				.getElementById("public-key-section")
				?.querySelector<HTMLInputElement>('[name="q"]')?.value || ""
		);

		/* document.querySelector<HTMLInputElement>(
            "#q"
        )?.value */

		console.log(p, q);

		if (p === q) {
			setErrors((errors) => ({
				...errors,
				general: "Os números primos escolhidos não podem ser iguais!",
			}));
		}

		if (!p) {
			setErrors((errors) => ({
				...errors,
				p: "Este campo é obrigatório",
			}));
		}

		if (!q) {
			setErrors((errors) => ({
				...errors,
				q: "Este campo é obrigatório",
			}));
		}

		if (p === q || !p || !q) return false;

		const totient = WASM.current?._publicKey_totient(p!, q!);

		console.log("Totiente: " + totient);

		if (totient == -1) {
			setErrors((errors) => ({
				...errors,
				p: "O número inserido é muito grande para nossa capacidade :(",
			}));
		}

		if (totient == -2) {
			setErrors((errors) => ({
				...errors,
				general:
					"A multiplicação dos números primos é muito pequena, portanto não é possível gerar uma chave pública segura com eles. Tente valores maiores!",
			}));
		}

		if (totient == -3) {
			setErrors((errors) => ({
				...errors,
				p: "O número inserido não é primo",
			}));
		}

		if (totient == -4) {
			setErrors((errors) => ({
				...errors,
				q: "O número inserido não é primo",
			}));
		}

		if (totient == -5) {
			setErrors((errors) => ({
				...errors,
				p: "O número inserido não é primo",
			}));
			setErrors((errors) => ({
				...errors,
				q: "O número inserido não é primo",
			}));
		}

		if (totient < 0) return false;

		/* const exponents = Array.from(
            { length: EXPONENTS_AMOUNT },
            (_, i) =>
                WASM.current?._publicKey_e(
                    totient,
                    i + 1
                ) as number
        ); */

		let exponents: number[] = [];
		for (let i = 0; i < EXPONENTS_AMOUNT; i++) {
			const exponent = WASM.current?._publicKey_e(
				totient,
				exponents[i - 1] || -1
			) as number;
			exponents.push(exponent);
		}
		console.log(exponents);

		setExponents(exponents);

		return true;
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!WASM.current) return;
		if (errors.p || errors.q || errors.general) return;

		const formData = new FormData(event.currentTarget);
		const unformattedData = Object.fromEntries(formData.entries());

		const values = Object.fromEntries(
			Object.entries(unformattedData).map(([key, value]) => [
				key,
				parseInt(value.toString()),
			])
		) as unknown as FormValues;

		const n = WASM.current?._n_factor(values.p, values.q);
		const totient = WASM.current?._publicKey_totient(values.p, values.q);

		if (
			values.exponent <= 1 ||
			WASM.current?._mdc(values.exponent, totient) !== 1
		) {
			setErrors((errors) => ({
				...errors,
				exponent: "O expoente deve ser coprimo a φ(n) [totiente de n].",
			}));
			return;
		}

		//console.log(values);

		const privateKey = WASM.current?._privateKey_d(
			totient,
			values.exponent
		);

		// d ou e | d = privada, e = pública e em seguida o n
		const publicKey = `${values.exponent} ${n}`;
		const privateKeyString = `${privateKey} ${n}`;

		console.log("Public key:", publicKey);
		console.log("Private key:", privateKeyString);

		setData((data) =>
			Object.assign({}, data, {
				...unformattedData,
				publicKey,
				privateKey: privateKeyString,
			})
		);

		router.push("/?subsection=2", { scroll: false });

		event.currentTarget.reset();
	};

	return (
		<MultisectionsSectionWrapper
			id="public-key-section"
			onSubmit={onSubmit}
			subsections={[
				{
					title: "Precisamos de números primos...",
					description:
						"Para começar a gerar sua chave pública, digite dois números primos nos campos abaixo",
					children: (
						<Subsection1 errors={errors} setErrors={setErrors} />
					),
					buttonProps: {
						children: <>Próximo</>,
						type: "button",
						id: "generate-exponent",
						onVerify: section1OnVerify,
					},
				},
				{
					title: "Hora do expoente!",
					description: [
						"Agora, precisamos de um número que será utilizado como expoente para criptografia.",
						"Para facilitar sua vida, geramos alguns expoentes válidos pra você:",
					],
					children: (
						<Subsection2
							errors={errors}
							setErrors={setErrors}
							exponents={exponents}
						/>
					),
					buttonProps: {
						children: <>Gerar chave pública</>,
						onVerify: () => false,
						type: "submit",
					},
				},
				{
					title: "Vòilá!",
					description:
						"Está tudo prontinho! Suas chaves já foram geradas e podem ser utilizadas.",
					children: <Subsection3 key={data.privateKey} data={data} />,
					buttonProps: {
						children: <>Voltar para o início</>,
						type: "button",
					},
				},
			]}
		/>
	);
}
