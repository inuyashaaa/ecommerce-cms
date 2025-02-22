<?php

namespace PHPMaker2021\ecommerce;

use Slim\Routing\RouteContext;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use Nyholm\Psr7\Factory\Psr17Factory;

/**
 * Permission middleware
 */
class ApiPermissionMiddleware
{
    // Handle slim request
    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        global $UserProfile, $Security, $Language, $ResponseFactory;

        // API call
        $GLOBALS["IsApi"] = true;

        // Create Response
        $response = $ResponseFactory->createResponse();
        $routeContext = RouteContext::fromRequest($request);
        $route = $routeContext->getRoute();
        $args = $route->getArguments();
        $name = $route->getName(); // (api/action)
        $isCustom = $name == "custom";
        $ar = explode("/", $name);
        $action = @$ar[1];

        // Validate CSRF
        $checkTokenActions = [
            Config("API_JQUERY_UPLOAD_ACTION"),
            Config("API_SESSION_ACTION"),
            Config("API_PROGRESS_ACTION"),
            Config("API_EXPORT_CHART_ACTION")
        ];
        if (in_array($action, $checkTokenActions)) { // Check token
            if (Config("CHECK_TOKEN") && !ValidateCsrf()) {
                //throw new HttpBadRequestException($request, $Language->phrase("InvalidPostRequest"));
                return $response->withStatus(401); // Not authorized
            }
        }

        // Get route data
        $params = $args["params"] ?? ""; // Get route
        if ($isCustom && !EmptyValue($params)) { // Other API actions
            $ar = explode("/", $params);
            $action = array_shift($ar);
            $params = implode("/", $ar);
        }

        // Set up Route
        $routeValues = $params == "" ? [] : explode("/", $params);
        $GLOBALS["RouteValues"] = array_merge([$action], $routeValues);
        $table = $isCustom ? "" : @$routeValues[0];
        if (EmptyValue($table) && Post(Config("API_OBJECT_NAME")) !== null) { // Get from Post
            $table = Post(Config("API_OBJECT_NAME"));
        }

        // Set up request
        $GLOBALS["Request"] = $request;

        // Set up language
        $Language = Container("language");

        // Load Security
        $UserProfile = Container("profile");
        $Security = Container("security");

        // Default no permission
        $authorised = false;

        // Actions for table
        $apiTableActions = [
            Config("API_LIST_ACTION"),
            Config("API_VIEW_ACTION"),
            Config("API_ADD_ACTION"),
            Config("API_EDIT_ACTION"),
            Config("API_DELETE_ACTION"),
            Config("API_FILE_ACTION")
        ];

        // Check permission
        if (in_array($action, array_keys($GLOBALS["API_ACTIONS"]))) { // Custom actions (deprecated)
            $authorised = true;
        } elseif (in_array($action, [Config("API_UPLOAD_ACTION"), Config("API_PERMISSIONS_ACTION")])) { // Upload file / Permissions
            $authorised = true;
        } elseif (in_array($action, $checkTokenActions)) { // Token checked
            $authorised = true;
        } elseif (in_array($action, $apiTableActions) && $table != "") { // Table actions
            $Security->loadTablePermissions($table);
            $authorised = $action == Config("API_LIST_ACTION") && $Security->canList() ||
                $action == Config("API_VIEW_ACTION") && $Security->canView() ||
                $action == Config("API_ADD_ACTION") && $Security->canAdd() ||
                $action == Config("API_EDIT_ACTION") && $Security->canEdit() ||
                $action == Config("API_DELETE_ACTION") && $Security->canDelete() ||
                $action == Config("API_FILE_ACTION") && ($Security->canList() || $Security->canView());
        } elseif ($action == Config("API_REGISTER_ACTION")) { // Register
            $authorised = true;
        } elseif ($action == Config("API_LOOKUP_ACTION")) { // Lookup
            //$authorised = $Security->canLookup();
            $authorised = true; // Handled by page lookup method
        } else { // Not authorised
            $authorised = false;
        }
        if (!$authorised) {
            return $response->withStatus(401); // Not authorized
        }

        // Handle request
        return $handler->handle($request);
    }
}
