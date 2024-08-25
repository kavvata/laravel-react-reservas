import EditableSelect from "@/Components/EditableSelect";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Create({
    auth,
    reservavel,
    categorias,
}: PageProps<{ reservavel: Reservavel; categorias: Categoria[] }>) {
    const { data, setData, patch, processing } = useForm({
        nome: reservavel.nome,
        categoria_id: reservavel.categoria.id,
        isReservado: reservavel.isReservado,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const token = categoriaBuffer.toLowerCase();

        const newCategoria = categorias.find((categoria) =>
            categoria.nome.toLowerCase().startsWith(token),
        );

        if (newCategoria != undefined) {
            setData("categoria_id", newCategoria.id);
        }
        patch(route("reservaveis.update", reservavel.id));
    };

    let categoriaBuffer = categorias.find(
        (categoria) => categoria.id == data.categoria_id,
    )!.nome;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Editar Reservavel
                </h2>
            }
        >
            <Head title="Editar Reservavel" />

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
                                    <select
                                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                        onChange={(e) =>
                                            setData(
                                                "categoria_id",
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
                                <PrimaryButton disabled={processing}>
                                    Atualizar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
