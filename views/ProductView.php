<?php

namespace PHPMaker2021\ecommerce;

// Page object
$ProductView = &$Page;
?>
<?php if (!$Page->isExport()) { ?>
<script>
var currentForm, currentPageID;
var fproductview;
loadjs.ready("head", function () {
    var $ = jQuery;
    // Form object
    currentPageID = ew.PAGE_ID = "view";
    fproductview = currentForm = new ew.Form("fproductview", "view");
    loadjs.done("fproductview");
});
</script>
<script>
loadjs.ready("head", function () {
    // Write your table-specific client script here, no need to add script tags.
});
</script>
<?php } ?>
<?php if (!$Page->isExport()) { ?>
<div class="btn-toolbar ew-toolbar">
<?php $Page->ExportOptions->render("body") ?>
<?php $Page->OtherOptions->render("body") ?>
<div class="clearfix"></div>
</div>
<?php } ?>
<?php $Page->showPageHeader(); ?>
<?php
$Page->showMessage();
?>
<form name="fproductview" id="fproductview" class="form-inline ew-form ew-view-form" action="<?= CurrentPageUrl() ?>" method="post">
<?php if (Config("CHECK_TOKEN")) { ?>
<input type="hidden" name="<?= $TokenNameKey ?>" value="<?= $TokenName ?>"><!-- CSRF token name -->
<input type="hidden" name="<?= $TokenValueKey ?>" value="<?= $TokenValue ?>"><!-- CSRF token value -->
<?php } ?>
<input type="hidden" name="t" value="product">
<input type="hidden" name="modal" value="<?= (int)$Page->IsModal ?>">
<table class="table table-striped table-sm ew-view-table">
<?php if ($Page->id->Visible) { // id ?>
    <tr id="r_id">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_id"><?= $Page->id->caption() ?></span></td>
        <td data-name="id" <?= $Page->id->cellAttributes() ?>>
<span id="el_product_id">
<span<?= $Page->id->viewAttributes() ?>>
<?= $Page->id->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->category_id->Visible) { // category_id ?>
    <tr id="r_category_id">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_category_id"><?= $Page->category_id->caption() ?></span></td>
        <td data-name="category_id" <?= $Page->category_id->cellAttributes() ?>>
<span id="el_product_category_id">
<span<?= $Page->category_id->viewAttributes() ?>>
<?= $Page->category_id->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->gender->Visible) { // gender ?>
    <tr id="r_gender">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_gender"><?= $Page->gender->caption() ?></span></td>
        <td data-name="gender" <?= $Page->gender->cellAttributes() ?>>
<span id="el_product_gender">
<span<?= $Page->gender->viewAttributes() ?>>
<?= $Page->gender->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->name->Visible) { // name ?>
    <tr id="r_name">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_name"><?= $Page->name->caption() ?></span></td>
        <td data-name="name" <?= $Page->name->cellAttributes() ?>>
<span id="el_product_name">
<span<?= $Page->name->viewAttributes() ?>>
<?= $Page->name->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->product_image_file->Visible) { // product_image_file ?>
    <tr id="r_product_image_file">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_product_image_file"><?= $Page->product_image_file->caption() ?></span></td>
        <td data-name="product_image_file" <?= $Page->product_image_file->cellAttributes() ?>>
<span id="el_product_product_image_file">
<span>
<?= GetFileViewTag($Page->product_image_file, $Page->product_image_file->getViewValue(), false) ?>
</span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->price->Visible) { // price ?>
    <tr id="r_price">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_price"><?= $Page->price->caption() ?></span></td>
        <td data-name="price" <?= $Page->price->cellAttributes() ?>>
<span id="el_product_price">
<span<?= $Page->price->viewAttributes() ?>>
<?= $Page->price->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->sale->Visible) { // sale ?>
    <tr id="r_sale">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_sale"><?= $Page->sale->caption() ?></span></td>
        <td data-name="sale" <?= $Page->sale->cellAttributes() ?>>
<span id="el_product_sale">
<span<?= $Page->sale->viewAttributes() ?>>
<?= $Page->sale->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->color->Visible) { // color ?>
    <tr id="r_color">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_color"><?= $Page->color->caption() ?></span></td>
        <td data-name="color" <?= $Page->color->cellAttributes() ?>>
<span id="el_product_color">
<span<?= $Page->color->viewAttributes() ?>>
<?= $Page->color->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->style->Visible) { // style ?>
    <tr id="r_style">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_style"><?= $Page->style->caption() ?></span></td>
        <td data-name="style" <?= $Page->style->cellAttributes() ?>>
<span id="el_product_style">
<span<?= $Page->style->viewAttributes() ?>>
<?= $Page->style->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->shown->Visible) { // shown ?>
    <tr id="r_shown">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_shown"><?= $Page->shown->caption() ?></span></td>
        <td data-name="shown" <?= $Page->shown->cellAttributes() ?>>
<span id="el_product_shown">
<span<?= $Page->shown->viewAttributes() ?>>
<?= $Page->shown->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->star->Visible) { // star ?>
    <tr id="r_star">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_star"><?= $Page->star->caption() ?></span></td>
        <td data-name="star" <?= $Page->star->cellAttributes() ?>>
<span id="el_product_star">
<span<?= $Page->star->viewAttributes() ?>>
<?= $Page->star->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->created_at->Visible) { // created_at ?>
    <tr id="r_created_at">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_created_at"><?= $Page->created_at->caption() ?></span></td>
        <td data-name="created_at" <?= $Page->created_at->cellAttributes() ?>>
<span id="el_product_created_at">
<span<?= $Page->created_at->viewAttributes() ?>>
<?= $Page->created_at->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
<?php if ($Page->updated_at->Visible) { // updated_at ?>
    <tr id="r_updated_at">
        <td class="<?= $Page->TableLeftColumnClass ?>"><span id="elh_product_updated_at"><?= $Page->updated_at->caption() ?></span></td>
        <td data-name="updated_at" <?= $Page->updated_at->cellAttributes() ?>>
<span id="el_product_updated_at">
<span<?= $Page->updated_at->viewAttributes() ?>>
<?= $Page->updated_at->getViewValue() ?></span>
</span>
</td>
    </tr>
<?php } ?>
</table>
</form>
<?php
$Page->showPageFooter();
echo GetDebugMessage();
?>
<?php if (!$Page->isExport()) { ?>
<script>
loadjs.ready("load", function () {
    // Write your table-specific startup script here, no need to add script tags.
});
</script>
<?php } ?>
