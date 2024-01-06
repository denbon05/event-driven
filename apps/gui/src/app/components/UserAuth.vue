<script setup lang="ts">
import { ref } from 'vue';

const nickname = ref('');
</script>

<template>
  <v-sheet width="300" class="mx-auto">
    <v-form>
      <v-text-field v-model="nickname" label="nickname"></v-text-field>
    </v-form>
  </v-sheet>
</template>
