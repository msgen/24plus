<?php
namespace App\Controllers;

use Slim\Views\Twig as View;

ini_set("display_errors", '1');
error_reporting(E_ALL);

class ClientController extends BaseController
{
    private $portofolioRepository;
    private $clientRepository;
    private $entityTypes;

    private $imagesPath;

    /**
     * ctor
     *
     * @param [type] $container
     */
    public function __construct($container)
    {
        parent::__construct($container);
        $this->portofolioRepository = new \App\Repositories\PortofolioRepository;
        $this->clientRepository = new \App\Repositories\ClientRepository;

        $this->imagesPath = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR
            . "assets" . DIRECTORY_SEPARATOR . "img" . DIRECTORY_SEPARATOR;
    }

    /**
     * main action
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function index($request, $response)
    {
        $model = [];

        $clients = $this->clientRepository->getAll();
        $model['userIsAuthenticated'] = isset($_SESSION['user']);
        $model['clients'] = $clients;

        return $this->container->view->render($response, 'clients-list.html', $model);
    }

    /**
     * add client dialog, it builds the body message for bootbox modal
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function addClientDialog($request, $response)
    {
        return $this->container->view->render($response, 'add-client-dialog.html');
    }

    /**
     * edit image
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function add($request, $response)
    {
        $uploadedFile = $request->getUploadedFiles()['image'];
        $name = $request->getParam('name');
        $url = $request->getParam('url');

        if ($uploadedFile->getError() !== UPLOAD_ERR_OK) {
            $data = ['Error: ' => 'Image cannot be uploaded'];
            return $response->withJson($data, 500);
        }

        $thumbnailSaveTo = "gallery/thumb_" . $uploadedFile->getClientFilename();

        $isThumbnailCreated = \App\Helpers\ImageHelper::createThumbnailImage($uploadedFile->file, $this->imagesPath . $thumbnailSaveTo);
        if (!$isThumbnailCreated) {
            $data = ['Error: ' => 'Cannot create image thumbnail'];
            return $response->withJson($data, 500);
        }

        $saveTo = "gallery/" . $uploadedFile->getClientFilename();
        $isImageMoved = move_uploaded_file($uploadedFile->file, $this->imagesPath . $saveTo);

        if (!$isImageMoved) {
            $data = ['Error: ' => 'Cannot move the image'];
            return $response->withJson($data, 500);
        }

        $res = $this->clientRepository->add($name, $url, $saveTo);
        if (!$res) {
            $data = ['Error: ' => 'Cannot add client in database' ];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }

    /**
     * delete client by id
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function delete($request, $response)
    {
        $pk = $request->getParam('id');
        
        $clientId = intval($pk);
        $res = $this->portofolioRepository->deleteByClientId($clientId);
        if (!$res) {
            $data = ['Error: ' => 'Portofoliul clientului cu id = ' . $pk . ' nu a fost sters'];
            return $response->withJson($data, 500);
        }

        $res = $this->clientRepository->deleteById($clientId);
        if (!$res) {
            $data = ['Error: ' => 'Clientul cu id = ' . $pk . ' nu a fost sters'];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }
}
