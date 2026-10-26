<?php

namespace App\Controllers;

use Slim\Views\Twig as View;

class PortofolioController extends BaseController
{
    public function index($request, $response)
    {
        $model = $this->createIndexModel();

        return $this->container->view->render($response, 'clients-portofolio.html', $model);
    }

    public function detail($request, $response)
    {
        $route = $request->getAttribute('route');
        $clientId = $route->getArgument('client_id');
        $clientName = $route->getArgument('client');
        $model = $this->createDetailModel($clientId, $clientName);
        return $this->container->view->render($response, 'client-portofolio-detail.html', $model);
    }

    private function createIndexModel()
    {
        $model = [];

        $clientRepository = new \App\Repositories\ClientRepository;
        $clients = $clientRepository->getAll();
        $model['clients'] = $clients;
        $model['userIsAuthenticated'] = isset($_SESSION['user']);

        return $model;
    }

    private function createDetailModel($clientId, $clientName)
    {
        $model = [];

        $portofolioRepository = new \App\Repositories\PortofolioRepository;
        $portofolio = $portofolioRepository->getByClient($clientId);
        $model['portofolio'] = $portofolio;
        $model['client'] = $clientName;
        $model['userIsAuthenticated'] = isset($_SESSION['user']);
        
        return $model;
    }
}
