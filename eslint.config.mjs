import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    "vue/html-self-closing": "off",
    "vue/no-v-html": "off"
  }
});
