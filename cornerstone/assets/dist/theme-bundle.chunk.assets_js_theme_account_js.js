"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_account_js"],{

/***/ "./assets/js/theme/account.js":
/*!************************************!*\
  !*** ./assets/js/theme/account.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Account)
/* harmony export */ });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/reduce */ "./node_modules/lodash/reduce.js");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_payment_method__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/payment-method */ "./assets/js/theme/common/payment-method.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }










var Account = /*#__PURE__*/function (_PageManager) {
  function Account(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__.createTranslationDictionary)(context);
    _this.$state = $('[data-field-type="State"]');
    _this.$body = $('body');
    return _this;
  }
  _inheritsLoose(Account, _PageManager);
  var _proto = Account.prototype;
  _proto.onReady = function onReady() {
    var $editAccountForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-edit-account-form]');
    var $addressForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-address-form]');
    var $inboxForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-inbox-form]');
    var $accountReturnForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('[data-account-return-form]');
    var $paymentMethodForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-payment-method-form]');
    var $reorderForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('[data-account-reorder-form]');
    var $invoiceButton = $('[data-print-invoice]');
    var $bigCommerce = window.BigCommerce;
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context);

    // Injected via template
    this.passwordRequirements = this.context.passwordRequirements;

    // Instantiates wish list JS
    _wishlist__WEBPACK_IMPORTED_MODULE_4__["default"].load(this.context);
    if ($editAccountForm.length) {
      this.registerEditAccountValidation($editAccountForm);
      if (this.$state.is('input')) {
        (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.insertStateHiddenField)(this.$state);
      }
    }
    if ($invoiceButton.length) {
      $invoiceButton.on('click', function () {
        var left = window.screen.availWidth / 2 - 450;
        var top = window.screen.availHeight / 2 - 320;
        var url = $invoiceButton.data('printInvoice');
        window.open(url, 'orderInvoice', "width=900,height=650,left=" + left + ",top=" + top + ",scrollbars=1");
      });
    }
    if ($addressForm.length) {
      this.initAddressFormValidation($addressForm);
      if (this.$state.is('input')) {
        (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.insertStateHiddenField)(this.$state);
      }
    }
    if ($inboxForm.length) {
      this.registerInboxValidation($inboxForm);
    }
    if ($accountReturnForm.length) {
      this.initAccountReturnFormValidation($accountReturnForm);
    }
    if ($paymentMethodForm.length) {
      this.initPaymentMethodFormValidation($paymentMethodForm);
    }
    if ($reorderForm.length) {
      this.initReorderForm($reorderForm);
    }
    if ($bigCommerce && $bigCommerce.renderAccountPayments) {
      var _this$context = this.context,
        countries = _this$context.countries,
        paymentsUrl = _this$context.paymentsUrl,
        storeHash = _this$context.storeHash,
        storeLocale = _this$context.storeLocale,
        vaultToken = _this$context.vaultToken,
        shopperId = _this$context.shopperId,
        customerEmail = _this$context.customerEmail,
        providerId = _this$context.providerId,
        currencyCode = _this$context.currencyCode,
        paymentMethodsUrl = _this$context.paymentMethodsUrl,
        paymentProviderInitializationData = _this$context.paymentProviderInitializationData,
        themeSettings = _this$context.themeSettings;
      $bigCommerce.renderAccountPayments({
        styles: {
          inputBase: {
            color: themeSettings['input-font-color'],
            borderColor: themeSettings['input-border-color']
          },
          inputValidationError: {
            color: themeSettings['color-error'],
            borderColor: themeSettings['color-error']
          },
          inputValidationSuccess: {
            color: themeSettings['color-success'],
            borderColor: themeSettings['color-success']
          },
          submitButton: {
            color: themeSettings['button--primary-color'],
            backgroundColor: themeSettings['button--primary-backgroundColor'],
            borderColor: themeSettings['button--primary-backgroundColor'],
            '&:hover': {
              color: themeSettings['button--primary-colorHover'],
              backgroundColor: themeSettings['button--primary-backgroundColorHover'],
              borderColor: themeSettings['button--primary-backgroundColorHover']
            },
            '&:active': {
              color: themeSettings['button--primary-colorActive'],
              backgroundColor: themeSettings['button--primary-backgroundColorActive'],
              borderColor: themeSettings['button--primary-backgroundColorActive']
            },
            '&[disabled]': {
              backgroundColor: themeSettings['button--disabled-backgroundColor'],
              borderColor: themeSettings['button--disabled-borderColor'],
              color: themeSettings['button--disabled-color'],
              cursor: 'not-allowed'
            }
          },
          cancelButton: {
            color: themeSettings['button--default-color'],
            backgroundColor: 'transparent',
            borderColor: themeSettings['button--default-borderColor'],
            '&:hover': {
              color: themeSettings['button--default-colorHover'],
              backgroundColor: 'transparent',
              borderColor: themeSettings['button--default-borderColorHover']
            },
            '&:active': {
              color: themeSettings['button--default-colorActive'],
              backgroundColor: 'transparent',
              borderColor: themeSettings['button--default-borderColorActive']
            }
          },
          label: {
            color: themeSettings['form-label-font-color']
          },
          validationError: {
            color: themeSettings['color-error']
          },
          heading: {
            color: themeSettings['color-textHeading']
          }
        },
        storeContextData: {
          countries: countries,
          paymentsUrl: paymentsUrl,
          storeHash: storeHash,
          storeLocale: storeLocale,
          vaultToken: vaultToken,
          shopperId: shopperId,
          customerEmail: customerEmail,
          providerId: providerId,
          currencyCode: currencyCode,
          paymentMethodsUrl: paymentMethodsUrl,
          paymentProviderInitializationData: paymentProviderInitializationData
        },
        errorHandler: _global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal
      });
    }
    this.bindDeleteAddress();
    this.bindDeletePaymentMethod();
  }

  /**
   * Binds a submit hook to ensure the customer receives a confirmation dialog before deleting an address
   */;
  _proto.bindDeleteAddress = function bindDeleteAddress() {
    $('[data-delete-address]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deleteAddress');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };
  _proto.bindDeletePaymentMethod = function bindDeletePaymentMethod() {
    $('[data-delete-payment-method]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deletePaymentMethod');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };
  _proto.initReorderForm = function initReorderForm($reorderForm) {
    var _this2 = this;
    $reorderForm.on('submit', function (event) {
      var $productReorderCheckboxes = $('.account-listItem .form-checkbox:checked');
      var submitForm = false;
      $reorderForm.find('[name^="reorderitem"]').remove();
      $productReorderCheckboxes.each(function (index, productCheckbox) {
        var productId = $(productCheckbox).val();
        var $input = $('<input>', {
          type: 'hidden',
          name: "reorderitem[" + productId + "]",
          value: '1'
        });
        submitForm = true;
        $reorderForm.append($input);
      });
      if (!submitForm) {
        event.preventDefault();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal)(_this2.context.selectItem);
      }
    });
  };
  _proto.initAddressFormValidation = function initAddressFormValidation($addressForm) {
    var _this3 = this;
    var validationModel = (0,_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($addressForm, this.context);
    var $stateElement = $('form[data-address-form] [data-field-type="State"]');
    var $zipElement = $('form[data-address-form] [data-field-type="Zip"]');
    var addressValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-address-form] input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.announceInputErrorMessage
    });
    addressValidator.add(validationModel);
    if ($zipElement.length > 0) {
      var isZipRequired = $zipElement.prop('required');
      if (!isZipRequired) {
        addressValidator.remove($zipElement);
      }
    }
    if ($stateElement) {
      var $last;
      (0,_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field, isStateRequired) {
        if (err) {
          throw new Error(err);
        }

        // remove existing validation first, it can be safely called on unregistered elements
        addressValidator.remove($stateElement);
        if ($last) {
          addressValidator.remove($last);
        }
        if (isStateRequired) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setStateCountryValidation(addressValidator, field, _this3.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.cleanUpStateValidation(field);
        }
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.handleZipValidation(addressValidator, $zipElement, _this3.validationDictionary.field_not_blank);
      });
    }
    $addressForm.on('submit', function (event) {
      addressValidator.performCheck();
      if (addressValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.initAccountReturnFormValidation = function initAccountReturnFormValidation($accountReturnForm) {
    var errorMessage = $accountReturnForm.data('accountReturnFormError');
    $accountReturnForm.on('submit', function (event) {
      var formSubmit = false;

      // Iterate until we find a non-zero value in the dropdown for quantity
      $('[name^="return_qty"]', $accountReturnForm).each(function (i, ele) {
        if (parseInt($(ele).val(), 10) !== 0) {
          formSubmit = true;

          // Exit out of loop if we found at least one return
          return true;
        }
      });
      if (formSubmit) {
        return true;
      }
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal)(errorMessage);
      return event.preventDefault();
    });
  };
  _proto.initPaymentMethodFormValidation = function initPaymentMethodFormValidation($paymentMethodForm) {
    var _this4 = this;
    // Inject validations into form fields before validation runs
    $paymentMethodForm.find('#first_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.firstNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#last_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.lastNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#company.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.companyLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#phone.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.phoneLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address1.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address1Label + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address2.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address2Label + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#city.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.cityLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#country.form-field').attr('data-validation', "{ \"type\": \"singleselect\", \"label\": \"" + this.context.countryLabel + "\", \"required\": true, \"prefix\": \"" + this.context.chooseCountryLabel + "\" }");
    $paymentMethodForm.find('#state.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.stateLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#postal_code.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.postalCodeLabel + "\", \"required\": true, \"maxlength\": 0 }");
    var validationModel = (0,_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($paymentMethodForm, this.context);
    var paymentMethodSelector = 'form[data-payment-method-form]';
    var paymentMethodValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: paymentMethodSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.announceInputErrorMessage
    });
    var $stateElement = $(paymentMethodSelector + " [data-field-type=\"State\"]");
    var $last;
    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field, isStateRequired) {
      if (err) {
        throw new Error(err);
      }
      if ($stateElement.length) {
        paymentMethodValidator.remove($stateElement);
      }
      if ($last) {
        paymentMethodValidator.remove($last);
      }
      if (isStateRequired) {
        $last = field;
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setStateCountryValidation(paymentMethodValidator, field, _this4.validationDictionary.field_not_blank);
      } else {
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.cleanUpStateValidation(field);
      }
    });

    // Use credit card number input listener to highlight credit card type
    var cardType;
    $(paymentMethodSelector + " input[name=\"credit_card_number\"]").on('keyup', function (_ref) {
      var target = _ref.target;
      cardType = (0,_common_payment_method__WEBPACK_IMPORTED_MODULE_9__.creditCardType)(target.value);
      if (cardType) {
        $(paymentMethodSelector + " img[alt=\"" + cardType + "\"]").siblings().css('opacity', '.2');
      } else {
        $(paymentMethodSelector + " img").css('opacity', '1');
      }
    });

    // Set of credit card validation
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setCreditCardNumberValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"credit_card_number\"]", this.context.creditCardNumber);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setExpirationValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"expiration\"]", this.context.expiration);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setNameOnCardValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"name_on_card\"]", this.context.nameOnCard);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setCvvValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"cvv\"]", this.context.cvv, function () {
      return cardType;
    });

    // Set of credit card format
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Formatters.setCreditCardNumberFormat(paymentMethodSelector + " input[name=\"credit_card_number\"]");
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Formatters.setExpirationFormat(paymentMethodSelector + " input[name=\"expiration\"]");

    // Billing address validation
    paymentMethodValidator.add(validationModel);
    $paymentMethodForm.on('submit', function (event) {
      event.preventDefault();
      // Perform final form validation
      paymentMethodValidator.performCheck();
      if (paymentMethodValidator.areAll('valid')) {
        // Serialize form data and reduce it to object
        var data = lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default()($paymentMethodForm.serializeArray(), function (obj, item) {
          var refObj = obj;
          refObj[item.name] = item.value;
          return refObj;
        }, {});

        // Assign country and state code
        var country = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(_this4.context.countries, function (_ref2) {
          var value = _ref2.value;
          return value === data.country;
        });
        var state = country && lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(country.states, function (_ref3) {
          var value = _ref3.value;
          return value === data.state;
        });
        data.country_code = country ? country.code : data.country;
        data.state_or_province_code = state ? state.code : data.state;

        // Default Instrument
        data.default_instrument = !!data.default_instrument;

        // Store credit card
        (0,_common_payment_method__WEBPACK_IMPORTED_MODULE_9__.storeInstrument)(_this4.context, data, function () {
          window.location.href = _this4.context.paymentMethodsUrl;
        }, function () {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal)(_this4.context.generic_error);
        });
      }
    });
  };
  _proto.registerEditAccountValidation = function registerEditAccountValidation($editAccountForm) {
    var validationModel = (0,_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($editAccountForm, this.context);
    var formEditSelector = 'form[data-edit-account-form]';
    var editValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: formEditSelector + " input[type=\"submit\"]",
      delay: 900
    });
    var emailSelector = formEditSelector + " [data-field-type=\"EmailAddress\"]";
    var $emailElement = $(emailSelector);
    var passwordSelector = formEditSelector + " [data-field-type=\"Password\"]";
    var $passwordElement = $(passwordSelector);
    var password2Selector = formEditSelector + " [data-field-type=\"ConfirmPassword\"]";
    var $password2Element = $(password2Selector);
    var currentPasswordSelector = formEditSelector + " [data-field-type=\"CurrentPassword\"]";
    var $currentPassword = $(currentPasswordSelector);

    // This only handles the custom fields, standard fields are added below
    editValidator.add(validationModel);
    if ($emailElement) {
      editValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setEmailValidation(editValidator, emailSelector, this.validationDictionary.valid_email);
    }
    if ($passwordElement && $password2Element) {
      var _this$validationDicti = this.validationDictionary,
        enterPassword = _this$validationDicti.password,
        matchPassword = _this$validationDicti.password_match;
      editValidator.remove(passwordSelector);
      editValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setPasswordValidation(editValidator, passwordSelector, password2Selector, this.passwordRequirements, (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.createPasswordValidationErrorTextObject)(enterPassword, enterPassword, matchPassword, this.passwordRequirements.error), true);
    }
    if ($currentPassword) {
      editValidator.add({
        selector: currentPasswordSelector,
        validate: function validate(cb, val) {
          var result = true;
          if (val === '' && $passwordElement.val() !== '') {
            result = false;
          }
          cb(result);
        },
        errorMessage: this.context.currentPassword
      });
    }
    editValidator.add([{
      selector: formEditSelector + " input[name='account_firstname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.firstName
    }, {
      selector: formEditSelector + " input[name='account_lastname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.lastName
    }]);
    $editAccountForm.on('submit', function (event) {
      editValidator.performCheck();
      if (editValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
      setTimeout(function () {
        var earliestError = $('span.form-inlineMessage:first').prev('input');
        earliestError.trigger('focus');
      }, 900);
    });
  };
  _proto.registerInboxValidation = function registerInboxValidation($inboxForm) {
    var inboxValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-inbox-form] input[type="submit"]',
      delay: 900
    });
    inboxValidator.add([{
      selector: 'form[data-inbox-form] select[name="message_order_id"]',
      validate: function validate(cb, val) {
        var result = Number(val) !== 0;
        cb(result);
      },
      errorMessage: this.context.enterOrderNum
    }, {
      selector: 'form[data-inbox-form] input[name="message_subject"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterSubject
    }, {
      selector: 'form[data-inbox-form] textarea[name="message_content"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterMessage
    }]);
    $inboxForm.on('submit', function (event) {
      inboxValidator.performCheck();
      if (inboxValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
      setTimeout(function () {
        var earliestError = $('span.form-inlineMessage:first').prev('input');
        earliestError.trigger('focus');
      }, 900);
    });
  };
  return Account;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/payment-method.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/payment-method.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Formatters: () => (/* binding */ Formatters),
