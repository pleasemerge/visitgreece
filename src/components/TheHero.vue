
<script setup lang="ts">
import gsap from 'gsap'
import AppBtn from '@/components/AppBtn.vue'

const transitions = {
  headingBeforeEnter: (el: any) => {
    el.style.transform = 'translateX(-500px)'
    el.style.opacity = 0
  },
  headingEnter: (el: any) => {
    gsap.to(el, {
      duration: 1,
      delay: el.dataset.index * 0.2,
      x: 0,
      opacity: 1
    })
  },
  bookNowBeforeEnter: (el: any) => {
    el.style.opacity = 0
  },
  bookNowEnter: (el: any) => {
    gsap.to(el, {
      duration: 1.5,
      opacity: 1
    })
  }
}

const headerImgURL = new URL('../assets/img/beach-md.png', import.meta.url).href
</script>

<template>
<div class="flex bg-primary pt-16 md:pt-20 pb-10 md:pb-20">
  <div class="w-full md:w-1/2">
    <h1 class="text-5xl font-bold">
      ENJOY YOUR<br/>
      <TransitionGroup @before-enter="transitions.headingBeforeEnter" @enter="transitions.headingEnter" appear>
        <span class="block text-secondary" key="init-transition">DREAM</span>
      </TransitionGroup>
      VACATION IN<br/>
      GREECE 
    </h1>
    <p class="w-11/12 md:w-8/12 py-8 text-gray-700 leading-7">
      Nulla ut dui id sem auctor imperdiet. Sed aliquam diam tincidunt, tempus libero nec, vestibulum nulla. Ut justo purus, varius eget posuere in, consequat non ligula. Nullam eget diam sagittis, bibendum magna non, porta dui. Duis mattis rhoncus ipsum, ut pulvinar risus vehicula vitae.
    </p>

    <p class="py-4 md:py-8">
      <TransitionGroup @before-enter="transitions.bookNowBeforeEnter" @enter="transitions.bookNowEnter" appear>
        <router-link :to="{ name: 'list-hotels' }" key="transition-book-now">
          <app-btn class="px-8 py-3">
            View hotels
          </app-btn>
        </router-link>
      </TransitionGroup>
    </p>
  </div>

  <div class="hidden md:flex w-full md:w-1/2 items-center justify-end relative">
    <div>
      <img :src="headerImgURL" class-names="header-img mr-7 z-10 relative rounded w-80" :width="400" />
    </div>
  </div>
</div>
</template>

<style>
.header-img {
  box-shadow: 30px 30px 0 #FFDAB2;
}
</style>
