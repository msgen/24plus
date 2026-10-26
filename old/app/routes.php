<?php
$app->get('/', 'HomeController:index');

$routes = \App\Helpers\EntityTypes::getEntityTypes();
foreach($routes as $key => $value ) {
    $app->get('/'. $key, 'ServicesController:index');
}

$app->get('/portofoliu', 'PortofolioController:index');
$app->get('/portofoliu/{client}/{client_id:[0-9]+}', 'PortofolioController:detail');
$app->get('/clienti', 'ClientController:index');
$app->get('/admin', 'AuthController:getSignIn');
$app->post('/admin', 'AuthController:postSignIn');
$app->get('/logout', 'AuthController:logout');
$app->post('/edit-entity', 'ServicesController:edit');
$app->post('/change-image', 'ServicesController:changeImage');
$app->post('/delete-image', 'ServicesController:deleteImage');
$app->post('/promote-image', 'ServicesController:promoteImage');
$app->post('/add-image', 'ServicesController:add');
$app->get('/get-add-image-dialog', 'ServicesController:addImageDialog');
$app->get('/get-add-client-dialog', 'ClientController:addClientDialog');
$app->post('/add-client', 'ClientController:add');
$app->post('/delete-client', 'ClientController:delete');
$app->post('/send-email', 'ContactController:sendEmail');