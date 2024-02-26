<template>
  <transition name="mainContainer" :appear="true">
    <div :class="classObj" class="app-wrapper">
      <sidebar class="sidebar-container dark" />
      <div class="main-container">
        <div :class="{ 'fixed-header': 0 }">
          <navbar />
          <tags-view />
        </div>
        <app-main />
      </div>
    </div>
  </transition>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components';
import { mapState } from 'vuex';

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView,
  },
  data() {
    return {
      screenWidth: null,
    };
  },
  mounted() {
    let socket = new WebSocket('ws://192.168.0.130:10006/w');
    socket.onmessage = event => {
      console.log(event);
      console.log(JSON.parse(event.data));
      let message = JSON.parse(event.data);
      const h = this.$createElement;
      this.$notify({
        title: '通知',
        message: h(
          'p',
          {
            style: 'width: 250px;display: flex;justify-content: space-between;',
          },
          [
            h(
              'span',
              {
                style: {
                  fontSize: '1rem!important',
                  padding: '0!important',
                },
              },
              message.sourceFrom
            ),
            h(
              'el-button',
              {
                attrs: {
                  size: 'small',
                },
                class: 'tableDeleteBtn',
                style: {
                  fontSize: '1rem!important',
                  padding: '0!important',
                },
                on: {
                  click: this.jumpSuperior,
                },
              },
              '查看'
            ),
          ]
        ),

        type: 'warning',
        duration: 0,
        customClass: 'custom-class',
      });
    };
  },
  // mounted() {
  //   this.screenWidth = document.body.clientWidth;
  //   window.onresize = () => {
  //     return (() => {
  //       this.screenWidth = document.body.clientWidth;
  //     })();
  //   };
  // },
  // watch: {
  //   screenWidth: {
  //     handler(val) {
  //       if (val >= 2399) {
  //         document.body.style.zoom = 2;
  //       } else {
  //         document.body.style.zoom = 1;
  //       }
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    },
  },
  methods: {
    jumpSuperior() {
      if (this.$route.path !== '/superior-instruction/control-event') {
        this.$router.push('/superior-instruction/control-event');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mainContainer-enter,
.mainContainer-leave-to {
  transform: translateX(-120rem);
  opacity: 0;
}

.mainContainer-enter-to,
.mainContainer-leave-from {
  transform: translateX(0px);
  opacity: 1;
}

.mainContainer-enter-active,
.mainContainer-leave-active {
  transition: 0.7s;
}
</style>
