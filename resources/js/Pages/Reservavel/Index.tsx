import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { ReactNode } from 'react';

export default function Reservaveis({ auth, reservaveisJson }: PageProps<{ reservaveisJson: string }>) {
    const categorias: any[] = JSON.parse(reservaveisJson);

    const reservaveisElementList: ReactNode[] = [];
    categorias.forEach((categoria) => {

        // header da categoria
        reservaveisElementList.push(
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{categoria.nome}</h2>
        )

        // lista de reservaveis da categoria
        categoria.reservaveis.forEach((reservavel: any) => {
            reservaveisElementList.push(
                <li>
                    <Link href={route('reservaveis.edit', reservavel.id)}>
                        {reservavel.nome} - {reservavel.isReservado ? "Reservado" : "Disponivel"}
                    </Link>
                </li>
            )
        });
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Reservaveis</h2>}
        >
            <Head title="Reservaveis" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <ul className="p-6 text-gray-900 dark:text-gray-100">
                            {reservaveisElementList}
                            <li>
                                <Link className="font-bold" href={route('reservaveis.create')}>
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
