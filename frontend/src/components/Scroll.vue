<template>
  <q-virtual-scroll
      type="table"
      style="max-height: 70vh"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="48"
      :virtual-scroll-sticky-size-end="32"
      :items="rows"
  >
    <template v-slot="{ item: row, index }">
      <tr :key="index">
          <td>#{{ index }}</td>
          <td v-for="col in columns" :key="index + '-' + col">
          {{ row.data[col] ? row.data[col] : null }}
          </td>
      </tr>
    </template>
  </q-virtual-scroll>
</template>
<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  }
}
</script>
