import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";

function CategoriaSection(prop: { categoria: Categoria }) {
    return (
        <section>
            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                {prop.categoria.nome}
            </h2>
            {prop.categoria.reservaveis.map((reservavel) => (
                <li>
                    <Link href={route("reservaveis.edit", reservavel.id)}>
                        {reservavel.nome} -{" "}
                        {reservavel.isReservado ? "Reservado" : "Disponivel"}
                    </Link>
                </li>
            ))}
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        </section>
    );
}

export default function Reservaveis({
    auth,
    categorias,
}: PageProps<{ categorias: Categoria[] }>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Reservaveis
                </h2>
            }
        >
            <Head title="Reservaveis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <ul className="p-6 text-gray-900 dark:text-gray-100">
                            <li>
                                {categorias.map((categoria) => (
                                    <CategoriaSection categoria={categoria} />
                                ))}
                                <Link
                                    className="font-bold"
                                    href={route("reservaveis.create")}
                                >
                                    + Novo Reservavel!
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
