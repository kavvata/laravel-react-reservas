<?php

namespace App\Http\Controllers;

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
        $reservaveis = json_encode($this->repository->selectAll());
        /* nome do prop no react => variavel no laravel */
        return Inertia::render('Reservaveis/Index', ['listaReservaveis' => $reservaveis]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
