
<template>
  <span v-cloak>
    <span v-show="visible" :class="textColor" class="ll-wrapper">
      <i v-show="showIcon" :class="iconClass"/>
      {{ msg }}
    </span>
  </span>
</template>

<script>
const colorMap = {
  loading: 'll-text-muted',
  completed: 'll-text-green',
  failed: 'll-text-red',
};
const iconClassMap = {
  loading: 'fa fa-refresh fa-spin',
  completed: 'fa fa-check-circle-o',
  failed: 'fa fa-times'
};
let timer;
let clearTime = 4000;

export default {
  data() {
    return {
      msg: null,
      type: null,
      visible: false,
      timer: null,
      showIcon: true,
      customIconClass: null,
    };
  },

  computed: {
    textColor() {
      return colorMap[this.type];
    },
    iconClass() {
      return this.customIconClass || iconClassMap[this.type];
    }
  },

  methods: {
    clear() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.msg = null;
        this.type = null;
        this.visible = false;
      }, clearTime);
    },
    loading(payload = {}) {
      this.msg = payload.msg || 'Loading...';
      this.type = 'loading';
      this.visible = true;
      this.showIcon = payload.showIcon;
      this.customIconClass = payload.iconClass;
    },
    completed(payload = {}) {
      this.msg = payload.msg || 'Completed!';
      this.type = 'completed';
      this.visible = true;
      this.showIcon = payload.showIcon;
      this.customIconClass = payload.iconClass;
      clearTime = payload.clearTime;
      this.clear();
    },
    failed(payload = {}) {
      this.msg = payload.msg || 'Failed';
      this.type = 'failed';
      this.visible = true;
      this.showIcon = payload.showIcon;
      this.customIconClass = payload.iconClass;
      clearTime = payload.clearTime;
      this.clear();
    }
  }
};
</script>

<style scoped>
.ll-text-red {
  color: #dd4b39;
}
.ll-text-blue {
  color: #3c8dbc;
}
.ll-text-yellow {
  color: #f39c12;
}
.ll-text-green {
  color: #00a65a;
}
.ll-text-muted {
  color: #777;
}
.ll-wrapper {
  padding-left: 16px;
  padding-right: 8px;
}
</style>
