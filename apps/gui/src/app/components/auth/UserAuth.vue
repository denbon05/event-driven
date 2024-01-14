<script setup lang="ts">
import { ref } from 'vue';
import LogIn from './LogIn.vue';
import SignUp from './SignUp.vue';

const tab = ref<'login' | 'signup'>('login');
</script>

<template>
  <v-card width="300" class="mx-auto">
    <v-tabs v-model="tab">
      <v-tab value="login">LogIn</v-tab>
      <v-tab value="signup">SignUp</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="login"><LogIn></LogIn></v-window-item>
      <v-window-item value="signup"><SignUp></SignUp></v-window-item>
    </v-window>
  </v-card>
</template>
