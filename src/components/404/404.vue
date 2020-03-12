<template>
  <div class="hello">
    <div class="img">
      <img
        src="../../assets/images/unknown-1.svg"
        class="flex m-16 p-12 items-center align-center"
      />
    </div>
    <div class="back">
      <strong
        ><p>Please the page you're looking for cannot be found dear.</p></strong
      >
    </div>
    <div class="btn">
      <router-link to="/">
        <button
          class="bg-transparent hover:bg-orange-500 text-orange-700 
     font-semibold hover:text-white
     py-2 px-4 border border-orange-500 
     hover:border-transparent 
     rounded-full flex mb-20 "
        >
          Back to Home
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style>
.btn {
  display: flex;
    justify-content: center;
    margin-top: 5px;

}
.back {
  text-align: center;
  color: #fab32e;
}
.img {
  display: block;
  justify-content: center;
  height: auto;
}
@media screen and (max-width: 600px) {
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
  .img {
    width: 80%;
    display: flex;
    align-items: center;
    text-align: center;
    height: 50vh;
    margin: 10px auto 20px;
  }
  .back {
    text-align: center;
    color: #fab32e;
  }
}
</style>
