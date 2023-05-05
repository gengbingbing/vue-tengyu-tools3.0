<template>
  <div class="imgLazyload">
    <div v-animate="'queue-bottom'">
      <img
        v-lazy="
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fm00%2F04%2F34%2Fc492bfcc7a7f5e618fd9323c810fd912.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667964954&t=406f936156ff8351213ebd999cbc965b'
        "
      />
    </div>
    <div v-animate="'queue-bottom1'">
      <img
        v-lazy="
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F2fdda3cc7cd98d10200b727d2f3fb80e7aec909a&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667964954&t=c5622097f29d1812c34c9d86e687c530'
        "
      />
    </div>
    <div v-animate="'queue-bottom'">
      <img
        v-lazy="
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F611%2F040913164232%2F130409164232-13-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667964954&t=f87fc35708765d72a5ff17c7af519b36'
        "
      />
    </div>
    <div v-animate="'queue-bottom'">
      <img
        v-lazy="
          'https://img2.baidu.com/it/u=4224973024,3399225311&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800'
        "
      />
    </div>
    <div v-animate="'queue-bottom'">
      <img
        v-lazy="
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F0cc08ff971331b66d8386421c1cad1ba684cf28a.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667964954&t=8f7a323bc5a12d6d5848f61afa1a152b'
        "
      />
    </div>
    <div v-animate="'queue-bottom'">
      <img
        v-lazy="
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202010%2F13%2F20201013113040_aSW5x.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667964954&t=1382f38072363bd0a51b3371d0d9bfd3'
        "
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes bottomMoveTop {
  0% {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}

.queue-bottom {
  animation: bottomMoveTop 3s cubic-bezier(0.5, 1, 0.89, 1);
  animation-fill-mode: forwards;
}

.queue-bottom1 {
    animation: bottomMoveTop 6s cubic-bezier(0.5, 1, 0.89, 1);
    animation-fill-mode: forwards;
  }
</style>
