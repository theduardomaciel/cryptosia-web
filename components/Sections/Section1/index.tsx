"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { MultisectionsSectionWrapper } from "../subcomponents/layout/Wrapper";

// Subsections
import type { WasmFunctions, WasmMethods } from "@/lib/@types";
import Subsection1 from "./Subsection1";
import Subsection2 from "./Subsection2";
import Subsection3 from "./Subsection3";

// Utils

interface FormValues {
	p: string;
	q: string;
	exponent: string;
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
	const [exponents, setExponents] = useState<string[]>([]);
	const [data, setData] = useState<Record<keyof Data, string>>(
		{} as Record<keyof Data, string>
	);

	const router = useRouter();
	const WASM = useRef<(WasmFunctions & WasmMethods) | null>(null);

	useEffect(() => {
		console.log("Verificando WASM...");
		if (
			typeof (window as any).CRYPTOSIA === "function" &&
			WASM.current === null
		) {
			console.log("Carregando WASM...");
			(window as any)
				.CRYPTOSIA()
				.then((wasm: WasmFunctions & WasmMethods) => {
					console.log("WASM carregou!");
					WASM.current = wasm;
					// ...
				});
		}
	}, []);

	const section1OnVerify = () => {
		if (!WASM.current) return false;

		const p =
			document
				.getElementById("public-key-section")
				?.querySelector<HTMLInputElement>('[name="p"]')?.value || "";

		const q =
			document
				.getElementById("public-key-section")
				?.querySelector<HTMLInputElement>('[name="q"]')?.value || "";

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

		const totient = WASM.current?.ccall(
			"publicKey_totient",
			"string",
			["string", "string"],
			[p, q]
		);

		console.log("Totiente: " + totient);

		if (totient == "-1") {
			setErrors((errors) => ({
				...errors,
				p: "O número inserido é muito grande para nossa capacidade :(",
			}));
		}

		if (totient == "-2") {
			setErrors((errors) => ({
				...errors,
				general:
					"A multiplicação dos números primos é muito pequena, portanto não é possível gerar uma chave pública segura com eles. Tente valores maiores!",
			}));
		}

		if (totient == "-3") {
			setErrors((errors) => ({
				...errors,
				p: "O número inserido não é primo",
			}));
		}

		if (totient == "-4") {
			setErrors((errors) => ({
				...errors,
				q: "O número inserido não é primo",
			}));
		}

		if (totient == "-5") {
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

		const exponents = WASM.current.ccall(
			"publicKey_e",
			"string",
			["string", "number"],
			[totient, EXPONENTS_AMOUNT]
		) as string;

		setExponents(exponents.split(" "));

		return true;
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!WASM.current) {
			setErrors((errors) => ({
				...errors,
				general: "Ocorreu um erro ao gerar sua chave pública :(",
			}));
			return;
		}
		if (errors.p || errors.q || errors.general) return;

		const formData = new FormData(event.currentTarget);
		const unformattedData = Object.fromEntries(formData.entries());

		const values = Object.fromEntries(
			Object.entries(unformattedData).map(([key, value]) => [
				key,
				value.toString(),
			])
		) as unknown as FormValues;

		console.log("Valores:", values);

		const n = WASM.current?.ccall(
			"n_factor",
			"string",
			["string", "string"],
			[values.p, values.q]
		);

		console.log("N:", n);

		const totient = WASM.current?.ccall(
			"publicKey_totient",
			"string",
			["string", "string"],
			[values.p, values.q]
		);

		console.log("Totiente:", totient);

		const exponent_mdc = WASM.current?.ccall(
			"mdc",
			"string",
			["string", "string"],
			[values.exponent, totient]
		);

		console.log("MDC:", exponent_mdc);

		if (parseInt(values.exponent) <= 1 || exponent_mdc !== "1") {
			setErrors((errors) => ({
				...errors,
				exponent: "O expoente deve ser coprimo a φ(n) [totiente de n].",
			}));
			return;
		}

		//console.log(values);

		const privateKey = WASM.current?.ccall(
			"privateKey_d",
			"string",
			["string", "string"],
			[totient, values.exponent]
		);

		console.log("Totiente:", totient);
		console.log("Expoente:", values.exponent);
		console.log("Chave privada:", privateKey);

		// d = privada, e = pública | n
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
