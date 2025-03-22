<template>
  <div class="sakura-container">
    <div class="love-message">
      <p>在这纷扬的樱花雨里，</p>
      <p>每一片花瓣都藏着我对你的眷恋。</p>
      <p>你的温柔如春风，轻拂我心，让我沉醉于这份悄然的心动。</p>
    </div>
    <button v-if="!isDialogStarted &&!isSuccess" @click="startDialog" class="action-button">开启对话</button>
    <div v-if="isDialogStarted && currentStep < steps.length" class="dialog">
      <h2>{{ steps[currentStep].title }}</h2>
      <p>{{ steps[currentStep].content }}</p>
      <button @click="showNextStep">{{ steps[currentStep].buttonText }}</button>
    </div>
    <div v-if="isSuccess" class="success-page">
      <h2>表白成功 🎉</h2>
      <p>从现在起，我们将一起书写属于我们的浪漫故事 💑</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const steps = reactive([
  {
    title: '星空之约 🌌',
    content: '今晚的星空真美，你愿意和我一起看吗？',
    buttonText: '好呀'
  },
  {
    title: '日出约定 🌅',
    content: '那以后每天都能陪我看日出吗？',
    buttonText: '当然愿意'
  },
  {
    title: '最终提问 💖',
    content: '最后一个问题... 愿意成为我的恋人吗？',
    buttonText: '我答应'
  },
  {
    title: '故事开始 ✨',
    content:
      '从见到你的第一眼起，我就心动不已。喜欢你，想和你走过每一个春夏秋冬...',
    buttonText: '开启我们的故事'
  }
]);

const currentStep = ref(0);
const isSuccess = ref(false);
const isDialogStarted = ref(false);
const router = useRouter(); // 获取路由实例

const createSakura = () => {
  const sakura = document.createElement('div');
  sakura.classList.add('sakura');
  sakura.style.left = Math.random() * window.innerWidth + 'px';
  sakura.style.animationDuration = Math.random() * 10 + 5 + 's';

  const petalCount = 3;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.transform = `rotate(${i * (360 / petalCount)}deg)`;
    sakura.appendChild(petal);
  }

  const container = document.querySelector('.sakura-container');
  container.appendChild(sakura);

  setTimeout(() => {
    container.removeChild(sakura);
  }, (sakura.style.animationDuration.slice(0, -1) * 1000));
};

onMounted(() => {
  setInterval(createSakura, 300);
});

const startDialog = () => {
  isDialogStarted.value = true;
};

const showNextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  } else {
      isSuccess.value = true;
      router.push({ name: 'success' }); 
  }
};
</script>

<style scoped>
/* 全局重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  overflow-x: hidden;
  overflow-y: hidden;
}

.sakura-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fff0f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

:deep(.sakura) {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: fall linear infinite;
}

:deep(.sakura .petal) {
  position: absolute;
  width: 10px;
  height: 25px;
  background: radial-gradient(circle at 50% 50%, #ffb6c1 30%, #ffc0cb 70%);
  border-radius: 80% 0 50% 50% / 50% 0 50% 50%;
  transform: rotate(-45deg);
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

.love-message {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Brush Script MT', cursive;
  font-size: clamp(24px, 5vw, 36px);
  color: #ff69b4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: center;
  width: 90%;
}

.action-button {
  position: absolute;
  bottom: 50px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 2;
  width: 90%;
  max-width: 400px;
}

.dialog h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.dialog p {
  font-size: 18px;
  margin-bottom: 20px;
}

.dialog button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.success-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 2;
  width: 90%;
  max-width: 400px;
}

.success-page h2 {
  font-size: 36px;
  color: #ff69b4;
  margin-bottom: 10px;
}

.success-page p {
  font-size: 24px;
}

/* 针对小屏幕设备（如手机）的媒体查询 */
@media (max-width: 767px) {
  .love-message {
    font-size: 24px;
  }

  .action-button {
    font-size: 16px;
    padding: 8px 16px;
  }

  .dialog h2 {
    font-size: 20px;
  }

  .dialog p {
    font-size: 16px;
  }

  .dialog button {
    font-size: 16px;
    padding: 8px 16px;
  }

  .success-page h2 {
    font-size: 30px;
  }

  .success-page p {
    font-size: 20px;
  }
}
</style>    