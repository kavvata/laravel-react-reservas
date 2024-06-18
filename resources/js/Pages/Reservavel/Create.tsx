import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing } = useForm({
        nome: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("reservaveis.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Novo reservavel
                </h2>
            }
        >
            <Head title="Novo Reservavel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="p-6 space-y-4 text-gray-900 dark:text-gray-100">
                                <div id="inputs">
                                    <InputLabel
                                        htmlFor="nome-reservavel"
                                        value="Nome"
                                    />

                                    <TextInput
                                        id="nome-reservavel"
                                        type="text"
                                        name="nome-reservavel"
                                        value={data.nome}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("nome", e.target.value)
                                        }
                                    />
                                </div>
                                <PrimaryButton disabled={processing}>
                                    Cadastrar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
