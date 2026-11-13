"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }







var Cart = /*#__PURE__*/function (_PageManager) {
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  _inheritsLoose(Cart, _PageManager);
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartCoupons = $('[data-cart-coupons]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!Number.isInteger(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }
      var modalForm = _this4.$modal.find('form');
      var refreshContent = function refreshContent() {
        return _this4.refreshContent();
      };
      function onSubmit(_x) {
        return _onSubmit.apply(this, arguments);
      }
      function _onSubmit() {
        _onSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                event.preventDefault();
                _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.postFormData(new FormData(this), function () {
                  modal.close();
                  refreshContent();
                });
              case 1:
                return _context.a(2);
            }
          }, _callee, this);
        }));
        return _onSubmit.apply(this, arguments);
      }
      modalForm.on('submit', onSubmit);
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    }, {
      baseUrl: this.context.secureBaseUrl
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(err);
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      }, {
        baseUrl: _this4.context.secureBaseUrl
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        coupons: 'cart/coupons',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      },
      baseUrl: this.context.secureBaseUrl
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartCoupons.html(response.coupons);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      if (!quantity) {
        return window.location.reload();
      }
      _this5.bindEvents();
      _this5.$overlay.hide();
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on({
      focus: function onQtyFocus() {
        preVal = this.value;
      },
      change: function change(event) {
        var $target = $(event.currentTarget);
        event.preventDefault();

        // update cart quantity
        cartUpdateQtyTextChange($target, preVal);
      }
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = this.context.multiCouponUIEnabled ? $('[data-coupon-form]') : $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    if (this.context.multiCouponUIEnabled) {
      var $couponTrigger = $('[data-coupon-trigger]');

      // Toggle coupon form visibility
      $couponTrigger.on('click', function (event) {
        event.preventDefault();
        $couponForm.show();
        $codeInput.trigger('focus');
      });
    } else {
      $('.coupon-code-add').on('click', function (event) {
        event.preventDefault();
        $(event.currentTarget).hide();
        $couponContainer.show();
        $couponContainer.attr('aria-hidden', false);
        $('.coupon-code-cancel').show();
        $codeInput.trigger('focus');
      });
      $('.coupon-code-cancel').on('click', function (event) {
        event.preventDefault();
        $couponContainer.hide();
        $couponContainer.attr('aria-hidden', true);
        $('.coupon-code-cancel').hide();
        $('.coupon-code-add').show();
      });
    }
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)($codeInput.data('error'));
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $certContainer.attr('aria-hidden', false);
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $certContainer.attr('aria-hidden', true);
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(validationDictionary.invalid_gift_certificate);
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(resp.data.errors.join('\n'));
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form',
        baseUrl: _this9.context.secureBaseUrl
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
    $('.cart-item-option-remove').on('click', function () {
      window.confirm(_this9.context.giftWrappingRemoveMessage);
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();
    this.bindDiscountToggle();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages, this.context.secureBaseUrl);
  };
  _proto.bindDiscountToggle = function bindDiscountToggle() {
    var $discountToggle = $('[data-discount-toggle]');
    var $discountDetails = $('[data-discount-details]');
    var $discountIcon = $('.cart-discount-icon');
    $discountToggle.on('click', function (event) {
      event.preventDefault();
      $discountDetails.slideToggle(300);
      $discountIcon.toggleClass('is-open');
    });
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingEstimator)
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages, secureBaseUrl) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.secureBaseUrl = secureBaseUrl;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field, isStateRequired) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(err);
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.$state.length > 0 && _this3.shippingValidator !== undefined) {
        // remove existing validation first, it can be safely called on unregistered elements
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if (isStateRequired) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        if (!$field.is('select')) {
          $field.attr('placeholder', 'State/province');
        }
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      var requestOptions = _this4.secureBaseUrl ? {
        baseUrl: _this4.secureBaseUrl
      } : {};
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      }, requestOptions);
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();


/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartItemDetails)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_this, hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback, {
        baseUrl: _this.context.secureBaseUrl
      });
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






/**
 * Extracts attributes from a jQuery element into a plain object
 * @param {jQuery} element - The element to extract attributes from
 * @returns {Object} Plain object with attribute name-value pairs
 */
