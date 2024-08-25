import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import { ReactNode } from "react";
import { debug } from "util";

export default function Reservas({
    auth,
    reservas,
}: PageProps<{ reservas: Reserva[] }>) {
    const reservasElementList: ReactNode[] = [];
    reservas.forEach((reserva) => {
        reservasElementList.push(
            <li>
                <Link href={route("reservas.edit", reserva.id)}>
                    {reserva.reservavel.nome}: {reserva.descricao}: Inicio=
                    {reserva.inicio.toString()} | Prevista=
                    {reserva.devolucao_prevista.toString()}
                </Link>
            </li>,
        );
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Reservas
                </h2>
            }
        >
            <Head title="Reserva" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <ul className="p-6 text-gray-900 dark:text-gray-100">
                            {reservasElementList}
                            <Link
                                className="font-bold"
                                href={route("reservas.create")}
                            >
                                + Nova Reserva!
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
