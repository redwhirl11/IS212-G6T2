<template>
  wfhowehfb
  <CMultiSelect :options="options" />
</template>
<script>
import { CMultiSelect } from '@coreui/vue-pro'

export default {
  data: () => {
    return {
      options: [
        {
          value: 0,
          text: 'Angular',
        },
        {
          value: 1,
          text: 'Bootstrap',
        },
        {
          value: 2,
          text: 'React.js',
        },
        {
          value: 3,
          text: 'Vue.js',
        },
        {
          label: 'backend',
          options: [
            {
              value: 4,
              text: 'Django',
            },
            {
              value: 5,
              text: 'Laravel',
            },
            {
              value: 6,
              text: 'Node.js',
            },
          ],
        },
      ],
    }
  },
}
</script>