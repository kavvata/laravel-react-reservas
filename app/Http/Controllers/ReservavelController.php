<?php

namespace App\Http\Controllers;

use App\Models\Reservavel;
use App\Repositories\Repository;
use App\Repositories\ReservavelRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservavelController extends Controller
{
    protected Repository $repository;

    function __construct()
    {
        $this->repository = new ReservavelRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservaveis = $this->repository->selectAll();
        $categorias = \App\Repositories\CategoriaRepository->selectAll();

        /* nome do prop no react => variavel no laravel */
        return Inertia::render('Reservavel/Index', ['reservaveisJson' => json_encode($reservaveis)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservavel/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $novoReservavel = new Reservavel();
        $novoReservavel->nome = $request->nome;
        $novoReservavel->isReservado = false;

        $novoReservavel->save();

        return to_route('reservaveis.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservavel = $this->repository->findById($id);

        return json_encode($reservavel);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservavel = $this->repository->findById($id);

        return Inertia::render('Reservavel/Edit', ['reservavelJson' => json_encode($reservavel)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reservavel = $this->repository->findById($id);
        if (!isset($reservavel)) {
            return '<h1>Update - Erro: reservavel nao encontrado</h1>';
        }

        $reservavel->nome = $request->nome;
        $reservavel->isReservado = $request->isReservado;

        $reservavel->save();

        return to_route('reservaveis.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
