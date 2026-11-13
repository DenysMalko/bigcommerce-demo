"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_common_form-validation_js-assets_js_theme_common_state-country_js"],{

/***/ "./assets/js/theme/common/form-validation.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/form-validation.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


/**
 * Validate that the given date for the day/month/year select inputs is within potential range
 * @param $formField
 * @param validation
 * @returns {{selector: string, triggeredBy: string, validate: Function, errorMessage: string}}
 */
function buildDateValidation($formField, validation, requiredMessage) {
  // No date range restriction, skip
  if (validation.min_date && validation.max_date) {
    var invalidMessage = "Your chosen date must fall between " + validation.min_date + " and " + validation.max_date + ".";
    var formElementId = $formField.attr('id');
    var minSplit = validation.min_date.split('-');
    var maxSplit = validation.max_date.split('-');
    var minDate = new Date(minSplit[0], minSplit[1] - 1, minSplit[2]);
    var maxDate = new Date(maxSplit[0], maxSplit[1] - 1, maxSplit[2]);
    return {
      selector: "#" + formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = Number($formField.find('select[data-label="day"]').val());
        var month = Number($formField.find('select[data-label="month"]').val()) - 1;
        var year = Number(val);
        var chosenDate = new Date(year, month, day);
        cb(chosenDate >= minDate && chosenDate <= maxDate);
      },
      errorMessage: invalidMessage
    };
  }
  // Required Empty Date field
  if (validation.required && (!validation.min_date || !validation.max_date)) {
    var _formElementId = $formField.attr('id');
    return {
      selector: "#" + _formElementId + " select[data-label=\"year\"]",
      triggeredBy: "#" + _formElementId + " select:not([data-label=\"year\"])",
      validate: function validate(cb, val) {
        var day = $formField.find('select[data-label="day"]').val();
        var month = $formField.find('select[data-label="month"]').val();
        var year = val;
        cb(day && month && year);
      },
      errorMessage: requiredMessage
    };
  }
}

/**
 * We validate checkboxes separately from single input fields, as they must have at least one checked option
 * from many different inputs
 * @param $formField
 * @param validation
 * @param errorText provides error validation message
 */
function buildRequiredCheckboxValidation(validation, $formField, errorText) {
  var formFieldId = $formField.attr('id');
  var primarySelector = "#" + formFieldId + " input:first-of-type";
  var secondarySelector = "#" + formFieldId + " input";
  return {
    selector: primarySelector,
    triggeredBy: secondarySelector,
    validate: function validate(cb) {
      var result = false;
      $(secondarySelector).each(function (index, checkbox) {
        if (checkbox.checked) {
          result = true;
          return false;
        }
      });
      cb(result);
    },
    errorMessage: errorText
  };
}
function buildRequiredValidation(validation, selector, errorText) {
  return {
    selector: selector,
    validate: function validate(cb, val) {
      cb(val.length > 0);
    },
    errorMessage: errorText
  };
}
function buildNumberRangeValidation(validation, formFieldSelector) {
  var invalidMessage = "The value for " + validation.label + " must be between " + validation.min + " and " + validation.max + ".";
  var min = Number(validation.min);
  var max = Number(validation.max);
  return {
    selector: formFieldSelector + " input[name=\"" + validation.name + "\"]",
    validate: function validate(cb, val) {
      var numberVal = Number(val);
      cb(numberVal >= min && numberVal <= max);
    },
    errorMessage: invalidMessage
  };
}
function buildValidation($validateableElement, errorMessage) {
  var validation = $validateableElement.data('validation');
  var fieldValidations = [];
  var formFieldSelector = "#" + $validateableElement.attr('id');
  if (validation.type === 'datechooser') {
    var dateValidation = buildDateValidation($validateableElement, validation, errorMessage);
    if (dateValidation) {
      fieldValidations.push(dateValidation);
    }
  } else if (validation.required && (validation.type === 'checkboxselect' || validation.type === 'radioselect')) {
    fieldValidations.push(buildRequiredCheckboxValidation(validation, $validateableElement, errorMessage));
  } else {
    $validateableElement.find('input, select, textarea').each(function (index, element) {
      var $inputElement = $(element);
      var tagName = $inputElement.get(0).tagName;
      var inputName = $inputElement.attr('name');
      var elementSelector = formFieldSelector + " " + tagName + "[name=\"" + inputName + "\"]";
      if (validation.type === 'numberonly') {
        fieldValidations.push(buildNumberRangeValidation(validation, formFieldSelector));
      }
      if (validation.required) {
        fieldValidations.push(buildRequiredValidation(validation, elementSelector, errorMessage));
      }
    });
  }
  return fieldValidations;
}

