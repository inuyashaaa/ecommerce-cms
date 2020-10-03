<?php

namespace PHPMaker2021\ecommerce;

// Page object
$ProductDelete = &$Page;
?>
<script>
var currentForm, currentPageID;
var fproductdelete;
loadjs.ready("head", function () {
    var $ = jQuery;
    // Form object
    currentPageID = ew.PAGE_ID = "delete";
    fproductdelete = currentForm = new ew.Form("fproductdelete", "delete");
    loadjs.done("fproductdelete");
});
</script>
<script>
loadjs.ready("head", function () {
    // Write your table-specific client script here, no need to add script tags.
});
</script>
<?php $Page->showPageHeader(); ?>
<?php
$Page->showMessage();
?>
<form name="fproductdelete" id="fproductdelete" class="form-inline ew-form ew-delete-form" action="<?= CurrentPageUrl() ?>" method="post">
<?php if (Config("CHECK_TOKEN")) { ?>
<input type="hidden" name="<?= $TokenNameKey ?>" value="<?= $TokenName ?>"><!-- CSRF token name -->
<input type="hidden" name="<?= $TokenValueKey ?>" value="<?= $TokenValue ?>"><!-- CSRF token value -->
<?php } ?>
<input type="hidden" name="t" value="product">
<input type="hidden" name="action" id="action" value="delete">
<?php foreach ($Page->RecKeys as $key) { ?>
<?php $keyvalue = is_array($key) ? implode(Config("COMPOSITE_KEY_SEPARATOR"), $key) : $key; ?>
<input type="hidden" name="key_m[]" value="<?= HtmlEncode($keyvalue) ?>">
<?php } ?>
<div class="card ew-card ew-grid">
<div class="<?= ResponsiveTableClass() ?>card-body ew-grid-middle-panel">
<table class="table ew-table">
    <thead>
    <tr class="ew-table-header">
<?php if ($Page->id->Visible) { // id ?>
        <th class="<?= $Page->id->headerCellClass() ?>"><span id="elh_product_id" class="product_id"><?= $Page->id->caption() ?></span></th>
<?php } ?>
<?php if ($Page->category_id->Visible) { // category_id ?>
        <th class="<?= $Page->category_id->headerCellClass() ?>"><span id="elh_product_category_id" class="product_category_id"><?= $Page->category_id->caption() ?></span></th>
<?php } ?>
<?php if ($Page->gender->Visible) { // gender ?>
        <th class="<?= $Page->gender->headerCellClass() ?>"><span id="elh_product_gender" class="product_gender"><?= $Page->gender->caption() ?></span></th>
<?php } ?>
<?php if ($Page->name->Visible) { // name ?>
        <th class="<?= $Page->name->headerCellClass() ?>"><span id="elh_product_name" class="product_name"><?= $Page->name->caption() ?></span></th>
<?php } ?>
<?php if ($Page->product_image_file->Visible) { // product_image_file ?>
        <th class="<?= $Page->product_image_file->headerCellClass() ?>"><span id="elh_product_product_image_file" class="product_product_image_file"><?= $Page->product_image_file->caption() ?></span></th>
<?php } ?>
<?php if ($Page->price->Visible) { // price ?>
        <th class="<?= $Page->price->headerCellClass() ?>"><span id="elh_product_price" class="product_price"><?= $Page->price->caption() ?></span></th>
<?php } ?>
<?php if ($Page->sale->Visible) { // sale ?>
        <th class="<?= $Page->sale->headerCellClass() ?>"><span id="elh_product_sale" class="product_sale"><?= $Page->sale->caption() ?></span></th>
<?php } ?>
<?php if ($Page->color->Visible) { // color ?>
        <th class="<?= $Page->color->headerCellClass() ?>"><span id="elh_product_color" class="product_color"><?= $Page->color->caption() ?></span></th>
<?php } ?>
<?php if ($Page->star->Visible) { // star ?>
        <th class="<?= $Page->star->headerCellClass() ?>"><span id="elh_product_star" class="product_star"><?= $Page->star->caption() ?></span></th>
<?php } ?>
<?php if ($Page->created_at->Visible) { // created_at ?>
        <th class="<?= $Page->created_at->headerCellClass() ?>"><span id="elh_product_created_at" class="product_created_at"><?= $Page->created_at->caption() ?></span></th>
<?php } ?>
<?php if ($Page->updated_at->Visible) { // updated_at ?>
        <th class="<?= $Page->updated_at->headerCellClass() ?>"><span id="elh_product_updated_at" class="product_updated_at"><?= $Page->updated_at->caption() ?></span></th>
<?php } ?>
    </tr>
    </thead>
    <tbody>
