<?php
namespace App\Controllers;

use Slim\Views\Twig as View;

ini_set("display_errors", '1');
error_reporting(E_ALL);

class ServicesController extends BaseController
{
    private $servicesRepository;
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
        $this->servicesRepository = new \App\Repositories\ServicesRepository;
        $this->portofolioRepository = new \App\Repositories\PortofolioRepository;
        $this->clientRepository = new \App\Repositories\ClientRepository;
        $this->entityTypes = \App\Helpers\EntityTypes::getEntityTypes();

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

        $route = substr($request->getUri()->getPath(), 1);
        $type = $this->entityTypes[$route]["type"];
        $entity = $this->getEntityDetail($type);
        $entity->type = $type;
        $entity->images = [];
        $entity->images = $this->getEntityPortofolio($type);
        $model['userIsAuthenticated'] = isset($_SESSION['user']);
        $model['entity'] = $entity;

        return $this->container->view->render($response, 'entity.html', $model);
    }

    /**
     * add image dialog, it builds the body message for bootbox modal
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function addImageDialog($request, $response)
    {
        $res = $this->clientRepository->getAll();

        if (!$res) {
            $data = ["Error" => "Cannot get list of all clients"];
            return $response->withJson($data, 500);
        }

        $model = [];
        $model['clients'] = $res;

        return $this->container->view->render($response, 'add-image-dialog.html', $model);
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
        $clientId = $request->getParam('clientId');
        $type = $request->getParam('type');

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

        $res = $this->portofolioRepository->addImage($clientId, $saveTo, $thumbnailSaveTo, $type);
        if (!$res) {
            $data = [];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }

    /**
     * edit image
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function edit($request, $response)
    {
        $pk = $request->getParam('pk');
        $name = $request->getParam('name');
        $value = $request->getParam('value');

        $editable = new \App\Dtos\Editable($pk, $name, $value);
        $res = $this->servicesRepository->edit($editable);

        if (!$res) {
            $data = ["Error: " => "Cannot edit the imag"];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }

    /**
     * change image action
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function changeImage($request, $response)
    {
        $pk = $request->getParam('pk');

        $res = $this->portofolioRepository->getImageById(intval($pk));

        if (!$res) {
            $data = ['Error: ' => 'Image with id = ' . $pk . ' not found'];
            return $response->withJson($data, 500);
        }

        $uploadedFile = $request->getUploadedFiles()['image'];
        if ($uploadedFile->getError() !== UPLOAD_ERR_OK) {
            $data = ['Error: ' => 'Image cannot be uploaded'];
            return $response->withJson($data, 500);
        }

        $thumbnailSaveTo = $this->imagesPath . $res->smallUrl;
        unlink($thumbnailSaveTo);

        $isThumbnailCreated = \App\Helpers\ImageHelper::createThumbnailImage($uploadedFile->file, $thumbnailSaveTo);
        if (!$isThumbnailCreated) {
            $data = ['Error: ' => 'Cannot create image thumbnail'];
            return $response->withJson($data, 500);
        }

        $saveTo = $this->imagesPath . $res->bigUrl;
        unlink($saveTo);
        $isImageMoved = move_uploaded_file($uploadedFile->file, $saveTo);

        if (!$isImageMoved) {
            $data = ['Error: ' => 'Cannot move the image'];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }

    /**
     * delete image by id
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function deleteImage($request, $response)
    {
        $pk = $request->getParam('id');

        $res = $this->portofolioRepository->deleteImageById(intval($pk));
        if (!$res) {
            $data = ['Error: ' => 'Imaginea witcu id = ' . $pk . ' nu a fost stearsa'];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }

     /**
     * promote image by id
     *
     * @param [type] $request
     * @param [type] $response
     * @return void
     */
    public function promoteImage($request, $response)
    {
        $pk = $request->getParam('id');

        $res = $this->portofolioRepository->changePromotedImageStatusById(intval($pk));
        if (!$res) {
            $data = ['Error: ' => 'Nu am schimbat status-ul imaginii cu id = ' . $pk ];
            return $response->withJson($data, 500);
        }

        return $response->withStatus(200);
    }

    private function getEntityDetail($entityType)
    {
        return $this->servicesRepository->getByType($entityType);
    }

    private function getEntityPortofolio($entityType)
    {
        return $this->portofolioRepository->getByType($entityType);
    }
}
