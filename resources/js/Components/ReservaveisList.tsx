import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { ReactNode } from "react";

export default function ReservaveisList({ listaReservaveis }: PageProps<{ listaReservaveis: string }>) {

    const reservaveis: any[] = JSON.parse(listaReservaveis);
    const reservaveisElementList: ReactNode[] = [];

    reservaveis.forEach((reservavel) => {
        reservaveisElementList.push(
            <li>
                <Link href="">{reservavel.nome} - {reservavel.isReservado ? "Reservado" : "Disponivel"}</Link>
            </li>
        )
    });

    return (
        <div>
            {reservaveisElementList}
        </div>
    )
}
