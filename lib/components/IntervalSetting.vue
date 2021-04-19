<template>
  <span>
    <el-tooltip content="设置刷新间隔，单位为秒。如果设置为 0，则停止刷新，此时可以使用快捷键“R”手动刷新。">
      <!-- 这里难以定制数字输入框的宽度 -->
      <el-input-number 
        :value="value"
        @input="$emit('input', $event)"
        controls-position="right" size="small" :min="0"
      />
    </el-tooltip>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span>
      <i class="el-icon-loading" v-if="loading"></i>
      <i class="el-icon-finished" v-else></i>
    </span>
  </span>
</template>

<script>
export default {
  name: 'IntervalSetting',
  props: {
    value: Number,
    loading: Boolean
  }
}
</script>
