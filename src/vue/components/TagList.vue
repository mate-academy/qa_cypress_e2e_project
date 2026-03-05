<template>
  <ul class="tag-list" v-if="tags && tags.length > 0" data-qa="tag-list-container">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(tag, index) of tags"
      :key="index"
      data-qa="tag-list-item"
    >
      <span v-text="tag" data-qa="tag-list-item-text" />
    </li>
  </ul>
</template>

<script>
  /**
   * example usage:
       <input id="tag-input"
         @keypress.enter.prevent="addTag(tag_input)" // update tag state here
       />
       <div class="tag-list">
         <span
           class="tag-default tag-pill"
           v-for="(tag, index) of tags"
           :key="tag + index"
         >
           <i class="ion-close-round" @click="removeTag(tag)"> </i>
           {{ tag }}
         </span>
       </div>
       ...
       computed: {
         ...mapGetters([
           "tags"
         ])
       }
   */
  export default {
  name: "TagList",
  props: {
    tags: Array
  }
};
</script>
