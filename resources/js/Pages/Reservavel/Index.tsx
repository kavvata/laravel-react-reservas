import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";

function CategoriaSection(prop: { categoria: Categoria }) {
    return (
        <section>
            <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
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
            <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Reservaveis
                </h2>
            }
        >
            <Head title="Reservaveis" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
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
