<template>
<div id="container" style="width:100%; height:400px;">
</div>
</template>

<script setup>
import {onMounted} from "vue"
import { useQuestionStore } from "../store";
import Highcharts from "highcharts";

const store = useQuestionStore();
function buildChart(stats) {
  const series = [];
  const question = Object.keys(stats)[0];
  for (let answer of Object.keys(stats[question])) {
    series.push({ name: answer, y: stats[question][answer] });
  }
  const chart = Highcharts.chart("container", {
    chart: {
      type: "pie",
    },
    title: {
      text: question,
    },
    series: [
      {
        name: question,
        data: series,
      },
    ],
  });
}
onMounted(async () => {
  await store.getQuestions();
  buildChart(store.getStats);
});
</script>

<style>
button {
  background: #7c99ac;
}
</style>
