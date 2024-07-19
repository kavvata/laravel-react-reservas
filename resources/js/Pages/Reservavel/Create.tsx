import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import Select from "react-dropdown-select";

export default function Create({
    auth,
    categorias,
}: PageProps<{ categorias: Categoria[] }>) {
    const { data, setData, post, processing } = useForm({
        nome: "",
        categoria_id: categorias[0].id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("reservaveis.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Novo reservavel
                </h2>
            }
        >
            <Head title="Novo Reservavel" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={submit}>
                            <div className="space-y-4 p-6 text-gray-900 dark:text-gray-100">
                                <div id="nome-input">
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
                                <div id="categoria-input">
                                    <InputLabel
                                        htmlFor="categoria-select"
                                        value="Categoria"
                                    />
                                    {/* FIXME: this select is bad */}
                                    <Select
                                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 "
                                        multi={false}
                                        options={categorias}
                                        values={categorias.filter(
                                            (c) => c.id == data.categoria_id,
                                        )}
                                        onChange={(newValues: Categoria[]) => {
                                            if (newValues.length == 0) {
                                                return;
                                            }
                                            setData(
                                                "categoria_id",
                                                newValues[0].id,
                                            );
                                        }}
                                        labelField="nome"
                                        valueField="id"
                                        searchBy="nome"
                                        placeholder="Sem Categoria"
                                        color="#111827"
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
