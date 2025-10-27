<script setup lang="ts">
    import type { NuxtError } from '#app';

    const props = defineProps({ error: Object as () => NuxtError })
</script>

<template>
    <div class="error">
        <h1>{{ error?.statusCode }}</h1>
        <div>{{ error?.message }}</div>
        <button @click="clearError({ redirect: '/' })">Вернуться на главную</button>
    </div>
</template>

<style>
    .error {
        width: 100dvw;
        height: 100dvh;
        gap: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.4s ease-in-out;
    }

    h1 {
        font-family: 'DM Serif Display', serif;
        font-size: 96px !important;
        font-weight: bold;
    }
</style>