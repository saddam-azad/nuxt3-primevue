<script setup>
useHead({  
  meta: [
    { 
      name: 'viewport', 
      content: 'width=device-width, initial-scale=1',
    },
    {
      hid: 'description',
      name: 'description',
      content: 'Nuxt3 + PrimeVUE starter kit.',
    },
  ],
  link: [
    { 
      rel: 'icon',
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" 
    },
    // {
    //   rel: 'preconnect',
    //   href: 'https://fonts.googleapis.com'
    // },
    // {
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
    //   crossorigin: ''    
    // } 
  ]
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
