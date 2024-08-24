<?php

namespace App\Http\Controllers;

use App\Models\Reservavel;
use App\Repositories\CategoriaRepository;
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
        $categoriasComReservaveis = (new CategoriaRepository)->selectAllWith(['reservaveis']);

        /* nome do prop na pagina => variavel no laravel */
        return Inertia::render('Reservavel/Index', ['categorias' => $categoriasComReservaveis]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reservavel/Create', [
            'categorias' => (new CategoriaRepository)->selectAll(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $categoria = (new CategoriaRepository)->findById($request->categoria_id);

        if (!isset($categoria)) {
            return '<h2> Erro, categoria nao encontrada </h2>';
        }

        $novoReservavel = new Reservavel();
        $novoReservavel->nome = $request->nome;
        $novoReservavel->categoria()->associate($categoria);
        $novoReservavel->isReservado = false;

        $novoReservavel->save();

        return to_route('reservaveis.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // TODO: detalhes com todas as reservas do item
        $reservavel = $this->repository->findById($id);

        return $reservavel;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservavel = $this->repository->findByIdWith(['categoria'], $id);

        if (!isset($reservavel)) {
            return '<h2>Edit - Reservavel nao encontrado </h2>';
        }

        $categorias = (new CategoriaRepository)->selectAll();

        return Inertia::render('Reservavel/Edit', [
            'reservavel' => $reservavel,
            'categorias' => $categorias,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reservavel = $this->repository->findById($id);
        $categoria = (new CategoriaRepository)->findById($request->categoria_id);

        if (!isset($reservavel) || !isset($categoria)) {
            return '<h1>Update - Erro: reservavel ou categoria nao encontrado</h1>';
        }

        $reservavel->nome = $request->nome;
        $reservavel->isReservado = $request->isReservado;
        $reservavel->categoria()->associate($categoria);

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
