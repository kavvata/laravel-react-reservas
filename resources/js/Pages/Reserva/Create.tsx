import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, MouseEventHandler } from "react";

export default function Create({
    auth,
    categorias,
}: PageProps<{ categorias: Categoria[] }>) {
    const { data, setData, post, processing } = useForm({
        reservaveis_selecionados: Array() as Reservavel[],
        categoria_selecionada_id: categorias[0].id,
        // devolucao_prevista: Date.now(),
        // inicio: Date.now(),
        responsavel_id: auth.user.id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("reservas.store"));
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
            <Head title="Nova Reserva" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={submit}>
                            <div className="space-y-4 p-6 text-gray-900 dark:text-gray-100">
                                <div id="filtro-input">
                                    <InputLabel
                                        htmlFor="nome-reserva"
                                        value="Filtrar"
                                    />

                                    <select
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        onChange={(e) =>
                                            setData(
                                                "categoria_selecionada_id",
                                                Number(e.target.value),
                                            )
                                        }
                                    >
                                        {categorias.map((categoria) => (
                                            <option value={categoria.id}>
                                                {categoria.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div
                                    id="reservaveis-input"
                                    className="flex flex-row"
                                >
                                    <select
                                        size={5}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    >
                                        {categorias[
                                            data.categoria_selecionada_id - 1
                                        ].reservaveis.map((reservavel) => (
                                            <option value={reservavel.id}>
                                                {reservavel.nome}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        size={5}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    >
                                        {data.reservaveis_selecionados.map(
                                            (reservavel) => (
                                                <option value={reservavel.id}>
                                                    {reservavel.nome} -{" "}
                                                    {reservavel.categoria.nome}
                                                </option>
                                            ),
                                        )}
                                    </select>
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
