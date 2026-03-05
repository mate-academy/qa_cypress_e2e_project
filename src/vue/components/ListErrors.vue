<template>
  <ul class="error-messages" data-qa="error-messages-list">
    <li v-for="(value, key) in errors" :key="key" data-qa="error-message-item">
      <span v-text="key" data-qa="error-message-key" />
      <span v-for="err in value" :key="err" v-text="err" data-qa="error-message-value" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "ListErorrs",
  props: {
    errors: { type: Object, required: true }
  }
};
</script>
