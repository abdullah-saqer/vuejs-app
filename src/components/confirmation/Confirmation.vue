<template src="./Confirmation.html"></template>

<script>
export default {
  props: {
    title: {type: String, required: true},
    text: {type: String, required: true},
    value: {type: Boolean},
    trueBtnText: {type: String, default() { return "OK" }},
    falseBtnText: {type: String, default() { return "Cancel" }},
    trueBtnColor: {type: String, default() { return 'error' }},
    maxWidth: {type: Number, default() { return 450 }}
  },
  methods: {
    closeDialog() {
      this.$emit('onCancel');
      this.$emit('input', false);
    },
    onSuccess() {
      this.$emit('onSuccess');
      this.$emit('input', false);
    }
  }
}
</script>