<?php
$Page->RecordCount = 0;
$i = 0;
while (!$Page->Recordset->EOF) {
    $Page->RecordCount++;
    $Page->RowCount++;

    // Set row properties
    $Page->resetAttributes();
    $Page->RowType = ROWTYPE_VIEW; // View

    // Get the field contents
    $Page->loadRowValues($Page->Recordset);

    // Render row
    $Page->renderRow();
?>
    <tr <?= $Page->rowAttributes() ?>>
<?php if ($Page->id->Visible) { // id ?>
        <td <?= $Page->id->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_id" class="product_id">
<span<?= $Page->id->viewAttributes() ?>>
<?= $Page->id->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->category_id->Visible) { // category_id ?>
        <td <?= $Page->category_id->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_category_id" class="product_category_id">
<span<?= $Page->category_id->viewAttributes() ?>>
<?= $Page->category_id->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->gender->Visible) { // gender ?>
        <td <?= $Page->gender->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_gender" class="product_gender">
<span<?= $Page->gender->viewAttributes() ?>>
<?= $Page->gender->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->name->Visible) { // name ?>
        <td <?= $Page->name->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_name" class="product_name">
<span<?= $Page->name->viewAttributes() ?>>
<?= $Page->name->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->product_image_file->Visible) { // product_image_file ?>
        <td <?= $Page->product_image_file->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_product_image_file" class="product_product_image_file">
<span>
<?= GetFileViewTag($Page->product_image_file, $Page->product_image_file->getViewValue(), false) ?>
</span>
</span>
</td>
<?php } ?>
<?php if ($Page->price->Visible) { // price ?>
        <td <?= $Page->price->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_price" class="product_price">
<span<?= $Page->price->viewAttributes() ?>>
<?= $Page->price->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->sale->Visible) { // sale ?>
        <td <?= $Page->sale->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_sale" class="product_sale">
<span<?= $Page->sale->viewAttributes() ?>>
<?= $Page->sale->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->color->Visible) { // color ?>
        <td <?= $Page->color->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_color" class="product_color">
<span<?= $Page->color->viewAttributes() ?>>
<?= $Page->color->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->star->Visible) { // star ?>
        <td <?= $Page->star->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_star" class="product_star">
<span<?= $Page->star->viewAttributes() ?>>
<?= $Page->star->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->created_at->Visible) { // created_at ?>
        <td <?= $Page->created_at->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_created_at" class="product_created_at">
<span<?= $Page->created_at->viewAttributes() ?>>
<?= $Page->created_at->getViewValue() ?></span>
</span>
</td>
<?php } ?>
<?php if ($Page->updated_at->Visible) { // updated_at ?>
        <td <?= $Page->updated_at->cellAttributes() ?>>
<span id="el<?= $Page->RowCount ?>_product_updated_at" class="product_updated_at">
<span<?= $Page->updated_at->viewAttributes() ?>>
<?= $Page->updated_at->getViewValue() ?></span>
</span>
</td>
<?php } ?>
    </tr>
<?php
    $Page->Recordset->moveNext();
}
$Page->Recordset->close();
?>
</tbody>
</table>
</div>
</div>
<div>
<button class="btn btn-primary ew-btn" name="btn-action" id="btn-action" type="submit"><?= $Language->phrase("DeleteBtn") ?></button>
<button class="btn btn-default ew-btn" name="btn-cancel" id="btn-cancel" type="button" data-href="<?= GetUrl($Page->getReturnUrl()) ?>"><?= $Language->phrase("CancelBtn") ?></button>
</div>
</form>
<?php
$Page->showPageFooter();
echo GetDebugMessage();
?>
<script>
loadjs.ready("load", function () {
    // Write your table-specific startup script here, no need to add script tags.
});
</script>
