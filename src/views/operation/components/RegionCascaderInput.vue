<template>
  <el-cascader
    ref="cascaderRef"
    v-model="cascaderValue"
    :options="regionOptions"
    :props="{ expandTrigger: 'hover', checkStrictly: true }"
    filterable
    clearable
    :placeholder="placeholder"
    style="width: 100%"
    @change="onCascaderChange"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
}>(), {
  placeholder: '请选择省/市/区(支持检索)'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'change', val: string): void
}>()

const cascaderRef = ref<any>(null)

const regionOptions = [
  {
    value: '湖南省',
    label: '湖南省',
    children: [
      {
        value: '长沙市',
        label: '长沙市',
        children: [
          { value: '雨花区', label: '雨花区' },
          { value: '芙蓉区', label: '芙蓉区' },
          { value: '天心区', label: '天心区' },
          { value: '岳麓区', label: '岳麓区' },
          { value: '开福区', label: '开福区' },
          { value: '望城区', label: '望城区' },
          { value: '长沙县', label: '长沙县' },
        ]
      },
      {
        value: '衡阳市',
        label: '衡阳市',
        children: [
          { value: '蒸湘区', label: '蒸湘区' },
          { value: '雁峰区', label: '雁峰区' },
          { value: '石鼓区', label: '石鼓区' },
          { value: '珠晖区', label: '珠晖区' },
          { value: '南岳区', label: '南岳区' },
          { value: '衡阳县', label: '衡阳县' },
          { value: '耒阳市', label: '耒阳市' },
          { value: '常宁市', label: '常宁市' },
        ]
      },
      {
        value: '株洲市',
        label: '株洲市',
        children: [
          { value: '芦淞区', label: '芦淞区' },
          { value: '荷塘区', label: '荷塘区' },
          { value: '石峰区', label: '石峰区' },
          { value: '天元区', label: '天元区' },
          { value: '醴陵市', label: '醴陵市' },
        ]
      },
      {
        value: '湘潭市',
        label: '湘潭市',
        children: [
          { value: '岳塘区', label: '岳塘区' },
          { value: '雨湖区', label: '雨湖区' },
          { value: '湘乡市', label: '湘乡市' },
        ]
      },
      {
        value: '邵阳市',
        label: '邵阳市',
        children: [
          { value: '双清区', label: '双清区' },
          { value: '大祥区', label: '大祥区' },
          { value: '北塔区', label: '北塔区' },
          { value: '邵东市', label: '邵东市' },
        ]
      },
      {
        value: '岳阳市',
        label: '岳阳市',
        children: [
          { value: '岳阳楼区', label: '岳阳楼区' },
          { value: '云溪区', label: '云溪区' },
          { value: '君山区', label: '君山区' },
        ]
      },
      {
        value: '常德市',
        label: '常德市',
        children: [
          { value: '武陵区', label: '武陵区' },
          { value: '鼎城区', label: '鼎城区' },
        ]
      },
      {
        value: '郴州市',
        label: '郴州市',
        children: [
          { value: '北湖区', label: '北湖区' },
          { value: '苏仙区', label: '苏仙区' },
        ]
      },
      {
        value: '永州市',
        label: '永州市',
        children: [
          { value: '冷水滩区', label: '冷水滩区' },
          { value: '零陵区', label: '零陵区' },
        ]
      },
      {
        value: '怀化市',
        label: '怀化市',
        children: [
          { value: '鹤城区', label: '鹤城区' },
        ]
      },
      {
        value: '娄底市',
        label: '娄底市',
        children: [
          { value: '娄星区', label: '娄星区' },
        ]
      },
    ]
  },
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '广州市',
        label: '广州市',
        children: [
          { value: '白云区', label: '白云区' },
          { value: '天河区', label: '天河区' },
          { value: '番禺区', label: '番禺区' },
          { value: '黄埔区', label: '黄埔区' },
        ]
      },
      {
        value: '深圳市',
        label: '深圳市',
        children: [
          { value: '宝安区', label: '宝安区' },
          { value: '龙岗区', label: '龙岗区' },
          { value: '南山区', label: '南山区' },
        ]
      },
      {
        value: '佛山市',
        label: '佛山市',
        children: [
          { value: '南海区', label: '南海区' },
          { value: '顺德区', label: '顺德区' },
        ]
      },
      {
        value: '东莞市',
        label: '东莞市',
        children: [
          { value: '虎门镇', label: '虎门镇' },
          { value: '长安镇', label: '长安镇' },
        ]
      },
    ]
  },
  {
    value: '湖北省',
    label: '湖北省',
    children: [
      {
        value: '武汉市',
        label: '武汉市',
        children: [
          { value: '东西湖区', label: '东西湖区' },
          { value: '汉阳区', label: '汉阳区' },
          { value: '武昌区', label: '武昌区' },
        ]
      },
    ]
  },
  {
    value: '江西省',
    label: '江西省',
    children: [
      {
        value: '南昌市',
        label: '南昌市',
        children: [
          { value: '南昌县', label: '南昌县' },
          { value: '红谷滩区', label: '红谷滩区' },
        ]
      },
    ]
  },
  {
    value: '上海市',
    label: '上海市',
    children: [
      {
        value: '上海市',
        label: '上海市',
        children: [
          { value: '青浦区', label: '青浦区' },
          { value: '嘉定区', label: '嘉定区' },
          { value: '浦东新区', label: '浦东新区' },
        ]
      },
    ]
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: '杭州市',
        label: '杭州市',
        children: [
          { value: '萧山区', label: '萧山区' },
          { value: '余杭区', label: '余杭区' },
        ]
      },
    ]
  },
]

const cascaderValue = computed({
  get() {
    if (!props.modelValue) return []
    return props.modelValue.split('/').filter(Boolean)
  },
  set(arr: string[]) {
    const joined = Array.isArray(arr) ? arr.join('/') : ''
    emit('update:modelValue', joined)
  }
})

const onCascaderChange = (arr: string[]) => {
  const joined = Array.isArray(arr) ? arr.join('/') : ''
  emit('update:modelValue', joined)
  emit('change', joined)
}
</script>
