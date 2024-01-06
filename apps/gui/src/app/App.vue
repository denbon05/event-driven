<script setup lang="ts">
import UserAuth from './components/UserAuth.vue';
import ItemsList from './components/ItemsList.vue';
import { useUser } from './composables/user';

const user = useUser();
</script>

<template>
  <v-app>
    <v-main>
      <user-auth v-if="user.isGuest"></user-auth>
      <items-list v-else></items-list>
    </v-main>
  </v-app>
</template>
