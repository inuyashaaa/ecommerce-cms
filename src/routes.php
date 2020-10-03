<?php

namespace PHPMaker2021\ecommerce;

use Slim\App;
use Slim\Routing\RouteCollectorProxy;

// Handle Routes
return function (App $app) {
    // category
    $app->any('/CategoryList[/{id}]', CategoryController::class . ':list')->add(PermissionMiddleware::class)->setName('CategoryList-category-list'); // list
    $app->any('/CategoryAdd[/{id}]', CategoryController::class . ':add')->add(PermissionMiddleware::class)->setName('CategoryAdd-category-add'); // add
    $app->any('/CategoryView[/{id}]', CategoryController::class . ':view')->add(PermissionMiddleware::class)->setName('CategoryView-category-view'); // view
    $app->any('/CategoryEdit[/{id}]', CategoryController::class . ':edit')->add(PermissionMiddleware::class)->setName('CategoryEdit-category-edit'); // edit
    $app->any('/CategoryDelete[/{id}]', CategoryController::class . ':delete')->add(PermissionMiddleware::class)->setName('CategoryDelete-category-delete'); // delete
    $app->group(
        '/category',
        function (RouteCollectorProxy $group) {
            $group->any('/list[/{id}]', CategoryController::class . ':list')->add(PermissionMiddleware::class)->setName('category/list-category-list-2'); // list
            $group->any('/add[/{id}]', CategoryController::class . ':add')->add(PermissionMiddleware::class)->setName('category/add-category-add-2'); // add
            $group->any('/view[/{id}]', CategoryController::class . ':view')->add(PermissionMiddleware::class)->setName('category/view-category-view-2'); // view
            $group->any('/edit[/{id}]', CategoryController::class . ':edit')->add(PermissionMiddleware::class)->setName('category/edit-category-edit-2'); // edit
            $group->any('/delete[/{id}]', CategoryController::class . ':delete')->add(PermissionMiddleware::class)->setName('category/delete-category-delete-2'); // delete
        }
    );

    // product
    $app->any('/ProductList[/{id}]', ProductController::class . ':list')->add(PermissionMiddleware::class)->setName('ProductList-product-list'); // list
    $app->any('/ProductAdd[/{id}]', ProductController::class . ':add')->add(PermissionMiddleware::class)->setName('ProductAdd-product-add'); // add
    $app->any('/ProductView[/{id}]', ProductController::class . ':view')->add(PermissionMiddleware::class)->setName('ProductView-product-view'); // view
    $app->any('/ProductEdit[/{id}]', ProductController::class . ':edit')->add(PermissionMiddleware::class)->setName('ProductEdit-product-edit'); // edit
    $app->any('/ProductDelete[/{id}]', ProductController::class . ':delete')->add(PermissionMiddleware::class)->setName('ProductDelete-product-delete'); // delete
    $app->group(
        '/product',
        function (RouteCollectorProxy $group) {
            $group->any('/list[/{id}]', ProductController::class . ':list')->add(PermissionMiddleware::class)->setName('product/list-product-list-2'); // list
            $group->any('/add[/{id}]', ProductController::class . ':add')->add(PermissionMiddleware::class)->setName('product/add-product-add-2'); // add
            $group->any('/view[/{id}]', ProductController::class . ':view')->add(PermissionMiddleware::class)->setName('product/view-product-view-2'); // view
            $group->any('/edit[/{id}]', ProductController::class . ':edit')->add(PermissionMiddleware::class)->setName('product/edit-product-edit-2'); // edit
            $group->any('/delete[/{id}]', ProductController::class . ':delete')->add(PermissionMiddleware::class)->setName('product/delete-product-delete-2'); // delete
        }
    );

    // users
    $app->any('/UsersList[/{id}]', UsersController::class . ':list')->add(PermissionMiddleware::class)->setName('UsersList-users-list'); // list
    $app->any('/UsersAdd[/{id}]', UsersController::class . ':add')->add(PermissionMiddleware::class)->setName('UsersAdd-users-add'); // add
    $app->any('/UsersView[/{id}]', UsersController::class . ':view')->add(PermissionMiddleware::class)->setName('UsersView-users-view'); // view
    $app->any('/UsersEdit[/{id}]', UsersController::class . ':edit')->add(PermissionMiddleware::class)->setName('UsersEdit-users-edit'); // edit
    $app->any('/UsersDelete[/{id}]', UsersController::class . ':delete')->add(PermissionMiddleware::class)->setName('UsersDelete-users-delete'); // delete
    $app->group(
        '/users',
        function (RouteCollectorProxy $group) {
            $group->any('/list[/{id}]', UsersController::class . ':list')->add(PermissionMiddleware::class)->setName('users/list-users-list-2'); // list
            $group->any('/add[/{id}]', UsersController::class . ':add')->add(PermissionMiddleware::class)->setName('users/add-users-add-2'); // add
            $group->any('/view[/{id}]', UsersController::class . ':view')->add(PermissionMiddleware::class)->setName('users/view-users-view-2'); // view
            $group->any('/edit[/{id}]', UsersController::class . ':edit')->add(PermissionMiddleware::class)->setName('users/edit-users-edit-2'); // edit
            $group->any('/delete[/{id}]', UsersController::class . ':delete')->add(PermissionMiddleware::class)->setName('users/delete-users-delete-2'); // delete
        }
    );

    // error
    $app->any('/error', OthersController::class . ':error')->add(PermissionMiddleware::class)->setName('error');

    // login
    $app->any('/login', OthersController::class . ':login')->add(PermissionMiddleware::class)->setName('login');

    // logout
    $app->any('/logout', OthersController::class . ':logout')->add(PermissionMiddleware::class)->setName('logout');

    // Index
    $app->any('/[index]', OthersController::class . ':index')->setName('index');
    if (function_exists(PROJECT_NAMESPACE . "Route_Action")) {
        Route_Action($app);
    }

    /**
     * Catch-all route to serve a 404 Not Found page if none of the routes match
     * NOTE: Make sure this route is defined last.
     */
    $app->map(
        ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        '/{routes:.+}',
        function ($request, $response, $params) {
            $error = [
                "statusCode" => "404",
                "error" => [
                    "class" => "text-warning",
                    "type" => Container("language")->phrase("Error"),
                    "description" => str_replace("%p", $params["routes"], Container("language")->phrase("PageNotFound")),
                ],
            ];
            Container("flash")->addMessage("error", $error);
            return $response->withStatus(302)->withHeader("Location", GetUrl("error")); // Redirect to error page
        }
    );
};
