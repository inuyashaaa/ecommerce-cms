<?php

namespace PHPMaker2021\ecommerce;

/**
 * Pager item class
 */
class PagerItem
{
    public $Start;
    public $Text;
    public $Enabled;

    // Constructor
    public function __construct($start = 1, $text = "", $enabled = false)
    {
        $this->Start = $start;
        $this->Text = $text;
        $this->Enabled = $enabled;
    }
}