/**
 * Builds the validation model for dynamic forms
 * @param $form
 * @param context provides access for error messages on required fields validation
 * @returns {Array}
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__($form, context) {
  var validationsToPerform = [];
  var _createTranslationDic = (0,_utils_translations_utils__WEBPACK_IMPORTED_MODULE_0__.createTranslationDictionary)(context),
    requiredFieldValidationText = _createTranslationDic.field_not_blank;
  $form.find('[data-validation]').each(function (index, input) {
    var getLabel = function getLabel($el) {
      return $el.first().data('validation').label;
    };
    var requiredValidationMessage = getLabel($(input)) + requiredFieldValidationText;
    validationsToPerform = validationsToPerform.concat(buildValidation($(input), requiredValidationMessage));
  });
  return validationsToPerform;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jb21tb25fZm9ybS12YWxpZGF0aW9uX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fc3RhdGUtY291bnRyeV9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBeUU7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVNDLG1CQUFtQkEsQ0FBQ0MsVUFBVSxFQUFFQyxVQUFVLEVBQUVDLGVBQWUsRUFBRTtFQUNsRTtFQUNBLElBQUlELFVBQVUsQ0FBQ0UsUUFBUSxJQUFJRixVQUFVLENBQUNHLFFBQVEsRUFBRTtJQUM1QyxJQUFNQyxjQUFjLDJDQUF5Q0osVUFBVSxDQUFDRSxRQUFRLGFBQVFGLFVBQVUsQ0FBQ0csUUFBUSxNQUFHO0lBQzlHLElBQU1FLGFBQWEsR0FBR04sVUFBVSxDQUFDTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNDLElBQU1DLFFBQVEsR0FBR1AsVUFBVSxDQUFDRSxRQUFRLENBQUNNLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDL0MsSUFBTUMsUUFBUSxHQUFHVCxVQUFVLENBQUNHLFFBQVEsQ0FBQ0ssS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMvQyxJQUFNRSxPQUFPLEdBQUcsSUFBSUMsSUFBSSxDQUFDSixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxJQUFNSyxPQUFPLEdBQUcsSUFBSUQsSUFBSSxDQUFDRixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUVBLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxPQUFPO01BQ0hJLFFBQVEsUUFBTVIsYUFBYSxpQ0FBNEI7TUFDdkRTLFdBQVcsUUFBTVQsYUFBYSx1Q0FBa0M7TUFDaEVVLFFBQVEsRUFBRSxT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QUFDO0lBQzNCLE9BQU9lLEdBQUc7RUFDZCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDVixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZm9ybS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9zdGF0ZS1jb3VudHJ5LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMnO1xuXG4vKipcbiAqIFZhbGlkYXRlIHRoYXQgdGhlIGdpdmVuIGRhdGUgZm9yIHRoZSBkYXkvbW9udGgveWVhciBzZWxlY3QgaW5wdXRzIGlzIHdpdGhpbiBwb3RlbnRpYWwgcmFuZ2VcbiAqIEBwYXJhbSAkZm9ybUZpZWxkXG4gKiBAcGFyYW0gdmFsaWRhdGlvblxuICogQHJldHVybnMge3tzZWxlY3Rvcjogc3RyaW5nLCB0cmlnZ2VyZWRCeTogc3RyaW5nLCB2YWxpZGF0ZTogRnVuY3Rpb24sIGVycm9yTWVzc2FnZTogc3RyaW5nfX1cbiAqL1xuZnVuY3Rpb24gYnVpbGREYXRlVmFsaWRhdGlvbigkZm9ybUZpZWxkLCB2YWxpZGF0aW9uLCByZXF1aXJlZE1lc3NhZ2UpIHtcbiAgICAvLyBObyBkYXRlIHJhbmdlIHJlc3RyaWN0aW9uLCBza2lwXG4gICAgaWYgKHZhbGlkYXRpb24ubWluX2RhdGUgJiYgdmFsaWRhdGlvbi5tYXhfZGF0ZSkge1xuICAgICAgICBjb25zdCBpbnZhbGlkTWVzc2FnZSA9IGBZb3VyIGNob3NlbiBkYXRlIG11c3QgZmFsbCBiZXR3ZWVuICR7dmFsaWRhdGlvbi5taW5fZGF0ZX0gYW5kICR7dmFsaWRhdGlvbi5tYXhfZGF0ZX0uYDtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnRJZCA9ICRmb3JtRmllbGQuYXR0cignaWQnKTtcbiAgICAgICAgY29uc3QgbWluU3BsaXQgPSB2YWxpZGF0aW9uLm1pbl9kYXRlLnNwbGl0KCctJyk7XG4gICAgICAgIGNvbnN0IG1heFNwbGl0ID0gdmFsaWRhdGlvbi5tYXhfZGF0ZS5zcGxpdCgnLScpO1xuICAgICAgICBjb25zdCBtaW5EYXRlID0gbmV3IERhdGUobWluU3BsaXRbMF0sIG1pblNwbGl0WzFdIC0gMSwgbWluU3BsaXRbMl0pO1xuICAgICAgICBjb25zdCBtYXhEYXRlID0gbmV3IERhdGUobWF4U3BsaXRbMF0sIG1heFNwbGl0WzFdIC0gMSwgbWF4U3BsaXRbMl0pO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogYCMke2Zvcm1FbGVtZW50SWR9IHNlbGVjdFtkYXRhLWxhYmVsPVwieWVhclwiXWAsXG4gICAgICAgICAgICB0cmlnZ2VyZWRCeTogYCMke2Zvcm1FbGVtZW50SWR9IHNlbGVjdDpub3QoW2RhdGEtbGFiZWw9XCJ5ZWFyXCJdKWAsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXkgPSBOdW1iZXIoJGZvcm1GaWVsZC5maW5kKCdzZWxlY3RbZGF0YS1sYWJlbD1cImRheVwiXScpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aCA9IE51bWJlcigkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwibW9udGhcIl0nKS52YWwoKSkgLSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHllYXIgPSBOdW1iZXIodmFsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjaG9zZW5EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG5cbiAgICAgICAgICAgICAgICBjYihjaG9zZW5EYXRlID49IG1pbkRhdGUgJiYgY2hvc2VuRGF0ZSA8PSBtYXhEYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGludmFsaWRNZXNzYWdlLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBSZXF1aXJlZCBFbXB0eSBEYXRlIGZpZWxkXG4gICAgaWYgKHZhbGlkYXRpb24ucmVxdWlyZWQgJiYgKCF2YWxpZGF0aW9uLm1pbl9kYXRlIHx8ICF2YWxpZGF0aW9uLm1heF9kYXRlKSkge1xuICAgICAgICBjb25zdCBmb3JtRWxlbWVudElkID0gJGZvcm1GaWVsZC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogYCMke2Zvcm1FbGVtZW50SWR9IHNlbGVjdFtkYXRhLWxhYmVsPVwieWVhclwiXWAsXG4gICAgICAgICAgICB0cmlnZ2VyZWRCeTogYCMke2Zvcm1FbGVtZW50SWR9IHNlbGVjdDpub3QoW2RhdGEtbGFiZWw9XCJ5ZWFyXCJdKWAsXG4gICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXkgPSAkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwiZGF5XCJdJykudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGggPSAkZm9ybUZpZWxkLmZpbmQoJ3NlbGVjdFtkYXRhLWxhYmVsPVwibW9udGhcIl0nKS52YWwoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5ZWFyID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgY2IoZGF5ICYmIG1vbnRoICYmIHllYXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVxdWlyZWRNZXNzYWdlLFxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLyoqXG4gKiBXZSB2YWxpZGF0ZSBjaGVja2JveGVzIHNlcGFyYXRlbHkgZnJvbSBzaW5nbGUgaW5wdXQgZmllbGRzLCBhcyB0aGV5IG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgY2hlY2tlZCBvcHRpb25cbiAqIGZyb20gbWFueSBkaWZmZXJlbnQgaW5wdXRzXG4gKiBAcGFyYW0gJGZvcm1GaWVsZFxuICogQHBhcmFtIHZhbGlkYXRpb25cbiAqIEBwYXJhbSBlcnJvclRleHQgcHJvdmlkZXMgZXJyb3IgdmFsaWRhdGlvbiBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkUmVxdWlyZWRDaGVja2JveFZhbGlkYXRpb24odmFsaWRhdGlvbiwgJGZvcm1GaWVsZCwgZXJyb3JUZXh0KSB7XG4gICAgY29uc3QgZm9ybUZpZWxkSWQgPSAkZm9ybUZpZWxkLmF0dHIoJ2lkJyk7XG4gICAgY29uc3QgcHJpbWFyeVNlbGVjdG9yID0gYCMke2Zvcm1GaWVsZElkfSBpbnB1dDpmaXJzdC1vZi10eXBlYDtcbiAgICBjb25zdCBzZWNvbmRhcnlTZWxlY3RvciA9IGAjJHtmb3JtRmllbGRJZH0gaW5wdXRgO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3I6IHByaW1hcnlTZWxlY3RvcixcbiAgICAgICAgdHJpZ2dlcmVkQnk6IHNlY29uZGFyeVNlbGVjdG9yLFxuICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICQoc2Vjb25kYXJ5U2VsZWN0b3IpLmVhY2goKGluZGV4LCBjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yVGV4dCxcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBidWlsZFJlcXVpcmVkVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBzZWxlY3RvciwgZXJyb3JUZXh0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgIHZhbGlkYXRlKGNiLCB2YWwpIHtcbiAgICAgICAgICAgIGNiKHZhbC5sZW5ndGggPiAwKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvclRleHQsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGROdW1iZXJSYW5nZVZhbGlkYXRpb24odmFsaWRhdGlvbiwgZm9ybUZpZWxkU2VsZWN0b3IpIHtcbiAgICBjb25zdCBpbnZhbGlkTWVzc2FnZSA9IGBUaGUgdmFsdWUgZm9yICR7dmFsaWRhdGlvbi5sYWJlbH0gbXVzdCBiZSBiZXR3ZWVuICR7dmFsaWRhdGlvbi5taW59IGFuZCAke3ZhbGlkYXRpb24ubWF4fS5gO1xuICAgIGNvbnN0IG1pbiA9IE51bWJlcih2YWxpZGF0aW9uLm1pbik7XG4gICAgY29uc3QgbWF4ID0gTnVtYmVyKHZhbGlkYXRpb24ubWF4KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNlbGVjdG9yOiBgJHtmb3JtRmllbGRTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cIiR7dmFsaWRhdGlvbi5uYW1lfVwiXWAsXG4gICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbnVtYmVyVmFsID0gTnVtYmVyKHZhbCk7XG5cbiAgICAgICAgICAgIGNiKG51bWJlclZhbCA+PSBtaW4gJiYgbnVtYmVyVmFsIDw9IG1heCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yTWVzc2FnZTogaW52YWxpZE1lc3NhZ2UsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRWYWxpZGF0aW9uKCR2YWxpZGF0ZWFibGVFbGVtZW50LCBlcnJvck1lc3NhZ2UpIHtcbiAgICBjb25zdCB2YWxpZGF0aW9uID0gJHZhbGlkYXRlYWJsZUVsZW1lbnQuZGF0YSgndmFsaWRhdGlvbicpO1xuICAgIGNvbnN0IGZpZWxkVmFsaWRhdGlvbnMgPSBbXTtcbiAgICBjb25zdCBmb3JtRmllbGRTZWxlY3RvciA9IGAjJHskdmFsaWRhdGVhYmxlRWxlbWVudC5hdHRyKCdpZCcpfWA7XG5cbiAgICBpZiAodmFsaWRhdGlvbi50eXBlID09PSAnZGF0ZWNob29zZXInKSB7XG4gICAgICAgIGNvbnN0IGRhdGVWYWxpZGF0aW9uID0gYnVpbGREYXRlVmFsaWRhdGlvbigkdmFsaWRhdGVhYmxlRWxlbWVudCwgdmFsaWRhdGlvbiwgZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICBpZiAoZGF0ZVZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChkYXRlVmFsaWRhdGlvbik7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24ucmVxdWlyZWQgJiYgKHZhbGlkYXRpb24udHlwZSA9PT0gJ2NoZWNrYm94c2VsZWN0JyB8fCB2YWxpZGF0aW9uLnR5cGUgPT09ICdyYWRpb3NlbGVjdCcpKSB7XG4gICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZFJlcXVpcmVkQ2hlY2tib3hWYWxpZGF0aW9uKHZhbGlkYXRpb24sICR2YWxpZGF0ZWFibGVFbGVtZW50LCBlcnJvck1lc3NhZ2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkdmFsaWRhdGVhYmxlRWxlbWVudC5maW5kKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkaW5wdXRFbGVtZW50ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSAkaW5wdXRFbGVtZW50LmdldCgwKS50YWdOYW1lO1xuICAgICAgICAgICAgY29uc3QgaW5wdXROYW1lID0gJGlucHV0RWxlbWVudC5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50U2VsZWN0b3IgPSBgJHtmb3JtRmllbGRTZWxlY3Rvcn0gJHt0YWdOYW1lfVtuYW1lPVwiJHtpbnB1dE5hbWV9XCJdYDtcblxuICAgICAgICAgICAgaWYgKHZhbGlkYXRpb24udHlwZSA9PT0gJ251bWJlcm9ubHknKSB7XG4gICAgICAgICAgICAgICAgZmllbGRWYWxpZGF0aW9ucy5wdXNoKGJ1aWxkTnVtYmVyUmFuZ2VWYWxpZGF0aW9uKHZhbGlkYXRpb24sIGZvcm1GaWVsZFNlbGVjdG9yKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsaWRhdGlvbi5yZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsaWRhdGlvbnMucHVzaChidWlsZFJlcXVpcmVkVmFsaWRhdGlvbih2YWxpZGF0aW9uLCBlbGVtZW50U2VsZWN0b3IsIGVycm9yTWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRWYWxpZGF0aW9ucztcbn1cblxuLyoqXG4gKiBCdWlsZHMgdGhlIHZhbGlkYXRpb24gbW9kZWwgZm9yIGR5bmFtaWMgZm9ybXNcbiAqIEBwYXJhbSAkZm9ybVxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIGZvciBlcnJvciBtZXNzYWdlcyBvbiByZXF1aXJlZCBmaWVsZHMgdmFsaWRhdGlvblxuICogQHJldHVybnMge0FycmF5fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoJGZvcm0sIGNvbnRleHQpIHtcbiAgICBsZXQgdmFsaWRhdGlvbnNUb1BlcmZvcm0gPSBbXTtcbiAgICBjb25zdCB7IGZpZWxkX25vdF9ibGFuazogcmVxdWlyZWRGaWVsZFZhbGlkYXRpb25UZXh0IH0gPSBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkoY29udGV4dCk7XG5cbiAgICAkZm9ybS5maW5kKCdbZGF0YS12YWxpZGF0aW9uXScpLmVhY2goKGluZGV4LCBpbnB1dCkgPT4ge1xuICAgICAgICBjb25zdCBnZXRMYWJlbCA9ICRlbCA9PiAkZWwuZmlyc3QoKS5kYXRhKCd2YWxpZGF0aW9uJykubGFiZWw7XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkVmFsaWRhdGlvbk1lc3NhZ2UgPSBnZXRMYWJlbCgkKGlucHV0KSkgKyByZXF1aXJlZEZpZWxkVmFsaWRhdGlvblRleHQ7XG5cbiAgICAgICAgdmFsaWRhdGlvbnNUb1BlcmZvcm0gPSB2YWxpZGF0aW9uc1RvUGVyZm9ybS5jb25jYXQoYnVpbGRWYWxpZGF0aW9uKCQoaW5wdXQpLCByZXF1aXJlZFZhbGlkYXRpb25NZXNzYWdlKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmFsaWRhdGlvbnNUb1BlcmZvcm07XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc2VydFN0YXRlSGlkZGVuRmllbGQgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuXG4vKipcbiAqIEV4dHJhY3RzIGF0dHJpYnV0ZXMgZnJvbSBhIGpRdWVyeSBlbGVtZW50IGludG8gYSBwbGFpbiBvYmplY3RcbiAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gZXh0cmFjdCBhdHRyaWJ1dGVzIGZyb21cbiAqIEByZXR1cm5zIHtPYmplY3R9IFBsYWluIG9iamVjdCB3aXRoIGF0dHJpYnV0ZSBuYW1lLXZhbHVlIHBhaXJzXG4gKi9cbmZ1bmN0aW9uIGdldEVsZW1lbnRBdHRyaWJ1dGVzKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gXy50cmFuc2Zvcm0oZWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNlbGVjdCBlbGVtZW50IGZvciBzdGF0ZXMgd2hlbiB0aGUgY291bnRyeSBoYXMgc3RhdGVzIEFORCB0aGV5IGFyZSByZXF1aXJlZFxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudCAtIFRoZSBjdXJyZW50IHN0YXRlIGlucHV0IGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IC0gQ29udGV4dCBvYmplY3QgY29udGFpbmluZyB0cmFuc2xhdGVkIHN0cmluZ3NcbiAqIEByZXR1cm5zIHtqUXVlcnl9IFRoZSBuZXcgc2VsZWN0IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlU2VsZWN0UmVxdWlyZWQoc3RhdGVFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgY29uc3QgYXR0cnMgPSBnZXRFbGVtZW50QXR0cmlidXRlcyhzdGF0ZUVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICAuLi5hdHRycyxcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXG4gICAgICAgICdhcmlhLXJlcXVpcmVkJzogJ3RydWUnLFxuICAgIH07XG5cbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XG5cbiAgICBpZiAoJGhpZGRlbklucHV0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBTdHJpbmcgaXMgaW5qZWN0ZWQgZnJvbSBsb2NhbGl6ZXJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmFwcGVuZChgPHNtYWxsPiR7Y29udGV4dC5yZXF1aXJlZH08L3NtYWxsPmApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLnNob3coKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNlbGVjdCBlbGVtZW50IGZvciBzdGF0ZXMgd2hlbiB0aGUgY291bnRyeSBoYXMgc3RhdGVzIGJ1dCB0aGV5IGFyZSBOT1QgcmVxdWlyZWRcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnQgLSBUaGUgY3VycmVudCBzdGF0ZSBpbnB1dCBlbGVtZW50XG4gKiBAcmV0dXJucyB7alF1ZXJ5fSBUaGUgbmV3IHNlbGVjdCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVNlbGVjdE9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJzID0gZ2V0RWxlbWVudEF0dHJpYnV0ZXMoc3RhdGVFbGVtZW50KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgIGNsYXNzOiAnZm9ybS1zZWxlY3QnLFxuICAgICAgICAnYXJpYS1yZXF1aXJlZCc6ICdmYWxzZScsXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8c2VsZWN0Pjwvc2VsZWN0PicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcbiAgICBjb25zdCAkaGlkZGVuSW5wdXQgPSAkKCdbbmFtZSo9XCJGb3JtRmllbGRJc1RleHRcIl0nKTtcblxuICAgIGlmICgkaGlkZGVuSW5wdXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICRoaWRkZW5JbnB1dC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvLyBIaWRlIHRoZSByZXF1aXJlZCBpbmRpY2F0b3Igc2luY2Ugc3RhdGUgaXMgb3B0aW9uYWxcbiAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRleHQgaW5wdXQgZm9yIHN0YXRlcyB3aGVuIHRoZSBjb3VudHJ5IGhhcyBubyBzdGF0ZXMgbGlzdFxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudCAtIFRoZSBjdXJyZW50IHN0YXRlIGVsZW1lbnRcbiAqIEByZXR1cm5zIHtqUXVlcnl9IFRoZSBuZXcgdGV4dCBpbnB1dCBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1ha2VTdGF0ZVRleHRPcHRpb25hbChzdGF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCBhdHRycyA9IGdldEVsZW1lbnRBdHRyaWJ1dGVzKHN0YXRlRWxlbWVudCk7XG5cbiAgICBjb25zdCByZXBsYWNlbWVudEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIC4uLmF0dHJzLFxuICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIGNsYXNzOiAnZm9ybS1pbnB1dCcsXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8aW5wdXQgLz4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcblxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICRuZXdFbGVtZW50O1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGFycmF5IG9mIG9wdGlvbnMgZnJvbSB0aGUgcmVtb3RlIHJlcXVlc3QgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgc2VsZWN0IGJveC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxuICogQHBhcmFtIHtqUXVlcnl9ICRzZWxlY3RFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25zKHN0YXRlc0FycmF5LCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuXG4gICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCJcIj4ke3N0YXRlc0FycmF5LnByZWZpeH08L29wdGlvbj5gKTtcblxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xuICAgICAgICBzdGF0ZXNBcnJheS5zdGF0ZXMuZm9yRWFjaCgoc3RhdGVPYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnVzZUlkRm9yU3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLm5hbWV9XCI+JHtzdGF0ZU9iai5sYWJlbCA/IHN0YXRlT2JqLmxhYmVsIDogc3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcbiAgICB9XG59XG5cbi8qKlxuICogTWFrZXMgdGhlIHppcC9wb3N0YWwgY29kZSBmaWVsZCByZXF1aXJlZCBhbmQgc2hvd3MgdGhlIHJlcXVpcmVkIGluZGljYXRvclxuICogQHBhcmFtIHtqUXVlcnl9ICR6aXBFbGVtZW50IFRoZSB6aXAvcG9zdGFsIGNvZGUgZmllbGQgZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgVGhlIGNvbnRleHQgb2JqZWN0IGNvbnRhaW5pbmcgdHJhbnNsYXRlZCBzdHJpbmdzXG4gKi9cbmZ1bmN0aW9uIG1ha2VaaXBSZXF1aXJlZCgkemlwRWxlbWVudCwgY29udGV4dCkge1xuICAgICR6aXBFbGVtZW50LnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgLy8gc2luY2UgdGhlIGF0dHJpYnV0ZSBpcyBzZXQgd2l0aGluIHRlbXBsYXRlcy9jb21wb25lbnRzL2NvbW1vbi9mb3Jtcy8qLFxuICAgIC8vIHdlIGV4cGxpY2l0bHkgc2V0IGFyaWEtcmVxdWlyZWQgdG8gZW5zdXJlIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMgYW5ub3VuY2UgdGhpcyBmaWVsZCBjb3JyZWN0bHkgYWZ0ZXIgZHluYW1pYyBjaGFuZ2VzXG4gICAgJHppcEVsZW1lbnQuYXR0cignYXJpYS1yZXF1aXJlZCcsICd0cnVlJyk7XG5cbiAgICBpZiAoJHppcEVsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICR6aXBFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkemlwRWxlbWVudC5wcmV2KCkuZmluZCgnc21hbGwnKS5zaG93KCk7XG4gICAgfVxufVxuXG4vKipcbiAqIE1ha2VzIHRoZSB6aXAvcG9zdGFsIGNvZGUgZmllbGQgb3B0aW9uYWwgYW5kIGhpZGVzIHRoZSByZXF1aXJlZCBpbmRpY2F0b3JcbiAqXG4gKiBET00gU3RydWN0dXJlIEV4cGVjdGF0aW9uOlxuICogVGhlIGZ1bmN0aW9uIGFzc3VtZXMgdGhlIGZvbGxvd2luZyBET00gc3RydWN0dXJlOlxuICogPGxhYmVsPlxuICogICA8c3Bhbj5aaXAvUG9zdGFsIENvZGU8L3NwYW4+XG4gKiAgIDxzbWFsbD4qPC9zbWFsbD4gPCEtLSByZXF1aXJlZCBpbmRpY2F0b3IgLS0+XG4gKiA8L2xhYmVsPlxuICogPGlucHV0IGRhdGEtZmllbGQtdHlwZT1cIlppcFwiIC8+XG4gKlxuICogQHBhcmFtIHtqUXVlcnl9ICR6aXBFbGVtZW50IFRoZSB6aXAvcG9zdGFsIGNvZGUgZmllbGQgZWxlbWVudFxuICovXG5mdW5jdGlvbiBtYWtlWmlwT3B0aW9uYWwoJHppcEVsZW1lbnQpIHtcbiAgICAkemlwRWxlbWVudC5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAvLyBzaW5jZSB0aGUgYXR0cmlidXRlIGlzIHNldCB3aXRoaW4gdGVtcGxhdGVzL2NvbXBvbmVudHMvY29tbW9uL2Zvcm1zLyosXG4gICAgLy8gd2UgZXhwbGljaXRseSBzZXQgYXJpYS1yZXF1aXJlZCB0byBlbnN1cmUgYXNzaXN0aXZlIHRlY2hub2xvZ2llcyBhbm5vdW5jZSB0aGlzIGZpZWxkIGNvcnJlY3RseSBhZnRlciBkeW5hbWljIGNoYW5nZXNcbiAgICAkemlwRWxlbWVudC5hdHRyKCdhcmlhLXJlcXVpcmVkJywgZmFsc2UpO1xuXG4gICAgY29uc3QgJHByZXZFbGVtZW50ID0gJHppcEVsZW1lbnQucHJldigpO1xuICAgIGlmICgkcHJldkVsZW1lbnQubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCAkcmVxdWlyZWRJbmRpY2F0b3IgPSAkcHJldkVsZW1lbnQuZmluZCgnc21hbGwnKTtcbiAgICAgICAgaWYgKCRyZXF1aXJlZEluZGljYXRvci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkcmVxdWlyZWRJbmRpY2F0b3IuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge2pRdWVyeX0gc3RhdGVFbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZWZhdWx0LXBhcmFtLWxhc3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZUVsZW1lbnQsIGNvbnRleHQgPSB7fSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAvKipcbiAgICAgKiBCYWNrd2FyZHMgY29tcGF0aWJsZSBmb3IgdGhyZWUgcGFyYW1ldGVycyBpbnN0ZWFkIG9mIGZvdXJcbiAgICAgKlxuICAgICAqIEF2YWlsYWJsZSBvcHRpb25zOlxuICAgICAqXG4gICAgICogdXNlSWRGb3JTdGF0ZXMge0Jvb2x9IC0gR2VuZXJhdGVzIHN0YXRlcyBkcm9wZG93biB1c2luZyBpZCBmb3IgdmFsdWVzIGluc3RlYWQgb2Ygc3RyaW5nc1xuICAgICAqL1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnM7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuICAgIH1cblxuICAgICQoJ3NlbGVjdFtkYXRhLWZpZWxkLXR5cGU9XCJDb3VudHJ5XCJdJykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgY291bnRyeU5hbWUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xuXG4gICAgICAgIGlmIChjb3VudHJ5TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jb3VudHJ5LmdldEJ5TmFtZShjb3VudHJ5TmFtZSwgeyBiYXNlVXJsOiBjb250ZXh0LnNlY3VyZUJhc2VVcmwgfSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChjb250ZXh0LnN0YXRlX2Vycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGN1cnJlbnRJbnB1dCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICAgICAgY29uc3QgJHppcElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlppcFwiXScpO1xuXG4gICAgICAgICAgICBjb25zdCBoYXNTdGF0ZXMgPSAhXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuc3RhdGVzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVzU3RhdGUgPSByZXNwb25zZS5kYXRhLnJlcXVpcmVzU3ViZGl2aXNpb24gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gcmVzcG9uc2UuZGF0YS5yZXF1aXJlc1N1YmRpdmlzaW9uXG4gICAgICAgICAgICAgICAgOiBoYXNTdGF0ZXM7XG5cbiAgICAgICAgICAgIGxldCAkbmV3RWxlbWVudDtcblxuICAgICAgICAgICAgaWYgKGhhc1N0YXRlcykge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlc1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICRuZXdFbGVtZW50ID0gbWFrZVN0YXRlU2VsZWN0UmVxdWlyZWQoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVTZWxlY3RPcHRpb25hbCgkY3VycmVudElucHV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkbmV3RWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRuZXdFbGVtZW50ID0gbWFrZVN0YXRlVGV4dE9wdGlvbmFsKCRjdXJyZW50SW5wdXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJHppcElucHV0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIHRydWUgd2hlbiByZXF1aXJlc1Bvc3RhbENvZGVzIGlzIHVuZGVmaW5lZCB0byBtYWludGFpbiBvcmlnaW5hbCBiZWhhdmlvclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVzWmlwID0gcmVzcG9uc2UuZGF0YS5yZXF1aXJlc1Bvc3RhbENvZGVzICE9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgPyByZXNwb25zZS5kYXRhLnJlcXVpcmVzUG9zdGFsQ29kZXNcbiAgICAgICAgICAgICAgICAgICAgOiB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVpcmVzWmlwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ha2VaaXBSZXF1aXJlZCgkemlwSW5wdXQsIGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1ha2VaaXBPcHRpb25hbCgkemlwSW5wdXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgJG5ld0VsZW1lbnQsIHJlcXVpcmVzU3RhdGUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJidWlsZERhdGVWYWxpZGF0aW9uIiwiJGZvcm1GaWVsZCIsInZhbGlkYXRpb24iLCJyZXF1aXJlZE1lc3NhZ2UiLCJtaW5fZGF0ZSIsIm1heF9kYXRlIiwiaW52YWxpZE1lc3NhZ2UiLCJmb3JtRWxlbWVudElkIiwiYXR0ciIsIm1pblNwbGl0Iiwic3BsaXQiLCJtYXhTcGxpdCIsIm1pbkRhdGUiLCJEYXRlIiwibWF4RGF0ZSIsInNlbGVjdG9yIiwidHJpZ2dlcmVkQnkiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwiZGF5IiwiTnVtYmVyIiwiZmluZCIsIm1vbnRoIiwieWVhciIsImNob3NlbkRhdGUiLCJlcnJvck1lc3NhZ2UiLCJyZXF1aXJlZCIsImJ1aWxkUmVxdWlyZWRDaGVja2JveFZhbGlkYXRpb24iLCJlcnJvclRleHQiLCJmb3JtRmllbGRJZCIsInByaW1hcnlTZWxlY3RvciIsInNlY29uZGFyeVNlbGVjdG9yIiwicmVzdWx0IiwiJCIsImVhY2giLCJpbmRleCIsImNoZWNrYm94IiwiY2hlY2tlZCIsImJ1aWxkUmVxdWlyZWRWYWxpZGF0aW9uIiwibGVuZ3RoIiwiYnVpbGROdW1iZXJSYW5nZVZhbGlkYXRpb24iLCJmb3JtRmllbGRTZWxlY3RvciIsImxhYmVsIiwibWluIiwibWF4IiwibmFtZSIsIm51bWJlclZhbCIsImJ1aWxkVmFsaWRhdGlvbiIsIiR2YWxpZGF0ZWFibGVFbGVtZW50IiwiZGF0YSIsImZpZWxkVmFsaWRhdGlvbnMiLCJ0eXBlIiwiZGF0ZVZhbGlkYXRpb24iLCJwdXNoIiwiZWxlbWVudCIsIiRpbnB1dEVsZW1lbnQiLCJ0YWdOYW1lIiwiZ2V0IiwiaW5wdXROYW1lIiwiZWxlbWVudFNlbGVjdG9yIiwiJGZvcm0iLCJjb250ZXh0IiwidmFsaWRhdGlvbnNUb1BlcmZvcm0iLCJfY3JlYXRlVHJhbnNsYXRpb25EaWMiLCJyZXF1aXJlZEZpZWxkVmFsaWRhdGlvblRleHQiLCJmaWVsZF9ub3RfYmxhbmsiLCJpbnB1dCIsImdldExhYmVsIiwiJGVsIiwiZmlyc3QiLCJyZXF1aXJlZFZhbGlkYXRpb25NZXNzYWdlIiwiY29uY2F0IiwidXRpbHMiLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwic2hvd0FsZXJ0TW9kYWwiLCJnZXRFbGVtZW50QXR0cmlidXRlcyIsIl90cmFuc2Zvcm0iLCJwcm9wIiwiaXRlbSIsInJldCIsInZhbHVlIiwibWFrZVN0YXRlU2VsZWN0UmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsInJlcGxhY2VtZW50QXR0cmlidXRlcyIsIk9iamVjdCIsImFzc2lnbiIsInJlcGxhY2VXaXRoIiwiJG5ld0VsZW1lbnQiLCIkaGlkZGVuSW5wdXQiLCJyZW1vdmUiLCJwcmV2IiwiYXBwZW5kIiwic2hvdyIsIm1ha2VTdGF0ZVNlbGVjdE9wdGlvbmFsIiwiaGlkZSIsIm1ha2VTdGF0ZVRleHRPcHRpb25hbCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50Iiwib3B0aW9ucyIsImNvbnRhaW5lciIsInByZWZpeCIsIl9pc0VtcHR5Iiwic3RhdGVzIiwiZm9yRWFjaCIsInN0YXRlT2JqIiwidXNlSWRGb3JTdGF0ZXMiLCJpZCIsImh0bWwiLCJqb2luIiwibWFrZVppcFJlcXVpcmVkIiwiJHppcEVsZW1lbnQiLCJtYWtlWmlwT3B0aW9uYWwiLCIkcHJldkVsZW1lbnQiLCIkcmVxdWlyZWRJbmRpY2F0b3IiLCJjYWxsYmFjayIsIm9uIiwiZXZlbnQiLCJjb3VudHJ5TmFtZSIsImN1cnJlbnRUYXJnZXQiLCJhcGkiLCJjb3VudHJ5IiwiZ2V0QnlOYW1lIiwiYmFzZVVybCIsInNlY3VyZUJhc2VVcmwiLCJlcnIiLCJyZXNwb25zZSIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIiR6aXBJbnB1dCIsImhhc1N0YXRlcyIsInJlcXVpcmVzU3RhdGUiLCJyZXF1aXJlc1N1YmRpdmlzaW9uIiwidW5kZWZpbmVkIiwicmVxdWlyZXNaaXAiLCJyZXF1aXJlc1Bvc3RhbENvZGVzIiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJhcmd1bWVudHMiLCJKU09OIiwicGFyc2UiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=