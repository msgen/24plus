<?php

namespace App\Controllers;

use Slim\Views\Twig as View;

define('HOW_MANY_CLIENTS', 4);
define('HOW_MANY_TESTIMONIALS', 5);

class HomeController extends BaseController
{
    /**
     * index method
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function index($request, $response)
    {
        $model = $this->createModel();

        return $this->container->view->render($response, 'index.html',  $model);
    }

    private function createModel(){
        $model = [];

        $clientRepository = new \App\Repositories\ClientRepository;
        $clients = $clientRepository->getAll(HOW_MANY_CLIENTS);
        $model['clients'] = $clients;

        $testimonialRepository = new \App\Repositories\TestimonialRepository;
        $testimonials = $testimonialRepository->getLatest(HOW_MANY_TESTIMONIALS);
        $model['testimonials'] = $testimonials;

        $portofolioRepository = new \App\Repositories\PortofolioRepository;
        $portofolio = $portofolioRepository->getClassified();
        $model['portofolio'] = ['items' => $portofolio, 'classification' => $this->getCombinedClassification($portofolio)];
        $model['userIsAuthenticated'] = isset($_SESSION['user']);

        return $model;
    }

    private function getCombinedClassification($portofolio){
        $classification = [];
        $seen = [];
        foreach($portofolio as $key => $value){
            $c = $value->classification;
            if (!in_array($c, $seen)) {
                $seen[] = $c;
                $classification[] = ['value' => $c, 'formatted' => str_replace('-', ' ', $c)];
            }
        }

        return $classification;
    }
}