/* harmony export */   Validators: () => (/* binding */ Validators),
/* harmony export */   creditCardType: () => (/* binding */ creditCardType),
/* harmony export */   storeInstrument: () => (/* binding */ storeInstrument)
/* harmony export */ });
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! creditcards */ "./node_modules/creditcards/index.js");
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(creditcards__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* eslint-disable camelcase */


/**
 * Omit null or empty string properties of object
 * @param {Object} object
 * @returns {Object}
 */
var omitNullString = function omitNullString(obj) {
  var refObj = obj;
  $.each(refObj, function (key, value) {
    if (value === null || value === '') {
      delete refObj[key];
    }
  });
  return refObj;
};

/**
 * Get credit card type from credit card number
 * @param {string} value
 */
var creditCardType = function creditCardType(value) {
  return creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.type(creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(value), true);
};

/**
 * Wrapper for ajax request to store a new instrument in bigpay
 * @param {object} Representing the data needed for the header
 * @param {object} Representing the data needed for the body
 * @param {function} done Function to execute on a successful response
 * @param {function} fail Function to execute on a unsuccessful response
 */
var storeInstrument = function storeInstrument(_ref, _ref2, done, fail) {
  var paymentsUrl = _ref.paymentsUrl,
    shopperId = _ref.shopperId,
    storeHash = _ref.storeHash,
    vaultToken = _ref.vaultToken;
  var provider_id = _ref2.provider_id,
    currency_code = _ref2.currency_code,
    credit_card_number = _ref2.credit_card_number,
    expiration = _ref2.expiration,
    name_on_card = _ref2.name_on_card,
    cvv = _ref2.cvv,
    default_instrument = _ref2.default_instrument,
    address1 = _ref2.address1,
    address2 = _ref2.address2,
    city = _ref2.city,
    postal_code = _ref2.postal_code,
    state_or_province_code = _ref2.state_or_province_code,
    country_code = _ref2.country_code,
    company = _ref2.company,
    first_name = _ref2.first_name,
    last_name = _ref2.last_name,
    email = _ref2.email,
    phone = _ref2.phone;
  var expiry = expiration.split('/');
  $.ajax({
    url: paymentsUrl + "/stores/" + storeHash + "/customers/" + shopperId + "/stored_instruments",
    dataType: 'json',
    method: 'POST',
    cache: false,
    headers: {
      Authorization: vaultToken,
      Accept: 'application/vnd.bc.v1+json',
      'Content-Type': 'application/vnd.bc.v1+json'
    },
    data: JSON.stringify({
      instrument: {
        type: 'card',
        cardholder_name: name_on_card,
        number: creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(credit_card_number),
        expiry_month: creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.month.parse(expiry[0]),
        expiry_year: creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.year.parse(expiry[1], true),
        verification_value: cvv
      },
      billing_address: omitNullString({
        address1: address1,
        address2: address2,
        city: city,
        postal_code: postal_code,
        state_or_province_code: state_or_province_code,
        country_code: country_code,
        company: company,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
      }),
      provider_id: provider_id,
      default_instrument: default_instrument,
      currency_code: currency_code
    })
  }).done(done).fail(fail);
};
var Formatters = {
  /**
   * Sets up a format for credit card number
   * @param field
   */
  setCreditCardNumberFormat: function setCreditCardNumberFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref3) {
        var target = _ref3.target;
        var refTarget = target;
        refTarget.value = creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.format(creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(target.value));
      });
    }
  },
  /**
   * Sets up a format for expiration date
   * @param field
   */
  setExpirationFormat: function setExpirationFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref4) {
        var target = _ref4.target,
          which = _ref4.which;
        var refTarget = target;
        if (which === 8 && /.*(\/)$/.test(target.value)) {
          refTarget.value = target.value.slice(0, -1);
        } else if (target.value.length > 4) {
          refTarget.value = target.value.slice(0, 5);
        } else if (which !== 8) {
          refTarget.value = target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/').replace(/^(0[1-9]|1[0-2])$/g, '$1/').replace(/^([0-1])([3-9])$/g, '0$1/$2').replace(/^(0[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2').replace(/^([0]+)\/|[0]+$/g, '0').replace(/[^\d\/]|^[\/]*$/g, '').replace(/\/\//g, '/');
        }
      });
    }
  }
};
var Validators = {
  /**
   * Sets up a validation for credit card number
   * @param validator
   * @param field
   * @param errorMessage
   */
  setCreditCardNumberValidation: function setCreditCardNumberValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.isValid(creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(val));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for expiration date
   * @param validator
   * @param field
   * @param errorMessage
   */
  setExpirationValidation: function setExpirationValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var expiry = val.split('/');
          var result = val.length && /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(val);
          result = result && !creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.isPast(creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.month.parse(expiry[0]), creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.year.parse(expiry[1], true));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for name on card
   * @param validator
   * @param field
   * @param errorMessage
   */
  setNameOnCardValidation: function setNameOnCardValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = !!val.length;
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },
  /**
   * Sets up a validation for cvv
   * @param validator
   * @param field
   * @param errorMessage
   * @param {any} cardType The credit card number type
   */
  setCvvValidation: function setCvvValidation(validator, field, errorMessage, cardType) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var type = typeof cardType === 'function' ? cardType() : cardType;
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default().cvc.isValid(val, type);
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  }
};

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showAlertModal)(noCompareMessage);
      return false;
    }
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9hY2NvdW50X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXlDO0FBRVY7QUFDRztBQUNnQjtBQUNBO0FBT2Y7QUFDNkM7QUFDa0Q7QUFDbEY7QUFDUTtBQUFBLElBRW5Da0IsT0FBTywwQkFBQUMsWUFBQTtFQUN4QixTQUFBRCxRQUFZRSxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFGLFlBQUEsQ0FBQUcsSUFBQSxPQUFNRixPQUFPLENBQUM7SUFDZEMsS0FBQSxDQUFLRSxvQkFBb0IsR0FBR2IsNkZBQTJCLENBQUNVLE9BQU8sQ0FBQztJQUNoRUMsS0FBQSxDQUFLRyxNQUFNLEdBQUdDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztJQUM1Q0osS0FBQSxDQUFLSyxLQUFLLEdBQUdELENBQUMsQ0FBQyxNQUFNLENBQUM7SUFBQyxPQUFBSixLQUFBO0VBQzNCO0VBQUNNLGNBQUEsQ0FBQVQsT0FBQSxFQUFBQyxZQUFBO0VBQUEsSUFBQVMsTUFBQSxHQUFBVixPQUFBLENBQUFXLFNBQUE7RUFBQUQsTUFBQSxDQUVERSxPQUFPLEdBQVAsU0FBQUEsT0FBT0EsQ0FBQSxFQUFHO0lBQ04sSUFBTUMsZ0JBQWdCLEdBQUcxQixzRUFBWSxDQUFDLDhCQUE4QixDQUFDO0lBQ3JFLElBQU0yQixZQUFZLEdBQUczQixzRUFBWSxDQUFDLHlCQUF5QixDQUFDO0lBQzVELElBQU00QixVQUFVLEdBQUc1QixzRUFBWSxDQUFDLHVCQUF1QixDQUFDO0lBQ3hELElBQU02QixrQkFBa0IsR0FBRzdCLHNFQUFZLENBQUMsNEJBQTRCLENBQUM7SUFDckUsSUFBTThCLGtCQUFrQixHQUFHOUIsc0VBQVksQ0FBQyxnQ0FBZ0MsQ0FBQztJQUN6RSxJQUFNK0IsWUFBWSxHQUFHL0Isc0VBQVksQ0FBQyw2QkFBNkIsQ0FBQztJQUNoRSxJQUFNZ0MsY0FBYyxH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SUFDN0ZkLGdCQUFnQixDQUFDUyxjQUFjLEVBQUVDLFlBQVksRUFBRVIsSUFBSSxDQUFDO0VBQ3hELENBQUMsQ0FBQztFQUVGalEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOFEsY0FBYyxDQUFDLGNBQWMsQ0FBQztFQUV4QzlRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ3FCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsVUFBQTZDLEtBQUssRUFBSTtJQUNoRCxJQUFNNk0sT0FBTyxHQUFHN00sS0FBSyxDQUFDRSxhQUFhLENBQUNnQixLQUFLO0lBQ3pDLElBQU00TCxtQkFBbUIsR0FBR2hSLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztJQUVwRCxJQUFJa0UsS0FBSyxDQUFDRSxhQUFhLENBQUM2TSxPQUFPLEVBQUU7TUFDN0JwQixnQkFBZ0IsQ0FBQ1csY0FBYyxFQUFFTyxPQUFPLENBQUM7SUFDN0MsQ0FBQyxNQUFNO01BQ0h0QixnQkFBZ0IsQ0FBQ2UsY0FBYyxFQUFFTyxPQUFPLENBQUM7SUFDN0M7SUFFQWhCLGdCQUFnQixDQUFDUyxjQUFjLEVBQUVRLG1CQUFtQixFQUFFZixJQUFJLENBQUM7RUFDL0QsQ0FBQyxDQUFDO0VBRUZqUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNxQixFQUFFLENBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFlBQU07SUFDL0MsSUFBTTZQLG9CQUFvQixHQUFHbFIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDMEUsSUFBSSxDQUFDLG9DQUFvQyxDQUFDO0lBRWpGLElBQUl3TSxvQkFBb0IsQ0FBQ2hRLE1BQU0sSUFBSSxDQUFDLEVBQUU7TUFDbEMzQixzREFBYyxDQUFDZ1IsZ0JBQWdCLENBQUM7TUFDaEMsT0FBTyxLQUFLO0lBQ2hCO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3BheW1lbnQtbWV0aG9kLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IFdpc2hsaXN0IGZyb20gJy4vd2lzaGxpc3QnO1xuaW1wb3J0IHZhbGlkYXRpb24gZnJvbSAnLi9jb21tb24vZm9ybS12YWxpZGF0aW9uJztcbmltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi9jb21tb24vc3RhdGUtY291bnRyeSc7XG5pbXBvcnQge1xuICAgIGNsYXNzaWZ5Rm9ybSxcbiAgICBWYWxpZGF0b3JzLFxuICAgIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCxcbiAgICBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QsXG59IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB7IGNyZWRpdENhcmRUeXBlLCBzdG9yZUluc3RydW1lbnQsIFZhbGlkYXRvcnMgYXMgQ0NWYWxpZGF0b3JzLCBGb3JtYXR0ZXJzIGFzIENDRm9ybWF0dGVycyB9IGZyb20gJy4vY29tbW9uL3BheW1lbnQtbWV0aG9kJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0ICRlZGl0QWNjb3VudEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1lZGl0LWFjY291bnQtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFkZHJlc3NGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW5ib3hGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtaW5ib3gtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFjY291bnRSZXR1cm5Gb3JtID0gY2xhc3NpZnlGb3JtKCdbZGF0YS1hY2NvdW50LXJldHVybi1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcGF5bWVudE1ldGhvZEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcmVvcmRlckZvcm0gPSBjbGFzc2lmeUZvcm0oJ1tkYXRhLWFjY291bnQtcmVvcmRlci1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW52b2ljZUJ1dHRvbiA9ICQoJ1tkYXRhLXByaW50LWludm9pY2VdJyk7XG4gICAgICAgIGNvbnN0ICRiaWdDb21tZXJjZSA9IHdpbmRvdy5CaWdDb21tZXJjZTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICAvLyBJbmplY3RlZCB2aWEgdGVtcGxhdGVcbiAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyA9IHRoaXMuY29udGV4dC5wYXNzd29yZFJlcXVpcmVtZW50cztcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgd2lzaCBsaXN0IEpTXG4gICAgICAgIFdpc2hsaXN0LmxvYWQodGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJGVkaXRBY2NvdW50Rm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSk7XG4gICAgICAgICAgICBpZiAodGhpcy4kc3RhdGUuaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW52b2ljZUJ1dHRvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICRpbnZvaWNlQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoIC8gMiAtIDQ1MDtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3AgPSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC8gMiAtIDMyMDtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSAkaW52b2ljZUJ1dHRvbi5kYXRhKCdwcmludEludm9pY2UnKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ29yZGVySW52b2ljZScsIGB3aWR0aD05MDAsaGVpZ2h0PTY1MCxsZWZ0PSR7bGVmdH0sdG9wPSR7dG9wfSxzY3JvbGxiYXJzPTFgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRhZGRyZXNzRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEFkZHJlc3NGb3JtVmFsaWRhdGlvbigkYWRkcmVzc0Zvcm0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy4kc3RhdGUuaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW5ib3hGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckluYm94VmFsaWRhdGlvbigkaW5ib3hGb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkYWNjb3VudFJldHVybkZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24oJGFjY291bnRSZXR1cm5Gb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcGF5bWVudE1ldGhvZEZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQYXltZW50TWV0aG9kRm9ybVZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcmVvcmRlckZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRSZW9yZGVyRm9ybSgkcmVvcmRlckZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRiaWdDb21tZXJjZSAmJiAkYmlnQ29tbWVyY2UucmVuZGVyQWNjb3VudFBheW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgY291bnRyaWVzLFxuICAgICAgICAgICAgICAgIHBheW1lbnRzVXJsLFxuICAgICAgICAgICAgICAgIHN0b3JlSGFzaCxcbiAgICAgICAgICAgICAgICBzdG9yZUxvY2FsZSxcbiAgICAgICAgICAgICAgICB2YXVsdFRva2VuLFxuICAgICAgICAgICAgICAgIHNob3BwZXJJZCxcbiAgICAgICAgICAgICAgICBjdXN0b21lckVtYWlsLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVySWQsXG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2RzVXJsLFxuICAgICAgICAgICAgICAgIHBheW1lbnRQcm92aWRlckluaXRpYWxpemF0aW9uRGF0YSxcbiAgICAgICAgICAgICAgICB0aGVtZVNldHRpbmdzLFxuICAgICAgICAgICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgICAgICAgICAgJGJpZ0NvbW1lcmNlLnJlbmRlckFjY291bnRQYXltZW50cyh7XG4gICAgICAgICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0QmFzZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2lucHV0LWZvbnQtY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZVNldHRpbmdzWydpbnB1dC1ib3JkZXItY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWxpZGF0aW9uRXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydjb2xvci1lcnJvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2NvbG9yLWVycm9yJ10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsaWRhdGlvblN1Y2Nlc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydjb2xvci1zdWNjZXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWVTZXR0aW5nc1snY29sb3Itc3VjY2VzcyddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLXByaW1hcnktY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1wcmltYXJ5LWJhY2tncm91bmRDb2xvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tcHJpbWFyeS1iYWNrZ3JvdW5kQ29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLXByaW1hcnktY29sb3JIb3ZlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1wcmltYXJ5LWJhY2tncm91bmRDb2xvckhvdmVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tcHJpbWFyeS1iYWNrZ3JvdW5kQ29sb3JIb3ZlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcmOmFjdGl2ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1wcmltYXJ5LWNvbG9yQWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLXByaW1hcnktYmFja2dyb3VuZENvbG9yQWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tcHJpbWFyeS1iYWNrZ3JvdW5kQ29sb3JBY3RpdmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnJltkaXNhYmxlZF0nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRpc2FibGVkLWJhY2tncm91bmRDb2xvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRpc2FibGVkLWJvcmRlckNvbG9yJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tZGlzYWJsZWQtY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdub3QtYWxsb3dlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRlZmF1bHQtY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRlZmF1bHQtYm9yZGVyQ29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRlZmF1bHQtY29sb3JIb3ZlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1kZWZhdWx0LWJvcmRlckNvbG9ySG92ZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnJjphY3RpdmUnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tZGVmYXVsdC1jb2xvckFjdGl2ZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1kZWZhdWx0LWJvcmRlckNvbG9yQWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2Zvcm0tbGFiZWwtZm9udC1jb2xvciddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydjb2xvci1lcnJvciddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWVTZXR0aW5nc1snY29sb3ItdGV4dEhlYWRpbmcnXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0b3JlQ29udGV4dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRyaWVzLFxuICAgICAgICAgICAgICAgICAgICBwYXltZW50c1VybCxcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVIYXNoLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZUxvY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgdmF1bHRUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgc2hvcHBlcklkLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21lckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcklkLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2RzVXJsLFxuICAgICAgICAgICAgICAgICAgICBwYXltZW50UHJvdmlkZXJJbml0aWFsaXphdGlvbkRhdGEsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXI6IHNob3dBbGVydE1vZGFsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmREZWxldGVBZGRyZXNzKCk7XG4gICAgICAgIHRoaXMuYmluZERlbGV0ZVBheW1lbnRNZXRob2QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBhIHN1Ym1pdCBob29rIHRvIGVuc3VyZSB0aGUgY3VzdG9tZXIgcmVjZWl2ZXMgYSBjb25maXJtYXRpb24gZGlhbG9nIGJlZm9yZSBkZWxldGluZyBhbiBhZGRyZXNzXG4gICAgICovXG4gICAgYmluZERlbGV0ZUFkZHJlc3MoKSB7XG4gICAgICAgICQoJ1tkYXRhLWRlbGV0ZS1hZGRyZXNzXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVBZGRyZXNzJyk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRGVsZXRlUGF5bWVudE1ldGhvZCgpIHtcbiAgICAgICAgJCgnW2RhdGEtZGVsZXRlLXBheW1lbnQtbWV0aG9kXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVQYXltZW50TWV0aG9kJyk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0UmVvcmRlckZvcm0oJHJlb3JkZXJGb3JtKSB7XG4gICAgICAgICRyZW9yZGVyRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcyA9ICQoJy5hY2NvdW50LWxpc3RJdGVtIC5mb3JtLWNoZWNrYm94OmNoZWNrZWQnKTtcbiAgICAgICAgICAgIGxldCBzdWJtaXRGb3JtID0gZmFsc2U7XG5cbiAgICAgICAgICAgICRyZW9yZGVyRm9ybS5maW5kKCdbbmFtZV49XCJyZW9yZGVyaXRlbVwiXScpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAkcHJvZHVjdFJlb3JkZXJDaGVja2JveGVzLmVhY2goKGluZGV4LCBwcm9kdWN0Q2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKHByb2R1Y3RDaGVja2JveCkudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGByZW9yZGVyaXRlbVske3Byb2R1Y3RJZH1dYCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN1Ym1pdEZvcm0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJHJlb3JkZXJGb3JtLmFwcGVuZCgkaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghc3VibWl0Rm9ybSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwodGhpcy5jb250ZXh0LnNlbGVjdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0QWRkcmVzc0Zvcm1WYWxpZGF0aW9uKCRhZGRyZXNzRm9ybSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRhZGRyZXNzRm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3QgJHN0YXRlRWxlbWVudCA9ICQoJ2Zvcm1bZGF0YS1hZGRyZXNzLWZvcm1dIFtkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICBjb25zdCAkemlwRWxlbWVudCA9ICQoJ2Zvcm1bZGF0YS1hZGRyZXNzLWZvcm1dIFtkYXRhLWZpZWxkLXR5cGU9XCJaaXBcIl0nKTtcbiAgICAgICAgY29uc3QgYWRkcmVzc1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICBpZiAoJHppcEVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgaXNaaXBSZXF1aXJlZCA9ICR6aXBFbGVtZW50LnByb3AoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgICBpZiAoIWlzWmlwUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLnJlbW92ZSgkemlwRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHN0YXRlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgICAgICBzdGF0ZUNvdW50cnkoJHN0YXRlRWxlbWVudCwgdGhpcy5jb250ZXh0LCAoZXJyLCBmaWVsZCwgaXNTdGF0ZVJlcXVpcmVkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZXhpc3RpbmcgdmFsaWRhdGlvbiBmaXJzdCwgaXQgY2FuIGJlIHNhZmVseSBjYWxsZWQgb24gdW5yZWdpc3RlcmVkIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5yZW1vdmUoJHN0YXRlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1N0YXRlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKGFkZHJlc3NWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmhhbmRsZVppcFZhbGlkYXRpb24oYWRkcmVzc1ZhbGlkYXRvciwgJHppcEVsZW1lbnQsIHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnkuZmllbGRfbm90X2JsYW5rKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJGFkZHJlc3NGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoYWRkcmVzc1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24oJGFjY291bnRSZXR1cm5Gb3JtKSB7XG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICRhY2NvdW50UmV0dXJuRm9ybS5kYXRhKCdhY2NvdW50UmV0dXJuRm9ybUVycm9yJyk7XG5cbiAgICAgICAgJGFjY291bnRSZXR1cm5Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBsZXQgZm9ybVN1Ym1pdCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBJdGVyYXRlIHVudGlsIHdlIGZpbmQgYSBub24temVybyB2YWx1ZSBpbiB0aGUgZHJvcGRvd24gZm9yIHF1YW50aXR5XG4gICAgICAgICAgICAkKCdbbmFtZV49XCJyZXR1cm5fcXR5XCJdJywgJGFjY291bnRSZXR1cm5Gb3JtKS5lYWNoKChpLCBlbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoJChlbGUpLnZhbCgpLCAxMCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybVN1Ym1pdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRXhpdCBvdXQgb2YgbG9vcCBpZiB3ZSBmb3VuZCBhdCBsZWFzdCBvbmUgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoZm9ybVN1Ym1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzaG93QWxlcnRNb2RhbChlcnJvck1lc3NhZ2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdFBheW1lbnRNZXRob2RGb3JtVmFsaWRhdGlvbigkcGF5bWVudE1ldGhvZEZvcm0pIHtcbiAgICAgICAgLy8gSW5qZWN0IHZhbGlkYXRpb25zIGludG8gZm9ybSBmaWVsZHMgYmVmb3JlIHZhbGlkYXRpb24gcnVuc1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2ZpcnN0X25hbWUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmZpcnN0TmFtZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2xhc3RfbmFtZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQubGFzdE5hbWVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjb21wYW55LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5jb21wYW55TGFiZWx9XCIsIFwicmVxdWlyZWRcIjogZmFsc2UsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI3Bob25lLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5waG9uZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IGZhbHNlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNhZGRyZXNzMS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuYWRkcmVzczFMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNhZGRyZXNzMi5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuYWRkcmVzczJMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiBmYWxzZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjY2l0eS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuY2l0eUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2NvdW50cnkuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZXNlbGVjdFwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuY291bnRyeUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwicHJlZml4XCI6IFwiJHt0aGlzLmNvbnRleHQuY2hvb3NlQ291bnRyeUxhYmVsfVwiIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNzdGF0ZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuc3RhdGVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNwb3N0YWxfY29kZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQucG9zdGFsQ29kZUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IHRydWUsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Nb2RlbCA9IHZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtLCB0aGlzLmNvbnRleHQpO1xuICAgICAgICBjb25zdCBwYXltZW50TWV0aG9kU2VsZWN0b3IgPSAnZm9ybVtkYXRhLXBheW1lbnQtbWV0aG9kLWZvcm1dJztcbiAgICAgICAgY29uc3QgcGF5bWVudE1ldGhvZFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXWAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCAkc3RhdGVFbGVtZW50ID0gJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXWApO1xuXG4gICAgICAgIGxldCAkbGFzdDtcbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkoJHN0YXRlRWxlbWVudCwgdGhpcy5jb250ZXh0LCAoZXJyLCBmaWVsZCwgaXNTdGF0ZVJlcXVpcmVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkc3RhdGVFbGVtZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcbiAgICAgICAgICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1N0YXRlUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuc2V0U3RhdGVDb3VudHJ5VmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBmaWVsZCwgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS5maWVsZF9ub3RfYmxhbmspO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBVc2UgY3JlZGl0IGNhcmQgbnVtYmVyIGlucHV0IGxpc3RlbmVyIHRvIGhpZ2hsaWdodCBjcmVkaXQgY2FyZCB0eXBlXG4gICAgICAgIGxldCBjYXJkVHlwZTtcbiAgICAgICAgJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjcmVkaXRfY2FyZF9udW1iZXJcIl1gKS5vbigna2V5dXAnLCAoeyB0YXJnZXQgfSkgPT4ge1xuICAgICAgICAgICAgY2FyZFR5cGUgPSBjcmVkaXRDYXJkVHlwZSh0YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGNhcmRUeXBlKSB7XG4gICAgICAgICAgICAgICAgJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGltZ1thbHQ9XCIke2NhcmRUeXBlfVwiXWApLnNpYmxpbmdzKCkuY3NzKCdvcGFjaXR5JywgJy4yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbWdgKS5jc3MoJ29wYWNpdHknLCAnMScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTZXQgb2YgY3JlZGl0IGNhcmQgdmFsaWRhdGlvblxuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0Q3JlZGl0Q2FyZE51bWJlclZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3JlZGl0X2NhcmRfbnVtYmVyXCJdYCwgdGhpcy5jb250ZXh0LmNyZWRpdENhcmROdW1iZXIpO1xuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0RXhwaXJhdGlvblZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiZXhwaXJhdGlvblwiXWAsIHRoaXMuY29udGV4dC5leHBpcmF0aW9uKTtcbiAgICAgICAgQ0NWYWxpZGF0b3JzLnNldE5hbWVPbkNhcmRWYWxpZGF0aW9uKHBheW1lbnRNZXRob2RWYWxpZGF0b3IsIGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cIm5hbWVfb25fY2FyZFwiXWAsIHRoaXMuY29udGV4dC5uYW1lT25DYXJkKTtcbiAgICAgICAgQ0NWYWxpZGF0b3JzLnNldEN2dlZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3Z2XCJdYCwgdGhpcy5jb250ZXh0LmN2diwgKCkgPT4gY2FyZFR5cGUpO1xuXG4gICAgICAgIC8vIFNldCBvZiBjcmVkaXQgY2FyZCBmb3JtYXRcbiAgICAgICAgQ0NGb3JtYXR0ZXJzLnNldENyZWRpdENhcmROdW1iZXJGb3JtYXQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiY3JlZGl0X2NhcmRfbnVtYmVyXCJdYCk7XG4gICAgICAgIENDRm9ybWF0dGVycy5zZXRFeHBpcmF0aW9uRm9ybWF0KGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImV4cGlyYXRpb25cIl1gKTtcblxuICAgICAgICAvLyBCaWxsaW5nIGFkZHJlc3MgdmFsaWRhdGlvblxuICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLmFkZCh2YWxpZGF0aW9uTW9kZWwpO1xuXG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIC8vIFBlcmZvcm0gZmluYWwgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgaWYgKHBheW1lbnRNZXRob2RWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgLy8gU2VyaWFsaXplIGZvcm0gZGF0YSBhbmQgcmVkdWNlIGl0IHRvIG9iamVjdFxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBfLnJlZHVjZSgkcGF5bWVudE1ldGhvZEZvcm0uc2VyaWFsaXplQXJyYXkoKSwgKG9iaiwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZPYmogPSBvYmo7XG4gICAgICAgICAgICAgICAgICAgIHJlZk9ialtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZk9iajtcbiAgICAgICAgICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgICAgICAgICAvLyBBc3NpZ24gY291bnRyeSBhbmQgc3RhdGUgY29kZVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSBfLmZpbmQodGhpcy5jb250ZXh0LmNvdW50cmllcywgKHsgdmFsdWUgfSkgPT4gdmFsdWUgPT09IGRhdGEuY291bnRyeSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBjb3VudHJ5ICYmIF8uZmluZChjb3VudHJ5LnN0YXRlcywgKHsgdmFsdWUgfSkgPT4gdmFsdWUgPT09IGRhdGEuc3RhdGUpO1xuICAgICAgICAgICAgICAgIGRhdGEuY291bnRyeV9jb2RlID0gY291bnRyeSA/IGNvdW50cnkuY29kZSA6IGRhdGEuY291bnRyeTtcbiAgICAgICAgICAgICAgICBkYXRhLnN0YXRlX29yX3Byb3ZpbmNlX2NvZGUgPSBzdGF0ZSA/IHN0YXRlLmNvZGUgOiBkYXRhLnN0YXRlO1xuXG4gICAgICAgICAgICAgICAgLy8gRGVmYXVsdCBJbnN0cnVtZW50XG4gICAgICAgICAgICAgICAgZGF0YS5kZWZhdWx0X2luc3RydW1lbnQgPSAhIWRhdGEuZGVmYXVsdF9pbnN0cnVtZW50O1xuXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgY3JlZGl0IGNhcmRcbiAgICAgICAgICAgICAgICBzdG9yZUluc3RydW1lbnQodGhpcy5jb250ZXh0LCBkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy5jb250ZXh0LnBheW1lbnRNZXRob2RzVXJsO1xuICAgICAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwodGhpcy5jb250ZXh0LmdlbmVyaWNfZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlckVkaXRBY2NvdW50VmFsaWRhdGlvbigkZWRpdEFjY291bnRGb3JtKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25Nb2RlbCA9IHZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3QgZm9ybUVkaXRTZWxlY3RvciA9ICdmb3JtW2RhdGEtZWRpdC1hY2NvdW50LWZvcm1dJztcbiAgICAgICAgY29uc3QgZWRpdFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W3R5cGU9XCJzdWJtaXRcIl1gLFxuICAgICAgICAgICAgZGVsYXk6IDkwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGVtYWlsU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiRW1haWxBZGRyZXNzXCJdYDtcbiAgICAgICAgY29uc3QgJGVtYWlsRWxlbWVudCA9ICQoZW1haWxTZWxlY3Rvcik7XG4gICAgICAgIGNvbnN0IHBhc3N3b3JkU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiUGFzc3dvcmRcIl1gO1xuICAgICAgICBjb25zdCAkcGFzc3dvcmRFbGVtZW50ID0gJChwYXNzd29yZFNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmQyU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiQ29uZmlybVBhc3N3b3JkXCJdYDtcbiAgICAgICAgY29uc3QgJHBhc3N3b3JkMkVsZW1lbnQgPSAkKHBhc3N3b3JkMlNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgY3VycmVudFBhc3N3b3JkU2VsZWN0b3IgPSBgJHtmb3JtRWRpdFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiQ3VycmVudFBhc3N3b3JkXCJdYDtcbiAgICAgICAgY29uc3QgJGN1cnJlbnRQYXNzd29yZCA9ICQoY3VycmVudFBhc3N3b3JkU2VsZWN0b3IpO1xuXG4gICAgICAgIC8vIFRoaXMgb25seSBoYW5kbGVzIHRoZSBjdXN0b20gZmllbGRzLCBzdGFuZGFyZCBmaWVsZHMgYXJlIGFkZGVkIGJlbG93XG4gICAgICAgIGVkaXRWYWxpZGF0b3IuYWRkKHZhbGlkYXRpb25Nb2RlbCk7XG5cbiAgICAgICAgaWYgKCRlbWFpbEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucmVtb3ZlKGVtYWlsU2VsZWN0b3IpO1xuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRFbWFpbFZhbGlkYXRpb24oZWRpdFZhbGlkYXRvciwgZW1haWxTZWxlY3RvciwgdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeS52YWxpZF9lbWFpbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJHBhc3N3b3JkRWxlbWVudCAmJiAkcGFzc3dvcmQyRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgeyBwYXNzd29yZDogZW50ZXJQYXNzd29yZCwgcGFzc3dvcmRfbWF0Y2g6IG1hdGNoUGFzc3dvcmQgfSA9IHRoaXMudmFsaWRhdGlvbkRpY3Rpb25hcnk7XG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLnJlbW92ZShwYXNzd29yZFNlbGVjdG9yKTtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucmVtb3ZlKHBhc3N3b3JkMlNlbGVjdG9yKTtcbiAgICAgICAgICAgIFZhbGlkYXRvcnMuc2V0UGFzc3dvcmRWYWxpZGF0aW9uKFxuICAgICAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmRTZWxlY3RvcixcbiAgICAgICAgICAgICAgICBwYXNzd29yZDJTZWxlY3RvcixcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3N3b3JkUmVxdWlyZW1lbnRzLFxuICAgICAgICAgICAgICAgIGNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdChlbnRlclBhc3N3b3JkLCBlbnRlclBhc3N3b3JkLCBtYXRjaFBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkUmVxdWlyZW1lbnRzLmVycm9yKSxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkY3VycmVudFBhc3N3b3JkKSB7XG4gICAgICAgICAgICBlZGl0VmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGN1cnJlbnRQYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSAnJyAmJiAkcGFzc3dvcmRFbGVtZW50LnZhbCgpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuY3VycmVudFBhc3N3b3JkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBlZGl0VmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W25hbWU9J2FjY291bnRfZmlyc3RuYW1lJ11gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5maXJzdE5hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBgJHtmb3JtRWRpdFNlbGVjdG9yfSBpbnB1dFtuYW1lPSdhY2NvdW50X2xhc3RuYW1lJ11gLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5sYXN0TmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgICRlZGl0QWNjb3VudEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmIChlZGl0VmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVhcmxpZXN0RXJyb3IgPSAkKCdzcGFuLmZvcm0taW5saW5lTWVzc2FnZTpmaXJzdCcpLnByZXYoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgZWFybGllc3RFcnJvci50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICAgICAgfSwgOTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJJbmJveFZhbGlkYXRpb24oJGluYm94Rm9ybSkge1xuICAgICAgICBjb25zdCBpbmJveFZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtaW5ib3gtZm9ybV0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICBkZWxheTogOTAwLFxuICAgICAgICB9KTtcblxuICAgICAgICBpbmJveFZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIHNlbGVjdFtuYW1lPVwibWVzc2FnZV9vcmRlcl9pZFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE51bWJlcih2YWwpICE9PSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlck9yZGVyTnVtLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2Zvcm1bZGF0YS1pbmJveC1mb3JtXSBpbnB1dFtuYW1lPVwibWVzc2FnZV9zdWJqZWN0XCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZW50ZXJTdWJqZWN0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJ2Zvcm1bZGF0YS1pbmJveC1mb3JtXSB0ZXh0YXJlYVtuYW1lPVwibWVzc2FnZV9jb250ZW50XCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZW50ZXJNZXNzYWdlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgJGluYm94Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaW5ib3hWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmIChpbmJveFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVhcmxpZXN0RXJyb3IgPSAkKCdzcGFuLmZvcm0taW5saW5lTWVzc2FnZTpmaXJzdCcpLnByZXYoJ2lucHV0Jyk7XG4gICAgICAgICAgICAgICAgZWFybGllc3RFcnJvci50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICAgICAgfSwgOTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5pbXBvcnQgY3JlZGl0Y2FyZHMgZnJvbSAnY3JlZGl0Y2FyZHMnO1xuXG4vKipcbiAqIE9taXQgbnVsbCBvciBlbXB0eSBzdHJpbmcgcHJvcGVydGllcyBvZiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IG9taXROdWxsU3RyaW5nID0gb2JqID0+IHtcbiAgICBjb25zdCByZWZPYmogPSBvYmo7XG5cbiAgICAkLmVhY2gocmVmT2JqLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcmVmT2JqW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZWZPYmo7XG59O1xuXG4vKipcbiAqIEdldCBjcmVkaXQgY2FyZCB0eXBlIGZyb20gY3JlZGl0IGNhcmQgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWRpdENhcmRUeXBlID0gdmFsdWUgPT4gY3JlZGl0Y2FyZHMuY2FyZC50eXBlKGNyZWRpdGNhcmRzLmNhcmQucGFyc2UodmFsdWUpLCB0cnVlKTtcblxuLyoqXG4gKiBXcmFwcGVyIGZvciBhamF4IHJlcXVlc3QgdG8gc3RvcmUgYSBuZXcgaW5zdHJ1bWVudCBpbiBiaWdwYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSBSZXByZXNlbnRpbmcgdGhlIGRhdGEgbmVlZGVkIGZvciB0aGUgaGVhZGVyXG4gKiBAcGFyYW0ge29iamVjdH0gUmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIGJvZHlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRvbmUgRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBhIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZhaWwgRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBhIHVuc3VjY2Vzc2Z1bCByZXNwb25zZVxuICovXG5leHBvcnQgY29uc3Qgc3RvcmVJbnN0cnVtZW50ID0gKHtcbiAgICAvLyBIb3N0bmFtZSwgSWRzICYgVG9rZW5cbiAgICBwYXltZW50c1VybCxcbiAgICBzaG9wcGVySWQsXG4gICAgc3RvcmVIYXNoLFxuICAgIHZhdWx0VG9rZW4sXG59LCB7XG4gICAgLy8gUHJvdmlkZXIgSW5mb1xuICAgIHByb3ZpZGVyX2lkLFxuICAgIGN1cnJlbmN5X2NvZGUsXG5cbiAgICAvLyBJbnN0cnVtZW50IERldGFpbHNcbiAgICBjcmVkaXRfY2FyZF9udW1iZXIsXG4gICAgZXhwaXJhdGlvbixcbiAgICBuYW1lX29uX2NhcmQsXG4gICAgY3Z2LFxuICAgIGRlZmF1bHRfaW5zdHJ1bWVudCxcblxuICAgIC8vIEJpbGxpbmcgQWRkcmVzc1xuICAgIGFkZHJlc3MxLFxuICAgIGFkZHJlc3MyLFxuICAgIGNpdHksXG4gICAgcG9zdGFsX2NvZGUsXG4gICAgc3RhdGVfb3JfcHJvdmluY2VfY29kZSxcbiAgICBjb3VudHJ5X2NvZGUsXG4gICAgY29tcGFueSxcbiAgICBmaXJzdF9uYW1lLFxuICAgIGxhc3RfbmFtZSxcbiAgICBlbWFpbCxcbiAgICBwaG9uZSxcbn0sIGRvbmUsIGZhaWwpID0+IHtcbiAgICBjb25zdCBleHBpcnkgPSBleHBpcmF0aW9uLnNwbGl0KCcvJyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAke3BheW1lbnRzVXJsfS9zdG9yZXMvJHtzdG9yZUhhc2h9L2N1c3RvbWVycy8ke3Nob3BwZXJJZH0vc3RvcmVkX2luc3RydW1lbnRzYCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdmF1bHRUb2tlbixcbiAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5iYy52MStqc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vdm5kLmJjLnYxK2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpbnN0cnVtZW50OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhcmQnLFxuICAgICAgICAgICAgICAgIGNhcmRob2xkZXJfbmFtZTogbmFtZV9vbl9jYXJkLFxuICAgICAgICAgICAgICAgIG51bWJlcjogY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZShjcmVkaXRfY2FyZF9udW1iZXIpLFxuICAgICAgICAgICAgICAgIGV4cGlyeV9tb250aDogY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5tb250aC5wYXJzZShleHBpcnlbMF0pLFxuICAgICAgICAgICAgICAgIGV4cGlyeV95ZWFyOiBjcmVkaXRjYXJkcy5leHBpcmF0aW9uLnllYXIucGFyc2UoZXhwaXJ5WzFdLCB0cnVlKSxcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25fdmFsdWU6IGN2dixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaWxsaW5nX2FkZHJlc3M6IG9taXROdWxsU3RyaW5nKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzMSxcbiAgICAgICAgICAgICAgICBhZGRyZXNzMixcbiAgICAgICAgICAgICAgICBjaXR5LFxuICAgICAgICAgICAgICAgIHBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgIHN0YXRlX29yX3Byb3ZpbmNlX2NvZGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9jb2RlLFxuICAgICAgICAgICAgICAgIGNvbXBhbnksXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgICAgICAgZGVmYXVsdF9pbnN0cnVtZW50LFxuICAgICAgICAgICAgY3VycmVuY3lfY29kZSxcbiAgICAgICAgfSksXG4gICAgfSlcbiAgICAgICAgLmRvbmUoZG9uZSlcbiAgICAgICAgLmZhaWwoZmFpbCk7XG59O1xuXG5leHBvcnQgY29uc3QgRm9ybWF0dGVycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgZm9ybWF0IGZvciBjcmVkaXQgY2FyZCBudW1iZXJcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRDcmVkaXRDYXJkTnVtYmVyRm9ybWF0OiBmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgJChmaWVsZCkub24oJ2tleXVwJywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gY3JlZGl0Y2FyZHMuY2FyZC5mb3JtYXQoY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZSh0YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBmb3JtYXQgZm9yIGV4cGlyYXRpb24gZGF0ZVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldEV4cGlyYXRpb25Gb3JtYXQ6IGZpZWxkID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICAkKGZpZWxkKS5vbigna2V5dXAnLCAoeyB0YXJnZXQsIHdoaWNoIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHdoaWNoID09PSA4ICYmIC8uKihcXC8pJC8udGVzdCh0YXJnZXQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZlRhcmdldC52YWx1ZSA9IHRhcmdldC52YWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudmFsdWUubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aGljaCAhPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsxLTldXFwvfFsyLTldKSQvZywgJzAkMS8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oMFsxLTldfDFbMC0yXSkkL2csICckMS8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oWzAtMV0pKFszLTldKSQvZywgJzAkMS8kMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXigwWzEtOV18MVswLTJdKShbMC05XXsyfSkkL2csICckMS8kMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbMF0rKVxcL3xbMF0rJC9nLCAnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15cXGRcXC9dfF5bXFwvXSokL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBWYWxpZGF0b3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBjcmVkaXQgY2FyZCBudW1iZXJcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxuICAgICAqL1xuICAgIHNldENyZWRpdENhcmROdW1iZXJWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIGNyZWRpdGNhcmRzLmNhcmQuaXNWYWxpZChjcmVkaXRjYXJkcy5jYXJkLnBhcnNlKHZhbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgdmFsaWRhdGlvbiBmb3IgZXhwaXJhdGlvbiBkYXRlXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSBlcnJvck1lc3NhZ2VcbiAgICAgKi9cbiAgICBzZXRFeHBpcmF0aW9uVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJ5ID0gdmFsLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIC9eKDBbMS05XXwxWzAtMl0pXFwvKFswLTldezJ9KSQvLnRlc3QodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICYmICFjcmVkaXRjYXJkcy5leHBpcmF0aW9uLmlzUGFzdChjcmVkaXRjYXJkcy5leHBpcmF0aW9uLm1vbnRoLnBhcnNlKGV4cGlyeVswXSksIGNyZWRpdGNhcmRzLmV4cGlyYXRpb24ueWVhci5wYXJzZShleHBpcnlbMV0sIHRydWUpKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIG5hbWUgb24gY2FyZFxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICovXG4gICAgc2V0TmFtZU9uQ2FyZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9ICEhdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIGN2dlxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnl9IGNhcmRUeXBlIFRoZSBjcmVkaXQgY2FyZCBudW1iZXIgdHlwZVxuICAgICAqL1xuICAgIHNldEN2dlZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UsIGNhcmRUeXBlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGNhcmRUeXBlID09PSAnZnVuY3Rpb24nID8gY2FyZFR5cGUoKSA6IGNhcmRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIGNyZWRpdGNhcmRzLmN2Yy5pc1ZhbGlkKHZhbCwgdHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJscykge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKGNvdW50ZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgbm9Db21wYXJlTWVzc2FnZSwgdXJscyB9KSB7XG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XG5cbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJscyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdhW2RhdGEtY29tcGFyZS1uYXZdJywgKCkgPT4ge1xuICAgICAgICBjb25zdCAkY2xpY2tlZENoZWNrZWRJbnB1dCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xuXG4gICAgICAgIGlmICgkY2xpY2tlZENoZWNrZWRJbnB1dC5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobm9Db21wYXJlTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsIm5vZCIsIldpc2hsaXN0IiwidmFsaWRhdGlvbiIsInN0YXRlQ291bnRyeSIsImNsYXNzaWZ5Rm9ybSIsIlZhbGlkYXRvcnMiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsImNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImNyZWRpdENhcmRUeXBlIiwic3RvcmVJbnN0cnVtZW50IiwiQ0NWYWxpZGF0b3JzIiwiRm9ybWF0dGVycyIsIkNDRm9ybWF0dGVycyIsInNob3dBbGVydE1vZGFsIiwiY29tcGFyZVByb2R1Y3RzIiwiQWNjb3VudCIsIl9QYWdlTWFuYWdlciIsImNvbnRleHQiLCJfdGhpcyIsImNhbGwiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsIiRzdGF0ZSIsIiQiLCIkYm9keSIsIl9pbmhlcml0c0xvb3NlIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsIiRlZGl0QWNjb3VudEZvcm0iLCIkYWRkcmVzc0Zvcm0iLCIkaW5ib3hGb3JtIiwiJGFjY291bnRSZXR1cm5Gb3JtIiwiJHBheW1lbnRNZXRob2RGb3JtIiwiJHJlb3JkZXJGb3JtIiwiJGludm9pY2VCdXR0b24iLCIkYmlnQ29tbWVyY2UiLCJ3aW5kb3ciLCJCaWdDb21tZXJjZSIsInBhc3N3b3JkUmVxdWlyZW1lbnRzIiwibG9hZCIsImxlbmd0aCIsInJlZ2lzdGVyRWRpdEFjY291bnRWYWxpZGF0aW9uIiwiaXMiLCJvbiIsImxlZnQiLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwidG9wIiwiYXZhaWxIZWlnaHQiLCJ1cmwiLCJkYXRhIiwib3BlbiIsImluaXRBZGRyZXNzRm9ybVZhbGlkYXRpb24iLCJyZWdpc3RlckluYm94VmFsaWRhdGlvbiIsImluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24iLCJpbml0UGF5bWVudE1ldGhvZEZvcm1WYWxpZGF0aW9uIiwiaW5pdFJlb3JkZXJGb3JtIiwicmVuZGVyQWNjb3VudFBheW1lbnRzIiwiX3RoaXMkY29udGV4dCIsImNvdW50cmllcyIsInBheW1lbnRzVXJsIiwic3RvcmVIYXNoIiwic3RvcmVMb2NhbGUiLCJ2YXVsdFRva2VuIiwic2hvcHBlcklkIiwiY3VzdG9tZXJFbWFpbCIsInByb3ZpZGVySWQiLCJjdXJyZW5jeUNvZGUiLCJwYXltZW50TWV0aG9kc1VybCIsInBheW1lbnRQcm92aWRlckluaXRpYWxpemF0aW9uRGF0YSIsInRoZW1lU2V0dGluZ3MiLCJzdHlsZXMiLCJpbnB1dEJhc2UiLCJjb2xvciIsImJvcmRlckNvbG9yIiwiaW5wdXRWYWxpZGF0aW9uRXJyb3IiLCJpbnB1dFZhbGlkYXRpb25TdWNjZXNzIiwic3VibWl0QnV0dG9uIiwiYmFja2dyb3VuZENvbG9yIiwiY3Vyc29yIiwiY2FuY2VsQnV0dG9uIiwibGFiZWwiLCJ2YWxpZGF0aW9uRXJyb3IiLCJoZWFkaW5nIiwic3RvcmVDb250ZXh0RGF0YSIsImVycm9ySGFuZGxlciIsImJpbmREZWxldGVBZGRyZXNzIiwiYmluZERlbGV0ZVBheW1lbnRNZXRob2QiLCJldmVudCIsIm1lc3NhZ2UiLCJjdXJyZW50VGFyZ2V0IiwiY29uZmlybSIsInByZXZlbnREZWZhdWx0IiwiX3RoaXMyIiwiJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcyIsInN1Ym1pdEZvcm0iLCJmaW5kIiwicmVtb3ZlIiwiZWFjaCIsImluZGV4IiwicHJvZHVjdENoZWNrYm94IiwicHJvZHVjdElkIiwidmFsIiwiJGlucHV0IiwidHlwZSIsIm5hbWUiLCJ2YWx1ZSIsImFwcGVuZCIsInNlbGVjdEl0ZW0iLCJfdGhpczMiLCJ2YWxpZGF0aW9uTW9kZWwiLCIkc3RhdGVFbGVtZW50IiwiJHppcEVsZW1lbnQiLCJhZGRyZXNzVmFsaWRhdG9yIiwic3VibWl0IiwidGFwIiwiYWRkIiwiaXNaaXBSZXF1aXJlZCIsInByb3AiLCIkbGFzdCIsImVyciIsImZpZWxkIiwiaXNTdGF0ZVJlcXVpcmVkIiwiRXJyb3IiLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiZmllbGRfbm90X2JsYW5rIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsImhhbmRsZVppcFZhbGlkYXRpb24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJlcnJvck1lc3NhZ2UiLCJmb3JtU3VibWl0IiwiaSIsImVsZSIsInBhcnNlSW50IiwiX3RoaXM0IiwiYXR0ciIsImZpcnN0TmFtZUxhYmVsIiwibGFzdE5hbWVMYWJlbCIsImNvbXBhbnlMYWJlbCIsInBob25lTGFiZWwiLCJhZGRyZXNzMUxhYmVsIiwiYWRkcmVzczJMYWJlbCIsImNpdHlMYWJlbCIsImNvdW50cnlMYWJlbCIsImNob29zZUNvdW50cnlMYWJlbCIsInN0YXRlTGFiZWwiLCJwb3N0YWxDb2RlTGFiZWwiLCJwYXltZW50TWV0aG9kU2VsZWN0b3IiLCJwYXltZW50TWV0aG9kVmFsaWRhdG9yIiwiY2FyZFR5cGUiLCJfcmVmIiwidGFyZ2V0Iiwic2libGluZ3MiLCJjc3MiLCJzZXRDcmVkaXRDYXJkTnVtYmVyVmFsaWRhdGlvbiIsImNyZWRpdENhcmROdW1iZXIiLCJzZXRFeHBpcmF0aW9uVmFsaWRhdGlvbiIsImV4cGlyYXRpb24iLCJzZXROYW1lT25DYXJkVmFsaWRhdGlvbiIsIm5hbWVPbkNhcmQiLCJzZXRDdnZWYWxpZGF0aW9uIiwiY3Z2Iiwic2V0Q3JlZGl0Q2FyZE51bWJlckZvcm1hdCIsInNldEV4cGlyYXRpb25Gb3JtYXQiLCJfcmVkdWNlIiwic2VyaWFsaXplQXJyYXkiLCJvYmoiLCJpdGVtIiwicmVmT2JqIiwiY291bnRyeSIsIl9maW5kIiwiX3JlZjIiLCJzdGF0ZSIsInN0YXRlcyIsIl9yZWYzIiwiY291bnRyeV9jb2RlIiwiY29kZSIsInN0YXRlX29yX3Byb3ZpbmNlX2NvZGUiLCJkZWZhdWx0X2luc3RydW1lbnQiLCJsb2NhdGlvbiIsImhyZWYiLCJnZW5lcmljX2Vycm9yIiwiZm9ybUVkaXRTZWxlY3RvciIsImVkaXRWYWxpZGF0b3IiLCJkZWxheSIsImVtYWlsU2VsZWN0b3IiLCIkZW1haWxFbGVtZW50IiwicGFzc3dvcmRTZWxlY3RvciIsIiRwYXNzd29yZEVsZW1lbnQiLCJwYXNzd29yZDJTZWxlY3RvciIsIiRwYXNzd29yZDJFbGVtZW50IiwiY3VycmVudFBhc3N3b3JkU2VsZWN0b3IiLCIkY3VycmVudFBhc3N3b3JkIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRfZW1haWwiLCJfdGhpcyR2YWxpZGF0aW9uRGljdGkiLCJlbnRlclBhc3N3b3JkIiwicGFzc3dvcmQiLCJtYXRjaFBhc3N3b3JkIiwicGFzc3dvcmRfbWF0Y2giLCJzZXRQYXNzd29yZFZhbGlkYXRpb24iLCJlcnJvciIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInJlc3VsdCIsImN1cnJlbnRQYXNzd29yZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwic2V0VGltZW91dCIsImVhcmxpZXN0RXJyb3IiLCJwcmV2IiwidHJpZ2dlciIsImluYm94VmFsaWRhdG9yIiwiTnVtYmVyIiwiZW50ZXJPcmRlck51bSIsImVudGVyU3ViamVjdCIsImVudGVyTWVzc2FnZSIsImRlZmF1bHQiLCJjcmVkaXRjYXJkcyIsIm9taXROdWxsU3RyaW5nIiwia2V5IiwiY2FyZCIsInBhcnNlIiwiZG9uZSIsImZhaWwiLCJwcm92aWRlcl9pZCIsImN1cnJlbmN5X2NvZGUiLCJjcmVkaXRfY2FyZF9udW1iZXIiLCJuYW1lX29uX2NhcmQiLCJhZGRyZXNzMSIsImFkZHJlc3MyIiwiY2l0eSIsInBvc3RhbF9jb2RlIiwiY29tcGFueSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJlbWFpbCIsInBob25lIiwiZXhwaXJ5Iiwic3BsaXQiLCJhamF4IiwiZGF0YVR5cGUiLCJtZXRob2QiLCJjYWNoZSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiQWNjZXB0IiwiSlNPTiIsInN0cmluZ2lmeSIsImluc3RydW1lbnQiLCJjYXJkaG9sZGVyX25hbWUiLCJudW1iZXIiLCJleHBpcnlfbW9udGgiLCJtb250aCIsImV4cGlyeV95ZWFyIiwieWVhciIsInZlcmlmaWNhdGlvbl92YWx1ZSIsImJpbGxpbmdfYWRkcmVzcyIsInJlZlRhcmdldCIsImZvcm1hdCIsIl9yZWY0Iiwid2hpY2giLCJ0ZXN0Iiwic2xpY2UiLCJyZXBsYWNlIiwidmFsaWRhdG9yIiwiaXNWYWxpZCIsImlzUGFzdCIsImN2YyIsImRlY3JlbWVudENvdW50ZXIiLCJjb3VudGVyIiwiaW5kZXhPZiIsInNwbGljZSIsImluY3JlbWVudENvdW50ZXIiLCJwdXNoIiwidXBkYXRlQ291bnRlck5hdiIsIiRsaW5rIiwidXJscyIsImFkZENsYXNzIiwiY29tcGFyZSIsImpvaW4iLCJodG1sIiwicmVtb3ZlQ2xhc3MiLCJub0NvbXBhcmVNZXNzYWdlIiwiY29tcGFyZUNvdW50ZXIiLCIkY29tcGFyZUxpbmsiLCIkY2hlY2tlZCIsIm1hcCIsImVsZW1lbnQiLCJnZXQiLCJ0cmlnZ2VySGFuZGxlciIsInByb2R1Y3QiLCIkY2xpY2tlZENvbXBhcmVMaW5rIiwiY2hlY2tlZCIsIiRjbGlja2VkQ2hlY2tlZElucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==