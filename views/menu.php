<?php

namespace PHPMaker2021\ecommerce;

// Menu Language
if ($Language && function_exists(PROJECT_NAMESPACE . "Config") && $Language->LanguageFolder == Config("LANGUAGE_FOLDER")) {
    $MenuRelativePath = "";
    $MenuLanguage = &$Language;
} else { // Compat reports
    $LANGUAGE_FOLDER = "../lang/";
    $MenuRelativePath = "../";
    $MenuLanguage = Container("language");
}

// Navbar menu
$topMenu = new Menu("navbar", true, true);
echo $topMenu->toScript();

// Sidebar menu
$sideMenu = new Menu("menu", true, false);
$sideMenu->addMenuItem(1, "mi_category", $MenuLanguage->MenuPhrase("1", "MenuText"), $MenuRelativePath . "CategoryList", -1, "", IsLoggedIn() || AllowListMenu('{2EC76402-BE72-41B8-AE33-209F48149386}category'), false, false, "", "", false);
$sideMenu->addMenuItem(2, "mi_product", $MenuLanguage->MenuPhrase("2", "MenuText"), $MenuRelativePath . "ProductList", -1, "", IsLoggedIn() || AllowListMenu('{2EC76402-BE72-41B8-AE33-209F48149386}product'), false, false, "", "", false);
$sideMenu->addMenuItem(3, "mi_users", $MenuLanguage->MenuPhrase("3", "MenuText"), $MenuRelativePath . "UsersList", -1, "", IsLoggedIn() || AllowListMenu('{2EC76402-BE72-41B8-AE33-209F48149386}users'), false, false, "", "", false);
echo $sideMenu->toScript();
