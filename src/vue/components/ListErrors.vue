<template v-show="errors">
  <ul class="error-messages" data-testid="error-messages">
    <li v-for="(value, key) in errors" :key="key" :data-testid="`error-${key}`">
      <span v-text="key" data-testid="error-key" />
      <span v-for="err in value" :key="err" v-text="err" data-testid="error-value" />
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
