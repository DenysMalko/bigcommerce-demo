"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_product_js"],{

/***/ "./assets/js/theme/product.js":
/*!************************************!*\
  !*** ./assets/js/theme/product.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Product)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _product_reviews__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product/reviews */ "./assets/js/theme/product/reviews.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _common_product_details__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/product-details */ "./assets/js/theme/common/product-details.js");
/* harmony import */ var _product_video_gallery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./product/video-gallery */ "./assets/js/theme/product/video-gallery.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/*
 Import all product specific js
 */







var Product = /*#__PURE__*/function (_PageManager) {
  function Product(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.url = window.location.href;
    _this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    _this.$bulkPricingLink = $('[data-reveal-id="modal-bulk-pricing"]');
    _this.reviewModal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal-review-form')[0];
    return _this;
  }
  _inheritsLoose(Product, _PageManager);
  var _proto = Product.prototype;
  _proto.onReady = function onReady() {
    var _this2 = this;
    // Listen for foundation modal close events to sanitize URL after review.
    $(document).on('close.fndtn.reveal', function () {
      if (_this2.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, document.title, window.location.pathname);
      }
    });
    var validator;

    // Init collapsible
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_2__["default"])();
    this.productDetails = new _common_product_details__WEBPACK_IMPORTED_MODULE_3__["default"]($('.productView'), this.context, window.BCData.product_attributes);
    this.productDetails.setProductVariant();
    (0,_product_video_gallery__WEBPACK_IMPORTED_MODULE_4__["default"])();
    this.bulkPricingHandler();
    var $reviewForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.classifyForm)('.writeReview-form');
    if ($reviewForm.length === 0) return;
    var review = new _product_reviews__WEBPACK_IMPORTED_MODULE_1__["default"]({
      $reviewForm: $reviewForm
    });
    $('body').on('click', '[data-reveal-id="modal-review-form"]', function () {
      validator = review.registerValidation(_this2.context);
      _this2.ariaDescribeReviewInputs($reviewForm);
    });
    $reviewForm.on('submit', function () {
      if (validator) {
        validator.performCheck();
        return validator.areAll('valid');
      }
      return false;
    });
    this.productReviewHandler();
  };
  _proto.ariaDescribeReviewInputs = function ariaDescribeReviewInputs($form) {
    $form.find('[data-input]').each(function (_, input) {
      var $input = $(input);
      var msgSpanId = $input.attr('name') + "-msg";
      $input.siblings('span').attr('id', msgSpanId);
      $input.attr('aria-describedby', msgSpanId);
    });
  };
  _proto.productReviewHandler = function productReviewHandler() {
    if (this.url.indexOf('#write_review') !== -1) {
      this.$reviewLink.trigger('click');
    }
  };
  _proto.bulkPricingHandler = function bulkPricingHandler() {
    if (this.url.indexOf('#bulk_pricing') !== -1) {
      this.$bulkPricingLink.trigger('click');
    }
  };
  return Product;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/product/video-gallery.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/product/video-gallery.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoGallery: () => (/* binding */ VideoGallery),
