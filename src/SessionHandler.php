<?php

namespace PHPMaker2021\ecommerce;

/**
 * Session handler
 */
class SessionHandler
{
    // Get session value
    public function getSession()
    {
        if (ob_get_length()) {
            ob_end_clean();
        }
        $csrf = Container("csrf");
        $token = $csrf->generateToken();
        WriteJson([
            $csrf->getTokenNameKey() => $csrf->getTokenName(),
            $csrf->getTokenValueKey() => $csrf->getTokenValue()
        ]);
        return true;
    }
}
