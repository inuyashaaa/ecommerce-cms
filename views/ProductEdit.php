<?php

namespace PHPMaker2021\ecommerce;

// Page object
$ProductEdit = &$Page;
?>
<script>
var currentForm, currentPageID;
var fproductedit;
loadjs.ready("head", function () {
    var $ = jQuery;
    // Form object
    currentPageID = ew.PAGE_ID = "edit";
    fproductedit = currentForm = new ew.Form("fproductedit", "edit");

    // Add fields
    var fields = ew.vars.tables.product.fields;
    fproductedit.addFields([
        ["id", [fields.id.required ? ew.Validators.required(fields.id.caption) : null], fields.id.isInvalid],
        ["category_id", [fields.category_id.required ? ew.Validators.required(fields.category_id.caption) : null], fields.category_id.isInvalid],
        ["gender", [fields.gender.required ? ew.Validators.required(fields.gender.caption) : null], fields.gender.isInvalid],
        ["name", [fields.name.required ? ew.Validators.required(fields.name.caption) : null], fields.name.isInvalid],
        ["product_image_file", [fields.product_image_file.required ? ew.Validators.fileRequired(fields.product_image_file.caption) : null], fields.product_image_file.isInvalid],
        ["price", [fields.price.required ? ew.Validators.required(fields.price.caption) : null], fields.price.isInvalid],
        ["sale", [fields.sale.required ? ew.Validators.required(fields.sale.caption) : null], fields.sale.isInvalid],
        ["color", [fields.color.required ? ew.Validators.required(fields.color.caption) : null], fields.color.isInvalid],
        ["style", [fields.style.required ? ew.Validators.required(fields.style.caption) : null], fields.style.isInvalid],
        ["shown", [fields.shown.required ? ew.Validators.required(fields.shown.caption) : null], fields.shown.isInvalid],
        ["star", [fields.star.required ? ew.Validators.required(fields.star.caption) : null, ew.Validators.integer], fields.star.isInvalid]
    ]);

    // Set invalid fields
    $(function() {
        var f = fproductedit,
            fobj = f.getForm(),
            $fobj = $(fobj),
            $k = $fobj.find("#" + f.formKeyCountName), // Get key_count
            rowcnt = ($k[0]) ? parseInt($k.val(), 10) : 1,
            startcnt = (rowcnt == 0) ? 0 : 1; // Check rowcnt == 0 => Inline-Add
        for (var i = startcnt; i <= rowcnt; i++) {
            var rowIndex = ($k[0]) ? String(i) : "";
            f.setInvalid(rowIndex);
        }
    });

    // Validate form
    fproductedit.validate = function () {
        if (!this.validateRequired)
            return true; // Ignore validation
        var fobj = this.getForm(),
            $fobj = $(fobj);
        if ($fobj.find("#confirm").val() == "confirm")
            return true;
        var addcnt = 0,
            $k = $fobj.find("#" + this.formKeyCountName), // Get key_count
            rowcnt = ($k[0]) ? parseInt($k.val(), 10) : 1,
            startcnt = (rowcnt == 0) ? 0 : 1, // Check rowcnt == 0 => Inline-Add
            gridinsert = ["insert", "gridinsert"].includes($fobj.find("#action").val()) && $k[0];
        for (var i = startcnt; i <= rowcnt; i++) {
            var rowIndex = ($k[0]) ? String(i) : "";
            $fobj.data("rowindex", rowIndex);

            // Validate fields
            if (!this.validateFields(rowIndex))
                return false;

            // Call Form_CustomValidate event
            if (!this.customValidate(fobj)) {
                this.focus();
                return false;
            }
        }

        // Process detail forms
        var dfs = $fobj.find("input[name='detailpage']").get();
        for (var i = 0; i < dfs.length; i++) {
            var df = dfs[i],
                val = df.value,
                frm = ew.forms.get(val);
            if (val && frm && !frm.validate())
                return false;
        }
        return true;
    }

    // Form_CustomValidate
    fproductedit.customValidate = function(fobj) { // DO NOT CHANGE THIS LINE!
        // Your custom validation code here, return false if invalid.
        return true;
    }

    // Use JavaScript validation or not
    fproductedit.validateRequired = <?= Config("CLIENT_VALIDATE") ? "true" : "false" ?>;

    // Dynamic selection lists
    fproductedit.lists.category_id = <?= $Page->category_id->toClientList($Page) ?>;
    fproductedit.lists.gender = <?= $Page->gender->toClientList($Page) ?>;
    loadjs.done("fproductedit");
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
<form name="fproductedit" id="fproductedit" class="<?= $Page->FormClassName ?>" action="<?= CurrentPageUrl() ?>" method="post">
<?php if (Config("CHECK_TOKEN")) { ?>
<input type="hidden" name="<?= $TokenNameKey ?>" value="<?= $TokenName ?>"><!-- CSRF token name -->
<input type="hidden" name="<?= $TokenValueKey ?>" value="<?= $TokenValue ?>"><!-- CSRF token value -->
<?php } ?>
<input type="hidden" name="t" value="product">
<input type="hidden" name="action" id="action" value="update">
<input type="hidden" name="modal" value="<?= (int)$Page->IsModal ?>">
<div class="ew-edit-div"><!-- page* -->
<?php if ($Page->category_id->Visible) { // category_id ?>
    <div id="r_category_id" class="form-group row">
        <label id="elh_product_category_id" for="x_category_id" class="<?= $Page->LeftColumnClass ?>"><?= $Page->category_id->caption() ?><?= $Page->category_id->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->category_id->cellAttributes() ?>>
<span id="el_product_category_id">
    <select
        id="x_category_id"
        name="x_category_id"
        class="form-control ew-select<?= $Page->category_id->isInvalidClass() ?>"
        data-select2-id="product_x_category_id"
        data-table="product"
        data-field="x_category_id"
        data-value-separator="<?= $Page->category_id->displayValueSeparatorAttribute() ?>"
        data-placeholder="<?= HtmlEncode($Page->category_id->getPlaceHolder()) ?>"
        <?= $Page->category_id->editAttributes() ?>>
        <?= $Page->category_id->selectOptionListHtml("x_category_id") ?>
    </select>
    <?= $Page->category_id->getCustomMessage() ?>
    <div class="invalid-feedback"><?= $Page->category_id->getErrorMessage() ?></div>
<?= $Page->category_id->Lookup->getParamTag($Page, "p_x_category_id") ?>
<script>
loadjs.ready("head", function() {
    var el = document.querySelector("select[data-select2-id='product_x_category_id']"),
        options = { name: "x_category_id", selectId: "product_x_category_id", language: ew.LANGUAGE_ID, dir: ew.IS_RTL ? "rtl" : "ltr" };
    options.dropdownParent = $(el).closest("#ew-modal-dialog, #ew-add-opt-dialog")[0];
    Object.assign(options, ew.vars.tables.product.fields.category_id.selectOptions);
    ew.createSelect(options);
});
</script>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->gender->Visible) { // gender ?>
    <div id="r_gender" class="form-group row">
        <label id="elh_product_gender" class="<?= $Page->LeftColumnClass ?>"><?= $Page->gender->caption() ?><?= $Page->gender->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->gender->cellAttributes() ?>>
<span id="el_product_gender">
<template id="tp_x_gender">
    <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" data-table="product" data-field="x_gender" name="x_gender" id="x_gender"<?= $Page->gender->editAttributes() ?>>
        <label class="custom-control-label"></label>
    </div>
</template>
<div id="dsl_x_gender" class="ew-item-list"></div>
<input type="hidden"
    is="selection-list"
    id="x_gender"
    name="x_gender"
    value="<?= HtmlEncode($Page->gender->CurrentValue) ?>"
    data-type="select-one"
    data-template="tp_x_gender"
    data-target="dsl_x_gender"
    data-repeatcolumn="5"
    class="form-control<?= $Page->gender->isInvalidClass() ?>"
    data-table="product"
    data-field="x_gender"
    data-value-separator="<?= $Page->gender->displayValueSeparatorAttribute() ?>"
    <?= $Page->gender->editAttributes() ?>>
<?= $Page->gender->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->gender->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->name->Visible) { // name ?>
    <div id="r_name" class="form-group row">
        <label id="elh_product_name" for="x_name" class="<?= $Page->LeftColumnClass ?>"><?= $Page->name->caption() ?><?= $Page->name->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->name->cellAttributes() ?>>
<span id="el_product_name">
<input type="<?= $Page->name->getInputTextType() ?>" data-table="product" data-field="x_name" name="x_name" id="x_name" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->name->getPlaceHolder()) ?>" value="<?= $Page->name->EditValue ?>"<?= $Page->name->editAttributes() ?> aria-describedby="x_name_help">
<?= $Page->name->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->name->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->product_image_file->Visible) { // product_image_file ?>
    <div id="r_product_image_file" class="form-group row">
        <label id="elh_product_product_image_file" class="<?= $Page->LeftColumnClass ?>"><?= $Page->product_image_file->caption() ?><?= $Page->product_image_file->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->product_image_file->cellAttributes() ?>>
<span id="el_product_product_image_file">
<div id="fd_x_product_image_file">
<div class="input-group">
    <div class="custom-file">
        <input type="file" class="custom-file-input" title="<?= $Page->product_image_file->title() ?>" data-table="product" data-field="x_product_image_file" name="x_product_image_file" id="x_product_image_file" lang="<?= CurrentLanguageID() ?>"<?= $Page->product_image_file->editAttributes() ?><?= ($Page->product_image_file->ReadOnly || $Page->product_image_file->Disabled) ? " disabled" : "" ?> aria-describedby="x_product_image_file_help">
        <label class="custom-file-label ew-file-label" for="x_product_image_file"><?= $Language->phrase("ChooseFile") ?></label>
    </div>
</div>
<?= $Page->product_image_file->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->product_image_file->getErrorMessage() ?></div>
<input type="hidden" name="fn_x_product_image_file" id= "fn_x_product_image_file" value="<?= $Page->product_image_file->Upload->FileName ?>">
<input type="hidden" name="fa_x_product_image_file" id= "fa_x_product_image_file" value="<?= (Post("fa_x_product_image_file") == "0") ? "0" : "1" ?>">
<input type="hidden" name="fs_x_product_image_file" id= "fs_x_product_image_file" value="65535">
<input type="hidden" name="fx_x_product_image_file" id= "fx_x_product_image_file" value="<?= $Page->product_image_file->UploadAllowedFileExt ?>">
<input type="hidden" name="fm_x_product_image_file" id= "fm_x_product_image_file" value="<?= $Page->product_image_file->UploadMaxFileSize ?>">
</div>
<table id="ft_x_product_image_file" class="table table-sm float-left ew-upload-table"><tbody class="files"></tbody></table>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->price->Visible) { // price ?>
    <div id="r_price" class="form-group row">
        <label id="elh_product_price" for="x_price" class="<?= $Page->LeftColumnClass ?>"><?= $Page->price->caption() ?><?= $Page->price->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->price->cellAttributes() ?>>
<span id="el_product_price">
<input type="<?= $Page->price->getInputTextType() ?>" data-table="product" data-field="x_price" name="x_price" id="x_price" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->price->getPlaceHolder()) ?>" value="<?= $Page->price->EditValue ?>"<?= $Page->price->editAttributes() ?> aria-describedby="x_price_help">
<?= $Page->price->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->price->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->sale->Visible) { // sale ?>
    <div id="r_sale" class="form-group row">
        <label id="elh_product_sale" for="x_sale" class="<?= $Page->LeftColumnClass ?>"><?= $Page->sale->caption() ?><?= $Page->sale->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->sale->cellAttributes() ?>>
<span id="el_product_sale">
<input type="<?= $Page->sale->getInputTextType() ?>" data-table="product" data-field="x_sale" name="x_sale" id="x_sale" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->sale->getPlaceHolder()) ?>" value="<?= $Page->sale->EditValue ?>"<?= $Page->sale->editAttributes() ?> aria-describedby="x_sale_help">
<?= $Page->sale->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->sale->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->color->Visible) { // color ?>
    <div id="r_color" class="form-group row">
        <label id="elh_product_color" for="x_color" class="<?= $Page->LeftColumnClass ?>"><?= $Page->color->caption() ?><?= $Page->color->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->color->cellAttributes() ?>>
<span id="el_product_color">
<input type="<?= $Page->color->getInputTextType() ?>" data-table="product" data-field="x_color" name="x_color" id="x_color" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->color->getPlaceHolder()) ?>" value="<?= $Page->color->EditValue ?>"<?= $Page->color->editAttributes() ?> aria-describedby="x_color_help">
<?= $Page->color->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->color->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->style->Visible) { // style ?>
    <div id="r_style" class="form-group row">
        <label id="elh_product_style" for="x_style" class="<?= $Page->LeftColumnClass ?>"><?= $Page->style->caption() ?><?= $Page->style->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->style->cellAttributes() ?>>
<span id="el_product_style">
<textarea data-table="product" data-field="x_style" name="x_style" id="x_style" cols="35" rows="4" placeholder="<?= HtmlEncode($Page->style->getPlaceHolder()) ?>"<?= $Page->style->editAttributes() ?> aria-describedby="x_style_help"><?= $Page->style->EditValue ?></textarea>
<?= $Page->style->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->style->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->shown->Visible) { // shown ?>
    <div id="r_shown" class="form-group row">
        <label id="elh_product_shown" for="x_shown" class="<?= $Page->LeftColumnClass ?>"><?= $Page->shown->caption() ?><?= $Page->shown->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->shown->cellAttributes() ?>>
<span id="el_product_shown">
<textarea data-table="product" data-field="x_shown" name="x_shown" id="x_shown" cols="35" rows="4" placeholder="<?= HtmlEncode($Page->shown->getPlaceHolder()) ?>"<?= $Page->shown->editAttributes() ?> aria-describedby="x_shown_help"><?= $Page->shown->EditValue ?></textarea>
<?= $Page->shown->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->shown->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->star->Visible) { // star ?>
    <div id="r_star" class="form-group row">
        <label id="elh_product_star" for="x_star" class="<?= $Page->LeftColumnClass ?>"><?= $Page->star->caption() ?><?= $Page->star->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->star->cellAttributes() ?>>
<span id="el_product_star">
<input type="<?= $Page->star->getInputTextType() ?>" data-table="product" data-field="x_star" name="x_star" id="x_star" size="30" placeholder="<?= HtmlEncode($Page->star->getPlaceHolder()) ?>" value="<?= $Page->star->EditValue ?>"<?= $Page->star->editAttributes() ?> aria-describedby="x_star_help">
<?= $Page->star->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->star->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
</div><!-- /page* -->
<span id="el_product_id">
<input type="hidden" data-table="product" data-field="x_id" name="x_id" id="x_id" value="<?= HtmlEncode($Page->id->CurrentValue) ?>">
</span>
<?php if (!$Page->IsModal) { ?>
<div class="form-group row"><!-- buttons .form-group -->
    <div class="<?= $Page->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ew-btn" name="btn-action" id="btn-action" type="submit"><?= $Language->phrase("SaveBtn") ?></button>
<button class="btn btn-default ew-btn" name="btn-cancel" id="btn-cancel" type="button" data-href="<?= GetUrl($Page->getReturnUrl()) ?>"><?= $Language->phrase("CancelBtn") ?></button>
    </div><!-- /buttons offset -->
</div><!-- /buttons .form-group -->
<?php } ?>
</form>
<?php
$Page->showPageFooter();
echo GetDebugMessage();
?>
<script>
// Field event handlers
loadjs.ready("head", function() {
    ew.addEventHandlers("product");
});
</script>
<script>
loadjs.ready("load", function () {
    // Write your table-specific startup script here, no need to add script tags.
});
</script>
