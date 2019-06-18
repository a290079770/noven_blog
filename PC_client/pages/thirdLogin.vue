<template>
  <div class="flex-center fixed">
    <div>
      <img class="third-loading-icon" src="~assets/icon/loading.svg">
      <span class="third-loading-dots-cont">
        <span class="third-loading-dots">
          ...
        </span>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  created() {
    
  },
  mounted() {
    
  },
}
</script>
<style type="text/css" scoped>
  .fixed {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    background: white;
    color: #d13954;
  }

  .third-loading-icon {
    width: 64px;
    animation: loading 1s linear infinite
  }

  @keyframes loading {
    from { transform: rotate(0deg) }
    to { transform: rotate(-360deg) }
  }

  .third-loading-dots-cont {
    display: inline-block;
    width: 30px;
  }

  .third-loading-dots {
    display: inline-block;
    font-size: 36px;
    height: 100%;
    overflow: hidden;
    transform: translateY(6px);
    animation: loading-dot 1s linear infinite
  }

  @keyframes loading-dot {
    0% { width: 8px; }
    50% { width: 16px; }
    100% { width: 24px; }
  }
</style>
