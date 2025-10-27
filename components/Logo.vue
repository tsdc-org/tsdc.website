<script setup lang="ts">

    const titles = {
        the: 'the',
        main: 'Software\xa0Development',
        company: 'COMPANY'
    } 

    const state = ref<any>({
        the: undefined,
        main: [],
        company: undefined,
        logo: false
    })

    onMounted(() => {
        state.value.logo = true
        setTimeout(() => state.value.the = titles.the, 500)
        state.value.main = titles.main
        setTimeout(() => state.value.company = titles.company, 750)
    })
</script>


<template>
    <div id="logo">
        <div class="logo origin-center duration-1000" :class="state.logo ? 'scale-[1]' : 'scale-[.8]'">
            <i class="the duration-500 origin-center" :class="state.the ? 'opacity-100 scale-[1]' : 'opacity-0 scale-[.5]'">{{ state.the }}</i>
            <i class="software-development" :class="state.main?.length ? 'opacity-100' : 'opacity-0'">
                <div 
                    v-for="(char, index) in titles.main" :key="index" class="letter" 
                    :style="{ 'transition-delay': (index * 0.05) + 's', 'opacity': state.main.length >= index ? '1 !important' : '0', 'transform': state.main.length > index ? 'translateY(0)' : 'translateY(10px)' }"
                    @animationend="state.main.push(char)"
                >
                    {{ char }}
                </div>
            </i>
            <span class="company duration-1000" :class="state.company ? 'opacity-100' : 'opacity-0 -translate-x-[50px]'">{{ state.company }}</span>
        </div>
    </div>
</template>

<style>
    @import "~/assets/css/main.css";

    .logo {
        @apply w-[363px] h-[70px] relative;
    }
    .the {
        @apply absolute top-[1px] left-[72px] text-white font-['EB_Garamond'] font-medium italic text-base text-left w-[19px] leading-[21px];
    }
    .software-development {
        @apply absolute top-0 left-0 w-[363px] leading-[52px];
    }
    .letter {
        @apply inline-block font-['EB_Garamond']! font-semibold italic text-[40px]! opacity-0! duration-500 mr-[.5px];
    }
    .company {
        @apply absolute top-[49px] left-[126px] text-white font-['DM_Serif_Display'] font-normal text-[15px] text-center w-[113px] tracking-[50%] leading-[21px];
    }
</style>