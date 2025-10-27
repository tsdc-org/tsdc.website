<script setup lang="ts">
    import Logo from '~/components/Logo.vue';

    const rendered = ref(false);

    const dimensions = ref<Record<PropertyKey, { width: number; height: number }>>({
        logo: { width: 0, height: 0 },
        description: { width: 0, height: 0 }
    });
    const open = (url: string) => window.open(url, '_blank');

    onMounted(() => {
        setTimeout(() => rendered.value = true, 3000);
    });
</script>

<template>
    <div class="w-dvw h-dvh relative overflow-hidden">
        <div class="absolute top-0 left-0 w-dvw h-dvh duration-1000 flex items-center justify-center blur-3xl" :class="rendered ? 'opacity-15 scale-[2]' : 'opacity-50 scale-[1.2]'">
            <svg width="1540" height="1298" viewBox="0 0 1540 1298" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                    class="draw"
                    pathLength="1"
                    d="M50.0117 185.365L337.916 50.0005L191.012 619.865L894.512 161.365L477.012 1247.87L1489.01 330.865L1258.51 1247.87"
                    stroke="var(--color-accent)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                />
            </svg>
        </div>

        <div class="duration-1000" :class="rendered ? 'scale-[1] opacity-100' : 'opacity-0 blur-2xl scale-[1.4]'">
            <GLBViewer src="/models/statue.glb" class="absolute h-dvh w-dvw"/>
        </div>
        

        <div class="duration-1000 absolute left-1/2 -translate-x-1/2" :class="rendered ? 'top-[48px]! xl:scale-[0.9] scale-[0.8] max-md:scale-[0.7]' : 'top-1/2 -translate-y-1/2 xl:scale-[1.4] scale-[0.9] max-md:scale-[0.8]'">
            <Logo/>
        </div>

        <span class="font-['EB_Garamond']! italic underline text-xs absolute  left-1/2 -translate-x-1/2 top-[24px] font-bold transition-all duration-1000" :class="rendered ? 'opacity-50' : 'opacity-0 scale-[2]'">in go we trust</span>

        <div id="description" :class="rendered ? 'bottom-[48px] opacity-100' : 'bottom-[0px] opacity-0 scale-[.8]'" class=" max-w-[calc(100dvw-48px)] w-full text-center duration-1000 mt-0 flex flex-col gap-[24px] overflow-hidden absolute left-1/2 -translate-x-1/2">
            <p class="max-w-[calc(100dvw-48px)]"> 
                <b>The Software Development Company</b> — команда профессионалов, создающих элегантные и эффективные программные решения для бизнеса и не только.<br>Мы разрабатываем ПО любого формата — от веб-платформ и мобильных приложений до корпоративных систем и кастомных инструментов.<br>Нам доверяют сотни клиентов по всей России, ценящих качество, надежность и внимание к деталям.
            </p>
            <div class="w-full flex justify-center gap-[24px]">
                <button @click="open('https://t.me/tsdc_org_bot')">Оставить заявку</button>
                <div class="flex items-center gap-[12px]">
                    <button icon @click="open('https://github.com/tsdc-org')">
                        <Icon name="pixel:github"/>
                    </button>
                </div>
            </div>
            
        </div>
       
    </div>
    
</template>

<style>
    .draw {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation-delay: 1000ms;
        animation: draw 3s ease-in-out forwards;
        stroke-width: 0;
    }
    @keyframes draw {
        to { stroke-dashoffset: 0; stroke-width: 255; }
    }
</style>