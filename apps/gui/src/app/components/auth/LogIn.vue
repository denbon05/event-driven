<script setup lang="ts">
import type { ILoginForm } from '@gui-bastion-types';
import { reactive } from 'vue';
import { login } from '../../../api/auth';

const user = reactive<ILoginForm>({
  // for test purposes
  name: 'alfie',
  password: 'solomon',
});

const submit = async () => {
  try {
    await login(user);
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="user.name" label="Name"></v-text-field>
    <v-text-field v-model="user.password" label="Password"></v-text-field>

    <v-btn type="submit" block class="mt-2">Submit</v-btn>
  </v-form>
</template>
