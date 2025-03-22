<template>
  <div class="success-container">
    <!-- 樱花飘落效果 -->
    <div v-for="(sakura, index) in sakuras" :key="index" class="sakura" :style="{ left: sakura.left, animationDuration: sakura.animationDuration }">
      <div v-for="(petal, pIndex) in sakura.petals" :key="pIndex" class="petal" :style="{ transform: `rotate(${petal.rotation}deg)` }"></div>
    </div>
    <!-- 烟花特效 -->
    <div class="fireworks-container">
      <div v-for="(firework, index) in fireworks" :key="index" class="firework" :style="{ left: firework.left, animationDelay: firework.delay }"></div>
    </div>
    <!-- 浪漫情话 -->
    <div class="message-container">
      <h1>从此刻起，你便是我余生故事的女主角，与你携手走过每一个晨昏四季🌼</h1>
      <p>从今天起，你的笑容就是我世界里的阳光，你的温柔是我最珍贵的礼物。我想陪你走过每一个清晨与黄昏，在时光的长河里，将我们的爱写成永恒的诗篇💕。</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, onUnmounted } from 'vue'; // 新增onUnmounted导入

// 樱花飘落效果优化
const sakuras = ref([]);
const MAX_SAKURAS = 50; 
const createSakura = () => {
  if (sakuras.value.length >= MAX_SAKURAS) return;
  
  const left = Math.random() * window.innerWidth + 'px';
  const animationDuration = (Math.random() * 8 + 4) + 's'; 
  const petals = [];
  const petalCount = 3;
  for (let i = 0; i < petalCount; i++) {
    petals.push({ rotation: i * (360 / petalCount) });
  }
  sakuras.value.push({ left, animationDuration, petals });
  
  setTimeout(() => {
    const index = sakuras.value.findIndex(s => s.left === left && s.animationDuration === animationDuration);
    if (index !== -1) {
      sakuras.value.splice(index, 1);
    }
  }, parseFloat(animationDuration) * 1000);
};

let sakuraFrameId;
const animateSakura = () => {
  createSakura();
  sakuraFrameId = requestAnimationFrame(animateSakura);
};

// 烟花特效优化
const fireworks = reactive([]);
const MAX_FIREWORKS = 20; 
const createFirework = () => {
  if (fireworks.length >= MAX_FIREWORKS) return;
  
  const left = Math.random() * window.innerWidth + 'px';
  const delay = (Math.random() * 1.5) + 's';
  fireworks.push({ left, delay });
  
  setTimeout(() => {
    const index = fireworks.findIndex(f => f.left === left && f.delay === delay);
    if (index !== -1) {
      fireworks.splice(index, 1);
    }
  }, 2500);
};

onMounted(() => {
  sakuraFrameId = requestAnimationFrame(animateSakura);
  setInterval(createFirework, 1500);
});

// 新增组件卸载时的清理逻辑
onUnmounted(() => {
  cancelAnimationFrame(sakuraFrameId);
});
</script>

<style scoped>
.success-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff0f5;
}

.sakura {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: fall linear infinite;
  will-change: transform, opacity; /* 提前告知浏览器优化 */
}

.petal {
  position: absolute;
  width: 10px;
  height: 25px;
  background: radial-gradient(circle at 50% 50%, #ffb6c1 30%, #ffc0cb 70%);
  border-radius: 80% 0 50% 50% / 50% 0 50% 50%;
  transform: rotate(-45deg);
  will-change: transform;
}

@keyframes fall {
  0% {
    top: -20px;
    transform: translateX(0) rotate(0deg);
  }
  100% {
    top: 100vh;
    transform: translateX(300px) rotate(360deg);
  }
}

.fireworks-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.firework {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 40px;
  background: #ffd700;
  animation: firework 2.5s ease-out; /* 缩短烟花动画时间 */
  will-change: transform, opacity;
}

@keyframes firework {
  0% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(2.5);
    opacity: 1;
  }
  100% {
    transform: scaleY(1) translateY(-100vh);
    opacity: 0;
  }
}

.message-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
}

.message-container h1 {
  font-family: 'Brush Script MT', cursive;
  font-size: 48px;
  color: #ff69b4;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.message-container p {
  font-family: 'Brush Script MT', cursive;
  font-size: 24px;
  color: #333;
  line-height: 1.6;
}
</style>