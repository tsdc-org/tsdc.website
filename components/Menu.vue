<script setup lang="ts">
    const menu = useState('menu', () => false)
</script>

<template>
    <Transition>
        <div class="fixed z-[9999] w-dvw h-dvh bg-primary/25 backdrop-blur-md" v-if="menu">
            {{ menu }}
            <Icon @click="menu = false" name="ph:plus-light" size="48" class="fixed top-[24px] rotate-45 right-[24px] hover:opacity-50 transition-all cursor-nw-resize!"/>
        </div>
    </Transition>

</template>