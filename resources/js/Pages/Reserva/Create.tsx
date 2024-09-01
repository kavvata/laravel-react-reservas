import DatePickerInput from "@/Components/DatePickerInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function Create({
    auth,
    categorias,
}: PageProps<{ categorias: Categoria[] }>) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>(
        categorias[0],
    );

    function selecionaCategoria(event: ChangeEvent<HTMLSelectElement>): void {
        const novaCategoria = categorias.find(
            (c) => c.id == Number(event.target.value),
        );

        if (novaCategoria) {
            setCategoriaSelecionada(novaCategoria);
            setData("reservavel_id", novaCategoria.reservaveis[0].id);
        }
    }

    function selecionaReservavel(event: ChangeEvent<HTMLSelectElement>): void {
        const novoReservavel = categoriaSelecionada.reservaveis.find(
            (r) => r.id == Number(event.target.value),
        );

        if (novoReservavel) {
            setData("reservavel_id", novoReservavel.id);
        }
    }

    const { data, setData, post, processing, errors } = useForm({
        reservavel_id: categoriaSelecionada.reservaveis[0].id,
        inicio: Date.now(),
        devolucao_prevista: Date.now(),
        descricao: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // setData("inicio", dateInicio.getTime());
        // setData("devolucao_prevista", dateDevolucaoPrevista.getTime());

        post(route("reservas.store", data));
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
                                <div id="dates" className="flex flex-row">
                                    <div>
                                        <InputLabel
                                            htmlFor="date-inicio"
                                            value="Inicio"
                                        />
                                        <DatePickerInput
                                            selected={new Date(data.inicio)}
                                            onChange={(date) => {
                                                if (date) {
                                                    setData(
                                                        "inicio",
                                                        date.getTime(),
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            htmlFor="date-devolucao"
                                            value="Devolução"
                                        />
                                        <DatePickerInput
                                            selected={
                                                new Date(
                                                    data.devolucao_prevista,
                                                )
                                            }
                                            onChange={(date) => {
                                                if (date) {
                                                    setData(
                                                        "devolucao_prevista",
                                                        date.getTime(),
                                                    );
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div id="filtro-input">
                                    <InputLabel
                                        htmlFor="filtro-categoria"
                                        value="Filtrar"
                                    />

                                    <select
                                        id="filtro-categoria"
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        onChange={selecionaCategoria}
                                    >
                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria.id}
                                                value={categoria.id}
                                            >
                                                {categoria.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div id="reservaveis-input">
                                    <InputLabel
                                        htmlFor="reservaveis"
                                        value="Reservavel"
                                    />
                                    <select
                                        id="reservaveis"
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        onChange={selecionaReservavel}
                                    >
                                        {categoriaSelecionada.reservaveis.map(
                                            (reservavel) => (
                                                <option
                                                    key={reservavel.id}
                                                    value={reservavel.id}
                                                >
                                                    {reservavel.nome}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="descricao"
                                        value="Descrição"
                                    />

                                    <TextInput
                                        id="descricao"
                                        type="text"
                                        name="descricao"
                                        value={data.descricao}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("descricao", e.target.value)
                                        }
                                    />
                                </div>

                                <InputError
                                    message={errors.devolucao_prevista}
                                    className="mt-2"
                                />

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
