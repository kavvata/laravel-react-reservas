<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Repositories\CategoriaRepository;
use App\Repositories\Repository;
use App\Repositories\ReservaRepository;
use App\Repositories\ReservavelRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Monolog\DateTimeImmutable;

class ReservaController extends Controller
{
    protected Repository $repository;

    public function __construct()
    {
        $this->repository = new ReservaRepository;
    }

    private function removeMilliseconds(int $timestamp): int
    {
        return floor($timestamp / 1000);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Reserva/Index', [
            'reservas' => $this->repository->selectAllWith(['reservavel'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reserva/Create', [
            'categorias' => (new CategoriaRepository)->selectAllWith(['reservaveis']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dateFormat = 'Y-m-d H:i:s';

        $request->validate([
            'reservavel_id' => 'required',
            'inicio' => 'required',
            'devolucao_prevista' => 'required',
            'descricao' => 'required|string',
        ]);

        $reservavel = (new ReservavelRepository)->findById($request->reservavel_id);

        if (!isset($reservavel)) {
            return '<h2>STORE - Resrvavel nao encontrado </h2>';
        }

        $user = Auth::user();

        if (!isset($user)) {
            return '<h2>STORE - Usuario autenticado nao encontrado??? </h2>';
        }

        $novaReserva = new Reserva();
        $novaReserva->reservavel()->associate($reservavel);
        $novaReserva->responsavel()->associate($user);

        $inicioFormatado = $this->removeMilliseconds($request->inicio);
        $devolucaoPrevistaFormatada = $this->removeMilliseconds($request->devolucao_prevista);

        // $debugDate = [
        //     'now' => strtotime('now'),
        //     'inicio' => $this->removeMilliseconds($request->inicio),
        //     'devolucao_prevista' => $this->removeMilliseconds($request->devolucao_prevista),
        //     'f_inicio' => date($dateFormat, $inicioFormatado),
        //     'f_devolucao_prevista' => date($dateFormat, $devolucaoPrevistaFormatada),
        // ];

        $novaReserva->inicio = date(
            $dateFormat,
            $this->removeMilliseconds($request->inicio)
        );

        $novaReserva->devolucao_prevista = date(
            $dateFormat,
            $this->removeMilliseconds($request->devolucao_prevista)
        );

        $novaReserva->descricao = $request->descricao;

        $novaReserva->save();

        return to_route('reservas.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Reserva $reserva)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reserva $reserva)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reserva $reserva)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reserva $reserva)
    {
        //
    }
}
