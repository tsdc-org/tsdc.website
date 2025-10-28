<script setup lang="ts">
   import { useScroll } from '@vueuse/core'
   defineOgImage({ url: '/og_image.png' })
   const scroll = useState('body:scroll')
   onMounted(() => {
      scroll.value = useScroll(document.body)
   })
</script>

<template>
   <slot/>
</template>