/* harmony export */   "default": () => (/* binding */ videoGallery)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var VideoGallery = /*#__PURE__*/function () {
  function VideoGallery($element) {
    this.$player = $element.find('[data-video-player]');
    this.$videos = $element.find('[data-video-item]');
    this.currentVideo = {};
    this.referrer = window.location.origin;
    this.isSafari = this.detectSafari();
    this.bindEvents();
    this.initializePlayer();
  }
  var _proto = VideoGallery.prototype;
  _proto.detectSafari = function detectSafari() {
    var userAgent = navigator.userAgent.toLowerCase();
    return /safari/.test(userAgent) && !/chrome|chromium|crios|fxios/.test(userAgent);
  }

  /**
   * Build YouTube embed URL with widget_referrer and origin parameters
   * @param {string} videoId - YouTube video ID
   * @param {string} existingParams - Existing URL parameters (e.g., "rel=0")
   * @returns {string} Complete YouTube embed URL
   */;
  _proto.buildEmbedUrl = function buildEmbedUrl(videoId, existingParams) {
    if (existingParams === void 0) {
      existingParams = '';
    }
    var params = new URLSearchParams(existingParams);

    // helps with Safari compatibility
    params.set('widget_referrer', this.referrer);
    params.set('origin', this.referrer);
    return "//www.youtube.com/embed/" + videoId + "?" + params.toString();
  }

  /**
   * Set iframe permissions for enhanced YouTube player functionality
   */;
  _proto.setIframePermissions = function setIframePermissions() {
    var allowPermissions = ['autoplay', 'clipboard-write',
    // allows the iframe to use Encrypted Media Extensions and play protected content
    'encrypted-media', 'picture-in-picture', 'web-share'];
    var currentPermissions = (this.$player.attr('allow') || '').split(';').map(function (s) {
      return s.trim();
    }).filter(Boolean);
    var allowSet = new Set([].concat(currentPermissions, allowPermissions));
    this.$player.attr('allow', Array.from(allowSet).join('; '));
  };
  _proto.initializePlayer = function initializePlayer() {
    // Set iframe referrer policy to ensure Referer header is sent
    this.$player.attr('referrerpolicy', 'strict-origin-when-cross-origin');

    // Set extra permissions for better YouTube functionality
    // this.setIframePermissions();

    var currentSrc = this.$player.attr('src') || this.$player.attr('data-src');
    if (currentSrc) {
      // Extract video ID and existing parameters from the URL
      var match = currentSrc.match(/\/embed\/([^?]+)(?:\?(.+))?/);
      if (match) {
        var videoId = match[1];
        var existingParams = match[2] || '';
        // Rebuild URL to ensure widget_referrer and origin are present for Safari compatibility
        var newSrc = this.buildEmbedUrl(videoId, existingParams);
        if (this.isSafari) {
          // Removing lazyload and setting src directly ensures referrerpolicy is respected before the first request in Safari
          this.$player.removeClass('lazyload');
          this.$player.attr('src', newSrc);
        } else {
          // Keep lazyload class and only update data-src for rest browsers
          this.$player.attr('data-src', newSrc);
        }
      }
    }
  };
  _proto.selectNewVideo = function selectNewVideo(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    this.currentVideo = {
      id: $target.data('videoId'),
      $selectedThumb: $target
    };
    this.setMainVideo();
    this.setActiveThumb();
  };
  _proto.setMainVideo = function setMainVideo() {
    var embedUrl = this.buildEmbedUrl(this.currentVideo.id);
    this.$player.attr('src', embedUrl);
  };
  _proto.setActiveThumb = function setActiveThumb() {
    this.$videos.removeClass('is-active');
    this.currentVideo.$selectedThumb.addClass('is-active');
  };
  _proto.bindEvents = function bindEvents() {
    this.$videos.on('click', this.selectNewVideo.bind(this));
  };
  return VideoGallery;
}();
function videoGallery() {
  var pluginKey = 'video-gallery';
  var $videoGallery = $("[data-" + pluginKey + "]");
  $videoGallery.each(function (index, element) {
    var $el = $(element);
    var isInitialized = $el.data(pluginKey) instanceof VideoGallery;
    if (isInitialized) {
      return;
    }
    $el.data(pluginKey, new VideoGallery($el));
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9wcm9kdWN0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ3lDO0FBQ0Y7QUFDZTtBQUNBO0FBQ0g7QUFDTTtBQUNmO0FBQUEsSUFFckJPLE9BQU8sMEJBQUFDLFlBQUE7RUFDeEIsU0FBQUQsUUFBWUUsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBRixZQUFBLENBQUFHLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBQ2RDLEtBQUEsQ0FBS0UsR0FBRyxHQUFHQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSTtJQUMvQkwsS0FBQSxDQUFLTSxXQUFXLEdBQUdDLENBQUMsQ0FBQyxzQ0FBc0MsQ0FBQztJQUM1RFAsS0FBQSxDQUFLUSxnQkFBZ0IsR0FBR0QsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDO0lBQ2xFUCxLQUFBLENBQUtTLFdBQVcsR0FBR2IseURBQVksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQUFJLEtBQUE7RUFDN0Q7RUFBQ1UsY0FBQSxDQUFBYixPQUFBLEVBQUFDLFlBQUE7RUFBQSxJQUFBYSxNQUFBLEdBQUFkLE9BQUEsQ0FBQWUsU0FBQTtFQUFBRCxNQUFBLENBRURFLE9BQU8sR0FBUCxTQUFBQSxPQUFPQSxDQUFBLEVBQUc7SUFBQSxJQUFBQyxNQUFBO0lBQ047SUFDQVAsQ0FBQyxDQUFDUSxRQUFRLENBQUMsQ0FBQ0MsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFlBQU07TUFDdkMsSUFBSUYsTUFBSSxDQUFDWixHQUFHLENBQUNlLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxPQUFPZCxNQUFNLENBQUNlLE9BQU8sQ0FBQ0MsWUFBWSxLQUFLLFVBQVUsRUFBRTtRQUMvRmhCLE1BQU0sQ0FBQ2UsT0FBTyxDQUFDQyxZQUFZLENBQUMsSUFBSSxFQUFF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QyxDQUFDO0VBQzlDLENBQUMsQ0FBQztBQUNOLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9wcm9kdWN0LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuIEltcG9ydCBhbGwgcHJvZHVjdCBzcGVjaWZpYyBqc1xuICovXG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IFJldmlldyBmcm9tICcuL3Byb2R1Y3QvcmV2aWV3cyc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCBQcm9kdWN0RGV0YWlscyBmcm9tICcuL2NvbW1vbi9wcm9kdWN0LWRldGFpbHMnO1xuaW1wb3J0IHZpZGVvR2FsbGVyeSBmcm9tICcuL3Byb2R1Y3QvdmlkZW8tZ2FsbGVyeSc7XG5pbXBvcnQgeyBjbGFzc2lmeUZvcm0gfSBmcm9tICcuL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG4gICAgICAgIHRoaXMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgICAgIHRoaXMuJHJldmlld0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1yZXZpZXctZm9ybVwiXScpO1xuICAgICAgICB0aGlzLiRidWxrUHJpY2luZ0xpbmsgPSAkKCdbZGF0YS1yZXZlYWwtaWQ9XCJtb2RhbC1idWxrLXByaWNpbmdcIl0nKTtcbiAgICAgICAgdGhpcy5yZXZpZXdNb2RhbCA9IG1vZGFsRmFjdG9yeSgnI21vZGFsLXJldmlldy1mb3JtJylbMF07XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciBmb3VuZGF0aW9uIG1vZGFsIGNsb3NlIGV2ZW50cyB0byBzYW5pdGl6ZSBVUkwgYWZ0ZXIgcmV2aWV3LlxuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEgJiYgdHlwZW9mIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBkb2N1bWVudC50aXRsZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvcjtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgUHJvZHVjdERldGFpbHMoJCgnLnByb2R1Y3RWaWV3JyksIHRoaXMuY29udGV4dCwgd2luZG93LkJDRGF0YS5wcm9kdWN0X2F0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzLnNldFByb2R1Y3RWYXJpYW50KCk7XG5cbiAgICAgICAgdmlkZW9HYWxsZXJ5KCk7XG5cbiAgICAgICAgdGhpcy5idWxrUHJpY2luZ0hhbmRsZXIoKTtcblxuICAgICAgICBjb25zdCAkcmV2aWV3Rm9ybSA9IGNsYXNzaWZ5Rm9ybSgnLndyaXRlUmV2aWV3LWZvcm0nKTtcblxuICAgICAgICBpZiAoJHJldmlld0Zvcm0ubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldyh7ICRyZXZpZXdGb3JtIH0pO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtcmV2ZWFsLWlkPVwibW9kYWwtcmV2aWV3LWZvcm1cIl0nLCAoKSA9PiB7XG4gICAgICAgICAgICB2YWxpZGF0b3IgPSByZXZpZXcucmVnaXN0ZXJWYWxpZGF0aW9uKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICB0aGlzLmFyaWFEZXNjcmliZVJldmlld0lucHV0cygkcmV2aWV3Rm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRyZXZpZXdGb3JtLm9uKCdzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0hhbmRsZXIoKTtcbiAgICB9XG5cbiAgICBhcmlhRGVzY3JpYmVSZXZpZXdJbnB1dHMoJGZvcm0pIHtcbiAgICAgICAgJGZvcm0uZmluZCgnW2RhdGEtaW5wdXRdJykuZWFjaCgoXywgaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRpbnB1dCA9ICQoaW5wdXQpO1xuICAgICAgICAgICAgY29uc3QgbXNnU3BhbklkID0gYCR7JGlucHV0LmF0dHIoJ25hbWUnKX0tbXNnYDtcblxuICAgICAgICAgICAgJGlucHV0LnNpYmxpbmdzKCdzcGFuJykuYXR0cignaWQnLCBtc2dTcGFuSWQpO1xuICAgICAgICAgICAgJGlucHV0LmF0dHIoJ2FyaWEtZGVzY3JpYmVkYnknLCBtc2dTcGFuSWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9kdWN0UmV2aWV3SGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyN3cml0ZV9yZXZpZXcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJHJldmlld0xpbmsudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJ1bGtQcmljaW5nSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMudXJsLmluZGV4T2YoJyNidWxrX3ByaWNpbmcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuJGJ1bGtQcmljaW5nTGluay50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFZpZGVvR2FsbGVyeSB7XG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kcGxheWVyID0gJGVsZW1lbnQuZmluZCgnW2RhdGEtdmlkZW8tcGxheWVyXScpO1xuICAgICAgICB0aGlzLiR2aWRlb3MgPSAkZWxlbWVudC5maW5kKCdbZGF0YS12aWRlby1pdGVtXScpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWRlbyA9IHt9O1xuICAgICAgICB0aGlzLnJlZmVycmVyID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcbiAgICAgICAgdGhpcy5pc1NhZmFyaSA9IHRoaXMuZGV0ZWN0U2FmYXJpKCk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVQbGF5ZXIoKTtcbiAgICB9XG5cbiAgICBkZXRlY3RTYWZhcmkoKSB7XG4gICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICByZXR1cm4gL3NhZmFyaS8udGVzdCh1c2VyQWdlbnQpICYmICEvY2hyb21lfGNocm9taXVtfGNyaW9zfGZ4aW9zLy50ZXN0KHVzZXJBZ2VudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnVpbGQgWW91VHViZSBlbWJlZCBVUkwgd2l0aCB3aWRnZXRfcmVmZXJyZXIgYW5kIG9yaWdpbiBwYXJhbWV0ZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZGVvSWQgLSBZb3VUdWJlIHZpZGVvIElEXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV4aXN0aW5nUGFyYW1zIC0gRXhpc3RpbmcgVVJMIHBhcmFtZXRlcnMgKGUuZy4sIFwicmVsPTBcIilcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBDb21wbGV0ZSBZb3VUdWJlIGVtYmVkIFVSTFxuICAgICAqL1xuICAgIGJ1aWxkRW1iZWRVcmwodmlkZW9JZCwgZXhpc3RpbmdQYXJhbXMgPSAnJykge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGV4aXN0aW5nUGFyYW1zKTtcblxuICAgICAgICAvLyBoZWxwcyB3aXRoIFNhZmFyaSBjb21wYXRpYmlsaXR5XG4gICAgICAgIHBhcmFtcy5zZXQoJ3dpZGdldF9yZWZlcnJlcicsIHRoaXMucmVmZXJyZXIpO1xuICAgICAgICBwYXJhbXMuc2V0KCdvcmlnaW4nLCB0aGlzLnJlZmVycmVyKTtcblxuICAgICAgICByZXR1cm4gYC8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7dmlkZW9JZH0/JHtwYXJhbXMudG9TdHJpbmcoKX1gO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBpZnJhbWUgcGVybWlzc2lvbnMgZm9yIGVuaGFuY2VkIFlvdVR1YmUgcGxheWVyIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBzZXRJZnJhbWVQZXJtaXNzaW9ucygpIHtcbiAgICAgICAgY29uc3QgYWxsb3dQZXJtaXNzaW9ucyA9IFtcbiAgICAgICAgICAgICdhdXRvcGxheScsXG4gICAgICAgICAgICAnY2xpcGJvYXJkLXdyaXRlJyxcbiAgICAgICAgICAgIC8vIGFsbG93cyB0aGUgaWZyYW1lIHRvIHVzZSBFbmNyeXB0ZWQgTWVkaWEgRXh0ZW5zaW9ucyBhbmQgcGxheSBwcm90ZWN0ZWQgY29udGVudFxuICAgICAgICAgICAgJ2VuY3J5cHRlZC1tZWRpYScsXG4gICAgICAgICAgICAncGljdHVyZS1pbi1waWN0dXJlJyxcbiAgICAgICAgICAgICd3ZWItc2hhcmUnLFxuICAgICAgICBdO1xuICAgICAgICBjb25zdCBjdXJyZW50UGVybWlzc2lvbnMgPSAodGhpcy4kcGxheWVyLmF0dHIoJ2FsbG93JykgfHwgJycpLnNwbGl0KCc7JykubWFwKHMgPT4gcy50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgY29uc3QgYWxsb3dTZXQgPSBuZXcgU2V0KFsuLi5jdXJyZW50UGVybWlzc2lvbnMsIC4uLmFsbG93UGVybWlzc2lvbnNdKTtcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ2FsbG93JywgQXJyYXkuZnJvbShhbGxvd1NldCkuam9pbignOyAnKSk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZVBsYXllcigpIHtcbiAgICAgICAgLy8gU2V0IGlmcmFtZSByZWZlcnJlciBwb2xpY3kgdG8gZW5zdXJlIFJlZmVyZXIgaGVhZGVyIGlzIHNlbnRcbiAgICAgICAgdGhpcy4kcGxheWVyLmF0dHIoJ3JlZmVycmVycG9saWN5JywgJ3N0cmljdC1vcmlnaW4td2hlbi1jcm9zcy1vcmlnaW4nKTtcblxuICAgICAgICAvLyBTZXQgZXh0cmEgcGVybWlzc2lvbnMgZm9yIGJldHRlciBZb3VUdWJlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgLy8gdGhpcy5zZXRJZnJhbWVQZXJtaXNzaW9ucygpO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTcmMgPSB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJykgfHwgdGhpcy4kcGxheWVyLmF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgIGlmIChjdXJyZW50U3JjKSB7XG4gICAgICAgICAgICAvLyBFeHRyYWN0IHZpZGVvIElEIGFuZCBleGlzdGluZyBwYXJhbWV0ZXJzIGZyb20gdGhlIFVSTFxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBjdXJyZW50U3JjLm1hdGNoKC9cXC9lbWJlZFxcLyhbXj9dKykoPzpcXD8oLispKT8vKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvSWQgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBleGlzdGluZ1BhcmFtcyA9IG1hdGNoWzJdIHx8ICcnO1xuICAgICAgICAgICAgICAgIC8vIFJlYnVpbGQgVVJMIHRvIGVuc3VyZSB3aWRnZXRfcmVmZXJyZXIgYW5kIG9yaWdpbiBhcmUgcHJlc2VudCBmb3IgU2FmYXJpIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTcmMgPSB0aGlzLmJ1aWxkRW1iZWRVcmwodmlkZW9JZCwgZXhpc3RpbmdQYXJhbXMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTYWZhcmkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZpbmcgbGF6eWxvYWQgYW5kIHNldHRpbmcgc3JjIGRpcmVjdGx5IGVuc3VyZXMgcmVmZXJyZXJwb2xpY3kgaXMgcmVzcGVjdGVkIGJlZm9yZSB0aGUgZmlyc3QgcmVxdWVzdCBpbiBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcGxheWVyLnJlbW92ZUNsYXNzKCdsYXp5bG9hZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignc3JjJywgbmV3U3JjKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBLZWVwIGxhenlsb2FkIGNsYXNzIGFuZCBvbmx5IHVwZGF0ZSBkYXRhLXNyYyBmb3IgcmVzdCBicm93c2Vyc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRwbGF5ZXIuYXR0cignZGF0YS1zcmMnLCBuZXdTcmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdE5ld1ZpZGVvKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50VmlkZW8gPSB7XG4gICAgICAgICAgICBpZDogJHRhcmdldC5kYXRhKCd2aWRlb0lkJyksXG4gICAgICAgICAgICAkc2VsZWN0ZWRUaHVtYjogJHRhcmdldCxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldE1haW5WaWRlbygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZVRodW1iKCk7XG4gICAgfVxuXG4gICAgc2V0TWFpblZpZGVvKCkge1xuICAgICAgICBjb25zdCBlbWJlZFVybCA9IHRoaXMuYnVpbGRFbWJlZFVybCh0aGlzLmN1cnJlbnRWaWRlby5pZCk7XG4gICAgICAgIHRoaXMuJHBsYXllci5hdHRyKCdzcmMnLCBlbWJlZFVybCk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlVGh1bWIoKSB7XG4gICAgICAgIHRoaXMuJHZpZGVvcy5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZGVvLiRzZWxlY3RlZFRodW1iLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLiR2aWRlb3Mub24oJ2NsaWNrJywgdGhpcy5zZWxlY3ROZXdWaWRlby5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZpZGVvR2FsbGVyeSgpIHtcbiAgICBjb25zdCBwbHVnaW5LZXkgPSAndmlkZW8tZ2FsbGVyeSc7XG4gICAgY29uc3QgJHZpZGVvR2FsbGVyeSA9ICQoYFtkYXRhLSR7cGx1Z2luS2V5fV1gKTtcblxuICAgICR2aWRlb0dhbGxlcnkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgJGVsID0gJChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgaXNJbml0aWFsaXplZCA9ICRlbC5kYXRhKHBsdWdpbktleSkgaW5zdGFuY2VvZiBWaWRlb0dhbGxlcnk7XG5cbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRlbC5kYXRhKHBsdWdpbktleSwgbmV3IFZpZGVvR2FsbGVyeSgkZWwpKTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsIlJldmlldyIsImNvbGxhcHNpYmxlRmFjdG9yeSIsIlByb2R1Y3REZXRhaWxzIiwidmlkZW9HYWxsZXJ5IiwiY2xhc3NpZnlGb3JtIiwibW9kYWxGYWN0b3J5IiwiUHJvZHVjdCIsIl9QYWdlTWFuYWdlciIsImNvbnRleHQiLCJfdGhpcyIsImNhbGwiLCJ1cmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCIkcmV2aWV3TGluayIsIiQiLCIkYnVsa1ByaWNpbmdMaW5rIiwicmV2aWV3TW9kYWwiLCJfaW5oZXJpdHNMb29zZSIsIl9wcm90byIsInByb3RvdHlwZSIsIm9uUmVhZHkiLCJfdGhpczIiLCJkb2N1bWVudCIsIm9uIiwiaW5kZXhPZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInBhdGhuYW1lIiwidmFsaWRhdG9yIiwicHJvZHVjdERldGFpbHMiLCJCQ0RhdGEiLCJwcm9kdWN0X2F0dHJpYnV0ZXMiLCJzZXRQcm9kdWN0VmFyaWFudCIsImJ1bGtQcmljaW5nSGFuZGxlciIsIiRyZXZpZXdGb3JtIiwibGVuZ3RoIiwicmV2aWV3IiwicmVnaXN0ZXJWYWxpZGF0aW9uIiwiYXJpYURlc2NyaWJlUmV2aWV3SW5wdXRzIiwicGVyZm9ybUNoZWNrIiwiYXJlQWxsIiwicHJvZHVjdFJldmlld0hhbmRsZXIiLCIkZm9ybSIsImZpbmQiLCJlYWNoIiwiXyIsImlucHV0IiwiJGlucHV0IiwibXNnU3BhbklkIiwiYXR0ciIsInNpYmxpbmdzIiwidHJpZ2dlciIsImRlZmF1bHQiLCJWaWRlb0dhbGxlcnkiLCIkZWxlbWVudCIsIiRwbGF5ZXIiLCIkdmlkZW9zIiwiY3VycmVudFZpZGVvIiwicmVmZXJyZXIiLCJvcmlnaW4iLCJpc1NhZmFyaSIsImRldGVjdFNhZmFyaSIsImJpbmRFdmVudHMiLCJpbml0aWFsaXplUGxheWVyIiwidXNlckFnZW50IiwibmF2aWdhdG9yIiwidG9Mb3dlckNhc2UiLCJ0ZXN0IiwiYnVpbGRFbWJlZFVybCIsInZpZGVvSWQiLCJleGlzdGluZ1BhcmFtcyIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsInNldCIsInRvU3RyaW5nIiwic2V0SWZyYW1lUGVybWlzc2lvbnMiLCJhbGxvd1Blcm1pc3Npb25zIiwiY3VycmVudFBlcm1pc3Npb25zIiwic3BsaXQiLCJtYXAiLCJzIiwidHJpbSIsImZpbHRlciIsIkJvb2xlYW4iLCJhbGxvd1NldCIsIlNldCIsImNvbmNhdCIsIkFycmF5IiwiZnJvbSIsImpvaW4iLCJjdXJyZW50U3JjIiwibWF0Y2giLCJuZXdTcmMiLCJyZW1vdmVDbGFzcyIsInNlbGVjdE5ld1ZpZGVvIiwiZSIsInByZXZlbnREZWZhdWx0IiwiJHRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJpZCIsImRhdGEiLCIkc2VsZWN0ZWRUaHVtYiIsInNldE1haW5WaWRlbyIsInNldEFjdGl2ZVRodW1iIiwiZW1iZWRVcmwiLCJhZGRDbGFzcyIsImJpbmQiLCJwbHVnaW5LZXkiLCIkdmlkZW9HYWxsZXJ5IiwiaW5kZXgiLCJlbGVtZW50IiwiJGVsIiwiaXNJbml0aWFsaXplZCJdLCJzb3VyY2VSb290IjoiIn0=