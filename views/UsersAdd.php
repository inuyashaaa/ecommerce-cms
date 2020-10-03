<?php

namespace PHPMaker2021\ecommerce;

// Page object
$UsersAdd = &$Page;
?>
<script>
var currentForm, currentPageID;
var fusersadd;
loadjs.ready("head", function () {
    var $ = jQuery;
    // Form object
    currentPageID = ew.PAGE_ID = "add";
    fusersadd = currentForm = new ew.Form("fusersadd", "add");

    // Add fields
    var fields = ew.vars.tables.users.fields;
    fusersadd.addFields([
        ["fullname", [fields.fullname.required ? ew.Validators.required(fields.fullname.caption) : null], fields.fullname.isInvalid],
        ["_email", [fields._email.required ? ew.Validators.required(fields._email.caption) : null], fields._email.isInvalid],
        ["avatar", [fields.avatar.required ? ew.Validators.required(fields.avatar.caption) : null], fields.avatar.isInvalid],
        ["_password", [fields._password.required ? ew.Validators.required(fields._password.caption) : null], fields._password.isInvalid],
        ["gender", [fields.gender.required ? ew.Validators.required(fields.gender.caption) : null], fields.gender.isInvalid],
        ["birthday", [fields.birthday.required ? ew.Validators.required(fields.birthday.caption) : null, ew.Validators.datetime(0)], fields.birthday.isInvalid],
        ["phone", [fields.phone.required ? ew.Validators.required(fields.phone.caption) : null], fields.phone.isInvalid],
        ["created_at", [fields.created_at.required ? ew.Validators.required(fields.created_at.caption) : null, ew.Validators.datetime(0)], fields.created_at.isInvalid],
        ["updated_at", [fields.updated_at.required ? ew.Validators.required(fields.updated_at.caption) : null], fields.updated_at.isInvalid]
    ]);

    // Set invalid fields
    $(function() {
        var f = fusersadd,
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
    fusersadd.validate = function () {
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
    fusersadd.customValidate = function(fobj) { // DO NOT CHANGE THIS LINE!
        // Your custom validation code here, return false if invalid.
        return true;
    }

    // Use JavaScript validation or not
    fusersadd.validateRequired = <?= Config("CLIENT_VALIDATE") ? "true" : "false" ?>;

    // Dynamic selection lists
    fusersadd.lists.gender = <?= $Page->gender->toClientList($Page) ?>;
    loadjs.done("fusersadd");
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
<form name="fusersadd" id="fusersadd" class="<?= $Page->FormClassName ?>" action="<?= CurrentPageUrl() ?>" method="post">
<?php if (Config("CHECK_TOKEN")) { ?>
<input type="hidden" name="<?= $TokenNameKey ?>" value="<?= $TokenName ?>"><!-- CSRF token name -->
<input type="hidden" name="<?= $TokenValueKey ?>" value="<?= $TokenValue ?>"><!-- CSRF token value -->
<?php } ?>
<input type="hidden" name="t" value="users">
<input type="hidden" name="action" id="action" value="insert">
<input type="hidden" name="modal" value="<?= (int)$Page->IsModal ?>">
<div class="ew-add-div"><!-- page* -->
<?php if ($Page->fullname->Visible) { // fullname ?>
    <div id="r_fullname" class="form-group row">
        <label id="elh_users_fullname" for="x_fullname" class="<?= $Page->LeftColumnClass ?>"><?= $Page->fullname->caption() ?><?= $Page->fullname->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->fullname->cellAttributes() ?>>
<span id="el_users_fullname">
<input type="<?= $Page->fullname->getInputTextType() ?>" data-table="users" data-field="x_fullname" name="x_fullname" id="x_fullname" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->fullname->getPlaceHolder()) ?>" value="<?= $Page->fullname->EditValue ?>"<?= $Page->fullname->editAttributes() ?> aria-describedby="x_fullname_help">
<?= $Page->fullname->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->fullname->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->_email->Visible) { // email ?>
    <div id="r__email" class="form-group row">
        <label id="elh_users__email" for="x__email" class="<?= $Page->LeftColumnClass ?>"><?= $Page->_email->caption() ?><?= $Page->_email->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->_email->cellAttributes() ?>>
<span id="el_users__email">
<input type="<?= $Page->_email->getInputTextType() ?>" data-table="users" data-field="x__email" name="x__email" id="x__email" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->_email->getPlaceHolder()) ?>" value="<?= $Page->_email->EditValue ?>"<?= $Page->_email->editAttributes() ?> aria-describedby="x__email_help">
<?= $Page->_email->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->_email->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->avatar->Visible) { // avatar ?>
    <div id="r_avatar" class="form-group row">
        <label id="elh_users_avatar" for="x_avatar" class="<?= $Page->LeftColumnClass ?>"><?= $Page->avatar->caption() ?><?= $Page->avatar->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->avatar->cellAttributes() ?>>
<span id="el_users_avatar">
<input type="<?= $Page->avatar->getInputTextType() ?>" data-table="users" data-field="x_avatar" name="x_avatar" id="x_avatar" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->avatar->getPlaceHolder()) ?>" value="<?= $Page->avatar->EditValue ?>"<?= $Page->avatar->editAttributes() ?> aria-describedby="x_avatar_help">
<?= $Page->avatar->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->avatar->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->_password->Visible) { // password ?>
    <div id="r__password" class="form-group row">
        <label id="elh_users__password" for="x__password" class="<?= $Page->LeftColumnClass ?>"><?= $Page->_password->caption() ?><?= $Page->_password->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->_password->cellAttributes() ?>>
<span id="el_users__password">
<input type="<?= $Page->_password->getInputTextType() ?>" data-table="users" data-field="x__password" name="x__password" id="x__password" size="30" maxlength="255" placeholder="<?= HtmlEncode($Page->_password->getPlaceHolder()) ?>" value="<?= $Page->_password->EditValue ?>"<?= $Page->_password->editAttributes() ?> aria-describedby="x__password_help">
<?= $Page->_password->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->_password->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->gender->Visible) { // gender ?>
    <div id="r_gender" class="form-group row">
        <label id="elh_users_gender" class="<?= $Page->LeftColumnClass ?>"><?= $Page->gender->caption() ?><?= $Page->gender->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->gender->cellAttributes() ?>>
<span id="el_users_gender">
<template id="tp_x_gender">
    <div class="custom-control custom-radio">
        <input type="radio" class="custom-control-input" data-table="users" data-field="x_gender" name="x_gender" id="x_gender"<?= $Page->gender->editAttributes() ?>>
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
    data-table="users"
    data-field="x_gender"
    data-value-separator="<?= $Page->gender->displayValueSeparatorAttribute() ?>"
    <?= $Page->gender->editAttributes() ?>>
<?= $Page->gender->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->gender->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->birthday->Visible) { // birthday ?>
    <div id="r_birthday" class="form-group row">
        <label id="elh_users_birthday" for="x_birthday" class="<?= $Page->LeftColumnClass ?>"><?= $Page->birthday->caption() ?><?= $Page->birthday->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->birthday->cellAttributes() ?>>
<span id="el_users_birthday">
<input type="<?= $Page->birthday->getInputTextType() ?>" data-table="users" data-field="x_birthday" name="x_birthday" id="x_birthday" placeholder="<?= HtmlEncode($Page->birthday->getPlaceHolder()) ?>" value="<?= $Page->birthday->EditValue ?>"<?= $Page->birthday->editAttributes() ?> aria-describedby="x_birthday_help">
<?= $Page->birthday->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->birthday->getErrorMessage() ?></div>
<?php if (!$Page->birthday->ReadOnly && !$Page->birthday->Disabled && !isset($Page->birthday->EditAttrs["readonly"]) && !isset($Page->birthday->EditAttrs["disabled"])) { ?>
<script>
loadjs.ready(["fusersadd", "datetimepicker"], function() {
    ew.createDateTimePicker("fusersadd", "x_birthday", {"ignoreReadonly":true,"useCurrent":false,"format":0});
});
</script>
<?php } ?>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->phone->Visible) { // phone ?>
    <div id="r_phone" class="form-group row">
        <label id="elh_users_phone" for="x_phone" class="<?= $Page->LeftColumnClass ?>"><?= $Page->phone->caption() ?><?= $Page->phone->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->phone->cellAttributes() ?>>
<span id="el_users_phone">
<input type="<?= $Page->phone->getInputTextType() ?>" data-table="users" data-field="x_phone" name="x_phone" id="x_phone" size="30" maxlength="100" placeholder="<?= HtmlEncode($Page->phone->getPlaceHolder()) ?>" value="<?= $Page->phone->EditValue ?>"<?= $Page->phone->editAttributes() ?> aria-describedby="x_phone_help">
<?= $Page->phone->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->phone->getErrorMessage() ?></div>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->created_at->Visible) { // created_at ?>
    <div id="r_created_at" class="form-group row">
        <label id="elh_users_created_at" for="x_created_at" class="<?= $Page->LeftColumnClass ?>"><?= $Page->created_at->caption() ?><?= $Page->created_at->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->created_at->cellAttributes() ?>>
<span id="el_users_created_at">
<input type="<?= $Page->created_at->getInputTextType() ?>" data-table="users" data-field="x_created_at" name="x_created_at" id="x_created_at" placeholder="<?= HtmlEncode($Page->created_at->getPlaceHolder()) ?>" value="<?= $Page->created_at->EditValue ?>"<?= $Page->created_at->editAttributes() ?> aria-describedby="x_created_at_help">
<?= $Page->created_at->getCustomMessage() ?>
<div class="invalid-feedback"><?= $Page->created_at->getErrorMessage() ?></div>
<?php if (!$Page->created_at->ReadOnly && !$Page->created_at->Disabled && !isset($Page->created_at->EditAttrs["readonly"]) && !isset($Page->created_at->EditAttrs["disabled"])) { ?>
<script>
loadjs.ready(["fusersadd", "datetimepicker"], function() {
    ew.createDateTimePicker("fusersadd", "x_created_at", {"ignoreReadonly":true,"useCurrent":false,"format":0});
});
</script>
<?php } ?>
</span>
</div></div>
    </div>
<?php } ?>
<?php if ($Page->updated_at->Visible) { // updated_at ?>
    <div id="r_updated_at" class="form-group row">
        <label id="elh_users_updated_at" for="x_updated_at" class="<?= $Page->LeftColumnClass ?>"><?= $Page->updated_at->caption() ?><?= $Page->updated_at->Required ? $Language->phrase("FieldRequiredIndicator") : "" ?></label>
        <div class="<?= $Page->RightColumnClass ?>"><div <?= $Page->updated_at->cellAttributes() ?>>
<span id="el_users_updated_at">
    <select
        id="x_updated_at"
        name="x_updated_at"
        class="form-control ew-select<?= $Page->updated_at->isInvalidClass() ?>"
        data-select2-id="users_x_updated_at"
        data-table="users"
        data-field="x_updated_at"
        data-value-separator="<?= $Page->updated_at->displayValueSeparatorAttribute() ?>"
        data-placeholder="<?= HtmlEncode($Page->updated_at->getPlaceHolder()) ?>"
        <?= $Page->updated_at->editAttributes() ?>>
        <?= $Page->updated_at->selectOptionListHtml("x_updated_at") ?>
    </select>
    <?= $Page->updated_at->getCustomMessage() ?>
    <div class="invalid-feedback"><?= $Page->updated_at->getErrorMessage() ?></div>
<script>
loadjs.ready("head", function() {
    var el = document.querySelector("select[data-select2-id='users_x_updated_at']"),
        options = { name: "x_updated_at", selectId: "users_x_updated_at", language: ew.LANGUAGE_ID, dir: ew.IS_RTL ? "rtl" : "ltr" };
    options.dropdownParent = $(el).closest("#ew-modal-dialog, #ew-add-opt-dialog")[0];
    Object.assign(options, ew.vars.tables.users.fields.updated_at.selectOptions);
    ew.createSelect(options);
});
</script>
</span>
</div></div>
    </div>
<?php } ?>
</div><!-- /page* -->
<?php if (!$Page->IsModal) { ?>
<div class="form-group row"><!-- buttons .form-group -->
    <div class="<?= $Page->OffsetColumnClass ?>"><!-- buttons offset -->
<button class="btn btn-primary ew-btn" name="btn-action" id="btn-action" type="submit"><?= $Language->phrase("AddBtn") ?></button>
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
    ew.addEventHandlers("users");
});
</script>
<script>
loadjs.ready("load", function () {
    // Write your table-specific startup script here, no need to add script tags.
});
</script>