function getElementAttributes(element) {
  return lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(element.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
}

/**
 * Creates a select element for states when the country has states AND they are required
 * @param {jQuery} stateElement - The current state input element
 * @param {Object} context - Context object containing translated strings
 * @returns {jQuery} The new select element
 */
function makeStateSelectRequired(stateElement, context) {
  var attrs = getElementAttributes(stateElement);
  var replacementAttributes = Object.assign({}, attrs, {
    "class": 'form-select',
    'aria-required': 'true'
  });
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * Creates a select element for states when the country has states but they are NOT required
 * @param {jQuery} stateElement - The current state input element
 * @returns {jQuery} The new select element
 */
function makeStateSelectOptional(stateElement) {
  var attrs = getElementAttributes(stateElement);
  var replacementAttributes = Object.assign({}, attrs, {
    "class": 'form-select',
    'aria-required': 'false'
  });
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }

  // Hide the required indicator since state is optional
  $newElement.prev().find('small').hide();
  return $newElement;
}

/**
 * Creates a text input for states when the country has no states list
 * @param {jQuery} stateElement - The current state element
 * @returns {jQuery} The new text input element
 */
function makeStateTextOptional(stateElement) {
  var attrs = getElementAttributes(stateElement);
  var replacementAttributes = Object.assign({}, attrs, {
    type: 'text',
    "class": 'form-input'
  });
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 * Makes the zip/postal code field required and shows the required indicator
 * @param {jQuery} $zipElement The zip/postal code field element
 * @param {Object} context The context object containing translated strings
 */
function makeZipRequired($zipElement, context) {
  $zipElement.prop('required', true);
  // since the attribute is set within templates/components/common/forms/*,
  // we explicitly set aria-required to ensure assistive technologies announce this field correctly after dynamic changes
  $zipElement.attr('aria-required', 'true');
  if ($zipElement.prev().find('small').length === 0) {
    $zipElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $zipElement.prev().find('small').show();
  }
}

/**
 * Makes the zip/postal code field optional and hides the required indicator
 *
 * DOM Structure Expectation:
 * The function assumes the following DOM structure:
 * <label>
 *   <span>Zip/Postal Code</span>
 *   <small>*</small> <!-- required indicator -->
 * </label>
 * <input data-field-type="Zip" />
 *
 * @param {jQuery} $zipElement The zip/postal code field element
 */
function makeZipOptional($zipElement) {
  $zipElement.prop('required', false);
  // since the attribute is set within templates/components/common/forms/*,
  // we explicitly set aria-required to ensure assistive technologies announce this field correctly after dynamic changes
  $zipElement.attr('aria-required', false);
  var $prevElement = $zipElement.prev();
  if ($prevElement.length > 0) {
    var $requiredIndicator = $prevElement.find('small');
    if ($requiredIndicator.length > 0) {
      $requiredIndicator.hide();
    }
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
// eslint-disable-next-line default-param-last
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, {
      baseUrl: context.secureBaseUrl
    }, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      var $zipInput = $('[data-field-type="Zip"]');
      var hasStates = !lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states);
      var requiresState = response.data.requiresSubdivision !== undefined ? response.data.requiresSubdivision : hasStates;
      var $newElement;
      if (hasStates) {
        if (requiresState) {
          $newElement = makeStateSelectRequired($currentInput, context);
        } else {
          $newElement = makeStateSelectOptional($currentInput);
        }
        addOptions(response.data, $newElement, options);
      } else {
        $newElement = makeStateTextOptional($currentInput);
      }
      if ($zipInput.length > 0) {
        // Default to true when requiresPostalCodes is undefined to maintain original behavior
        var requiresZip = response.data.requiresPostalCodes !== undefined ? response.data.requiresPostalCodes : true;
        if (requiresZip) {
          makeZipRequired($zipInput, context);
        } else {
          makeZipOptional($zipInput);
        }
      }
      callback(null, $newElement, requiresState);
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFDQSx1S0FBQUEsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsd0JBQUFDLE1BQUEsR0FBQUEsTUFBQSxPQUFBQyxDQUFBLEdBQUFGLENBQUEsQ0FBQUcsUUFBQSxrQkFBQUMsQ0FBQSxHQUFBSixDQUFBLENBQUFLLFdBQUEsOEJBQUFDLEVBQUFOLENBQUEsRUFBQUUsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUMsQ0FBQSxHQUFBTCxDQUFBLElBQUFBLENBQUEsQ0FBQU0sU0FBQSxZQUFBQyxTQUFBLEdBQUFQLENBQUEsR0FBQU8sU0FBQSxFQUFBQyxDQUFBLEdBQUFDLE1BQUEsQ0FBQUMsTUFBQSxDQUFBTCxDQUFBLENBQUFDLFNBQUEsVUFBQUssbUJBQUEsQ0FBQUgsQ0FBQSx1QkFBQVYsQ0FBQSxFQUFBRSxDQUFBLEVBQUFFLENBQUEsUUFBQUUsQ0FBQSxFQUFBQyxDQUFBLEVBQUFHLENBQUEsRUFBQUksQ0FBQSxNQUFBQyxDQUFBLEdBQUFYLENBQUEsUUFBQVksQ0FBQSxPQUFBQyxDQUFBLEtBQUFGLENBQUEsS0FBQWIsQ0FBQSxLQUFBZ0IsQ0FBQSxFQUFBcEIsQ0FBQSxFQUFBcUIsQ0FBQSxFQUFBQyxDQUFBLEVBQUFOLENBQUEsRUFBQU0sQ0FBQSxDQUFBQyxJQUFBLENBQUF2QixDQUFBLE1BQUFzQixDQUFBLFdBQUFBLEVBQUFyQixDQUFBLEVBQUFDLENBQUEsV0FBQU0sQ0FBQSxHQUFBUCxDQUFBLEVBQUFRLENBQUEsTUFBQUcsQ0FBQSxHQUFBWixDQUFBLEVBQUFtQixDQUFBLENBQUFmLENBQUEsR0FBQUYsQ0FBQSxFQUFBbUIsQ0FBQSxnQkFBQUMsRUFBQXBCLENBQUEsRUFBQUUsQ0FBQSxTQUFBSyxDQUFBLEdBQUFQLENBQUEsRUFBQVUsQ0FBQSxHQUFBUixDQUFBLEVBQUFI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d2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBzaG93QWxlcnRNb2RhbCwgTW9kYWxFdmVudHMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgQ2FydEl0ZW1EZXRhaWxzIGZyb20gJy4vY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLiRtb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudCA9ICQoJ1tkYXRhLWNhcnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xuICAgICAgICB0aGlzLiRjYXJ0Q291cG9ucyA9ICQoJ1tkYXRhLWNhcnQtY291cG9uc10nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMgPSAkKCdbZGF0YS1jYXJ0LWFkZGl0aW9uYWwtY2hlY2tvdXQtYnV0dG9uc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gbnVsbDtcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHRoaXMuc2V0QXBwbGVQYXlTdXBwb3J0KCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIHNldEFwcGxlUGF5U3VwcG9ydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudC5hZGRDbGFzcygnYXBwbGUtcGF5LXN1cHBvcnRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZSgkdGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkID0gaXRlbUlkO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcGFyc2VJbnQoJGVsLnZhbCgpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpID09PSAnaW5jJyA/IG9sZFF0eSArIDEgOiBvbGRRdHkgLSAxO1xuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtaW5FcnJvcik7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbChtYXhFcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcblxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsID0gbnVsbCkge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3QgJGVsID0gJChgI3F0eS0ke2l0ZW1JZH1gKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3Qgb2xkUXR5ID0gcHJlVmFsICE9PSBudWxsID8gcHJlVmFsIDogbWluUXR5O1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gcGFyc2VJbnQoTnVtYmVyKCRlbC52YWwoKSksIDEwKTtcbiAgICAgICAgbGV0IGludmFsaWRFbnRyeTtcblxuICAgICAgICAvLyBEb2VzIG5vdCBxdWFsaXR5IGZvciBtaW4vbWF4IHF1YW50aXR5XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihuZXdRdHkpKSB7XG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwodGhpcy5jb250ZXh0LmludmFsaWRFbnRyeU1lc3NhZ2UucmVwbGFjZSgnW0VOVFJZXScsIGludmFsaWRFbnRyeSkpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKG1pbkVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKG1heEVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHF1YW50aXR5IGlzIGNoYW5nZWQgXCIxXCIgZnJvbSBcIjBcIiwgd2UgaGF2ZSB0byByZW1vdmUgdGhlIHJvdy5cbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQocmVtb3ZlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpIHtcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHsgcHJvZHVjdEZvckNoYW5nZUlkOiBwcm9kdWN0SWQsIC4uLnRoaXMuY29udGV4dCB9O1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLiRtb2RhbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2NvbmZpZ3VyZS1wcm9kdWN0JyxcbiAgICAgICAgfTtcblxuICAgICAgICBtb2RhbC5vcGVuKCk7XG4gICAgICAgIHRoaXMuJG1vZGFsLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYWRkQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5jb25maWd1cmVJbkNhcnQoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgbW9kYWwudXBkYXRlQ29udGVudChyZXNwb25zZS5jb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgdGhpcy4kbW9kYWwpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0ID0gJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmxlbmd0aCAmJiBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIuY3NzKCdoZWlnaHQnLCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuJG1vZGFsLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25DaGFuZ2VIYW5kbGVyKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGFsLm9uZShNb2RhbEV2ZW50cy5vcGVuZWQsIG9wdGlvbkNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtb2RhbEZvcm0gPSB0aGlzLiRtb2RhbC5maW5kKCdmb3JtJyk7XG4gICAgICAgICAgICBjb25zdCByZWZyZXNoQ29udGVudCA9ICgpID0+IHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgIGFzeW5jIGZ1bmN0aW9uIG9uU3VibWl0KGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5wb3N0Rm9ybURhdGEobmV3IEZvcm1EYXRhKHRoaXMpLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vZGFsRm9ybS5vbignc3VibWl0Jywgb25TdWJtaXQpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IENhcnRJdGVtRGV0YWlscyh0aGlzLiRtb2RhbCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgfSwgeyBiYXNlVXJsOiB0aGlzLmNvbnRleHQuc2VjdXJlQmFzZVVybCB9KTtcblxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQoY3VycmVudFRhcmdldCkuZmluZCgnZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCdwLmFsZXJ0Qm94LW1lc3NhZ2UnLCAkbWVzc2FnZUJveCkudGV4dChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7IGJhc2VVcmw6IHRoaXMuY29udGV4dC5zZWN1cmVCYXNlVXJsIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWZyZXNoQ29udGVudChyZW1vdmUpIHtcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XG4gICAgICAgIGNvbnN0ICRjYXJ0UGFnZVRpdGxlID0gJCgnW2RhdGEtY2FydC1wYWdlLXRpdGxlXScpO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiAnY2FydC9jb250ZW50JyxcbiAgICAgICAgICAgICAgICBjb3Vwb25zOiAnY2FydC9jb3Vwb25zJyxcbiAgICAgICAgICAgICAgICB0b3RhbHM6ICdjYXJ0L3RvdGFscycsXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlczogJ2NhcnQvc3RhdHVzLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zOiAnY2FydC9hZGRpdGlvbmFsLWNoZWNrb3V0LWJ1dHRvbnMnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2VVcmw6IHRoaXMuY29udGV4dC5zZWN1cmVCYXNlVXJsLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGl0ZW0gZnJvbSBjYXJ0PyBSZWxvYWRcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0Q29udGVudC5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kY2FydENvdXBvbnMuaHRtbChyZXNwb25zZS5jb3Vwb25zKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzLmh0bWwocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZXMpO1xuICAgICAgICAgICAgdGhpcy4kY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMuaHRtbChyZXNwb25zZS5hZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zKTtcblxuICAgICAgICAgICAgJGNhcnRQYWdlVGl0bGUucmVwbGFjZVdpdGgocmVzcG9uc2UucGFnZVRpdGxlKTtcblxuICAgICAgICAgICAgY29uc3QgcXVhbnRpdHkgPSAkKCdbZGF0YS1jYXJ0LXF1YW50aXR5XScsIHRoaXMuJGNhcnRDb250ZW50KS5kYXRhKCdjYXJ0UXVhbnRpdHknKSB8fCAwO1xuXG4gICAgICAgICAgICBpZiAoIXF1YW50aXR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgJCgnYm9keScpLnRyaWdnZXIoJ2NhcnQtcXVhbnRpdHktdXBkYXRlJywgcXVhbnRpdHkpO1xuXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXG4gICAgICAgICAgICAgICAgLmZpbHRlcihgW2RhdGEtYWN0aW9uPScke3RoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9ufSddYClcbiAgICAgICAgICAgICAgICAudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZENhcnRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlYm91bmNlVGltZW91dCA9IDQwMDtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0VXBkYXRlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IGJpbmQoZGVib3VuY2UodGhpcy5jYXJ0UmVtb3ZlSXRlbSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGxldCBwcmVWYWw7XG5cbiAgICAgICAgLy8gY2FydCB1cGRhdGVcbiAgICAgICAgJCgnW2RhdGEtY2FydC11cGRhdGVdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FydCBxdHkgbWFudWFsbHkgdXBkYXRlc1xuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbih7XG4gICAgICAgICAgICBmb2N1czogZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcbiAgICAgICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5nZTogZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgY2FydCBxdWFudGl0eVxuICAgICAgICAgICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm1EZWxldGUnKTtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHN0cmluZywge1xuICAgICAgICAgICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncHJvZHVjdElkJyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcbiAgICAgICAgICAgIHRoaXMuY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFByb21vQ29kZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xuICAgICAgICBjb25zdCAkY291cG9uRm9ybSA9IHRoaXMuY29udGV4dC5tdWx0aUNvdXBvblVJRW5hYmxlZCA/ICQoJ1tkYXRhLWNvdXBvbi1mb3JtXScpIDogJCgnLmNvdXBvbi1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjb2RlSW5wdXQgPSAkKCdbbmFtZT1cImNvdXBvbmNvZGVcIl0nLCAkY291cG9uRm9ybSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29udGV4dC5tdWx0aUNvdXBvblVJRW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc3QgJGNvdXBvblRyaWdnZXIgPSAkKCdbZGF0YS1jb3Vwb24tdHJpZ2dlcl0nKTtcblxuICAgICAgICAgICAgLy8gVG9nZ2xlIGNvdXBvbiBmb3JtIHZpc2liaWxpdHlcbiAgICAgICAgICAgICRjb3Vwb25UcmlnZ2VyLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJGNvdXBvbkZvcm0uc2hvdygpO1xuICAgICAgICAgICAgICAgICRjb2RlSW5wdXQudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5zaG93KCk7XG4gICAgICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5hdHRyKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykuc2hvdygpO1xuICAgICAgICAgICAgICAgICRjb2RlSW5wdXQudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmF0dHIoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCgkY29kZUlucHV0LmRhdGEoJ2Vycm9yJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNlcnRGb3JtID0gJCgnLmNhcnQtZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0SW5wdXQgPSAkKCdbbmFtZT1cImNlcnRjb2RlXCJdJywgJGNlcnRGb3JtKTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjZXJ0SW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmICghY2hlY2tJc0dpZnRDZXJ0VmFsaWQoY29kZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSh0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh2YWxpZGF0aW9uRGljdGlvbmFyeS5pbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgJCgnW2RhdGEtaXRlbS1naWZ0d3JhcF0nKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1HaWZ0d3JhcCcpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogJ2NhcnQvbW9kYWxzL2dpZnQtd3JhcHBpbmctZm9ybScsXG4gICAgICAgICAgICAgICAgYmFzZVVybDogdGhpcy5jb250ZXh0LnNlY3VyZUJhc2VVcmwsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zKGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jYXJ0LWl0ZW0tb3B0aW9uLXJlbW92ZScpLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5jb25maXJtKHRoaXMuY29udGV4dC5naWZ0V3JhcHBpbmdSZW1vdmVNZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZERpc2NvdW50VG9nZ2xlKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICBjb25zdCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuY29udGV4dC5zaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzLCB0aGlzLmNvbnRleHQuc2VjdXJlQmFzZVVybCk7XG4gICAgfVxuXG4gICAgYmluZERpc2NvdW50VG9nZ2xlKCkge1xuICAgICAgICBjb25zdCAkZGlzY291bnRUb2dnbGUgPSAkKCdbZGF0YS1kaXNjb3VudC10b2dnbGVdJyk7XG4gICAgICAgIGNvbnN0ICRkaXNjb3VudERldGFpbHMgPSAkKCdbZGF0YS1kaXNjb3VudC1kZXRhaWxzXScpO1xuICAgICAgICBjb25zdCAkZGlzY291bnRJY29uID0gJCgnLmNhcnQtZGlzY291bnQtaWNvbicpO1xuXG4gICAgICAgICRkaXNjb3VudFRvZ2dsZS5vbignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkZGlzY291bnREZXRhaWxzLnNsaWRlVG9nZ2xlKDMwMCk7XG4gICAgICAgICAgICAkZGlzY291bnRJY29uLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzLCBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xuaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwcGluZ0VzdGltYXRvciB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQsIHNoaXBwaW5nRXJyb3JNZXNzYWdlcywgc2VjdXJlQmFzZVVybCkge1xuICAgICAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSBzaGlwcGluZ0Vycm9yTWVzc2FnZXM7XG4gICAgICAgIHRoaXMuc2VjdXJlQmFzZVVybCA9IHNlY3VyZUJhc2VVcmw7XG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpO1xuICAgICAgICB0aGlzLmJpbmRFc3RpbWF0b3JFdmVudHMoKTtcbiAgICB9XG5cbiAgICBpbml0Rm9ybVZhbGlkYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQgPSAkKCcuc2hpcHBpbmctcXVvdGVzJyk7XG5cbiAgICAgICAgdGhpcy5zaGlwcGluZ0VzdGltYXRvciA9ICdmb3JtW2RhdGEtc2hpcHBpbmctZXN0aW1hdG9yXSc7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSAuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0YCxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdCcsIHRoaXMuJGVsZW1lbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIC8vIGVzdGltYXRvciBlcnJvciBtZXNzYWdlcyBhcmUgYmVpbmcgaW5qZWN0ZWQgaW4gaHRtbCBhcyBhIHJlc3VsdFxuICAgICAgICAgICAgLy8gb2YgdXNlciBzdWJtaXQ7IGNsZWFyaW5nIGFuZCBhZGRpbmcgcm9sZSBvbiBzdWJtaXQgcHJvdmlkZXNcbiAgICAgICAgICAgIC8vIHJlZ3VsYXIgYW5ub3VuY2VtZW50IG9mIHRoZXNlIGVycm9yIG1lc3NhZ2VzXG4gICAgICAgICAgICBpZiAoc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJykpIHtcbiAgICAgICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LnJlbW92ZUF0dHIoJ3JvbGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAvLyBXaGVuIHN3aXRjaGluZyBiZXR3ZWVuIGNvdW50cmllcywgdGhlIHN0YXRlL3JlZ2lvbiBpcyBkeW5hbWljXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBhcmVBbGwoJ3ZhbGlkJykgd2lsbCBjaGVjayBjb3VudHJ5IGZvciB2YWxpZGl0eVxuICAgICAgICAgICAgaWYgKCQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCkudmFsKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYmluZFZhbGlkYXRpb24oKTtcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XG4gICAgfVxuXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY291bnRyeUlkID0gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5zaGlwcGluZ0Vycm9yTWVzc2FnZXMuY291bnRyeSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzLnByb3ZpbmNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGJldHdlZW4gZGVmYXVsdCBzaGlwcGluZyBhbmQgdXBzIHNoaXBwaW5nIHJhdGVzXG4gICAgICovXG4gICAgYmluZFVQU1JhdGVzKCkge1xuICAgICAgICBjb25zdCBVUFNSYXRlVG9nZ2xlID0gJy5lc3RpbWF0b3ItZm9ybS10b2dnbGVVUFNSYXRlJztcblxuICAgICAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgVVBTUmF0ZVRvZ2dsZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybVVwcyA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tdXBzJyk7XG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1VcHMudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtRGVmYXVsdC50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xuICAgICAgICBsZXQgJGxhc3Q7XG5cbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxuICAgICAgICBzdGF0ZUNvdW50cnkodGhpcy4kc3RhdGUsIHRoaXMuY29udGV4dCwgeyB1c2VJZEZvclN0YXRlczogdHJ1ZSB9LCAoZXJyLCBmaWVsZCwgaXNTdGF0ZVJlcXVpcmVkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLiRzdGF0ZS5sZW5ndGggPiAwICYmIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBleGlzdGluZyB2YWxpZGF0aW9uIGZpcnN0LCBpdCBjYW4gYmUgc2FmZWx5IGNhbGxlZCBvbiB1bnJlZ2lzdGVyZWQgZWxlbWVudHNcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzU3RhdGVSZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXG4gICAgICAgICAgICAvLyBOb3QgYWxsIGNvdW50cmllcyByZXF1aXJlIHRoZSBwcm92aW5jZSB0byBiZSBmaWxsZWRcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVtb3ZlIHRoaXMgY2xhc3Mgd2hlbiB3ZSBzd2FwIHNpbmNlIG5vZCB2YWxpZGF0aW9uIGRvZXNuJ3QgY2xlYW51cCBmb3IgdXNcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUodG9nZ2xlQnV0dG9uLCBidXR0b25TZWxlY3RvciwgJHRvZ2dsZUNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUgPSAoc2VsZWN0b3JUb0FjdGl2YXRlKSA9PiB7XG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcbiAgICAgICAgICAgICQoYnV0dG9uU2VsZWN0b3IpLnRleHQoJChgIyR7c2VsZWN0b3JUb0FjdGl2YXRlfWApLnRleHQoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCkge1xuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItY2xvc2UnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1hZGQnKTtcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQgPSAhdGhpcy5pc0VzdGltYXRvckZvcm1PcGVuZWQ7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcbiAgICAgICAgY29sbGFwc2libGVGYWN0b3J5KCk7XG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgY291bnRyeV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIGNpdHk6ICQoJ1tuYW1lPVwic2hpcHBpbmctY2l0eVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICB6aXBfY29kZTogJCgnW25hbWU9XCJzaGlwcGluZy16aXBcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHRoaXMuc2VjdXJlQmFzZVVybCA/IHsgYmFzZVVybDogdGhpcy5zZWN1cmVCYXNlVXJsIH0gOiB7fTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0U2hpcHBpbmdRdW90ZXMocGFyYW1zLCAnY2FydC9zaGlwcGluZy1xdW90ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgc2VsZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LnN1Ym1pdFNoaXBwaW5nUXVvdGUocXVvdGVJZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHJlcXVlc3RPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzQmFzZSwgeyBvcHRpb25DaGFuZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3Byb2R1Y3QtZGV0YWlscy1iYXNlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNCcm93c2VySUUsIGNvbnZlcnRJbnRvQXJyYXkgfSBmcm9tICcuL3V0aWxzL2llLWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgY29udGV4dCwgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJyNDYXJ0RWRpdFByb2R1Y3RGaWVsZHNGb3JtJywgdGhpcy4kc2NvcGUpO1xuICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNFbGVtZW50ID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgJGZvcm0pO1xuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaGFzRGVmYXVsdE9wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xuXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlQ2FsbGJhY2sgPSBvcHRpb25DaGFuZ2VEZWNvcmF0b3IuY2FsbCh0aGlzLCBoYXNEZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcbiAgICAgICAgLy8gb3IgaGF2ZSBkZWZhdWx0IHZhcmlhbnQgcHJvcGVydGllcyB0aGF0IGNoYW5nZSB0aGUgdmlld1xuICAgICAgICBpZiAoKGlzRW1wdHkocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKSB8fCBoYXNEZWZhdWx0T3B0aW9ucykgJiYgaGFzT3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIG9wdGlvbkNoYW5nZUNhbGxiYWNrLCB7IGJhc2VVcmw6IHRoaXMuY29udGV4dC5zZWN1cmVCYXNlVXJsIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0UHJvZHVjdFZhcmlhbnQoKSB7XG4gICAgICAgIGNvbnN0IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMgPSBbXTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuXG4gICAgICAgICQuZWFjaCgkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZV0nKSwgKGluZGV4LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSB2YWx1ZS5jaGlsZHJlblswXS5pbm5lclRleHQ7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25UaXRsZSA9IG9wdGlvbkxhYmVsLnNwbGl0KCc6JylbMF0udHJpbSgpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZWQgPSBvcHRpb25MYWJlbC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZScpO1xuXG4gICAgICAgICAgICBpZiAoKHR5cGUgPT09ICdpbnB1dC1maWxlJyB8fCB0eXBlID09PSAnaW5wdXQtdGV4dCcgfHwgdHlwZSA9PT0gJ2lucHV0LW51bWJlcicpICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdmFsdWUucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNTYXRpc2ZpZWQgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5ldmVyeSgoc2VsZWN0KSA9PiBzZWxlY3Quc2VsZWN0ZWRJbmRleCAhPT0gMCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTYXRpc2ZpZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IEFycmF5LmZyb20odmFsdWUucXVlcnlTZWxlY3RvckFsbCgnc2VsZWN0JykpLm1hcCgoeCkgPT4geC52YWx1ZSkuam9pbignLScpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7ZGF0ZVN0cmluZ31gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gdmFsdWUucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3NldC1yZWN0YW5nbGUnIHx8IHR5cGUgPT09ICdzZXQtcmFkaW8nIHx8IHR5cGUgPT09ICdzd2F0Y2gnIHx8IHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGVja2VkID0gdmFsdWUucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvZHVjdFZhcmlhbnRzbGlzdCA9IGNvbnZlcnRJbnRvQXJyYXkodmFsdWUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCA9IGlucHQgPT4gaW5wdC5kYXRhc2V0LnByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSA9PT0gY2hlY2tlZC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0VmFyaWFudHNsaXN0LmZpbHRlcihtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0KVswXTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5pbm5lclRleHQudHJpbSgpIDogY2hlY2tlZC5sYWJlbHNbMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzd2F0Y2gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmNoaWxkcmVuWzBdIDogY2hlY2tlZC5sYWJlbHNbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7bGFiZWwudGl0bGV9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9Ok5vYCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvZHVjdFZhcmlhbnQgPSB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLmxlbmd0aCA9PT0gMCA/IG9wdGlvbnMuc29ydCgpLmpvaW4oJywgJykgOiAndW5zYXRpc2ZpZWQnO1xuICAgICAgICBjb25zdCB2aWV3ID0gJCgnLm1vZGFsLWhlYWRlci10aXRsZScpO1xuXG4gICAgICAgIGlmIChwcm9kdWN0VmFyaWFudCkge1xuICAgICAgICAgICAgcHJvZHVjdFZhcmlhbnQgPSBwcm9kdWN0VmFyaWFudCA9PT0gJ3Vuc2F0aXNmaWVkJyA/ICcnIDogcHJvZHVjdFZhcmlhbnQ7XG4gICAgICAgICAgICBpZiAodmlldy5hdHRyKCdkYXRhLWV2ZW50LXR5cGUnKSkge1xuICAgICAgICAgICAgICAgIHZpZXcuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5odG1sKCkubWF0Y2goLycoLio/KScvKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXJkID0gJChgW2RhdGEtbmFtZT1cIiR7cHJvZHVjdE5hbWV9XCJdYCk7XG4gICAgICAgICAgICAgICAgY2FyZC5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgb3IgbWFyayBhcyB1bmF2YWlsYWJsZSBvdXQgb2Ygc3RvY2sgYXR0cmlidXRlcyBpZiBlbmFibGVkXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKSB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpO1xuXG4gICAgICAgIHRoaXMuJHNjb3BlLmZpbmQoJy5tb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoJ2hpZGUtY29udGVudCcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5cbi8qKlxuICogRXh0cmFjdHMgYXR0cmlidXRlcyBmcm9tIGEgalF1ZXJ5IGVsZW1lbnQgaW50byBhIHBsYWluIG9iamVjdFxuICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBleHRyYWN0IGF0dHJpYnV0ZXMgZnJvbVxuICogQHJldHVybnMge09iamVjdH0gUGxhaW4gb2JqZWN0IHdpdGggYXR0cmlidXRlIG5hbWUtdmFsdWUgcGFpcnNcbiAqL1xuZnVuY3Rpb24gZ2V0RWxlbWVudEF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICAgIHJldHVybiBfLnRyYW5zZm9ybShlbGVtZW50LnByb3AoJ2F0dHJpYnV0ZXMnKSwgKHJlc3VsdCwgaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCByZXQgPSByZXN1bHQ7XG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2VsZWN0IGVsZW1lbnQgZm9yIHN0YXRlcyB3aGVuIHRoZSBjb3VudHJ5IGhhcyBzdGF0ZXMgQU5EIHRoZXkgYXJlIHJlcXVpcmVkXG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50IC0gVGhlIGN1cnJlbnQgc3RhdGUgaW5wdXQgZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgLSBDb250ZXh0IG9iamVjdCBjb250YWluaW5nIHRyYW5zbGF0ZWQgc3RyaW5nc1xuICogQHJldHVybnMge2pRdWVyeX0gVGhlIG5ldyBzZWxlY3QgZWxlbWVudFxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVTZWxlY3RSZXF1aXJlZChzdGF0ZUVsZW1lbnQsIGNvbnRleHQpIHtcbiAgICBjb25zdCBhdHRycyA9IGdldEVsZW1lbnRBdHRyaWJ1dGVzKHN0YXRlRWxlbWVudCk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICBjbGFzczogJ2Zvcm0tc2VsZWN0JyxcbiAgICAgICAgJ2FyaWEtcmVxdWlyZWQnOiAndHJ1ZScsXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8c2VsZWN0Pjwvc2VsZWN0PicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcbiAgICBjb25zdCAkaGlkZGVuSW5wdXQgPSAkKCdbbmFtZSo9XCJGb3JtRmllbGRJc1RleHRcIl0nKTtcblxuICAgIGlmICgkaGlkZGVuSW5wdXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICRoaWRkZW5JbnB1dC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuYXBwZW5kKGA8c21hbGw+JHtjb250ZXh0LnJlcXVpcmVkfTwvc21hbGw+YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc2VsZWN0IGVsZW1lbnQgZm9yIHN0YXRlcyB3aGVuIHRoZSBjb3VudHJ5IGhhcyBzdGF0ZXMgYnV0IHRoZXkgYXJlIE5PVCByZXF1aXJlZFxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudCAtIFRoZSBjdXJyZW50IHN0YXRlIGlucHV0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtqUXVlcnl9IFRoZSBuZXcgc2VsZWN0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlU2VsZWN0T3B0aW9uYWwoc3RhdGVFbGVtZW50KSB7XG4gICAgY29uc3QgYXR0cnMgPSBnZXRFbGVtZW50QXR0cmlidXRlcyhzdGF0ZUVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXG4gICAgICAgICdhcmlhLXJlcXVpcmVkJzogJ2ZhbHNlJyxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxzZWxlY3Q+PC9zZWxlY3Q+JywgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzKSk7XG5cbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgIGNvbnN0ICRoaWRkZW5JbnB1dCA9ICQoJ1tuYW1lKj1cIkZvcm1GaWVsZElzVGV4dFwiXScpO1xuXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgJGhpZGRlbklucHV0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIC8vIEhpZGUgdGhlIHJlcXVpcmVkIGluZGljYXRvciBzaW5jZSBzdGF0ZSBpcyBvcHRpb25hbFxuICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdGV4dCBpbnB1dCBmb3Igc3RhdGVzIHdoZW4gdGhlIGNvdW50cnkgaGFzIG5vIHN0YXRlcyBsaXN0XG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50IC0gVGhlIGN1cnJlbnQgc3RhdGUgZWxlbWVudFxuICogQHJldHVybnMge2pRdWVyeX0gVGhlIG5ldyB0ZXh0IGlucHV0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlVGV4dE9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gZ2V0RWxlbWVudEF0dHJpYnV0ZXMoc3RhdGVFbGVtZW50KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgY2xhc3M6ICdmb3JtLWlucHV0JyxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgIGlmICgkbmV3RWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkbmV3RWxlbWVudCk7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYXJyYXkgb2Ygb3B0aW9ucyBmcm9tIHRoZSByZW1vdGUgcmVxdWVzdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBzZWxlY3QgYm94LlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlc0FycmF5XG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gW107XG5cbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xuXG4gICAgaWYgKCFfLmlzRW1wdHkoJHNlbGVjdEVsZW1lbnQpKSB7XG4gICAgICAgIHN0YXRlc0FycmF5LnN0YXRlcy5mb3JFYWNoKChzdGF0ZU9iaikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudXNlSWRGb3JTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmouaWR9XCI+JHtzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmoubmFtZX1cIj4ke3N0YXRlT2JqLmxhYmVsID8gc3RhdGVPYmoubGFiZWwgOiBzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2VsZWN0RWxlbWVudC5odG1sKGNvbnRhaW5lci5qb2luKCcgJykpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBNYWtlcyB0aGUgemlwL3Bvc3RhbCBjb2RlIGZpZWxkIHJlcXVpcmVkIGFuZCBzaG93cyB0aGUgcmVxdWlyZWQgaW5kaWNhdG9yXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHppcEVsZW1lbnQgVGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCBUaGUgY29udGV4dCBvYmplY3QgY29udGFpbmluZyB0cmFuc2xhdGVkIHN0cmluZ3NcbiAqL1xuZnVuY3Rpb24gbWFrZVppcFJlcXVpcmVkKCR6aXBFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgJHppcEVsZW1lbnQucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAvLyBzaW5jZSB0aGUgYXR0cmlidXRlIGlzIHNldCB3aXRoaW4gdGVtcGxhdGVzL2NvbXBvbmVudHMvY29tbW9uL2Zvcm1zLyosXG4gICAgLy8gd2UgZXhwbGljaXRseSBzZXQgYXJpYS1yZXF1aXJlZCB0byBlbnN1cmUgYXNzaXN0aXZlIHRlY2hub2xvZ2llcyBhbm5vdW5jZSB0aGlzIGZpZWxkIGNvcnJlY3RseSBhZnRlciBkeW5hbWljIGNoYW5nZXNcbiAgICAkemlwRWxlbWVudC5hdHRyKCdhcmlhLXJlcXVpcmVkJywgJ3RydWUnKTtcblxuICAgIGlmICgkemlwRWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJHppcEVsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICR6aXBFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG59XG5cbi8qKlxuICogTWFrZXMgdGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCBvcHRpb25hbCBhbmQgaGlkZXMgdGhlIHJlcXVpcmVkIGluZGljYXRvclxuICpcbiAqIERPTSBTdHJ1Y3R1cmUgRXhwZWN0YXRpb246XG4gKiBUaGUgZnVuY3Rpb24gYXNzdW1lcyB0aGUgZm9sbG93aW5nIERPTSBzdHJ1Y3R1cmU6XG4gKiA8bGFiZWw+XG4gKiAgIDxzcGFuPlppcC9Qb3N0YWwgQ29kZTwvc3Bhbj5cbiAqICAgPHNtYWxsPio8L3NtYWxsPiA8IS0tIHJlcXVpcmVkIGluZGljYXRvciAtLT5cbiAqIDwvbGFiZWw+XG4gKiA8aW5wdXQgZGF0YS1maWVsZC10eXBlPVwiWmlwXCIgLz5cbiAqXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHppcEVsZW1lbnQgVGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1ha2VaaXBPcHRpb25hbCgkemlwRWxlbWVudCkge1xuICAgICR6aXBFbGVtZW50LnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgIC8vIHNpbmNlIHRoZSBhdHRyaWJ1dGUgaXMgc2V0IHdpdGhpbiB0ZW1wbGF0ZXMvY29tcG9uZW50cy9jb21tb24vZm9ybXMvKixcbiAgICAvLyB3ZSBleHBsaWNpdGx5IHNldCBhcmlhLXJlcXVpcmVkIHRvIGVuc3VyZSBhc3Npc3RpdmUgdGVjaG5vbG9naWVzIGFubm91bmNlIHRoaXMgZmllbGQgY29ycmVjdGx5IGFmdGVyIGR5bmFtaWMgY2hhbmdlc1xuICAgICR6aXBFbGVtZW50LmF0dHIoJ2FyaWEtcmVxdWlyZWQnLCBmYWxzZSk7XG5cbiAgICBjb25zdCAkcHJldkVsZW1lbnQgPSAkemlwRWxlbWVudC5wcmV2KCk7XG4gICAgaWYgKCRwcmV2RWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0ICRyZXF1aXJlZEluZGljYXRvciA9ICRwcmV2RWxlbWVudC5maW5kKCdzbWFsbCcpO1xuICAgICAgICBpZiAoJHJlcXVpcmVkSW5kaWNhdG9yLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICRyZXF1aXJlZEluZGljYXRvci5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlZmF1bHQtcGFyYW0tbGFzdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHN0YXRlRWxlbWVudCwgY29udGV4dCA9IHt9LCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIC8qKlxuICAgICAqIEJhY2t3YXJkcyBjb21wYXRpYmxlIGZvciB0aHJlZSBwYXJhbWV0ZXJzIGluc3RlYWQgb2YgZm91clxuICAgICAqXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XG4gICAgICpcbiAgICAgKiB1c2VJZEZvclN0YXRlcyB7Qm9vbH0gLSBHZW5lcmF0ZXMgc3RhdGVzIGRyb3Bkb3duIHVzaW5nIGlkIGZvciB2YWx1ZXMgaW5zdGVhZCBvZiBzdHJpbmdzXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4gICAgfVxuXG4gICAgJCgnc2VsZWN0W2RhdGEtZmllbGQtdHlwZT1cIkNvdW50cnlcIl0nKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XG5cbiAgICAgICAgaWYgKGNvdW50cnlOYW1lID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCB7IGJhc2VVcmw6IGNvbnRleHQuc2VjdXJlQmFzZVVybCB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKGNvbnRleHQuc3RhdGVfZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgICAgICAgICBjb25zdCAkemlwSW5wdXQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiWmlwXCJdJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhhc1N0YXRlcyA9ICFfLmlzRW1wdHkocmVzcG9uc2UuZGF0YS5zdGF0ZXMpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWlyZXNTdGF0ZSA9IHJlc3BvbnNlLmRhdGEucmVxdWlyZXNTdWJkaXZpc2lvbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyByZXNwb25zZS5kYXRhLnJlcXVpcmVzU3ViZGl2aXNpb25cbiAgICAgICAgICAgICAgICA6IGhhc1N0YXRlcztcblxuICAgICAgICAgICAgbGV0ICRuZXdFbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoaGFzU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVzU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgJG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVTZWxlY3RSZXF1aXJlZCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkbmV3RWxlbWVudCA9IG1ha2VTdGF0ZVNlbGVjdE9wdGlvbmFsKCRjdXJyZW50SW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZGRPcHRpb25zKHJlc3BvbnNlLmRhdGEsICRuZXdFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVUZXh0T3B0aW9uYWwoJGN1cnJlbnRJbnB1dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkemlwSW5wdXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gdHJ1ZSB3aGVuIHJlcXVpcmVzUG9zdGFsQ29kZXMgaXMgdW5kZWZpbmVkIHRvIG1haW50YWluIG9yaWdpbmFsIGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZXNaaXAgPSByZXNwb25zZS5kYXRhLnJlcXVpcmVzUG9zdGFsQ29kZXMgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA/IHJlc3BvbnNlLmRhdGEucmVxdWlyZXNQb3N0YWxDb2Rlc1xuICAgICAgICAgICAgICAgICAgICA6IHRydWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZXNaaXApIHtcbiAgICAgICAgICAgICAgICAgICAgbWFrZVppcFJlcXVpcmVkKCR6aXBJbnB1dCwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWFrZVppcE9wdGlvbmFsKCR6aXBJbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkbmV3RWxlbWVudCwgcmVxdWlyZXNTdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiY29uc3QgVFJBTlNMQVRJT05TID0gJ3RyYW5zbGF0aW9ucyc7XG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XG5jb25zdCBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5ID0gKC4uLmRpY3Rpb25hcnlKc29uTGlzdCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGljdGlvbmFyeUpzb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XG4gICAgICAgIGlmIChpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5KGRpY3Rpb25hcnkpKSB7XG4gICAgICAgICAgICByZXR1cm4gZGljdGlvbmFyeTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZGVmaW5lcyBUcmFuc2xhdGlvbiBEaWN0aW9uYXJ5IHRvIHVzZVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XG4gKiB2YWxpZGF0aW9uX21lc3NhZ2VzLCB2YWxpZGF0aW9uX2ZhbGxiYWNrX21lc3NhZ2VzIGFuZCBkZWZhdWx0X21lc3NhZ2VzXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5ID0gKGNvbnRleHQpID0+IHtcbiAgICBjb25zdCB7IHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04gfSA9IGNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XG4gICAgY29uc3QgbG9jYWxpemF0aW9ucyA9IE9iamVjdC52YWx1ZXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbktleXMgPSBPYmplY3Qua2V5cyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLm1hcChrZXkgPT4ga2V5LnNwbGl0KCcuJykucG9wKCkpO1xuXG4gICAgcmV0dXJuIHRyYW5zbGF0aW9uS2V5cy5yZWR1Y2UoKGFjYywga2V5LCBpKSA9PiB7XG4gICAgICAgIGFjY1trZXldID0gbG9jYWxpemF0aW9uc1tpXTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59O1xuIl0sIm5hbWVzIjpbImUiLCJ0IiwiciIsIlN5bWJvbCIsIm4iLCJpdGVyYXRvciIsIm8iLCJ0b1N0cmluZ1RhZyIsImkiLCJjIiwicHJvdG90eXBlIiwiR2VuZXJhdG9yIiwidSIsIk9iamVjdCIsImNyZWF0ZSIsIl9yZWdlbmVyYXRvckRlZmluZTIiLCJmIiwicCIsInkiLCJHIiwidiIsImEiLCJkIiwiYmluZCIsImxlbmd0aCIsImwiLCJUeXBlRXJyb3IiLCJjYWxsIiwiZG9uZSIsInZhbHVlIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJkaXNwbGF5TmFtZSIsIl9yZWdlbmVyYXRvciIsInciLCJtIiwiZGVmaW5lUHJvcGVydHkiLCJfcmVnZW5lcmF0b3JEZWZpbmUiLCJfaW52b2tlIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmd1bWVudHMiLCJhcHBseSIsIl9uZXh0IiwiX3Rocm93IiwiX2luaGVyaXRzTG9vc2UiLCJjb25zdHJ1Y3RvciIsIl9zZXRQcm90b3R5cGVPZiIsIlBhZ2VNYW5hZ2VyIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJ1dGlscyIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdE1vZGFsIiwic2hvd0FsZXJ0TW9kYWwiLCJNb2RhbEV2ZW50cyIsIkNhcnRJdGVtRGV0YWlscyIsIkNhcnQiLCJfUGFnZU1hbmFnZXIiLCJfcHJvdG8iLCJvblJlYWR5IiwiJG1vZGFsIiwiJGNhcnRQYWdlQ29udGVudCIsIiQiLCIkY2FydENvbnRlbnQiLCIkY2FydENvdXBvbnMiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMiLCIkb3ZlcmxheSIsImhpZGUiLCIkYWN0aXZlQ2FydEl0ZW1JZCIsIiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiIsInNldEFwcGxlUGF5U3VwcG9ydCIsImJpbmRFdmVudHMiLCJ3aW5kb3ciLCJBcHBsZVBheVNlc3Npb24iLCJhZGRDbGFzcyIsImNhcnRVcGRhdGUiLCIkdGFyZ2V0IiwiX3RoaXMiLCJpdGVtSWQiLCJkYXRhIiwiJGVsIiwib2xkUXR5IiwicGFyc2VJbnQiLCJ2YWwiLCJtYXhRdHkiLCJtaW5RdHkiLCJtaW5FcnJvciIsIm1heEVycm9yIiwibmV3UXR5Iiwic2hvdyIsImFwaSIsImNhcnQiLCJpdGVtVXBkYXRlIiwiZXJyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZW1vdmUiLCJyZWZyZXNoQ29udGVudCIsImVycm9ycyIsImpvaW4iLCJjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSIsInByZVZhbCIsIl90aGlzMiIsIk51bWJlciIsImludmFsaWRFbnRyeSIsImlzSW50ZWdlciIsImNvbnRleHQiLCJpbnZhbGlkRW50cnlNZXNzYWdlIiwicmVwbGFjZSIsImNhcnRSZW1vdmVJdGVtIiwiX3RoaXMzIiwiaXRlbVJlbW92ZSIsImNhcnRFZGl0T3B0aW9ucyIsInByb2R1Y3RJZCIsIl90aGlzNCIsImFzc2lnbiIsInByb2R1Y3RGb3JDaGFuZ2VJZCIsIm1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50Iiwib3B0aW9uQ2hhbmdlSGFuZGxlciIsIiRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciIsIm1vZGFsQm9keVJlc2VydmVkSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJjc3MiLCJoYXNDbGFzcyIsIm9uZSIsIm9wZW5lZCIsIm1vZGFsRm9ybSIsIm9uU3VibWl0IiwiX3giLCJfb25TdWJtaXQiLCJfY2FsbGVlIiwiZXZlbnQiLCJfY29udGV4dCIsInByZXZlbnREZWZhdWx0IiwicG9zdEZvcm1EYXRhIiwiRm9ybURhdGEiLCJjbG9zZSIsIm9uIiwicHJvZHVjdERldGFpbHMiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsImJhc2VVcmwiLCJzZWN1cmVCYXNlVXJsIiwiaG9va3MiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJ0ZXh0IiwicHJvcCIsInB1cmNoYXNhYmxlIiwiaW5zdG9jayIsIl90aGlzNSIsIiRjYXJ0SXRlbXNSb3dzIiwiJGNhcnRQYWdlVGl0bGUiLCJjb3Vwb25zIiwidG90YWxzIiwicGFnZVRpdGxlIiwic3RhdHVzTWVzc2FnZXMiLCJhZGRpdGlvbmFsQ2hlY2tvdXRCdXR0b25zIiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZXRDb250ZW50IiwiaHRtbCIsInJlcGxhY2VXaXRoIiwicXVhbnRpdHkiLCJ0cmlnZ2VyIiwiZmlsdGVyIiwiYmluZENhcnRFdmVudHMiLCJfdGhpczYiLCJkZWJvdW5jZVRpbWVvdXQiLCJfYmluZCIsIl9kZWJvdW5jZSIsImZvY3VzIiwib25RdHlGb2N1cyIsImNoYW5nZSIsInN0cmluZyIsImljb24iLCJzaG93Q2FuY2VsQnV0dG9uIiwib25Db25maXJtIiwiYmluZFByb21vQ29kZUV2ZW50cyIsIl90aGlzNyIsIiRjb3Vwb25Db250YWluZXIiLCIkY291cG9uRm9ybSIsIm11bHRpQ291cG9uVUlFbmFibGVkIiwiJGNvZGVJbnB1dCIsIiRjb3Vwb25UcmlnZ2VyIiwiYXR0ciIsImNvZGUiLCJhcHBseUNvZGUiLCJiaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzIiwiX3RoaXM4IiwiJGNlcnRDb250YWluZXIiLCIkY2VydEZvcm0iLCIkY2VydElucHV0IiwidG9nZ2xlIiwidmFsaWRhdGlvbkRpY3Rpb25hcnkiLCJpbnZhbGlkX2dpZnRfY2VydGlmaWNhdGUiLCJhcHBseUdpZnRDZXJ0aWZpY2F0ZSIsInJlc3AiLCJiaW5kR2lmdFdyYXBwaW5nRXZlbnRzIiwiX3RoaXM5IiwiZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMiLCJjb25maXJtIiwiZ2lmdFdyYXBwaW5nUmVtb3ZlTWVzc2FnZSIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJiaW5kRGlzY291bnRUb2dnbGUiLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCIkZGlzY291bnRUb2dnbGUiLCIkZGlzY291bnREZXRhaWxzIiwiJGRpc2NvdW50SWNvbiIsInNsaWRlVG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJkZWZhdWx0Iiwic3RhdGVDb3VudHJ5Iiwibm9kIiwiVmFsaWRhdG9ycyIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwic3VibWl0IiwidGFwIiwicmVtb3ZlQXR0ciIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImlzTmFOIiwiZXJyb3JNZXNzYWdlIiwiJGVsZSIsImVsZVZhbCIsIlVQU1JhdGVUb2dnbGUiLCIkZXN0aW1hdG9yRm9ybVVwcyIsIiRlc3RpbWF0b3JGb3JtRGVmYXVsdCIsIiRsYXN0IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsImlzU3RhdGVSZXF1aXJlZCIsIkVycm9yIiwiJGZpZWxkIiwidW5kZWZpbmVkIiwiaXMiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUiLCJ0b2dnbGVCdXR0b24iLCJidXR0b25TZWxlY3RvciIsIiR0b2dnbGVDb250YWluZXIiLCJjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUiLCJzZWxlY3RvclRvQWN0aXZhdGUiLCIkZXN0aW1hdG9yQ29udGFpbmVyIiwiJGVzdGltYXRvckZvcm0iLCJwYXJhbXMiLCJjb3VudHJ5X2lkIiwic3RhdGVfaWQiLCJjaXR5IiwiemlwX2NvZGUiLCJyZXF1ZXN0T3B0aW9ucyIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiUHJvZHVjdERldGFpbHNCYXNlIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiaXNCcm93c2VySUUiLCJjb252ZXJ0SW50b0FycmF5IiwiX1Byb2R1Y3REZXRhaWxzQmFzZSIsIiRzY29wZSIsInByb2R1Y3RBdHRyaWJ1dGVzRGF0YSIsIiRwcm9kdWN0T3B0aW9uc0VsZW1lbnQiLCJoYXNPcHRpb25zIiwidHJpbSIsImhhc0RlZmF1bHRPcHRpb25zIiwic2V0UHJvZHVjdFZhcmlhbnQiLCJvcHRpb25DaGFuZ2VDYWxsYmFjayIsIl9pc0VtcHR5IiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwiZWFjaCIsIm9wdGlvbkxhYmVsIiwiY2hpbGRyZW4iLCJpbm5lclRleHQiLCJvcHRpb25UaXRsZSIsInNwbGl0IiwicmVxdWlyZWQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidHlwZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiaXNTYXRpc2ZpZWQiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzZWxlY3QiLCJzZWxlY3RlZEluZGV4IiwiZGF0ZVN0cmluZyIsIm1hcCIsIngiLCJjaGVja2VkIiwiZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCIsInByb2R1Y3RWYXJpYW50c2xpc3QiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImxhYmVscyIsInRpdGxlIiwicHJvZHVjdFZhcmlhbnQiLCJzb3J0IiwidmlldyIsInByb2R1Y3ROYW1lIiwibWF0Y2giLCJjYXJkIiwiY2VydCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJnZXRFbGVtZW50QXR0cmlidXRlcyIsImVsZW1lbnQiLCJfdHJhbnNmb3JtIiwiaXRlbSIsInJldCIsIm5hbWUiLCJtYWtlU3RhdGVTZWxlY3RSZXF1aXJlZCIsInN0YXRlRWxlbWVudCIsImF0dHJzIiwicmVwbGFjZW1lbnRBdHRyaWJ1dGVzIiwiJG5ld0VsZW1lbnQiLCIkaGlkZGVuSW5wdXQiLCJwcmV2IiwiYXBwZW5kIiwibWFrZVN0YXRlU2VsZWN0T3B0aW9uYWwiLCJtYWtlU3RhdGVUZXh0T3B0aW9uYWwiLCJhZGRPcHRpb25zIiwic3RhdGVzQXJyYXkiLCIkc2VsZWN0RWxlbWVudCIsImNvbnRhaW5lciIsInByZWZpeCIsInN0YXRlcyIsImZvckVhY2giLCJzdGF0ZU9iaiIsIm1ha2VaaXBSZXF1aXJlZCIsIiR6aXBFbGVtZW50IiwibWFrZVppcE9wdGlvbmFsIiwiJHByZXZFbGVtZW50IiwiJHJlcXVpcmVkSW5kaWNhdG9yIiwiY2FsbGJhY2siLCJjb3VudHJ5TmFtZSIsImdldEJ5TmFtZSIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIiR6aXBJbnB1dCIsImhhc1N0YXRlcyIsInJlcXVpcmVzU3RhdGUiLCJyZXF1aXJlc1N1YmRpdmlzaW9uIiwicmVxdWlyZXNaaXAiLCJyZXF1aXJlc1Bvc3RhbENvZGVzIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsIkpTT04iLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sInNvdXJjZVJvb3QiOiIifQ==