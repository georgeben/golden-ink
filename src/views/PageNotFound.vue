<template>
 <div class="page-not-found h-screen text">
   <div class="p-20 text-center">
    <h1 class="text-white font-extrabold text-center">404</h1>
    <h2 class="text-4xl text-white">Page not found</h2>
    <p class="text-xl text-white">The page your are looking for does not exist or has been removed.</p>
    <router-link to="/" class="text-white underline font-semibold text-xl">
      Go home
    </router-link>
   </div>
 </div>
</template>
 
<script lang='ts'>
</script>
 
<style scoped>
.page-not-found{
  background-image: url('../assets/images/desert.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

h1{
  font-size: 10rem;
}
</style>