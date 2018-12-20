export default {
  computed: {
    /**
     * wrapper for validation object (may be redifined in the component, using
     * this mixin to be able to use custom validation object)
     * @return {*}
     */
    validationObject() {
      return this.$v || this.v || {};
    },
  },

  methods: {
    /**
     * get the validation object for the field, specified by it's name (may be
     * hierarchical e.g. 'domain.contact.handle'). If the name is not specified
     * (has a falsy value), then the whole validation object (returned by
     * {@code this.validationObject} will be used)
     *
     * @param fieldName   name of field, which validation object should be find
     * @return {Object}   validation object for given field
     */
    fieldValidationObject(fieldName) {
      let validationObject = this.validationObject;

      if (fieldName) {
        const parts = fieldName.split('.');

        for (let i = 0; i < parts.length; i++) {
          validationObject = validationObject[parts[i]];
        }
      }

      return validationObject;
    },

    /**
     * get error messages of given validation types for specified field if the
     * field value is invalid
     *
     * @param fieldName                         name of field, which validation
     *                                          errors should be calculated
     * @param validationTypeMessageAttributes   map of validation type to
     *                                          message attributes e.g.:
     *                                          {
     *                                            required: 'field.required',
     *                                            between: {
     *                                              key: 'field.between',
     *                                              params: {min, max}
     *                                            }
     *                                          }
     * @return {Array}                          array of calculated validation
     *                                          messages (if the field value is
     *                                          invalid)
     */
    validationErrors(fieldName, validationTypeMessageAttributes) {
      const errors = [];

      const validationObject = this.fieldValidationObject(fieldName);

      if (validationObject.$dirty && validationObject.$invalid) {
        for (const [validationType, messageAttribute] of Object.entries(
          validationTypeMessageAttributes,
        )) {
          if (
            validationObject[validationType] === false ||
            validationObject[validationType].$invalid
          ) {
            const message = messageAttribute;
            errors.push(message);
          }
        }
      }

      return errors;
    },

    /**
     * get error messages of 'required' type for specified field if the
     * field value is invalid
     *
     * @param fieldName         name of field, which validation errors should
     *                          be calculated
     * @param errorKey          message key of validation 'required' message
     * @return {Array}          error messages of 'required' type for specified
     *                          field (if the field value is invalid)
     */
    requiredErrors(fieldName, errorKey) {
      return this.validationErrors(fieldName, { required: errorKey });
    },
  },
};
