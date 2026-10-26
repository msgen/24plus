<?php

session_start();

require __DIR__ . '/../vendor/autoload.php';

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);

$container = $app->getContainer();

$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(__DIR__ . '/../resources/views', [
        'cache' => false,
        'debug' => true
    ]);

    // Instantiate and add Slim specific extension
    $router = $container->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new Slim\Views\TwigExtension($router, $uri));

    return $view;
};

$container['HomeController'] = function ($container) {
    return new \App\Controllers\HomeController($container);
};

$container['ServicesController'] = function ($container) {
    return new \App\Controllers\ServicesController($container);
};

$container['PortofolioController'] = function ($container) {
    return new \App\Controllers\PortofolioController($container);
};

$container['ClientController'] = function ($container) {
    return new \App\Controllers\ClientController($container);
};

$container['ContactController'] = function ($container) {
    return new \App\Controllers\ContactController($container);
};

$container['AuthController'] = function ($container) {
    return new \App\Controllers\AuthController($container);
};

$function = new Twig_SimpleFunction('CreateInPlaceEditorForChangingImage', '\App\Helpers\ImageHelper::CreateInPlaceEditorForChangingImage');
$container->get('view')->getEnvironment()->addFunction($function);

$function = new Twig_SimpleFunction('CreateDeleteImageHelper', '\App\Helpers\ImageHelper::CreateDeleteImageHelper');
$container->get('view')->getEnvironment()->addFunction($function);

$function = new Twig_SimpleFunction('CreatePromoteToHomepageImageHelper', '\App\Helpers\ImageHelper::CreatePromoteToHomepageImageHelper');
$container->get('view')->getEnvironment()->addFunction($function);

$function = new Twig_SimpleFunction('CreateInPlaceEditorForAddingImage', '\App\Helpers\ImageHelper::CreateInPlaceEditorForAddingImage');
$container->get('view')->getEnvironment()->addFunction($function);

?>
